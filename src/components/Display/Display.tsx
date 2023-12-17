import { scenesConfig } from "../../data"
import { useClashData } from "../../providers/ClashDataProvider"
import BasicDisplay from "./BasicDisplay"
import NoClashDisplay from "./NoClashDisplay"
import OopsDisplay from "./OopsDisplay"


function Display() {
  const { clashes, isLoading } = useClashData()

  const nbClash = clashes.length

  if (isLoading) {
    return
  }

  return (
    <>
      {nbClash === 0 && (
        <NoClashDisplay />
      )}

      {!(nbClash in scenesConfig) && (
        <OopsDisplay />
      )}

      {(nbClash > 0 && nbClash in scenesConfig) && (
        <BasicDisplay />
      )}
    </>
  )
}

export default Display
