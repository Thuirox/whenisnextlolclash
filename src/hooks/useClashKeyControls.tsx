import { useEffect } from "react"
import { useClashData } from "../providers/ClashDataProvider"
import { scenesConfig } from "../data"

function useClashKeyControls() {
  const { clashes, previousClash, nextClash, unselectClash } = useClashData()

  const nbClash = clashes.length
  const shouldNavigate = nbClash > 0 && nbClash in scenesConfig

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      console.log('key pressed', event.key)
      if (shouldNavigate) {
        switch (event.key) {
          case 'ArrowLeft':
            previousClash()
            break

          case 'ArrowRight':
            nextClash()
            break

          case 'Escape':
            unselectClash()
            break
        }
      }
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [nextClash, previousClash, unselectClash, shouldNavigate])
}

export default useClashKeyControls
