import { useClashData } from "../../providers/ClashDataProvider"
import DisplayBase from "./DisplayBase"

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function getLabel(str: string): string {
  return str.split('_')
    .map((str) => capitalizeFirstLetter(str))
    .join(' ')
}

function BasicDisplay() {
  const { current: clash } = useClashData()

  if (clash != null) {
    const title = getLabel(clash.nameKey)
    const subtitle = getLabel(clash.nameKeySecondary)

    const startTime = new Date(clash.schedule[0].startTime)
    const date = startTime.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    const time = startTime.toLocaleTimeString(undefined, { timeZoneName: 'shortOffset', hour: '2-digit', minute: '2-digit' })

    return (
      <DisplayBase>
        <p style={{ fontSize: '16px', paddingBottom: '10px' }}>
          {title} {subtitle}
        </p>

        <p>
          {date}, {time}
        </p>
      </DisplayBase>
    )
  }
}

export default BasicDisplay
