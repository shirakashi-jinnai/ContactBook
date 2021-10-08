import _ from 'lodash'
import { useContext, useState } from 'react'
import {
  Button,
  Container,
  Fab,
  Modal,
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
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    background: '#fff',
    borderRadius: 5,
    width: 250,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
  },
})

const TrashList = () => {
  const classes = useStyles()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)
  const { contacts } = useContext(UserContext)
  const trashedContacts = _(contacts)
    .keys()
    .filter((key) => contacts[key].trashed)
    .reduce((res, key) => ((res[key] = contacts[key]), res), {})

  const deleteAllTrashedContacts = () => {
    db.collection(`users/${auth.currentUser.uid}/contacts`)
      .where('trashed', '==', true)
      .get()
      .then((snapshots) => {
        snapshots.forEach((s) =>
          db.doc(`users/${auth.currentUser.uid}/contacts/${s.id}`).delete()
        )
      })
  }

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        className={classes.modal}>
        <div className={classes.paper}>
          <h3>ゴミ箱を空にしますか？</h3>
          <div>
            <Button
              color='primary'
              variant='contained'
              onClick={() => {
                deleteAllTrashedContacts()
                handleCloseModal()
              }}>
              削除する
            </Button>
            <Button
              color='secondary'
              variant='contained'
              onClick={handleCloseModal}>
              キャンセル
            </Button>
          </div>
        </div>
      </Modal>

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
                {_.isEmpty(trashedContacts) ? (
                  <TableRow>
                    <TableCell>ゴミ箱は空です</TableCell>
                  </TableRow>
                ) : (
                  _.map(trashedContacts, (c, key) => (
                    <TrashView trashedContact={c} contactId={key} key={key} />
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>

        {!_.isEmpty(trashedContacts) && (
          <Fab
            variant='extended'
            color='secondary'
            className={classes.fab}
            onClick={handleOpenModal}>
            <DeleteForever />
            ゴミ箱を空にする
          </Fab>
        )}
      </Layout>
    </>
  )
}

export default TrashList
