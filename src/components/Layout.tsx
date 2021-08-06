import { makeStyles } from '@material-ui/styles'
import Head from 'next/head'

const useStyles = makeStyles((theme) => ({
  layout: {
    maxWidth: '480px',
    width: '100%',
    margin: '0 auto',
    [theme.breakpoints.up('sm')]:{
      maxWidth:'1000px'
    }
  },
}))

const Layout = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.layout}>
      <Head>
        <title>{props.title}</title>
      </Head>
      <meta />
      <div>{props.children}</div>
    </div>
  )
}

export default Layout
