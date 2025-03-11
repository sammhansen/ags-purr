import { Gtk } from "astal/gtk3"

export default function Launcher() {
	return <eventbox
		className="launcher-parent-box"
		marginTop={5}
		halign={Gtk.Align.CENTER}
		onClick="anyrun"
	>
		<label className="launcher-label" label=" " />
	</eventbox>
}
