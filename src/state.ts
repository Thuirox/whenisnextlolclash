import { type MeshLoL } from './lib/LOLLoader'
import * as THREE from 'three'
import { focusClash, resetCamera } from './scene'
import { selectNavigationButton, unselectNavigationButton } from './navigator'
import { displayClashData } from './display'

interface Champion {
  mesh?: MeshLoL
  championKey: string
  skinIndex: number
  index: number
}

type ClashId = string

type ClashRecord = Record<ClashId, Clash>

interface Clash {
  champion: Champion
  clashData: ClashData
}

interface ClashData {
  id: ClashId
  themeId: number
  nameKey: string
  nameKeySecondary: string
  schedule: [
    {
      id: number
      registrationTime: number
      startTime: number
      cancelled: boolean
    }
  ]
}

interface State {
  scene: THREE.Scene
  ground?: THREE.Mesh
  clashes: ClashRecord
  currentClashId?: ClashId
}

const state: State = {
  scene: new THREE.Scene(),
  ground: null,
  clashes: {}
}

const loadingOverlay = {
  obj: document.getElementById('loading'),
  show: () => {
    loadingOverlay.obj.style.display = 'block'
  },
  hide: () => {
    loadingOverlay.obj.style.display = 'none'
  }
}

const demoIndicator = {
  obj: document.getElementById('demo-indicator'),
  show: () => {
    loadingOverlay.obj.style.display = 'block'
  },
  hide: () => {
    loadingOverlay.obj.style.display = 'none'
  }
}

function selectClash (clashId: string): void {
  const { clashData } = state.clashes[clashId]
  displayClashData(clashData)

  focusClash(clashId)
  selectNavigationButton(clashId)

  state.currentClashId = clashId
}

function unselectClash (clashId: string): void {
  resetCamera()
  unselectNavigationButton(clashId)

  state.currentClashId = null
}

function unselectCurrentClash (): void {
  if (state.currentClashId != null) {
    unselectClash(state.currentClashId)
  }
}

function selectClashByStep (step = 1): void {
  const clashIds = Object.keys(state.clashes)

  if (clashIds.length === 0) {
    console.error('No clash found')
    return
  }

  if (clashIds.length === 1) {
    console.warn('Only one clash found')
    return
  }

  if (state.currentClashId == null) {
    const index = step > 0 ? 0 : clashIds.length - 1
    selectClash(clashIds[index])
    return
  }

  const currentIndex = clashIds.findIndex((clashId) => state.currentClashId === clashId)

  if (currentIndex === -1) {
    console.error(`Current clash not found: ${state.currentClashId} ${JSON.stringify(state.clashes)}`)
    return
  }

  const newIndex = (currentIndex + step) % clashIds.length

  if (newIndex === currentIndex) {
    console.warn('Same clash found')
    return
  }

  selectClash(clashIds.at(newIndex))
}

function selectNextClash (): void {
  selectClashByStep()
}

function selectPreviousClash (): void {
  selectClashByStep(-1)
}

function getClashIdFromMeshLoL (meshLoL: MeshLoL): ClashId | undefined {
  const clashIds = Object.keys(state.clashes)

  const index = clashIds.findIndex((clashId) => {
    const clash = state.clashes[clashId]

    return clash.champion.mesh === meshLoL
  })

  return index === -1 ? undefined : clashIds[index]
}

export {
  state,
  type Champion,
  type Clash,
  type ClashData,
  loadingOverlay,
  demoIndicator,
  selectClash,
  unselectClash,
  unselectCurrentClash,
  selectNextClash,
  selectPreviousClash,
  getClashIdFromMeshLoL
}
