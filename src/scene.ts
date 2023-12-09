import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'
import { state } from './state'
import Stats from 'three/examples/jsm/libs/stats.module.js'

let controls: OrbitControls
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let light: THREE.HemisphereLight
let spotlight: THREE.SpotLight

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

  onWindowResize()

  controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 100, 0)
  controls.enablePan = false
  controls.enableZoom = false
  controls.autoRotate = true
  controls.update()

  window.addEventListener('resize', onWindowResize, false)

  stats = new Stats()
  // document.body.appendChild(stats.dom)
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

export { setupScene, animate, focusClash, resetCamera }
