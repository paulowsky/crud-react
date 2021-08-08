import { createContext, Dispatch, SetStateAction, useEffect } from 'react'

import useLocalStorage from '../hooks/useLocalStorage'

type GlobalContextType = {
  movies: []
  setMovies: Dispatch<SetStateAction<string>>
}

export const GlobalContext = createContext({} as GlobalContextType)

export function GlobalProvider({ children }: any) {
  // eslint-disable-next-line no-unused-vars
  const [movies, setMovies, removeMovies] = useLocalStorage('@app: movies')

  useEffect(() => {
    try {
      if (!movies) setMovies([])
    } catch (err) {
      console.log(err)
    }
  }, [movies])

  return (
    <GlobalContext.Provider
      value={{
        movies,
        setMovies
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
