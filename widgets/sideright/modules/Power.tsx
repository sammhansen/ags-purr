import { App, Gtk } from "astal/gtk3"
import { execAsync } from "astal/process"
import { MaterialIcon } from "../../custom/MaterialIcon"
import { SideRight } from "../Main"
import { SideLeft } from "../../sideleft/Main"

export default function() {
	return <box
		vertical={false}
		className="row"
		halign={Gtk.Align.CENTER}>
		<button
			className="systemMenuIconButton"
			onClicked={() => {
				App.toggle_window(SideLeft)
				App.toggle_window(SideRight)
				execAsync(["bash", "-c", "loginctl terminate-session $(loginctl session-status | head -n1 | cut -d' ' -f1)"])
			}}
		>
			<MaterialIcon icon="door_open" size="lg" />
		</button>
		<button
			className="systemMenuIconButton"
			onClicked={() => {
				App.toggle_window(SideLeft)
				App.toggle_window(SideRight)
				execAsync("loginctl lock-session")
			}}
		>
			<MaterialIcon icon="lock" size="lg" />
		</button>
		<button
			className="systemMenuIconButton"
			onClicked={() => {
				App.toggle_window(SideLeft)
				App.toggle_window(SideRight)
				execAsync("systemctl reboot")
			}}
		>
			<MaterialIcon icon="restart_alt" size="lg" />
		</button>
		<button
			className="systemMenuIconButton"
			onClicked={() => {
				App.toggle_window(SideLeft)
				App.toggle_window(SideRight)
				execAsync("systemctl poweroff")
			}}
		>
			<MaterialIcon icon="power_settings_new" size="lg" />
		</button>
	</box>
}
