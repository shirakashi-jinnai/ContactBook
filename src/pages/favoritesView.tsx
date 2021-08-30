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
import EntryView from '../components/entryView'

const useStyles = makeStyles({
  viewArea: {
    maxWidth: 850,
    margin: '0 auto',
  },
})

const FavoriteView = () => {
  const classes = useStyles()
  const { user, filterContactsBySearchConditions, isSearching } =
    useContext(UserContext)
  const { contacts } = user

  //検索元の値
  const favorites = _.filter(contacts, 'liked')

  //検索された値
  const filteredFavorites = _.filter(
    filterContactsBySearchConditions(),
    'liked'
  )

  //検索中の場合検索された値を表示
  const filteredContacts = isSearching ? filteredFavorites : favorites

  const Tbody = !_.isEmpty(favorites) ? (
    filteredContacts.map((favorite: Entry, i: number) => (
      <EntryView key={i} entry={favorite} />
    ))
  ) : (
    <TableRow>
      <TableCell>お気に入りが登録されていません。</TableCell>
    </TableRow>
  )

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
            <TableBody>{Tbody}</TableBody>
          </Table>
        </TableContainer>
      </div>
    </Layout>
  )
}

export default FavoriteView
