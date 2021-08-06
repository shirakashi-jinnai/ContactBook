import { AppProps } from 'next/dist/next-server/lib/router/router'
import React, { useReducer, useEffect } from 'react'
import { UserContext, UserUpdateContext } from '../lib/context'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import Head from 'next/head'
import _ from 'lodash'
import { initialState } from '../lib/initialstate'
import { theme } from '../assets/theme.js'

function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(
    (state: object, dispatch: object) => _.assign({}, state, dispatch),
    initialState.user
  )

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
        <UserContext.Provider value={state}>
          <UserUpdateContext.Provider value={dispatch}>
            <CssBaseline />
            <Component {...pageProps} />
          </UserUpdateContext.Provider>
        </UserContext.Provider>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default MyApp