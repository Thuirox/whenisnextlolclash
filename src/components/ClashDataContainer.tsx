import { useClashData } from "../providers/ClashDataProvider"
import DemoIndicator from "./DemoIndicator"
import Navigator from "./Navigator"
import Scene from "./Scene"
import SideButton from "./SideButton"
import useClashKeyControls from "../hooks/useClashKeyControls"
import useDemo from "../hooks/useDemo"
import { scenesConfig } from "../data"
import Display from "./Display"
import Disclaimer from "./Disclaimer"

function ClashDataContainer() {
  const { clashes, previousClash, nextClash } = useClashData()

  const { isDemo } = useDemo()

  useClashKeyControls()

  const nbClash = clashes.length
  const hasScene = nbClash in scenesConfig

  return (
    <>
      {isDemo && <DemoIndicator />}

      <Scene />

      {(nbClash > 1 && hasScene) && (
        <>
          <SideButton isLeft onClick={previousClash} />
          <SideButton isLeft={false} onClick={nextClash} />

          <Navigator clashes={clashes} />
        </>
      )}

      <Display />

      <Disclaimer />
    </>
  )
}

export default ClashDataContainer
