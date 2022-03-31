import { useEffect, useState } from 'react'

const Token = () => {
  const [token, setToken] = useState('')

  useEffect(() => {
    setToken(localStorage.getItem("token"))
  },[])
  // console.log(token)
  return token
}

export default Token;