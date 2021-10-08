import _ from 'lodash'
import { useContext } from 'react'
import Layout from '../components/Layout'
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import { UserContext } from '../lib/context'
import ContactView from '../components/ContactView'

const FavoriteView = () => {
  const { contacts, isSearching, filteredContacts } = useContext(UserContext)

  //検索元の値
  const favorites = _(contacts)
    .keys()
    .filter((key) => contacts[key].liked)
    .reduce((res, key) => ((res[key] = contacts[key]), res), {})

  const resultFavorites = filteredContacts(favorites)

  return (
    <Layout title='お気に入りリスト'>
      <Container maxWidth='md'>
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
                  <ContactView key={key} contact={c} contactId={key} />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Layout>
  )
}

export default FavoriteView
