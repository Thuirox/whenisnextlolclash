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
import LoadingIndicator from "./LoadingIndicator"
import { AnimatePresence } from "framer-motion"
import { useLoading } from "../providers/LoadingProvider"

function ClashDataContainer() {
  const { clashes, previousClash, nextClash } = useClashData()
  const { isLoading } = useLoading()

  const { isDemo } = useDemo()

  useClashKeyControls()

  const nbClash = clashes.length
  const hasScene = nbClash in scenesConfig

  return (
    <>
      {isDemo && <DemoIndicator />}

      {isLoading && <LoadingIndicator />}

      <Scene />

      <AnimatePresence initial={true}>
        {(nbClash > 1 && hasScene && !isLoading) && (
          <>
            <SideButton isLeft onClick={previousClash} key={'left-side-button'} />
            <SideButton isLeft={false} onClick={nextClash} key={'right-side-button'} />

            <Navigator clashes={clashes} />
          </>
        )}
      </AnimatePresence>

      <Display />

      <Disclaimer />
    </>
  )
}

export default ClashDataContainer
