import { useEffect, useMemo, useState } from "react"
import { LOLLoader, Model } from "../lib/LOLLoader"
import { useFrame } from "@react-three/fiber"
import { Select } from "@react-three/postprocessing"
import { ChampionConfig } from "../data/scenes"
import { Vector3 } from "three"

interface ChampionProps extends ChampionConfig {
  isStatic?: boolean
  enableTexture?: boolean
  isDisabled?: boolean
  onClick: () => void
}

function getAnimations(model: Model, isStatic: boolean, animName?: string) {
  let animations = model.getAnimations()

  if (animations == null) {
    animations = ["default"]
  } else {
    animations.sort()
    animations.unshift("default")
  }

  if (!isStatic) {
    animName ? model.setAnimation(animName) : model.setDefaultAnimation();
  }
}

function Champion({ championKey, skinIndex, isStatic = false, enableTexture = false, setFrame, animName, position, rotation, onClick, isDisabled = false, animationSpeed = 700 }: ChampionProps) {
  const [model, setModel] = useState<Model>()
  const [hovered, setHovered] = useState(false)
  // console.log('render', championKey)

  useEffect(() => {
    if (!isDisabled) document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered, isDisabled])

  useFrame(({ clock }) => {
    if (model != null) model.update(clock.getElapsedTime() * animationSpeed)
  })

  useEffect(() => {
    async function loadModel() {
      // console.log('loadModel before creating loader', championKey)
      const loader = new LOLLoader()
      try {
        // console.log('loadModel before loading', championKey)
        const model = await loader.load(championKey, skinIndex, { enableTexture, setFrame, animName })

        setModel(model)

      } catch (error) {
        console.log(error)
      }
      // console.log('loadModel')
    }

    loadModel()
  }, [animName, championKey, enableTexture, setFrame, skinIndex])

  const animations = useMemo(() => {
    if (model != null) {
      return getAnimations(model, isStatic, animName)
    }
  }, [model, isStatic, animName])

  if (model != null) {
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
          userData={{ model, animations }}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onClick={() => {
            if (!isDisabled) onClick()
          }}
        />
      </Select>
    )
  }
}


export default Champion
