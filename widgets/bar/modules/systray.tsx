import { bind } from "astal";
import { hook } from "astal/gtk4";
import AstalTray from "gi://AstalTray";

export default function SysTray() {
  const tray = AstalTray.get_default();

  return (
    <box cssName="SysTray">
      {bind(tray, "items").as(items =>
        items.map(item => (
          <menubutton
            tooltipMarkup={bind(item, "tooltipMarkup")}
            menuModel={bind(item, "menuModel")}
            setup={self => {
              hook(self, item, "notify::action-group", () => {
                if (item.action_group) {
                  self.insert_action_group("dbusmenu", item.action_group);
                }
              });
              if (item.action_group) {
                self.insert_action_group("dbusmenu", item.action_group);
              }
            }}
          >
            <image gicon={bind(item, "gicon")} />
          </menubutton>
        ))
      )}
    </box>
  );
}

