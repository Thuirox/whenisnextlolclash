import { selectNextClash, selectPreviousClash } from './state'

function setupControls (): void {
  window.addEventListener('keydown', onKeyDown, false)

  const sideButtonNext = document.getElementById('next')
  sideButtonNext.onclick = () => {
    selectNextClash()
  }
  const sideButtonPrevious = document.getElementById('previous')
  sideButtonPrevious.onclick = () => {
    selectPreviousClash()
  }
}

function onKeyDown (event: KeyboardEvent): void {
  switch (event.key) {
    case 'ArrowLeft':
      selectPreviousClash()
      break

    case 'ArrowRight':
      selectNextClash()
      break
  }
}

export { setupControls }
