import { createSearchParams, useSearchParams } from "react-router-dom"

function useDemo() {
  const [searchParams, setSearchParams] = useSearchParams()
  const isDemo = searchParams.get('isDemo') === 'true'

  const setDemo = () => {
    setSearchParams(createSearchParams({
      isDemo: 'true'
    }))
  }

  const unsetDemo = () => {
    setSearchParams(createSearchParams())
  }

  return {
    isDemo,
    setDemo,
    unsetDemo
  }
}

export default useDemo
