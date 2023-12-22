
import useSWR from 'swr'
import { Clash } from '../providers/ClashDataProvider'
import useDemo from './useDemo'

async function getMockData(region: string): Promise<Clash[]> {
  const importedData = (await import('../data/clashMock.json')).default as Clash[]

  const clashData = structuredClone(importedData)

  clashData.forEach((clash) => {
    clash.nameKey = `${clash.nameKey}_${region}`
  })

  const mockData = clashData

  switch (region) {

    case 'BR1':
      return []

    case 'EUN1':
      return mockData.slice(0, 1)

    case 'EUW1':
      return mockData.slice(0, 2)

    case 'JP1':
      return mockData.slice(0, 3)

    case 'KR':
      return mockData.slice(0, 4)

    default:
      return mockData
  }
}

async function getRemoteData(region: string): Promise<Clash[]> {
  const clashEndpoint = `https://whenisnextlolclash.justabayet.com/clashes?region=${region.toLowerCase()}`

  const response = await fetch(clashEndpoint)
  const remoteData: Clash[] = await response.json()

  return remoteData
}


function fetcherBuider(fnc: (region: string) => Promise<Clash[]>, region: string) {
  return async () => {
    return await fnc(region)
  }
}

function useClashDataRemote(region: string) {
  const { isDemo } = useDemo()

  const fetcher = fetcherBuider(isDemo ? getMockData : getRemoteData, region)

  const cacheKey = `${region} ${isDemo}`
  const { data, error, isLoading } = useSWR(cacheKey, fetcher, { keepPreviousData: true })

  if (error != null) console.log(`Error getting clash data ${error}`)

  return { data, isLoading }
}

export default useClashDataRemote
