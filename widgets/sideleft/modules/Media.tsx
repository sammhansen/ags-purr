import { Gtk } from "astal/gtk3";
import Mpris from "gi://AstalMpris";
import { bind, Variable } from "astal";
import { MaterialIcon } from "../../custom/MaterialIcon"

function lengthStr(length: number) {
	const min = Math.floor(length / 60);
	const sec = Math.floor(length % 60);
	const sec0 = sec < 10 ? "0" : "";
	return `${min}:${sec0}${sec}`;
}

function MediaPlayer({ player }: { player: Mpris.Player }) {
	const { START, END, CENTER } = Gtk.Align;

	const title = bind(player, "title").as((t) => t || "Unknown Track");

	const coverArt = bind(player, "coverArt").as(
		(c) => `background-image: url('${c}')`,
	);

	const artist = bind(player, "artist").as((a) => a || "Unknown Artist");

	// player.position will keep changing even when the player is paused.  This is a workaround
	const realPosition = Variable(player.position);
	bind(player, "position").subscribe((position) => {
		if (player.playbackStatus === Mpris.PlaybackStatus.PLAYING) {
			realPosition.set(position);
		}
	});

	const playIcon = bind(player, "playbackStatus").as((s) =>
		s === Mpris.PlaybackStatus.PLAYING ? (
			<MaterialIcon icon="pause" />
		) : (
			<MaterialIcon icon="play_arrow" />
		)
	);

	return (
		<box
			className="player-parent-box"
		>
			<box className="mediaPlayer" css={coverArt}>
				<box
					className="mediaOverlay"
					vertical={true}
				>
					<label
						className="labelSmallBold"
						truncate={true}
						halign={Gtk.Align.START}
						label={title}
					/>
					<label
						className="labelSmall"
						truncate={true}
						halign={Gtk.Align.START}
						label={artist}
					/>
					<box className="seekContainer" vertical={false}>
						<label
							className="labelSmall"
							halign={START}
							visible={bind(player, "length").as((l) => l > 0)}
							label={realPosition().as(lengthStr)}
						/>
						<slider
							className="seek"
							hexpand={true}
							visible={bind(player, "length").as((l) => l > 0)}
							onDragged={({ value }) => {
								player.position = value * player.length;
								realPosition.set(player.position);
							}}
							value={realPosition().as((position) => {
								return player.length > 0 ? position / player.length : 0;
							})}
						/>
						<label
							className="labelSmall"
							halign={END}
							visible={bind(player, "length").as((l) => l > 0)}
							label={bind(player, "length").as((l) =>
								l > 0 ? lengthStr(l) : "0:00",
							)}
						/>
					</box>
				</box>
			</box>
			<box
				vertical={true}
				halign={Gtk.Align.END}
				valign={CENTER}
			>
				<button
					className="controlButton"
					onClicked={() => player.previous()}
					visible={bind(player, "canGoPrevious")}
				>
					<MaterialIcon icon="skip_previous" />
				</button>
				<button
					className="controlButton"
					onClicked={() => player.play_pause()}
					visible={bind(player, "canControl")}
					child={playIcon}
				/>
				<button
					className="controlButton"
					onClicked={() => player.next()}
					visible={bind(player, "canGoNext")}
				>
					<MaterialIcon icon="skip_next" />
				</button>
			</box>

		</box>
	);
}

export default function() {
	const mpris = Mpris.get_default();
	return (
		<box className="mediaPlayersContainer" vertical={true}>
			{bind(mpris, "players").as((players) => {
				return players.map((player) => <MediaPlayer player={player} />);
			})}
		</box>
	);
}
