import _ from 'lodash'
import { useContext } from 'react'
import {
  Container,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import DeleteForever from '@material-ui/icons/DeleteForever'
import { makeStyles } from '@material-ui/core'
import { db, auth } from '../lib/firebase'
import Layout from '../components/Layout'
import { UserContext } from '../lib/context'
import TrashView from '../components/TrashView'

const useStyles = makeStyles({
  fab: {
    position: 'fixed',
    top: 600,
    left: 1200,
  },
})

const TrashList = () => {
  const classes = useStyles()
  const { contacts } = useContext(UserContext)
  const trashList = _(contacts)
    .keys()
    .filter((key) => contacts[key].isTrash)
    .reduce((res, key) => ((res[key] = contacts[key]), res), {})

  const deleteAllTrashLists = () => {
    db.collection(`users/${auth.currentUser.uid}/contacts`)
      .where('isTrash', '==', true)
      .get()
      .then((snapshots) => {
        snapshots.forEach((s) =>
          db.doc(`users/${auth.currentUser.uid}/contacts/${s.id}`).delete()
        )
      })
  }

  return (
    <>
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
                {_.isEmpty(trashList) ? (
                  <TableRow>
                    <TableCell>ゴミ箱は空です</TableCell>
                  </TableRow>
                ) : (
                  _.map(trashList, (c, key) => (
                    <TrashView trashList={c} id={key} key={key} />
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>

        {!_.isEmpty(trashList) && (
          <Fab
            variant='extended'
            color='secondary'
            className={classes.fab}
            onClick={deleteAllTrashLists}>
            <DeleteForever />
            ゴミ箱を空にする
          </Fab>
        )}
      </Layout>
    </>
  )
}

export default TrashList
