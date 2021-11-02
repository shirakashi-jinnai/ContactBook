import _ from 'lodash'
import { useContext, useState } from 'react'
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from 'firebase/firestore'
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
} from '@mui/material'
import DeleteForever from '@mui/icons-material/DeleteForever'
import { makeStyles } from '@mui/styles'
import { db, auth } from '../lib/firebase'
import Layout from '../components/Layout'
import { UserContext } from '../lib/context'
import TrashView from '../components/TrashView'
import { Theme } from '@mui/system'

const useStyles = makeStyles((theme: Theme) => ({
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
  responsiveCell: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}))

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
    const contactsPath = `users/${auth.currentUser.uid}/contacts`
    const contactsCol = collection(db, contactsPath)
    const q = query(contactsCol, where('trashed', '==', true))
    getDocs(q).then((s) => {
      s.forEach((d) => deleteDoc(doc(db, contactsPath, d.id)))
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

      <Layout title='ゴミ箱'>
        <Container maxWidth='md'>
          <h1>ゴミ箱</h1>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>名前</TableCell>
                  <TableCell className={classes.responsiveCell}>住所</TableCell>
                  <TableCell className={classes.responsiveCell}>
                    生年月日
                  </TableCell>
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
