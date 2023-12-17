import { PropsWithChildren } from "react"
import './DisplayBase.scss'
import { motion } from "framer-motion"

const fadeAnimation = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1
  },
  exit: {
    opacity: 0
  },
}

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
