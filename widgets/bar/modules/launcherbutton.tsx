export default function LauncherButton(): JSX.Element {
  return <button
    cssName="launcher_button"
    onClicked="rofi -show drun -show-icons -run-command 'uwsm app -- {cmd}' -theme ~/.config/rofi/themes/default.rasi"
  >
    <label
      cssName="launcher_label"
      label=" "
    />
  </button>
}
