// add bootstrap css 
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
// import { store } from '../component/redux/store'
import { Provider } from 'react-redux'
import React, { useState } from 'react';
import Router, { useRouter } from 'next/router'
import TopBarProgress from "react-topbar-progress-indicator"
import ProtectedRouter from '../component/router/ProtectedRouter';
import { AuthContextProvider } from '../component/router/AuthContext';
import Loader from '../component/loader/Loader';
import store from '../component/redux/CounterSlice';


const noAuthRequired = ['/', '/login', '/login/register','/login/resetpassword',]
function MyApp({ Component, pageProps }) {

  const [progress,setProgress] = useState(false)

  Router.events.on('routeChangeStart',() => {
    setProgress(true)
  })
  Router.events.on('routeChangeComplete',() =>{
    setProgress(false)
  })

 
const router = useRouter()


  return (
    <AuthContextProvider>
   { progress && <Loader /> }
    {noAuthRequired.includes(router.pathname) ? (
    <Component {...pageProps} />
  ): (
    <ProtectedRouter>
      <Provider store={store}>
    <Component {...pageProps} />
    </Provider>
    </ProtectedRouter>
  )}
  </AuthContextProvider>
  )
}


export default MyApp
