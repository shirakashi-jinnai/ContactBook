import { useContext } from 'react'
import _, { values } from 'lodash'
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
  const favorites: Contacts = _.keys(contacts)
    .filter((key) => contacts[key].liked == true)
    .reduce((res, key) => {
      res[key] = contacts[key]
      return res
    }, {})

  const resultFavorites = filteredContacts(favorites)

  return (
    <Layout title='お気に入りリスト'>
      <div className={classes.viewArea}>
        {isSearching && (
          <p>
            {_.keys(resultFavorites).length}件/
            {_.keys(favorites).length}件のヒット
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
              {_.isEmpty(favorites) ? (
                <TableRow>
                  <TableCell>お気に入りが登録されていません。</TableCell>
                </TableRow>
              ) : (
                _.keys(resultFavorites).map((key: string, i: number) => (
                  <ContactView key={i} contact={contacts[key]} id={key} />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Layout>
  )
}

export default FavoriteView
