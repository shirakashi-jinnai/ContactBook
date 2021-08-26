import _ from 'lodash'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { db } from '../lib/firebase'
import { makeStyles } from '@material-ui/styles'
import Layout from '../components/Layout'
import { UserContext } from '../lib/context'
import EntryView from '../components/EntryView'
import { searchItems } from '../lib/utils'

const useStyles = makeStyles({
  viewArea: {
    maxWidth: 850,
    margin: '0 auto',
  },
})

const Home = () => {
  const classes = useStyles()
  const { user } = useContext(UserContext)
  const { contacts, keywords, ageRange } = user

  const isSearching = !_.isEmpty(keywords) || !_.isEmpty(ageRange.ranges)

  const items = searchItems(
    contacts,
    keywords,
    ageRange.ranges,
    ageRange.isLessThan
  )

  return (
    <Layout title={'連絡帳'}>
      <div className={classes.viewArea}>
        {isSearching && (
          <p>
            {items.length}件/
            {contacts.length}件のヒット
          </p>
        )}

        {!_.isEmpty(user.contacts) ? (
          (isSearching ? items : contacts).map((entry: Entry, i: number) => (
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
