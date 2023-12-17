import useDemo from "../../hooks/useDemo"
import DisplayBase from "./DisplayBase"
import './NoClashDisplay.scss'

function NoClashDisplay() {
  const { isDemo, setDemo } = useDemo()
  return (
    <DisplayBase>
      <p>No Incoming Clash</p>

      {!isDemo && (
        <div className="button" onClick={() => {
          setDemo()
        }}>See Demo</div>
      )}
    </DisplayBase>
  )
}

export default NoClashDisplay
