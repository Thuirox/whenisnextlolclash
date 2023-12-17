import NavigatorButton from "./NavigatorButton"
import { Clash } from "../../providers/ClashDataProvider"
import { motion } from "framer-motion"
import { fadeAnimation } from "../../animations"

interface NavigatorProps {
  clashes: Clash[]
}

function Navigator({ clashes }: NavigatorProps) {
  return (
    <motion.div style={{
      position: "absolute",
      left: "50%",
      bottom: "10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "15px",
      transform: "translateX(-50%)"
    }} {...fadeAnimation}>
      {clashes.map((clash) => {
        return (
          <NavigatorButton key={clash.id} clash={clash} />
        )
      })}
    </motion.div>
  )
}

export default Navigator
