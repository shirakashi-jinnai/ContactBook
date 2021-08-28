import _ from 'lodash'
import { useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import Layout from '../components/Layout'
import { UserContext } from '../lib/context'
import EntryView from '../components/EntryView'
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
  const { user, filterContactsBySearchConditions } = useContext(UserContext)
  const { contacts } = user.userState
  const { queryCondition, ageRangeCondition } = user.filterCondition

  const isSearching =
    !_.isEmpty(queryCondition) || ageRangeCondition.min || ageRangeCondition.max

  const filteredContacts = isSearching
    ? filterContactsBySearchConditions()
    : contacts

  const Tbody = !_.isEmpty(contacts) ? (
    filteredContacts.map((entry: Entry, i: number) => (
      <EntryView key={i} entry={entry} />
    ))
  ) : (
    <TableRow>
      <TableCell>連絡先が登録されていません。</TableCell>
    </TableRow>
  )

  return (
    <Layout title={'連絡帳'}>
      <div className={classes.viewArea}>
        {isSearching && (
          <p>
            {filteredContacts.length}件/
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
            <TableBody>{Tbody}</TableBody>
          </Table>
        </TableContainer>
      </div>
    </Layout>
  )
}

export default Home
