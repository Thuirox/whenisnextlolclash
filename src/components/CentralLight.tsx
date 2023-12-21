
import { useFrame, useLoader } from '@react-three/fiber'
import { useRef } from 'react'
import { HemisphereLight, LinearFilter, SRGBColorSpace, SpotLight, TextureLoader, Vector3 } from 'three'

import { easeInOut, useAnimate, useMotionValue, useMotionValueEvent } from "framer-motion"

const HEMISPHERE_INTENSITY = 0.1
const SPOTLIGHT_INTENSITY = 10

function CentralLight({ isLoading }: { isLoading: boolean }) {
  const texture = useLoader(TextureLoader, '/assets/disturbLight.jpg')
  texture.minFilter = LinearFilter
  texture.magFilter = LinearFilter
  texture.colorSpace = SRGBColorSpace

  const spotLightRef = useRef<SpotLight>(null)
  const hemisphereLightRef = useRef<HemisphereLight>(null)

  const [, animate] = useAnimate()
  const dimerValue = useMotionValue(0)
  const targetDimerValue = isLoading ? 0 : 1

  animate(dimerValue, targetDimerValue, { duration: 0.5, ease: easeInOut })
  useMotionValueEvent(dimerValue, "change", (value) => {
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
