import { type ClashData } from './state'

const DEFAULT_REGION = 2

const regions = [
  'br1',
  'eun1',
  'euw1',
  'jp1',
  'kr',
  'la1',
  'la2',
  'na1',
  'oc1',
  'tr1',
  'ru',
  'ph2',
  'sg2',
  'th2',
  'tw2',
  'vn2'
]

const currentRegionId = DEFAULT_REGION

const CLASH_ENDPOINT = `https://whenisnextlolclash.justabayet.com/clashes?region=${regions[currentRegionId]}`

export async function getClashData (): Promise<ClashData[]> {
  const remoteData = await fetch(CLASH_ENDPOINT)
  const remoteClashData: ClashData[] = await remoteData.json()
  const mockClashData = (await import('./data/clashMock.json')).default as any as ClashData[]

  return remoteClashData.length === 0 ? mockClashData : remoteClashData
}
