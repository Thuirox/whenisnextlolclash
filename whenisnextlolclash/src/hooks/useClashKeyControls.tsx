import { useEffect } from "react"
import { useClashData } from "../providers/ClashDataProvider"

function useClashKeyControls() {
  const { previousClash, nextClash, unselectClash } = useClashData()

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      console.log('key pressed', event.key)
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
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [nextClash, previousClash, unselectClash])
}

export default useClashKeyControls
