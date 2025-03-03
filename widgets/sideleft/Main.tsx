import { App, Astal } from "astal/gtk3";
import { bind } from "astal";
import { Gtk, Gdk } from "astal/gtk3";
import MediaPlayers from "./modules/Media";
import { MaterialIcon } from "../custom/MaterialIcon"
import { Profile } from "./modules/profile/Main"

export const SideLeft = "window-side-left";

export default function() {

	let window: Gtk.Window;

	return (
		<window
			exclusivity={Astal.Exclusivity.NORMAL}
			anchor={
				Astal.WindowAnchor.TOP |
				Astal.WindowAnchor.LEFT |
				Astal.WindowAnchor.BOTTOM
			}
			layer={Astal.Layer.TOP}
			className="window-side-left"
			name={SideLeft}
			application={App}
			margin={5}
			widthRequest={400}
			keymode={Astal.Keymode.ON_DEMAND}
			visible={false}
			onKeyPressEvent={function(self, event: Gdk.Event) {
				if (event.get_keyval()[1] === Gdk.KEY_Escape) {
					self.hide();
				}
			}}
			setup={(self) => {
				window = self;
			}}
		>
			<box>
				<box
					// vertical={true}
					setup={(self) => {
						setTimeout(() => {
							bind(window, "hasToplevelFocus").subscribe((hasFocus) => {
								if (hasFocus) {
									self.className = "focusedWindow";
								} else {
									self.className = "window";
								}
							});
						}, 1_000);
					}}
				>
					<box vertical={true}>
						<box css={"margin-top: 20px;"} />
						<Profile />
						{/*Disabling Media players since it seems to cause heavy lag when I use spotify-player (tui spotify)*/}
						{/*Also requires gvfs package installed*/}
						<MediaPlayers />
						<box css={"margin-top: 20px;"} />
						<box css={"margin-top: 20px;"} />

					</box>
				</box>
				<box vexpand={true} />
			</box>
		</window>
	);
}
