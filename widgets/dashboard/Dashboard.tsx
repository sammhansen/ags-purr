import { App, Astal } from "astal/gtk3";
import EndpointControls from "./EndpointControls";
import Wp from "gi://AstalWp";
import { bind } from "astal";
import { Gtk, Gdk } from "astal/gtk3";
import { getMicrophoneIcon, getVolumeIcon } from "./utils/audio";
import PowerOptions from "./PowerOptions";
import ThemeOptions from "./ThemeOptions";
import MediaPlayers from "./MediaPlayers";
import NotificationHistory from "./NotificationHistory";
import NetworkControls from "./NetworkControls";
import BluetoothControls from "./BluetoothControls";
import Divider from "../common/Divider";
import { MaterialIcon } from "./../custom/materialicon"
import { QuickToggles } from "./quicktoggles"
import { Profile } from "./dashboard/modules/profile/Profile"

export const DashboardWindowName = "dashboardWindow";

export default function() {
	const { audio } = Wp.get_default()!;

	let window: Gtk.Window;
	let stack: Gtk.Stack;

	const myStack = (
		<stack name="stackmeup" visibleChildName="child2">
			<label name="child1" label="child1" />
			<label name="child2" label="child2" />
			<scrollable
				name="child3"
				className="scrollWindow"
				vscroll={Gtk.PolicyType.AUTOMATIC}
				propagateNaturalHeight={true}
				widthRequest={400}
			>
				<box
					css={`
                margin: 0 10px 0 10px;
              `}
					vertical={true}
				>
					<NotificationHistory />
				</box>
			</scrollable>
		</stack>

	);

	return (
		<window
			exclusivity={Astal.Exclusivity.NORMAL}
			anchor={
				Astal.WindowAnchor.CENTER
			}
			layer={Astal.Layer.TOP}
			className="dashboard-window"
			name={DashboardWindowName}
			application={App}
			margin={5}
			heightRequest={700}
			widthRequest={1000}
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
						<NetworkControls />
						<BluetoothControls />
						<EndpointControls
							defaultEndpoint={audio.default_speaker}
							endpointsBinding={bind(audio, "speakers")}
							getIcon={getVolumeIcon}
						/>
						<EndpointControls
							defaultEndpoint={audio.default_microphone}
							endpointsBinding={bind(audio, "microphones")}
							getIcon={getMicrophoneIcon}
						/>
						{/*Disabling Media players since it seems to cause heavy lag when I use spotify-player (tui spotify)*/}
						{/*Also requires gvfs package installed*/}
						<MediaPlayers />
						<box css={"margin-top: 20px;"} />
						<PowerOptions />
						<box css={"margin-top: 20px;"} />

					</box>
					<box
						vertical={true}
					>
						<box
							vertical={false}
						>
							<button
								className="systemMenuIconButton"
								onClicked={() => {
									myStack.set_visible_child_name("child3")
								}}
							>
								<MaterialIcon icon="notifications" size="lg" />
							</button>
							<button
								className="systemMenuIconButton"
								onClicked={() => {
									App.toggle_window(DashboardWindowName)
									execAsync("loginctl lock-session")
								}}
							>
								<MaterialIcon icon="brand_awareness" size="lg" />
							</button>
							<button
								className="systemMenuIconButton"
								onClicked={() => {
									App.toggle_window(DashboardWindowName)
									execAsync("systemctl reboot")
								}}
							>
								<MaterialIcon icon="bluetooth" size="lg" />
							</button>
							<button
								className="systemMenuIconButton"
								onClicked={() => {
									App.toggle_window(DashboardWindowName)
									execAsync("systemctl poweroff")
								}}
							>
								<MaterialIcon icon="signal_wifi_4_bar" size="lg" />
							</button>
						</box>
						<QuickToggles />
						{myStack}
					</box>
				</box>
				<box vexpand={true} />
			</box>
		</window>
	);
}
