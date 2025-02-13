import { App, Astal, Gtk, Gdk } from "astal/gtk4"
import { Variable } from "astal"
import LauncherButton from "./modules/launcherbutton"
import Time from "./modules/time"
import Media from "./modules/media"
import WorkSpaces from "./modules/workspaces"
import SystemTray from "./modules/systray"
import BatteryLevel from "./modules/battery"

const time = Variable("").poll(1000, "date")

const AnchorLeft = (
  < box
    spacing={8}
    hexpand
    halign={Gtk.Align.START}
  >
    <LauncherButton />
    <Time />
    <Media />
  </box>
);

const AnchorCenter = (
  <box
    spacing={8}
    hexpand
    halign={Gtk.Align.CENTER}
  >
    <WorkSpaces />
  </box>
);

const AnchorRight = (
  <box
    spacing={8}
    hexpand
    halign={Gtk.Align.END}
  >
    <SystemTray />
    <BatteryLevel />
  </box>
);

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

  return <window
    visible
    cssClasses={["Bar"]}
    gdkmonitor={gdkmonitor}
    exclusivity={Astal.Exclusivity.EXCLUSIVE}
    anchor={TOP | LEFT | RIGHT}
    application={App}
  >
    <box
      cssName="box_bg"
    >
      <centerbox
        hexpand
        cssName="centerbox"
        start_widget={AnchorLeft}
        center_widget={AnchorCenter}
        end_widget={AnchorRight}
      />
    </box>
  </window>
}
