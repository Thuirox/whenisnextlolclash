import { loadScene } from './libIndex'
import { state } from './state'
import { resetNavigator } from './navigator'
import { resetCamera, resetScene } from './scene'
import { getClashData } from './clashData'

function initTimezone (): void {
  // Setup timezones
  const valueTimezone = document.getElementById('value-timezone')
  const dropdownTimezone = document.getElementById('dropdown-timezone')

  function selectTimezone (timezone: string): void {
    console.log(timezone)
    // Update selector value
    valueTimezone.innerHTML = timezone
    // Update current timezone

  // Update displayed clash
  }

  for (const child of dropdownTimezone.children) {
    child.addEventListener('click', function (e) {
      const element = e.target as HTMLElement
      const newValue = element.innerText
      selectTimezone(newValue)
    })
  }
}

function initRegion (): void {
  // Setup regions
  const valueRegion = document.getElementById('value-region')
  const dropdownRegion = document.getElementById('dropdown-region')

  function selectRegion (region: string): void {
    valueRegion.innerHTML = region
    // Update current region

    resetScene()
    resetCamera()
    resetNavigator()
    state.clashes = {}

    // Reload clash Data
    // Load scene (or no clash found scene)
    void getClashData().then(clashData => {
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
  initTimezone()
  initRegion()
}
