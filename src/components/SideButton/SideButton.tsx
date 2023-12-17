import './SideButton.scss'

interface SideButtonProps {
  isLeft: boolean
  onClick: () => void
}

function SideButton({ isLeft = true, onClick }: SideButtonProps) {
  return (
    <div id={isLeft ? 'left' : 'right'} className="side-button" onClick={onClick}>
      <div className="arrow-container">
        <div className="arrow"></div>
      </div>
    </div>
  )
}

export default SideButton
