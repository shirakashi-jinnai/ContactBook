import { FC } from 'react'
import Head from 'next/head'
import Header from './Header/Header'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  moduleSpacer: {
    margin: 100,
  },
})

type Props = {
  title: string
}

const Layout: FC<Props> = (props) => {
  const classes = useStyles()
  return (
    <div>
      <Head>
        <title>{props.title}</title>
        <meta name='viewport' content='width=device-width,initial-scale=1.0' />
      </Head>
      <meta />
      <Header />
      <div className={classes.moduleSpacer} />
      <div>{props.children}</div>
    </div>
  )
}

export default Layout
