import { createContext, Dispatch, SetStateAction, useEffect } from 'react'

import useLocalStorage from '../hooks/useLocalStorage'

type GlobalContextType = {
  movies: []
  setMovies: Dispatch<SetStateAction<object>>
  code: number
  setCode: Dispatch<SetStateAction<number>>
}

export const GlobalContext = createContext({} as GlobalContextType)

export function GlobalProvider({ children }: any) {
  // eslint-disable-next-line no-unused-vars
  const [movies, setMovies, removeMovies] = useLocalStorage('@app: movies')
  // eslint-disable-next-line no-unused-vars
  const [code, setCode, removeCode] = useLocalStorage('@app: code')

  useEffect(() => {
    try {
      if (!movies && movies !== []) setMovies([])
      if (!code && code !== 0) setCode(0)
    } catch (err) {
      console.log(err)
    }
  }, [movies, code])

  return (
    <GlobalContext.Provider
      value={{
        movies,
        setMovies,
        code,
        setCode
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
