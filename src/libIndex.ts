import { LOLLoader, type MeshLoL } from './lib/LOLLoader'
import { type Champion, state, loadingOverlay, type ClashData } from './state'
import { hideSideButtons, setupControls, showSideButtons } from './controls'
import { animate, resetCamera, setupScene } from './scene'
import * as THREE from 'three'
import { type SceneConfig } from './types'
import { clashScenes } from './scenes'
import { addNavigationButton } from './navigator'

const DEFAULT_CHAMPION_KEY = '266'
const DEFAULT_SKIN_INDEX = 0

let championCounter: number = 0

function getNewChampion (): Champion {
  championCounter += 1

  return {
    championKey: DEFAULT_CHAMPION_KEY,
    skinIndex: DEFAULT_SKIN_INDEX,
    index: championCounter
  }
}

function getSceneConfig (nbChampions: number): SceneConfig {
  if (nbChampions in clashScenes) {
    return clashScenes[nbChampions]
  }

  console.info(`Scene not found for ${nbChampions} champion${nbChampions > 1 ? 's' : ''}`)
  return clashScenes.oops
}

export async function loadScene (clashData: ClashData[]): Promise<void> {
  const sceneConfig = getSceneConfig(clashData.length)

  const { champions, resetCamera: resetCamera_, disableRotation } = sceneConfig

  if (champions.length > 1) {
    showSideButtons()
  } else {
    hideSideButtons()
  }

  if (resetCamera_) {
    resetCamera()
  }

  state.controls.autoRotate = !disableRotation

  const promises = champions.map(async ({ championKey, skinIndex, position, rotation, setFrame, animName }, index) => {
    const champion = await loadChampionConfig(
      championKey,
      skinIndex,
      new THREE.Vector3(position.x, position.y, position.z),
      new THREE.Vector3(rotation.x, rotation.y, rotation.z),
      setFrame,
      animName
    )

    const clash = clashData[index]

    state.clashes[clash.id] = {
      champion,
      clashData: clash
    }

    if (champions.length > 1) addNavigationButton(clash.id.toString())
  })

  await Promise.all(promises)
}

export async function init (clashList: ClashData[]): Promise<void> {
  setupScene()
  setupControls()

  loadingOverlay.show()

  await loadScene(clashList)

  animate()
}

export async function initMeshChampion (championKey: string, skinIndex: number, position: THREE.Vector3 = new THREE.Vector3(0, 0, 0), rotation: THREE.Vector3 = new THREE.Vector3(0, 0, 0), setFrame?: number, animName?: string): Promise<MeshLoL> {
  const loader = new LOLLoader()

  const meshLol = await loader.load(championKey, skinIndex, { static: false, enableTexture: false, setFrame, animName })

  meshLol.position.copy(position)
  meshLol.rotation.set(rotation.x, rotation.y, rotation.z)
  state.scene.add(meshLol)
  loadingOverlay.hide()

  return meshLol
}

async function loadChampionConfig (championKey: string, skinIndex: number, position: THREE.Vector3, rotation: THREE.Vector3, setFrame?: number, animName?: string): Promise<Champion> {
  const { index } = getNewChampion()

  const mesh = await initMeshChampion(championKey, skinIndex, position, rotation, setFrame, animName)

  const champion: Champion = {
    championKey,
    skinIndex,
    mesh,
    index
  }

  return champion
}
