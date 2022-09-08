// add bootstrap css 
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import { store } from '../component/redux/store'
import { Provider, useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react';
import { auth,onAuthStateChanged } from '../firebase';
import { loginStart, loginSuccess, logout } from '../component/redux/UserSlice';
import Router, { useRouter } from 'next/router'
import TopBarProgress from "react-topbar-progress-indicator"
import ProtectedRouter from '../component/router/ProtectedRouter';
import { AuthContextProvider } from '../component/router/AuthContext';


const noAuthRequired = ['/', '/login', '/login/register','/login/resetpassword',]
function MyApp({ Component, pageProps }) {

  const [progress,setProgress] = useState(false)

  Router.events.on('routeChangeStart',() => {
    setProgress(true)
  })
  Router.events.on('routeChangeComplete',() =>{
    setProgress(false)
  })

  const AuthComponent = React.memo(() => {
    const dispatch = useDispatch();
   

    return null;
})
const router = useRouter()


  return (
  <Provider store={store}>
    <AuthContextProvider>
  { progress && <TopBarProgress /> }
  <AuthComponent />
    {noAuthRequired.includes(router.pathname) ? (
    <Component {...pageProps} />
  ): (
    <ProtectedRouter>
    <Component {...pageProps} />
    </ProtectedRouter>
  )}
  </AuthContextProvider>
  </Provider>
  )
}


export default MyApp
