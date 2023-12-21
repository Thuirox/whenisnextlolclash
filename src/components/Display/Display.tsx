import { AnimatePresence } from "framer-motion"
import { scenesConfig } from "../../data"
import { useClashData } from "../../providers/ClashDataProvider"
import BasicDisplay from "./BasicDisplay"
import NoClashDisplay from "./NoClashDisplay"
import OopsDisplay from "./OopsDisplay"
import { useLoading } from "../../providers/LoadingProvider"


function Display() {
  const { clashes } = useClashData()
  const { isLoading } = useLoading()

  const nbClash = clashes.length

  return (
    <AnimatePresence>
      {!isLoading && (
        <>
          {nbClash === 0 && (<NoClashDisplay />)}

          {!(nbClash in scenesConfig) && (<OopsDisplay />)}

          {(nbClash > 0 && nbClash in scenesConfig) && (<BasicDisplay />)}
        </>
      )}
    </AnimatePresence>
  )
}

export default Display

