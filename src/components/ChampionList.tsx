import { ChampionConfig } from "../data/scenes"
import { useClashData } from "../providers/ClashDataProvider"
import Champion from "./Champion"

interface ChampionListProps {
  championConfigList: ChampionConfig[]
  isSelectable: boolean
}

function ChampionList({ championConfigList, isSelectable }: ChampionListProps) {
  const { clashes, selectClash, current, unselectClash } = useClashData()

  return (
    <>
      {championConfigList.map((championConfig, index) => {
        const clash = clashes.at(index)

        if (clash == null) {
          return (
            <Champion {...championConfig} key={index} onClick={() => { }} isDisabled />
          )
        } else {
          return (
            <Champion {...championConfig} key={clash.id} onClick={() => {
              if (current == null) {
                selectClash(clash)
              } else {
                unselectClash()
              }
            }} isDisabled={!isSelectable} />
          )
        }
      })}
    </>
  )
}

export default ChampionList
