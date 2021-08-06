import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Head from 'next/head'

const useStyles = makeStyles((theme) => ({
  layout: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: '1000px',
    },
  },
}))

const Layout = (props) => {
  const classes = useStyles()
  return (
    <Container className={classes.layout} maxWidth='sm'>
      <Head>
        <title>{props.title}</title>
      </Head>
      <meta />
      <div>{props.children}</div>
    </Container>
  )
}

export default Layout
