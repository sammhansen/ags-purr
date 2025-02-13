import { App } from "astal/gtk4"
import style from "./scss/style.scss"
import Bar from "./widgets/bar/bar"

App.start({
  css: style,
  main() {
    App.get_monitors().map(Bar)
  },
})
