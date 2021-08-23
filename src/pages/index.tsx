import _ from 'lodash'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { db } from '../lib/firebase'
import { makeStyles } from '@material-ui/styles'
import Layout from '../components/Layout'
import { UserContext } from '../lib/context'
import EntriesView from '../components/entriesView'

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
  console.log(user)

  return (
    <Layout title={'連絡帳'}>
      <div className={classes.viewArea}>
        {user.contacts &&
          user.contacts.map((entry: Entry, i: number) => (
            <EntriesView
              key={i}
              firstName={entry.firstName}
              lastName={entry.lastName}
              id={entry.id}
              liked={entry.liked}
            />
          ))}
      </div>
    </Layout>
  )
}

export default Home
