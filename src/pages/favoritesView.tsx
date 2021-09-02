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
import ContactView from '../components/ContactView'

const useStyles = makeStyles({
  viewArea: {
    maxWidth: 850,
    margin: '0 auto',
  },
})

const FavoriteView = () => {
  const classes = useStyles()
  const { contacts, isSearching, filteredContacts } = useContext(UserContext)

  //検索元の値
  const favorites = Object.keys(contacts).filter(
    (contact) => contacts[contact].liked == true
  )

  const resultFavorites = filteredContacts(favorites)

  const ViewResults = (): any =>
    !_.isEmpty(favorites) ? (
      favorites.map((favorite, i) => (
        <ContactView key={i} contact={contacts[favorite]} />
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
            {resultFavorites.length}件/
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
              <ViewResults />
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Layout>
  )
}

export default FavoriteView
