import { AppProps } from 'next/dist/next-server/lib/router/router'
import React, { useEffect } from 'react'
import { UserContext } from '../lib/context'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import _ from 'lodash'
import { theme } from '../assets/theme.js'
import { useUserState } from '../lib/hooks'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={useUserState()}>
          <CssBaseline />
          <Component {...pageProps} />
        </UserContext.Provider>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default MyApp
