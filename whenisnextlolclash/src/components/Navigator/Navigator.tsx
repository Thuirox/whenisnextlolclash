import NavigatorButton from "./NavigatorButton"
import { Clash } from "../../providers/ClashDataProvider"

interface NavigatorProps {
  clashes: Clash[]
}

function Navigator({ clashes }: NavigatorProps) {
  return (
    <div style={{
      position: "absolute",
      left: "50%",
      bottom: "10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "15px",
      transform: "translateX(-50%)"
    }}>
      {clashes.map((clash) => {
        return (
          <NavigatorButton key={clash.id} clash={clash} />
        )
      })}
    </div>
  )
}

export default Navigator
