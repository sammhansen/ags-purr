import Hyprland from "gi://AstalHyprland";
import { bind } from "astal";
import { Gtk } from "astal/gtk3"

export default function WorkSpaces() {
	const hypr = Hyprland.get_default();

	return (
		<box vertical hexpand={true} className="workspaces">
			{bind(hypr, "focusedWorkspace").as((focused) => {
				const workspaces = Array.from({ length: 7 }, (_, i) => i + 1); // fixed 1-7

				return workspaces.map((index) => (
					<box>
						<box hexpand />
						<button
							onClicked={() => hypr.dispatch("workspace", index.toString())}
							className={bind(hypr, "workspaces").as((ws) =>
								[
									focused.id === index
										? "focused"
										: ws.some((w) => w.id === index)
											? "occupied"
											: "default",
								].join(" ")
							)}
						>
							{index}
						</button>
						<box hexpand />
					</box>
				));
			})}
		</box>
	);
}

