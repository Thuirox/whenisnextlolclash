import { Clash, useClashData } from '../../providers/ClashDataProvider'
import './NavigatorButton.scss'

interface NavigatorButtonProps {
  clash: Clash
}

function NavigatorButton({ clash }: NavigatorButtonProps) {
  const { current: currentClash, selectClash, unselectClash } = useClashData()

  const isSelected = currentClash != null && currentClash.id === clash.id

  return (
    <div className={isSelected ? 'navigator-button selected' : 'navigator-button'}
      onClick={() => {
        isSelected ? unselectClash() : selectClash(clash)
      }}>
      <div className='navigator-button-inner' />
    </div>
  )
}
export default NavigatorButton
