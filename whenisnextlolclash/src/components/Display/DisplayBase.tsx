import { PropsWithChildren } from "react"
import './DisplayBase.scss'

function DisplayBase({ children }: PropsWithChildren) {
  return (
    <div id="data-display">
      <div id="data-display-inner">
        {children}
      </div>
    </div>
  )
}

export default DisplayBase
