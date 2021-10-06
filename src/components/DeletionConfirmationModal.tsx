import { useRouter } from 'next/router'
import { auth, db } from '../lib/firebase'
import { Button, Modal } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { toggleIsTrash } from '../lib/utils'

const useStyles = makeStyles({
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

//削除時のモーダル
const DeletionConfirmationModal = ({ modalOpen, onClose, id, isTrash }) => {
  const classes = useStyles()
  const router = useRouter()
  const removeContact = async (id: string) => {
    await db.doc(`users/${auth.currentUser.uid}/contacts/${id}`).delete()
    router.push('/')
  }

  return (
    <Modal open={modalOpen} onClose={onClose} className={classes.modal}>
      <div className={classes.paper}>
        {isTrash ? (
          <h3>完全に削除しますか？</h3>
        ) : (
          <h3>ゴミ箱へ移しますか？</h3>
        )}

        <div>
          {isTrash ? (
            <Button
              color='primary'
              variant='contained'
              onClick={() => {
                removeContact(id)
                onClose()
              }}>
              削除する
            </Button>
          ) : (
            <Button
              color='primary'
              variant='contained'
              onClick={() => {
                toggleIsTrash(id)
                onClose()
              }}>
              ゴミ箱へ
            </Button>
          )}

          <Button color='secondary' variant='contained' onClick={onClose}>
            キャンセル
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default DeletionConfirmationModal
