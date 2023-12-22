import { useFrame, useThree } from "@react-three/fiber"
import { useMemo, useState } from "react"
import { Vector3 } from "three"
import { useClashData } from "../providers/ClashDataProvider"
import { ChampionConfig } from "../data/scenes"

function useSelectedChampion(championConfigList: ChampionConfig[]) {
  const { clashes, current } = useClashData()
  const selectedIndex = clashes.findIndex((clash) => {
    return clash.id === current?.id
  })
  const selectedChampion = selectedIndex === -1 ? null : championConfigList[selectedIndex]

  return {
    selectedChampion
  }
}

const CAMERA_OFFSET = new Vector3(0, 100, 0)
const TARGET_OFFSET = new Vector3(0, 100, 0)

function useCameraAnimation(championConfigList: ChampionConfig[]) {
  const { camera } = useThree()
  const [cameraPos, setCameraPos] = useState<Vector3>(new Vector3(0, 200, 700))
  const [currentTarget, setCurrentTarget] = useState<Vector3 | null>(null)
  const [target, setTarget] = useState<Vector3>(new Vector3(0, 100, 0))

  const { selectedChampion } = useSelectedChampion(championConfigList)

  useFrame((_, delta) => {
    const speed = 2 * delta

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

  /**
   * Champ -> Reset
   *  1. posChamp1, targetChamp1
   *  2. posRes, targetRes
   *
   * Champ1 -> Champ2
   *  1. posChamp1, targetChamp1
   *  2. posRes, targetRes
   *  3. posChamp2, targetChamp2
   *
   * Reset -> Champ
   *  1. posRes, targetRes
   *  2. posChamp1, targetChamp1
   *
   */

  useMemo(() => {
    let target = new Vector3(0, 100, 0)
    let cameraPosition = new Vector3(0, 200, 700)

    if (selectedChampion != null) {
      target = new Vector3(
        selectedChampion.position.x,
        selectedChampion.position.y,
        selectedChampion.position.z
      ).add(TARGET_OFFSET)

      if (selectedChampion.targetOffset) {
        if (selectedChampion.targetOffset.x) target.x += selectedChampion.targetOffset.x
        if (selectedChampion.targetOffset.y) target.y += selectedChampion.targetOffset.y
        if (selectedChampion.targetOffset.z) target.z += selectedChampion.targetOffset.z
      }

      cameraPosition = new Vector3(
        0 - (selectedChampion.position.x * 0.7),
        selectedChampion.position.y,
        0 - (selectedChampion.position.z * 0.7)
      ).add(CAMERA_OFFSET)

      if (selectedChampion.cameraOffset) {
        if (selectedChampion.cameraOffset.x) cameraPosition.x += selectedChampion.cameraOffset.x
        if (selectedChampion.cameraOffset.y) cameraPosition.y += selectedChampion.cameraOffset.y
        if (selectedChampion.cameraOffset.z) cameraPosition.z += selectedChampion.cameraOffset.z
      }
    }

    setTarget(target)
    setCameraPos(cameraPosition)
  }, [selectedChampion])
}

export default useCameraAnimation
