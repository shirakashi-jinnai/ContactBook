import _ from 'lodash'
import { useContext } from 'react'
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { UserContext } from '../lib/context'
import Layout from '../components/Layout'
import ContactView from '../components/ContactView'

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

export default Home
