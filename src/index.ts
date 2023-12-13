import './styles/main.scss'
import './styles/dropdown.scss'
import { init } from './libIndex'
import { getClashData } from './clashData'
import { initDropdown } from './dropdown'

async function main (): Promise<void> {
  const clashData = await getClashData()

  void init(clashData)
}

initDropdown()
void main()
