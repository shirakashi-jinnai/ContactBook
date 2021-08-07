import { AppProps } from 'next/dist/next-server/lib/router/router'
import React, { useReducer, useEffect } from 'react'
import { firebaseContext} from '../lib/context'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import Head from 'next/head'
import _ from 'lodash'
import { initialState } from '../lib/initialstate'
import { theme } from '../assets/theme.js'
import { useFirebase } from '../lib/hooks'

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
      <Head>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <ThemeProvider theme={theme}>
        <firebaseContext.Provider value={useFirebase()}>
          <CssBaseline />
          <Component {...pageProps} />
        </firebaseContext.Provider>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default MyApp
