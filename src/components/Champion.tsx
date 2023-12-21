import { useEffect, useState } from "react"
import { LOLLoader } from "../lib/LOLLoader"
import { useFrame } from "@react-three/fiber"
import { Select } from "@react-three/postprocessing"
import { ChampionConfig } from "../data/scenes"
import { Vector3 } from "three"
import { suspend } from "suspend-react"
import { useLoading } from "../providers/LoadingProvider"

interface ChampionProps extends ChampionConfig {
  isStatic?: boolean
  enableTexture?: boolean
  isDisabled?: boolean
  onClick: () => void
}

function Champion({ championKey, skinIndex, enableTexture = false, setFrame, animName, position, rotation, onClick, isDisabled = false, animationSpeed = 700 }: ChampionProps) {
  const [hovered, setHovered] = useState(false)

  const { setCounter } = useLoading()

  const model = suspend(async () => {
    setCounter(c => c + 1)

    const loader = new LOLLoader()
    const model = await loader.load(championKey, skinIndex, { enableTexture, setFrame, animName })

    animName ? model.setAnimation(animName) : model.setDefaultAnimation()
    setCounter(c => c - 1)
    return model
  }, [animName, championKey, enableTexture, setFrame, skinIndex])

  useEffect(() => {
    if (!isDisabled) document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered, isDisabled])

  useFrame(({ clock }) => {
    if (model != null) model.update(clock.getElapsedTime() * animationSpeed)
  })

  return (
    <Select enabled={!isDisabled && hovered}>
      <mesh
        position={new Vector3(position.x, position.y, position.z)}
        rotation-x={rotation.x}
        rotation-y={rotation.y}
        rotation-z={rotation.z}
        material={model.material}
        geometry={model.geometry}
        receiveShadow
        castShadow
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={() => {
          if (!isDisabled) onClick()
        }}
      />
    </Select>
  )
}


export default Champion
