import { AppProps } from 'next/dist/next-server/lib/router/router'
import React, { useEffect } from 'react'
import { UserContext } from '../lib/context'
import {
  Backdrop,
  CircularProgress,
  CssBaseline,
  ThemeProvider,
} from '@material-ui/core'
import _ from 'lodash'
import { theme } from '../assets/theme.js'
import { useUserState } from '../lib/hooks'
import { useContext } from 'react'

const FirebaseInitWrapper = ({ children }) => {
  const { initializing } = useContext(UserContext)
  if (initializing) {
    return (
      <Backdrop open>
        <CircularProgress color='inherit' />
      </Backdrop>
    )
  }
  return children
}

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={useUserState()}>
        <FirebaseInitWrapper>
          <CssBaseline />
          <Component {...pageProps} />
        </FirebaseInitWrapper>
      </UserContext.Provider>
    </ThemeProvider>
  )
}

export default MyApp
