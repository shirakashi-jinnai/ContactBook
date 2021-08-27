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
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'

const useStyles = makeStyles({
  viewArea: {
    maxWidth: 850,
    margin: '0 auto',
  },
})

const Home = () => {
  const classes = useStyles()
  const { user } = useContext(UserContext)
  const { contacts, keywordsCondition, ageRangeCondition } = user

  const isSearching =
    !_.isEmpty(keywordsCondition) || !_.isEmpty(ageRangeCondition)

  const items = searchItems(contacts, keywordsCondition, ageRangeCondition)

  return (
    <Layout title={'連絡帳'}>
      <div className={classes.viewArea}>
        {isSearching && (
          <p>
            {items.length}件/
            {contacts.length}件のヒット
          </p>
        )}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>名前</TableCell>
                <TableCell>住所</TableCell>
                <TableCell>生年月日</TableCell>
                <TableCell align='center'>その他</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!_.isEmpty(user.contacts) ? (
                (isSearching ? items : contacts).map(
                  (entry: Entry, i: number) => (
                    <EntryView key={i} entry={entry} />
                  )
                )
              ) : (
                <p>連絡先が登録されていません。</p>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Layout>
  )
}

export default Home
