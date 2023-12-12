import { type ClashData } from './state'

function capitalizeFirstLetter (str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function displayClashData (clashData: ClashData): void {
  console.log(clashData)

  function getLabel (str: string): string {
    return str.split('_')
      .map((str) => capitalizeFirstLetter(str))
      .join(' ')
  }

  const title = getLabel(clashData.nameKey)
  const subtitle = getLabel(clashData.nameKeySecondary)

  const startTime = new Date(clashData.schedule[0].startTime)
  const date = startTime.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  const time = startTime.toLocaleTimeString(undefined, { timeZoneName: 'shortOffset', hour: '2-digit', minute: '2-digit' })

  console.log({ title, subtitle, date, time })
}

export {
  displayClashData
}
