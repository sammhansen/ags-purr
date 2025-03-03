import { Gtk } from "astal/gtk3"
import { Avatar } from "./Avatar"
import { MaterialIcon } from "../../../../custom/materialicon"

export function Profile() {
	return <box
		className="profile-parent-box"
		vertical={true}
	>
		<box
			className="avatar-parent-box"
		>
			<box
				className="avatar-box"
			>
				<Avatar />
			</box>
			<box
				className="welcome-box"
				vertical={true}
			>
				<label label="Welcome Hansen" />
				<label label="Up 46 minutes" />
			</box>
		</box>
		<box
			className="sessions-parent-box"
		>
			<box
				className="sessions-box"
				halign={Gtk.Align.CENTER}
			>
				<button
					className="material-session-button"
					onClicked={() => {
						App.toggle_window(DashboardWindowName)
						execAsync(["bash", "-c", "loginctl terminate-session $(loginctl session-status | head -n1 | cut -d' ' -f1)"])
					}}
				>
					<MaterialIcon icon="door_open" size="lg" />
				</button>
				<button
					className="material-session-button"
					onClicked={() => {
						App.toggle_window(DashboardWindowName)
						execAsync("loginctl lock-session")
					}}
				>
					<MaterialIcon icon="lock" size="lg" />
				</button>
				<button
					className="material-session-button"
					onClicked={() => {
						App.toggle_window(DashboardWindowName)
						execAsync("systemctl reboot")
					}}
				>
					<MaterialIcon icon="restart_alt" size="lg" />
				</button>
				<button
					className="material-session-button"
					onClicked={() => {
						App.toggle_window(DashboardWindowName)
						execAsync("systemctl poweroff")
					}}
				>
					<MaterialIcon icon="power_settings_new" size="lg" />
				</button>

			</box>
		</box>
	</box>
}
