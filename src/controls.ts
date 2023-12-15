import { selectNextClash, selectPreviousClash, unselectCurrentClash } from './state'

const sideButtonNext = document.getElementById('next')
const sideButtonPrevious = document.getElementById('previous')

function showSideButtons (): void {
  sideButtonNext.style.display = 'block'
  sideButtonPrevious.style.display = 'block'
}

function hideSideButtons (): void {
  sideButtonNext.style.display = 'none'
  sideButtonPrevious.style.display = 'none'
}

function setupControls (): void {
  window.addEventListener('keydown', onKeyDown, false)

  sideButtonNext.onclick = () => {
    selectNextClash()
  }
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

    case 'Escape':
      unselectCurrentClash()
      break
  }
}

export {
  setupControls,
  showSideButtons,
  hideSideButtons
}
