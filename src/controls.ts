function setupControls (): void {
  window.addEventListener('keydown', onKeyDown, false)

  const sideButtonNext = document.getElementById('next')
  sideButtonNext.onclick = () => {
    console.log('Side Button Next Clicked')
  }
  const sideButtonPrevious = document.getElementById('previous')
  sideButtonPrevious.onclick = () => {
    console.log('Side Button Previous Clicked')
  }
}

function onKeyDown (event: KeyboardEvent): void {
  console.log(`Key pressed: ${event.key}`)
}

export { setupControls }
