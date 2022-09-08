import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAuth } from './AuthContext'

const ProtectedRouter = ({ children }) => {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [router, user])

  return <>{user ? children : null}</>
}

export default ProtectedRouter