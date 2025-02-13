import { bind } from "astal"
import AstalTray from "gi://AstalTray"

export default function SysTray() {
  const tray = AstalTray.get_default()

  return <box cssName="SysTray">
    {bind(tray, "items").as(items => items.map(item => (
      <menubutton
        tooltipMarkup={bind(item, "tooltipMarkup")}
        // usePopover={false}
        actionGroup={bind(item, "actionGroup").as(ag => ["dbusmenu", ag])}
        menuModel={bind(item, "menuModel")}
      >
        <image gicon={bind(item, "gicon")} />
      </menubutton>
    )))}
  </box>
}

