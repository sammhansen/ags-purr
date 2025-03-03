import { App } from "astal/gtk3"
import style from "./scss/style.scss"
import Bar from "./widgets/bar/bar"
import NotificationPopups from "./widgets/notifications/NotificationPopups"
import OSD from "./widgets/osd/osd"
import MprisPlayers from "./widgets/player/player"
import SideLeft from "./widgets/sideleft/Main"
import SideRight from "./widgets/sideright/Main"

App.start
	({
		css: style,
		main() {
			App.get_monitors().map(Bar)
			OSD()
			NotificationPopups()
			MprisPlayers()
			SideLeft()
			SideRight()
		},
	})
