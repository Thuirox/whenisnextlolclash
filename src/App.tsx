import { useState } from 'react'
import RegionDropdown, { DEFAULT_REGION } from './components/RegionDropdown'
import { ClashDataProvider } from './providers/ClashDataProvider'
import ClashDataContainer from './components/ClashDataContainer'


function App() {
  const [region, setRegion] = useState<string>(DEFAULT_REGION)

  return (
    <>
      <RegionDropdown region={region} setRegion={setRegion} />

      <ClashDataProvider region={region}>
        <ClashDataContainer />
      </ClashDataProvider>
    </>
  )
}

export default App
