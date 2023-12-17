import './RegionDropdown.scss'

export const DEFAULT_REGION = 'EUW1'

const regions = [
  'BR1',
  'EUN1',
  'EUW1',
  'JP1',
  'KR',
  'LA1',
  'LA2',
  'NA1',
  'OC1',
  'TR1',
  'RU',
  'PH2',
  'SG2',
  'TH2',
  'TW2',
  'VN2'
]

interface RegionDropdownProps {
  region: string,
  setRegion: (region: string) => void
}

function RegionDropdown({ region, setRegion }: RegionDropdownProps) {
  return (
    <nav style={{
      padding: '10px',

      position: 'absolute',
      top: 0,
      left: '10px',

      zIndex: 15,
      fontSize: '13px',
    }}>
      <ul>
        <li>{region}
          <ul className="dropdown">
            {regions.map((_region) => {
              if (_region === region) return

              return (
                <li
                  key={_region}
                  onClick={() => {
                    setRegion(_region)
                  }}>
                  {_region}
                </li>
              )
            })}
          </ul>
        </li>
      </ul>
    </nav>
  )
}

export default RegionDropdown
