import _ from 'lodash'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { db } from '../lib/firebase'
import { makeStyles } from '@material-ui/styles'
import Layout from '../components/Layout'
import { UserContext } from '../lib/context'
import EntryView from '../components/EntryView'

const useStyles = makeStyles({
  viewArea: {
    maxWidth: 850,
    margin: '0 auto',
  },
})

const Home = () => {
  const router = useRouter()
  const classes = useStyles()
  const { user } = useContext(UserContext)
  console.log(user)

  return (
    <Layout title={'連絡帳'}>
      <div className={classes.viewArea}>
        {!_.isEmpty(user.contacts) ? (
          user.contacts.map((entry: Entry, i: number) => (
            <EntryView key={i} entry={entry} />
          ))
        ) : (
          <p>連絡先が登録されていません。</p>
        )}
      </div>
    </Layout>
  )
}

export default Home
