import { loadScene } from './libIndex'
import { loadingOverlay, state, unselectCurrentClash } from './state'
import { resetNavigator } from './navigator'
import { resetScene } from './scene'
import { getClashData } from './clashData'
import { hideClashDisplay } from './display'

function initRegion (): void {
  // Setup regions
  const valueRegion = document.getElementById('value-region')
  const dropdownRegion = document.getElementById('dropdown-region')

  function selectRegion (region: string): void {
    valueRegion.innerHTML = region

    loadingOverlay.show()

    hideClashDisplay()
    resetScene()
    if (state.currentClashId != null) {
      unselectCurrentClash()
    }
    resetNavigator()
    state.clashes = {}

    void getClashData(region).then(clashData => {
      void loadScene(clashData)
    })
  }

  for (const child of dropdownRegion.children) {
    child.addEventListener('click', function (e) {
      const element = e.target as HTMLElement
      const newValue = element.innerText
      selectRegion(newValue)
    })
  }
}

export function initDropdown (): void {
  initRegion()
}
