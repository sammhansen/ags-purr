import { Gtk } from "astal/gtk3";
import { App } from "astal/gtk3";
import { bind } from "astal";
import Mpris from "gi://AstalMpris";
import { WINDOW_NAME as MEDIA_PLAYER } from "../../player/player";

export default function Media() {
  const mpris = Mpris.get_default()

  return <box className="Media">
    {bind(mpris, "players").as(ps => ps[0] ? (
      <box
        className="mpris_onbar"
      // onClick={() => App.toggle_window(MEDIA_PLAYER)}
      >
        <button
          className="Cover"
          valign={Gtk.Align.CENTER}
          label="♪"
          onClick={() => App.toggle_window(MEDIA_PLAYER)}
        />
        <label
          label={bind(ps[0], "title").as(() =>
            `${ps[0].title} - ${ps[0].artist}`
          )}
        />
      </box>
    ) : (
      "No Media"
    ))}
  </box>
}
