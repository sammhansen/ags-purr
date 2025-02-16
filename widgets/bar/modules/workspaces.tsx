import Hyprland from "gi://AstalHyprland";
import { bind } from "astal";

export default function WorkSpaces() {
  const hypr = Hyprland.get_default();

  return (
    <box cssName="workspaces">
      {bind(hypr, "focusedWorkspace").as((focused) => {
        const start = Math.floor((focused.id - 1) / 10) * 10 + 1;
        const workspaces = Array.from({ length: 10 }, (_, i) => start + i);

        return workspaces.map((index) => (
          <button
            vexpand={false}
            onClicked={() => hypr.dispatch("workspace", index.toString())}
            cssClasses={bind(hypr, "workspaces").as((ws) => [
              focused.id === index
                ? "focused"
                : ws.some((w) => w.id === index)
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

