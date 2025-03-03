import Hyprland from "gi://AstalHyprland";
import { bind } from "astal";

export default function WorkSpaces() {
	const hypr = Hyprland.get_default();

	return (
		<box vertical hexpand={true} className="workspaces">
			{bind(hypr, "focusedWorkspace").as((focused) => {
				const start = Math.floor((focused.id - 1) / 10) * 10 + 1;
				const workspaces = Array.from({ length: 10 }, (_, i) => start + i);

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

