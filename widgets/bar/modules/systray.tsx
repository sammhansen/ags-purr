import { App } from "astal/gtk3"
import { Variable, GLib, bind } from "astal"
import { Astal, Gtk, Gdk } from "astal/gtk3"
import Hyprland from "gi://AstalHyprland"
import Mpris from "gi://AstalMpris"
import Battery from "gi://AstalBattery"
import Wp from "gi://AstalWp"
import Network from "gi://AstalNetwork"
import Tray from "gi://AstalTray"
import { MaterialIcon } from "../../custom/MaterialIcon"
import { SideRight } from "../../sideright/Main"

export default function SysTray() {
	const tray = Tray.get_default()

	return <box vertical className="SysTray">
		<button
			className="notif-icon-button"
			onClicked={() => {
				App.toggle_window(SideRight);
			}}
		>
			<MaterialIcon icon="notifications" />
		</button>
		{bind(tray, "items").as(items => items.map(item => (
			<menubutton
				tooltipMarkup={bind(item, "tooltipMarkup")}
				usePopover={false}
				actionGroup={bind(item, "actionGroup").as(ag => ["dbusmenu", ag])}
				menuModel={bind(item, "menuModel")}>
				<icon gicon={bind(item, "gicon")} />
			</menubutton>
		)))}
	</box>
}

