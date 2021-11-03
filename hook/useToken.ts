import { useState } from "react"
import useStorage from './useStorage'

interface Token {
  token: string
}

const readToken = (): Token | undefined => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {getItem} = useStorage()

  const token = getItem("token")
  return token != null ? {token} : undefined
}

export const useToken = () => {
  const [token] = useState<Token | undefined>(readToken())

  return {
    token,
  }
}
