import { regions } from '../hooks/useRegion'
import './RegionDropdown.scss'

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
              const isCurrentRegion = _region === region

              if (isCurrentRegion) {
                return (
                  <li
                    key={_region}
                    className='selected'>
                    {_region}
                  </li>
                )
              } else {
                return (
                  <li
                    key={_region}
                    onClick={() => {
                      setRegion(_region)
                    }}>
                    {_region}
                  </li>
                )
              }
            })}
          </ul>
        </li>
      </ul>
    </nav>
  )
}

export default RegionDropdown
