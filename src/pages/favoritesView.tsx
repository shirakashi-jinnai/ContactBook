import _ from 'lodash'
import { useContext } from 'react'
import Layout from '../components/Layout'
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import { UserContext } from '../lib/context'
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
  const favorites = _(contacts)
    .keys()
    .filter((key) => contacts[key].liked)
    .reduce((res, key) => ((res[key] = contacts[key]), res), {})

  const resultFavorites = filteredContacts(favorites)

  return (
    <Layout title='お気に入りリスト'>
      <div className={classes.viewArea}>
        {isSearching && (
          <p>
            {_.size(resultFavorites)}件/
            {_.size(favorites)}件のヒット
          </p>
        )}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
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
                _.map(resultFavorites, (c, key) => (
                  <ContactView key={key} contact={c} id={key} />
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
