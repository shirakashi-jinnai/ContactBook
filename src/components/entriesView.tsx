import React from 'react'
import { useState, useContext, useCallback } from 'react'
import { useRouter } from 'next/router'
import { db } from '../lib/firebase'
import {
  Button,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Modal,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import FavoriteIcon from '@material-ui/icons/Favorite'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { UserContext } from '../lib/context'

const useStyles = makeStyles((theme) => ({
  item: {
    height: 100,
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
}))

//削除時のモーダル
const RemoveModal = ({ modalOpen, close, id }) => {
  const { user } = useContext(UserContext)
  const classes = useStyles()

  const removeEntry = async (id: string) => {
    await db.doc(`users/${user.uid}/contacts/${id}`).delete()
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
              removeEntry(id)
              close()
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

type Props = {
  entry: {
    firstName: string
    lastName: string
    id: string
  }
}

const EntriesView = (props: Props) => {
  const router = useRouter()
  const classes = useStyles()
  const { firstName, lastName, id } = props.entry

  const [modalOpen, setModalOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)

  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  return (
    <>
      <RemoveModal modalOpen={modalOpen} close={handleCloseModal} id={id} />
      <ListItem button className={classes.item}>
        <ListItemText primary={`${lastName} ${firstName}`} />
        <IconButton>
          <FavoriteIcon />
        </IconButton>
        <IconButton onClick={handleClickMenu}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleCloseMenu}>
          <MenuItem
            onClick={() => {
              //TODO:foo
              handleCloseMenu()
            }}>
            <EditIcon />
            編集
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleCloseMenu()
              handleOpenModal()
            }}>
            <DeleteIcon />
            削除
          </MenuItem>
        </Menu>
      </ListItem>
      <Divider />
    </>
  )
}

export default EntriesView
