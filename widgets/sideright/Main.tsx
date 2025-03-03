import { App, Astal } from "astal/gtk3";
import EndpointControls from "./modules/EndPoints";
import Wp from "gi://AstalWp";
import { bind } from "astal";
import { Gtk, Gdk } from "astal/gtk3";
import { getMicrophoneIcon, getVolumeIcon } from "./utils/audio";
import PowerOptions from "./modules/Power";
import ThemeOptions from "./ThemeOptions";
import NotificationHistory from "./modules/notification/NotificationHistory";
import NetworkControls from "./modules/Network";
import BluetoothControls from "./modules/Bluetooth";
import Divider from "../common/Divider";
import { MaterialIcon } from "../custom/MaterialIcon"
import { QuickToggles } from "./modules/QuickToggles"
import Calendar from "./modules/Calendar"

export const SideRight = "window-side-right";

export default function() {
	const { audio } = Wp.get_default()!;

	let window: Gtk.Window;
	let stack: Gtk.Stack;

	const myStack = (
		<stack name="stackmeup" visibleChildName="notification-tab">
			<scrollable
				name="notification-tab"
				className="scrollWindow"
				vscroll={Gtk.PolicyType.AUTOMATIC}
				hscroll={Gtk.PolicyType.NEVER}
				propagateNaturalHeight={true}
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
			<box
				name="endpoint-tab"
				vertical={true}
			>
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
			</box>
			<box
				name="bluetooth-tab"
			>
				<BluetoothControls />
			</box>
			<box
				name="network-tab"
			>
				<NetworkControls />
			</box>
		</stack>

	);

	return (
		<window
			exclusivity={Astal.Exclusivity.NORMAL}
			anchor={
				Astal.WindowAnchor.TOP |
				Astal.WindowAnchor.RIGHT |
				Astal.WindowAnchor.BOTTOM
			}
			layer={Astal.Layer.TOP}
			className="window-side-right"
			name={SideRight}
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
					<box
						vertical={true}
					>
						<QuickToggles />
						<box
							vertical={false}
							halign={Gtk.Align.CENTER}
							className="tabswitch-parent-box"
						>
							<button
								className="material-tabswitch-icon"
								onClicked={() => {
									myStack.set_visible_child_name("notification-tab")
								}}
							>
								<MaterialIcon icon="notifications" size="20" />
							</button>
							<button
								className="material-tabswitch-icon"
								onClicked={() => {
									myStack.set_visible_child_name("endpoint-tab")
								}}
							>
								<MaterialIcon icon="speaker" size="20" />
							</button>
							<button
								className="material-tabswitch-icon"
								onClicked={() => {
									myStack.set_visible_child_name("bluetooth-tab")
								}}
							>
								<MaterialIcon icon="bluetooth" size="20" />
							</button>
							<button
								className="material-tabswitch-icon"
								onClicked={() => {
									myStack.set_visible_child_name("network-tab")
								}}
							>
								<MaterialIcon icon="signal_wifi_4_bar" size="20" />
							</button>
						</box>

						{myStack}
						<Calendar />
					</box>
				</box>
				<box vexpand={true} />
			</box>
		</window>
	);
}
