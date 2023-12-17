import { useLocation, useNavigate } from "react-router-dom"

function useDemo() {
  const location = useLocation()
  const isDemo = location.pathname === '/demo'

  const navigate = useNavigate()

  const setDemo = () => {
    navigate('/demo')
  }

  const unsetDemo = () => {
    navigate('/')
  }

  return {
    isDemo,
    setDemo,
    unsetDemo
  }
}

export default useDemo
