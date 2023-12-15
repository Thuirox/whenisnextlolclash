import { demoIndicator, type ClashData } from './state'

async function getRemoteData (region: string): Promise<ClashData[]> {
  const clashEndpoint = `https://whenisnextlolclash.justabayet.com/clashes?region=${region}`

  const data = await fetch(clashEndpoint)
  const clashData: ClashData[] = await data.json()

  return clashData
}

async function getMockData (region: string): Promise<ClashData[]> {
  const importedData = (await import('./data/clashMock.json')).default as any as ClashData[]

  const clashData = structuredClone(importedData)

  clashData.forEach((clash) => {
    clash.nameKey = `${clash.nameKey}_${region}`
  })

  return clashData
}

export async function getClashData (region: string): Promise<ClashData[]> {
  const _region = region.toLocaleLowerCase()

  const remoteClashData = await getRemoteData(_region)

  if (remoteClashData.length > 0) {
    demoIndicator.hide()
    return remoteClashData
  }

  demoIndicator.show()
  const mockClashData = await getMockData(_region)

  return mockClashData
}
