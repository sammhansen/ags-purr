import { MaterialIcon } from "../custom/materialicon"
import { execAsync } from "astal/process"

export function QuickToggles() {
	return <box>
		<box>
			<button
				className="quick-toggles-button"
				onClicked={() => {
				}}
			>
				<MaterialIcon icon="notifications" size="lg" />
			</button>
			<button
				className="quick-toggles-button"
				onClicked={() => {
				}}
			>
				<MaterialIcon icon="brand_awareness" size="lg" />
			</button>
			<button
				className="quick-toggles-button"
				onClicked={() => {
				}}
			>
				<MaterialIcon icon="bluetooth" size="lg" />
			</button>
			<button
				className="quick-toggles-button"
				onClicked={() => {
				}}
			>
				<MaterialIcon icon="signal_wifi_4_bar" size="lg" />
			</button>
		</box>
	</box>
} 
