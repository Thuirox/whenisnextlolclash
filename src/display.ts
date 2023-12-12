import { type ClashData } from './state'

const container = document.getElementById('data-display')
const title = document.getElementById('clash-title')
const subtitle = document.getElementById('clash-subtitle')
const date = document.getElementById('clash-date')
const time = document.getElementById('clash-time')

const displayHtml = {
  title,
  subtitle,
  date,
  time,
  container
}

function capitalizeFirstLetter (str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function displayClashData (clashData: ClashData): void {
  container.style.display = 'block'

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

  displayHtml.title.innerHTML = title
  displayHtml.subtitle.innerHTML = subtitle
  displayHtml.date.innerHTML = date
  displayHtml.time.innerHTML = time
}

function hideClashDisplay (): void {
  displayHtml.container.style.display = 'none'
}

export {
  displayClashData,
  hideClashDisplay
}
