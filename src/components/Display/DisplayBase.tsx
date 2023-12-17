import { PropsWithChildren } from "react"
import './DisplayBase.scss'
import { motion } from "framer-motion"
import { fadeAnimation } from "../../animations"

function DisplayBase({ children }: PropsWithChildren) {
  return (
    <motion.div id="data-display" {...fadeAnimation}>
      <div id="data-display-inner">
        {children}
      </div>
    </motion.div>
  )
}

export default DisplayBase
