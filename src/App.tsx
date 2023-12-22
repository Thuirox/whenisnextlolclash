import RegionDropdown from './components/RegionDropdown'
import { ClashDataProvider } from './providers/ClashDataProvider'
import ClashDataContainer from './components/ClashDataContainer'
import { LoadingProvider } from './providers/LoadingProvider'
import useRegion from './hooks/useRegion'


function App() {
  const [region, setRegion] = useRegion()

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
