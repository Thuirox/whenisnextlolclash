import './style.css'
import { init } from './libIndex'

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

const CLASH_ENDPOINT = `https://whenisnextlolclash.justabayet.com/clashes?region=${regions[0]}`

async function main (): Promise<void> {
  const remoteData = await fetch(CLASH_ENDPOINT)
  console.log(await remoteData.json())
  const mockData = (await import('./data/clashMock.json')).default
  console.log(mockData)

  void init()
}

void main()
