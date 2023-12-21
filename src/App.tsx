import { useState } from 'react'
import RegionDropdown, { DEFAULT_REGION } from './components/RegionDropdown'
import { ClashDataProvider } from './providers/ClashDataProvider'
import ClashDataContainer from './components/ClashDataContainer'
import { LoadingProvider } from './providers/LoadingProvider'


function App() {
  const [region, setRegion] = useState<string>(DEFAULT_REGION)

  return (
    <>
      <RegionDropdown region={region} setRegion={setRegion} />

      <ClashDataProvider region={region}>
        <LoadingProvider>
          <ClashDataContainer />
        </LoadingProvider>
      </ClashDataProvider>
    </>
  )
}

export default App
