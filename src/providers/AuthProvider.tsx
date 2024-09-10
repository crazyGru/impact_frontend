import { createContext } from 'react'

interface IAuthContext {
  isLogin: boolean
  setIsLogin: (isLogin: boolean) => void
}

export const AuthContext = createContext<IAuthContext>({
  isLogin: false,
  setIsLogin: () => {}
})

type IAuthProvider = IAuthContext & {
  children: React.ReactNode
}

export default function AuthProvider(props: IAuthProvider) {
  return (
    <AuthContext.Provider value={props}>{props.children}</AuthContext.Provider>
  )
}
