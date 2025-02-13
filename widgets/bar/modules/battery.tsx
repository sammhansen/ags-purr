import { Gtk } from "astal/gtk4"
import { bind } from "astal"
import Battery from "gi://AstalBattery"

export default function BatteryLevel() {
  const bat = Battery.get_default()

  return (
    <box cssName="Battery" visible={bind(bat, "isPresent")}>
      <box
        vexpand={true}
        cssName="batt-container"
        overflow={Gtk.Overflow.HIDDEN}
        widthRequest={100}
      // heightRequest={1}
      >
        <box
          cssName="batt-bar"
          widthRequest={bind(bat, "percentage").as(p => Math.floor(p * 100))}
        />
      </box>

      <label
        cssName="batt-percentage-text"
        label={bind(bat, "percentage").as(p =>
          `${Math.floor(p * 100)}`
        )}
      />
    </box>
  );
}

