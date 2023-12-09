import { selectClash, unselectClash } from './state'

const navigator = document.getElementById('navigator')
let current: HTMLDivElement | null = null

function unselectNavigationButton (clashId: string): void {
  const button = document.getElementById(getNodeId(clashId)) as HTMLDivElement

  button.classList.remove('selected')
  current = null
}

function selectNavigationButton (clashId: string): void {
  const button = document.getElementById(getNodeId(clashId)) as HTMLDivElement

  if (current != null) {
    current.classList.remove('selected')
  }

  button.classList.add('selected')
  current = button
}

function addNavigationButton (clashId: string): void {
  const button = document.createElement('div')
  button.classList.add('navigator-button')

  const inner = document.createElement('div')
  inner.classList.add('navigator-button-inner')

  button.appendChild(inner)
  button.id = getNodeId(clashId)

  button.onclick = () => {
    if (current == null) {
      selectClash(clashId)
    } else {
      if (current.id === button.id) {
        const isSelected = button.classList.contains('selected')

        if (isSelected) {
          unselectClash(clashId)
        } else {
          selectClash(clashId)
        }
      } else {
        selectClash(clashId)
      }
    }
  }

  navigator.appendChild(button)
}

function getNodeId (clashId: string): string {
  return `nav-node-${clashId}`
}

export {
  addNavigationButton,
  selectNavigationButton,
  unselectNavigationButton
}
