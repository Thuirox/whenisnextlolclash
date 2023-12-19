import { ChampionConfig } from "../data/scenes"
import useDemo from "../hooks/useDemo"
import { useClashData } from "../providers/ClashDataProvider"
import Champion from "./Champion"

interface ChampionListProps {
  championConfigList: ChampionConfig[]
  isSelectable: boolean
}

function ChampionList({ championConfigList, isSelectable }: ChampionListProps) {
  const { clashes, selectClash, current, unselectClash, getChampionId } = useClashData()
  const { isDemo } = useDemo()

  return (
    <>
      {championConfigList.map((championConfig, index) => {
        const clash = clashes.at(index)

        const key = getChampionId(clash, isDemo)
        if (clash == null) {
          return (
            <Champion {...championConfig} key={key} onClick={() => { }} isDisabled />
          )
        } else {
          return (
            <Champion {...championConfig} key={key} onClick={() => {
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
