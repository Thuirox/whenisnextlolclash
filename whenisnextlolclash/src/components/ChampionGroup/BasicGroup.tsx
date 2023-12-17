import { useFrame, useThree } from "@react-three/fiber"
import { Vector3 } from "three"
import { useMemo, useState } from "react"
import { useClashData } from "../../providers/ClashDataProvider"
import { scenesConfig } from "../../data"
import Champion from "../Champion"


function BasicGroup() {
  const { camera } = useThree()
  const [cameraPos, setCameraPos] = useState<Vector3>(new Vector3(0, 200, 700))
  const [currentTarget, setCurrentTarget] = useState<Vector3 | null>(null)
  const [target, setTarget] = useState<Vector3>(new Vector3(0, 100, 0))

  const { clashes, current, selectClash, unselectClash } = useClashData()

  const nbClashes = Object.keys(clashes).length
  const nbChampions = nbClashes

  const sceneConfig = scenesConfig[nbChampions]

  const { champions: championConfigList } = sceneConfig

  const selectedIndex = clashes.findIndex((clash) => {
    return clash.id === current?.id
  })
  const selectedChampion = selectedIndex === -1 ? null : championConfigList[selectedIndex]

  useFrame(() => {
    const speed = 0.01

    camera.position.lerp(cameraPos, speed)

    if (currentTarget != null) {
      const tempTarget = currentTarget.lerp(target, speed)
      camera.lookAt(tempTarget)
      setCurrentTarget(tempTarget)

    } else {
      camera.lookAt(target)
      setCurrentTarget(target)
    }
  })

  useMemo(() => {
    let target = new Vector3(0, 100, 0)
    let cameraPosition = new Vector3(0, 200, 700)

    if (selectedChampion != null) {
      target = new Vector3(selectedChampion.position.x, selectedChampion.position.y, selectedChampion.position.z).add(new Vector3(0, 200, 0))
      cameraPosition = new Vector3(
        0 - (selectedChampion.position.x * 0.7),
        selectedChampion.position.y + 100,
        0 - (selectedChampion.position.z * 0.7)
      )
    }

    setTarget(target)
    setCameraPos(cameraPosition)
  }, [selectedChampion])

  return (
    <>
      {clashes.map((clash, index) => {
        const championConfig = championConfigList[index]

        console.log('championConfig', championConfig)
        return (
          <Champion {...championConfig} key={clash.id} onClick={() => {
            if (current == null) {
              selectClash(clash)
            } else {
              unselectClash()
            }
          }} />
        )
      })}
    </>
  )
}

export default BasicGroup
