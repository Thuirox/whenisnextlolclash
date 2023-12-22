import getUserLocale from "get-user-locale"
import { useState } from "react"
import { DEFAULT_REGION, locale2region, regions } from "./data"

function getDefaultRegion(locale: string): string {
  if (locale in locale2region) {
    return locale2region[locale]
  }

  return DEFAULT_REGION
}

function useRegion(checkExistence = true): [string, (region: string) => void] {
  const locale = getUserLocale()
  const [region, setRegionUnsafe] = useState<string>(getDefaultRegion(locale))

  const setRegionSafe = (region: string) => {
    if (regions.includes(region)) {
      setRegionUnsafe(region)
      return
    }

    throw new Error(`Region ${region} is not recognized`)
  }

  const setRegion = checkExistence ? setRegionSafe : setRegionUnsafe

  return [region, setRegion]
}

export default useRegion
