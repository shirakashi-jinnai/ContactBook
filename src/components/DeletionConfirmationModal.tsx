import { Button, Modal } from '@material-ui/core'
import { auth, db } from '../lib/firebase'
import { makeStyles } from '@material-ui/styles'
import { useState } from 'react'
import { useRouter } from 'next/router'

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
const DeletionConfirmationModal = ({ modalOpen, onClose, id }) => {
  const classes = useStyles()
  const router = useRouter()
  const removeContact = async (id: string) => {
    await db.doc(`users/${auth.currentUser.uid}/contacts/${id}`).delete()
    router.push('/')
    console.log('deleted!')
  }

  return (
    <Modal open={modalOpen} onClose={close} className={classes.modal}>
      <div className={classes.paper}>
        <h3>削除しますか？</h3>
        <div>
          <Button
            color='primary'
            variant='contained'
            onClick={() => {
              removeContact(id)
              onClose()
            }}>
            削除する
          </Button>
          <Button color='secondary' variant='contained' onClick={close}>
            キャンセル
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default DeletionConfirmationModal
