import { doc, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'
import { 
    auth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    db,
} from '../../firebase'
import Loader from '../loader/Loader'
const AuthContext = createContext({})
export const useAuth = () => useContext(AuthContext)


export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    // console.log(user)
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const data = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoUrl: user.photoURL,
            emailVerified:user.emailVerified
          }
          setDoc(doc(db,'users',user.uid),data,{ merge:true })
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoUrl: user.photoURL,
            emailVerified:user.emailVerified
          })
          
        } else {
          setUser(null)
        }
        setLoading(false)
      })
  
      return () => unsubscribe()
    }, [])
    // const signup = (email, password,displayName) => {
    //     return createUserWithEmailAndPassword(auth, email, password,displayName)
    //   }
    
    //   const login = (email, password) => {
    //     return signInWithEmailAndPassword(auth, email, password)
    //   }

    // const logout = async () => {
    //     setUser(null)
    //     await signOut(auth)
    //   }
    
      return (
        <AuthContext.Provider value={{ user }}>
          {loading ? <Loader /> : children}
        </AuthContext.Provider>
      )
}