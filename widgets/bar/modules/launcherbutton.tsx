import { App, Gtk } from "astal/gtk3";
import { SideLeft } from "./../../sideleft/Main";
import { MaterialIcon } from "../../custom/MaterialIcon";

export default function LauncherButton(): JSX.Element {
	return (
		<box
			vertical
			// widthRequest={200}
			className="Battery"
		// visible={bind(bat, "isPresent")}
		>
			<box hexpand />
			<box
				className="batt-container"
				hexpand
				halign={Gtk.Align.CENTER}
				heightRequest={40}
				widthRequest={40}
			>
				<button
					className="batt-bar"
					hexpand={true}
					onClicked={() => {
						App.toggle_window(SideLeft);
					}}
					valign={Gtk.Align.END} // Align to bottom
					heightRequest={20}
					widthRequest={20}
					child=<MaterialIcon icon="grass" size="5" />
				/>
			</box>
			<box hexpand />
		</box>
	);

}
