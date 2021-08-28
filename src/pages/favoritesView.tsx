import { useContext } from 'react'
import _ from 'lodash'
import Layout from '../components/Layout'
import { UserContext } from '../lib/context'
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import EntryView from '../components/EntryView'

const useStyles = makeStyles({
  viewArea: {
    maxWidth: 850,
    margin: '0 auto',
  },
})

const FavoriteView = () => {
  const classes = useStyles()
  const { user, filterContactsBySearchConditions } = useContext(UserContext)
  const { contacts } = user.userState
  const { queryCondition, ageRangeCondition } = user.filterCondition

  const isSearching =
    !_.isEmpty(queryCondition) || ageRangeCondition.min || ageRangeCondition.max

  const favorites = _.filter(contacts, 'liked')
  const filteredFavorites = _.filter(
    filterContactsBySearchConditions(),
    'liked'
  )

  const filteredContacts = isSearching ? filteredFavorites : favorites

  return (
    <Layout title='お気に入りリスト'>
      <div className={classes.viewArea}>
        {isSearching && (
          <p>
            {filteredFavorites.length}件/
            {favorites.length}件のヒット
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
              {!_.isEmpty(favorites) ? (
                filteredContacts.map((favorite: Entry, i: number) => (
                  <EntryView key={i} entry={favorite} />
                ))
              ) : (
                <TableRow>
                  <TableCell>連絡先が登録されていません。</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Layout>
  )
}

export default FavoriteView
