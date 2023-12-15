import './styles/main.scss'
import './styles/dropdown.scss'

import { init } from './libIndex'

import { getClashData } from './clashData'
import { initDropdown } from './dropdown'

const DEFAULT_REGION = 'EUW1'

async function main (): Promise<void> {
  const clashData = await getClashData(DEFAULT_REGION)

  void init(clashData)
}

initDropdown()
void main()
