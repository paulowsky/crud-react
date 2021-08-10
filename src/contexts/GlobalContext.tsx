import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState
} from 'react'

import useLocalStorage from '../hooks/useLocalStorage'

type User = {
  username: string
  password: string
}

type GlobalContextType = {
  movies: []
  setMovies: Dispatch<SetStateAction<object>>
  code: number
  setCode: Dispatch<SetStateAction<number>>
  user: User
  login: (data: User) => Promise<void>
  loginError: boolean
  logout: () => Promise<void>
  isAuthenticated: boolean
}

export const GlobalContext = createContext({} as GlobalContextType)

export function GlobalProvider({ children }: any) {
  // eslint-disable-next-line no-unused-vars
  const [movies, setMovies, removeMovies] = useLocalStorage('@app: movies')
  // eslint-disable-next-line no-unused-vars
  const [code, setCode, removeCode] = useLocalStorage('@app: code')

  const [user, setUser, removeUser] = useLocalStorage('@auth: user')
  const isAuthenticated = !!user

  const [loginError, setLoginError] = useState(false)

  useEffect(() => verifyLocalStorage(), [movies, code])

  function verifyLocalStorage() {
    try {
      if (!movies && movies !== []) setMovies([])
      if (!code && code !== 0) setCode(0)
    } catch (err) {
      console.log(err)
    }
  }

  async function login(data: User) {
    try {
      if (data.username === 'admin' && data.password === 'admin') {
        setUser(data)
        setLoginError(false)
      } else {
        setLoginError(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  async function logout() {
    try {
      removeUser()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        movies,
        setMovies,
        code,
        setCode,
        user,
        login,
        loginError,
        logout,
        isAuthenticated
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
