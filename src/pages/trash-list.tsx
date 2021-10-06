import _ from 'lodash'
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import { useContext } from 'react'
import Layout from '../components/Layout'
import { UserContext } from '../lib/context'
import ContactView from '../components/ContactView'
import TrashView from '../components/TrashView'

const TrashList = () => {
  const { contacts } = useContext(UserContext)
  const trashList = _(contacts)
    .keys()
    .filter((key) => contacts[key].isTrash)
    .reduce((res, key) => ((res[key] = contacts[key]), res), {})
  console.log('trashlist', trashList)

  return (
    <Layout title='ゴミ箱リスト'>
      <Container maxWidth='md'>
        <h1>ゴミ箱リスト</h1>
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
              {trashList &&
                _.map(trashList, (c, key) => (
                  <TrashView trashList={c} id={key} key={key} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Layout>
  )
}

export default TrashList
