import React, { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react'
import { useClashData } from './ClashDataProvider'

class Loading {
  constructor(
    public isLoading: boolean,
    public setCounter: React.Dispatch<React.SetStateAction<number>>) { }
}

const LoadingContext = createContext(new Loading(false, () => { }))

export const LoadingProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const { isLoading: isLoadingRemote } = useClashData()
  const [counter, setCounter] = useState<number>(0)

  const isLoading = counter > 0 || isLoadingRemote

  const value = useMemo(() => new Loading(isLoading, setCounter), [isLoading, setCounter])

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  )
}

export const useLoading = () => {
  return useContext(LoadingContext)
}
