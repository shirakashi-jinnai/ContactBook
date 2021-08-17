import _ from 'lodash'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { db } from '../lib/firebase'
import { makeStyles } from '@material-ui/styles'
import Layout from '../components/Layout'
import { UserContext } from '../lib/context'
import EntriesView from '../components/entriesView'
import { Entry } from '../../additional'

const useStyles = makeStyles({
  viewArea: {
    maxWidth: 750,
    margin: '0 auto',
  },
})

const Home = () => {
  const router = useRouter()
  const classes = useStyles()
  const { user } = useContext(UserContext)

  return (
    <Layout title={'連絡帳'}>
      <h1>hello nextjs</h1>
      <Link href='/signup'>
        <a>サインアップ</a>
      </Link>
      <Link href='/entryForm'>
        <a>登録ページ</a>
      </Link>
      <div className={classes.viewArea}>
        {user.contacts &&
          user.contacts.map((entry: Entry, i: number) => (
            <EntriesView key={i} entry={entry} />
          ))}
      </div>
    </Layout>
  )
}

export default Home
