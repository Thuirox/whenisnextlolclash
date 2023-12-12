import { loadScene } from './libIndex'
import { loadingOverlay, state } from './state'
import { resetNavigator } from './navigator'
import { resetCamera, resetScene } from './scene'
import { getClashData } from './clashData'

function initRegion (): void {
  // Setup regions
  const valueRegion = document.getElementById('value-region')
  const dropdownRegion = document.getElementById('dropdown-region')

  function selectRegion (region: string): void {
    valueRegion.innerHTML = region

    loadingOverlay.show()

    resetScene()
    resetCamera()
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
