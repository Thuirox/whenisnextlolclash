import './style.css'
import { init } from './libIndex'
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

async function main (): Promise<void> {
  const remoteData = await fetch(CLASH_ENDPOINT)
  const remoteClashData: ClashData[] = await remoteData.json()
  console.log(remoteClashData)
  const mockData = (await import('./data/clashMock.json')).default
  console.log(mockData)

  void init(remoteClashData)
}

void main()
