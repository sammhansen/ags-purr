import { MaterialIcon } from "../../custom/MaterialIcon"
import { execAsync } from "astal/process"
import { Gtk } from "astal/gtk3"

const size = "300px";

export function QuickToggles() {
	return <box
		vertical={true}
	>
		<box
			className="quick-toggle-box"
			halign={Gtk.Align.CENTER}
			hexpand={true}
		>
			<button
				className="quick-toggle-button"
				widthRequest={size}
				heightRequest={size}
				onClicked={() => {
				}}
			>
				<MaterialIcon icon="signal_wifi_4_bar" size="25" />
			</button>
			<button
				className="quick-toggle-button"
				onClicked={() => {
				}}
			>
				<MaterialIcon icon="bluetooth" size="25" />
			</button>
			<button
				className="quick-toggle-button"
				onClicked={() => {
				}}
			>
				<MaterialIcon icon="bedtime" size="25" />
			</button>
			<button
				className="quick-toggle-button"
				onClicked={() => {
				}}
			>
				<MaterialIcon icon="local_cafe" size="25" />
			</button>
		</box>
		<box
			className="quick-button-box"
			halign={Gtk.Align.CENTER}
			hexpand={true}
		>
			<button
				className="quick-button"
				onClicked={() => {
				}}
			>
				<MaterialIcon icon="fit_screen" size="25" />
			</button>
			<button
				className="quick-button"
				onClicked={() => {
				}}
			>
				<MaterialIcon icon="screen_record" size="25" />
			</button>
			<button
				className="quick-button"
				onClicked={() => {
				}}
			>
				<MaterialIcon icon="colorize" size="25" />
			</button>
			<button
				className="quick-button"
				onClicked={() => {
				}}
			>
				<MaterialIcon icon="local_cafe" size="25" />
			</button>
		</box>

	</box >
} 
