import { getSceneConfig, getSceneOops } from "../data/scenes"
import { useClashData } from "../providers/ClashDataProvider"
import ChampionList from "./ChampionList"
import useCameraAnimation from "../hooks/useCameraAnimation"

function SceneConfigContainer() {
  const { clashes } = useClashData()

  const nbClashes = Object.keys(clashes).length

  const sceneConfig = getSceneConfig(nbClashes)

  const clashIncoming = nbClashes > 0
  const isSelectable = clashIncoming && sceneConfig != null

  const { champions: championConfigList } = sceneConfig == null ? getSceneOops() : sceneConfig

  useCameraAnimation(championConfigList)

  return (
    <ChampionList championConfigList={championConfigList} isSelectable={isSelectable} />
  )
}

export default SceneConfigContainer
