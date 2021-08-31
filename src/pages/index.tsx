import _ from 'lodash'
import { useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import Layout from '../components/Layout'
import { UserContext } from '../lib/context'
import ContactView from '../components/ContactView'
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
  const { contacts, filteredContacts, isSearching } = useContext(UserContext)
  const resultContacts = filteredContacts(contacts)

  const ViewResults = () =>
    !_.isEmpty(contacts) ? (
      resultContacts.map((contact: Contact, i: number) => (
        <ContactView key={i} contact={contact} />
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
            {resultContacts.length}件/
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
              <ViewResults />
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Layout>
  )
}

export default Home
