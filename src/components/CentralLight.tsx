
import { useFrame, useLoader } from '@react-three/fiber'
import { useRef } from 'react'
import { HemisphereLight, LinearFilter, SRGBColorSpace, SpotLight, TextureLoader, Vector3 } from 'three'
import { useClashData } from '../providers/ClashDataProvider'

import { useMotionValue, useMotionValueEvent, useSpring } from "framer-motion"

const HEMISPHERE_INTENSITY = 0.1
const SPOTLIGHT_INTENSITY = 10

function CentralLight() {
  const texture = useLoader(TextureLoader, '/assets/disturbLight.jpg')
  texture.minFilter = LinearFilter
  texture.magFilter = LinearFilter
  texture.colorSpace = SRGBColorSpace

  const spotLightRef = useRef<SpotLight>(null)
  const hemisphereLightRef = useRef<HemisphereLight>(null)

  const { isLoading } = useClashData()

  const dimerValue = useMotionValue(1)
  isLoading ? dimerValue.set(0) : dimerValue.set(1)

  const springValue = useSpring(dimerValue, {
    duration: 600,
    bounce: 0
  })

  useMotionValueEvent(springValue, "change", (value) => {
    if (spotLightRef.current != null) {
      spotLightRef.current.intensity = value * SPOTLIGHT_INTENSITY
    }
    if (hemisphereLightRef.current != null) {
      hemisphereLightRef.current.intensity = value * HEMISPHERE_INTENSITY
    }
  })

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() / 10

    if (spotLightRef.current != null) {
      spotLightRef.current.position.x = Math.cos(time) * 2.5
      spotLightRef.current.position.z = Math.sin(time) * 2.5
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
