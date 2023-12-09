const navigator = document.getElementById('navigator')
let current: HTMLDivElement | null = null

function addNavigationButton (clashId: number): void {
  const button = document.createElement('div')
  button.classList.add('navigator-button')

  const inner = document.createElement('div')
  inner.classList.add('navigator-button-inner')

  button.appendChild(inner)
  button.id = getNodeId(clashId)

  button.onclick = () => {
    if (current == null) {
      button.classList.add('selected')
    } else {
      if (current.id === button.id) {
        button.classList.toggle('selected')
      } else {
        current.classList.remove('selected')

        button.classList.add('selected')
      }
    }
    current = button
    // Add event dispatcher or call to tell what's turned on. !about toggle
  }

  navigator.appendChild(button)
}

function getNodeId (clashId: number): string {
  return `nav-node-${clashId}`
}

export {
  addNavigationButton
}
