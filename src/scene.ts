import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'
import { getClashIdFromMeshLoL, selectClash, state, unselectCurrentClash } from './state'
import Stats from 'three/examples/jsm/libs/stats.module.js'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
import { type MeshLoL } from './lib/LOLLoader'

let controls: OrbitControls
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let light: THREE.HemisphereLight
let spotlight: THREE.SpotLight

let composer: EffectComposer
let outlinePass: OutlinePass
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

let stats: Stats

const clock = new THREE.Clock()

function setupScene (): void {
  state.scene = new THREE.Scene()
  const canvas = document.getElementById('canvas3D')

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    100,
    2000
  )
  camera.position.set(100, 200, 700)

  const textureLoader = new THREE.TextureLoader()
  textureLoader.load('assets/bg.png', function (texture) {
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      // side: THREE.DoubleSide,
      depthWrite: true
    })
    state.ground = new THREE.Mesh(new THREE.CircleGeometry(300, 100), material)
    state.ground.rotation.x = -Math.PI / 2
    state.ground.receiveShadow = true
    // scene.add(ground);
  })

  light = new THREE.HemisphereLight(0xffffff, 0x444444, 0.05)
  light.position.set(0, 400, 0)
  state.scene.add(light)

  const loader = new THREE.TextureLoader()
  const texture = loader.load('assets/disturbLight.jpg')
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.colorSpace = THREE.SRGBColorSpace

  spotlight = new THREE.SpotLight(0xffffff, 10, 0, undefined, undefined, 0)
  spotlight.position.set(0, 400, 100)
  spotlight.shadow.camera.far = 5000
  spotlight.shadow.mapSize.width = 1024
  spotlight.shadow.mapSize.height = 1024
  spotlight.castShadow = true
  spotlight.map = texture
  state.scene.add(spotlight)

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  renderer.domElement.addEventListener('pointermove', onPointerMove)
  renderer.domElement.addEventListener('pointerup', onPointerUp)

  onWindowResize()

  controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 100, 0)
  controls.enablePan = false
  controls.enableZoom = false
  controls.autoRotate = true
  controls.update()

  window.addEventListener('resize', onWindowResize, false)

  stats = new Stats()
  document.body.appendChild(stats.dom)

  setupPostProcessing()
}

function onWindowResize (): void {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate (): void {
  requestAnimationFrame(animate)
  const delta = clock.getDelta()
  renderer.render(state.scene, camera)
  controls.update(delta)
  stats.update()

  Object.keys(state.clashes).forEach((clashId) => {
    const { champion } = state.clashes[clashId]

    champion.mesh?.userData.model.update(clock.getElapsedTime() * 1000)
  })

  const time = clock.getElapsedTime() / 10
  spotlight.position.x = Math.cos(time) * 2.5
  spotlight.position.z = Math.sin(time) * 2.5
  composer.render()
}

function focusClash (clashId: string): void {
  const { champion } = state.clashes[clashId]

  const cameraPosition = new THREE.Vector3(
    0 - champion.mesh?.position.x,
    champion.mesh?.position.y + 100,
    0 - champion.mesh?.position.z
  )

  camera.position.copy(cameraPosition)
  controls.target = champion.mesh?.position.clone().add(new THREE.Vector3(0, 200, 0))
  controls.update()
}

function resetCamera (): void {
  camera.position.set(100, 200, 700)
  controls.target = new THREE.Vector3(0, 100, 0)
  controls.update()
}

function setupPostProcessing (): void {
  composer = new EffectComposer(renderer)

  const renderPass = new RenderPass(state.scene, camera)
  composer.addPass(renderPass)

  outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), state.scene, camera)
  outlinePass.visibleEdgeColor = new THREE.Color('rgb(121, 98, 57)')
  composer.addPass(outlinePass)

  const outputPass = new OutputPass()
  composer.addPass(outputPass)
}

function onPointerMove (event: PointerEvent): void {
  if (!event.isPrimary) return

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

  checkIntersection()
}

function onPointerUp (event: PointerEvent): void {
  if (!event.isPrimary) return

  const meshLoL = checkIntersection()

  const clashId = getClashIdFromMeshLoL(meshLoL)

  if (clashId != null) {
    selectClash(clashId)
  } else {
    unselectCurrentClash()
  }
}

function checkIntersection (): MeshLoL | undefined {
  function getIntersected (intersects: Array<THREE.Intersection<MeshLoL>>): MeshLoL[] {
    if (intersects.length > 0) {
      const intersectedObject = intersects[0].object

      if (intersectedObject === state.ground) {
        return []
      }

      if (state.currentClashId != null) {
        return []
      }

      return [intersectedObject]
    } else {
      return []
    }
  }
  raycaster.setFromCamera(mouse, camera)

  const intersects = raycaster.intersectObject<MeshLoL>(state.scene, true)

  const intersected = getIntersected(intersects)

  outlinePass.selectedObjects = intersected
  document.body.style.cursor = intersected.length > 0 ? 'pointer' : 'default'

  return intersected[0]
}

export { setupScene, animate, focusClash, resetCamera, checkIntersection }
