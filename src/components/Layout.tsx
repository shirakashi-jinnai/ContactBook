import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Head from 'next/head'



const Layout = (props) => {
  return (
    <div>
      <Head>
        <title>{props.title}</title>
      </Head>
      <meta />
      <div>{props.children}</div>
    </div>
  )
}

export default Layout
