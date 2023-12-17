import { useEffect, useState } from "react"
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

function Champion({ championKey, skinIndex, enableTexture = false, setFrame, animName, position, rotation, onClick, isDisabled = false, animationSpeed = 700 }: ChampionProps) {
  const [model, setModel] = useState<Model>()
  const [hovered, setHovered] = useState(false)

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

      // console.log('loadModel before loading', championKey)
      const model = await loader.load(championKey, skinIndex, { enableTexture, setFrame, animName })

      animName ? model.setAnimation(animName) : model.setDefaultAnimation()

      setModel(model)
      // console.log('loadModel')
    }

    loadModel()
  }, [animName, championKey, enableTexture, setFrame, skinIndex])

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
