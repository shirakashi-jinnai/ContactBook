import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Head from 'next/head'
import { FC } from 'react'
import Header from './Header/Header'

type props = {
  title: string
}

const Layout: FC<props> = (props) => {
  return (
    <div>
      <Head>
        <title>{props.title}</title>
        <meta name='viewport' content='width=device-width,initial-scale=1.0' />
      </Head>
      <meta />
      <Header />
      <div>{props.children}</div>
    </div>
  )
}

export default Layout
