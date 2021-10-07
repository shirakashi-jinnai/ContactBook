import _ from 'lodash'
import { useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import Layout from '../components/Layout'
import { UserContext } from '../lib/context'
import ContactView from '../components/ContactView'
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'

const Home = () => {
  const { contacts, filteredContacts, isSearching } = useContext(UserContext)
  const resultContacts = filteredContacts(contacts)

  return (
    <Layout title={'連絡帳'}>
      <Container maxWidth='md'>
        {isSearching && (
          <p>
            {_.size(resultContacts)}件/
            {_.size(contacts)}件のヒット
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
              {_.isEmpty(contacts) ? (
                <TableRow>
                  <TableCell>連絡先が登録されていません。</TableCell>
                </TableRow>
              ) : (
                _.map(resultContacts, (c, key) => (
                  <ContactView key={key} contact={c} id={key} />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Layout>
  )
}

export default Home
