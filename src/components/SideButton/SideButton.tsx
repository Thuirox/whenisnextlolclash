import { fadeAnimation } from '../../animations'
import './SideButton.scss'
import { motion } from "framer-motion"

interface SideButtonProps {
  isLeft: boolean
  onClick: () => void
}

function SideButton({ isLeft = true, onClick }: SideButtonProps) {
  return (
    <motion.div id={isLeft ? 'left' : 'right'} className="side-button" onClick={onClick} {...fadeAnimation}>
      <div className="arrow-container">
        <div className="arrow"></div>
      </div>
    </motion.div>
  )
}

export default SideButton
