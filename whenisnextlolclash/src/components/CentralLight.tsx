
import { useFrame, useLoader } from '@react-three/fiber'
import { useRef } from 'react'
import { HemisphereLight, LinearFilter, SRGBColorSpace, SpotLight, TextureLoader, Vector3 } from 'three'
import { useClashData } from '../providers/ClashDataProvider'
import { lerp } from '../utils'

const HEMISPHERE_INTENSITY = 0.1

function CentralLight() {
  const { isLoading } = useClashData()
  const texture = useLoader(TextureLoader, '/assets/disturbLight.jpg')
  texture.minFilter = LinearFilter
  texture.magFilter = LinearFilter
  texture.colorSpace = SRGBColorSpace

  const spotLightRef = useRef<SpotLight>(null)
  const hemisphereLightRef = useRef<HemisphereLight>(null)

  useFrame(({ clock }) => {
    if (spotLightRef.current != null) {
      const time = clock.getElapsedTime() / 10
      spotLightRef.current.position.x = Math.cos(time) * 2.5
      spotLightRef.current.position.z = Math.sin(time) * 2.5

      const currentIntensity = spotLightRef.current.intensity
      const targetIntensity = isLoading ? 0 : 10

      const intensity = lerp(currentIntensity, targetIntensity, 0.05)
      spotLightRef.current.intensity = intensity
    }

    if (hemisphereLightRef.current != null) {
      const currentIntensity = hemisphereLightRef.current.intensity
      const targetIntensity = isLoading ? 0 : HEMISPHERE_INTENSITY

      const intensity = lerp(currentIntensity, targetIntensity, 0.05)
      hemisphereLightRef.current.intensity = intensity
    }
  })

  return (
    <>
      <hemisphereLight
        ref={hemisphereLightRef}
        groundColor={0x444444}
        color={0xffffff}
        intensity={0}
        position={new Vector3(0, 400, 0)} />

      <spotLight
        ref={spotLightRef}
        color={0xffffff}
        intensity={0}
        penumbra={0}
        decay={0}
        position={new Vector3(0, 400, 100)}
        shadow-camera-far={5000}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        castShadow
        map={texture} />
    </>
  )
}

export default CentralLight
