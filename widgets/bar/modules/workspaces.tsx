import Hyprland from "gi://AstalHyprland";
import { bind } from "astal";
import { Gtk } from "astal/gtk4";

export default function WorkSpaces() {
  const hypr = Hyprland.get_default();

  return (
    <box cssName="workspaces">
      {bind(hypr, "workspaces").as((ws) => {
        return [...Array(10)]
          .map((_, i) => i + 1)
          .map((index) => (
            <button
              // valign={Gtk.Align.CENTER}
              vexpand={false}
              onClicked={() => hypr.dispatch("workspace", index.toString())}
              cssClasses={bind(hypr, "focusedWorkspace").as((focused) => [
                focused.id === index
                  ? "focused"
                  : ws.find((w) => w.id === index)
                    ? "occupied"
                    : "default",
              ])}
            >
              {index}
            </button>
          ));
      })}
    </box>
  );
}
