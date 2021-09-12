import React from 'react'
import { useState, useContext, useCallback, FC } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { auth, db } from '../lib/firebase'
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  TableCell,
  TableRow,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { DateTime } from 'luxon'
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
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
  nameTag: {
    cursor: 'pointer',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}))

//削除時のモーダル
const RemoveModal = ({ modalOpen, close, id }) => {
  const classes = useStyles()
  const removeContact = async (id: string) => {
    await db.doc(`users/${auth.currentUser.uid}/contacts/${id}`).delete()
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
  contact: Contact
  id: string
}

const ContactView: FC<Props> = (props) => {
  const router = useRouter()
  const classes = useStyles()
  const { firstName, lastName, liked, address, birthday } = props.contact

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

  const toggleLike = async () => {
    const docRef = db.doc(`users/${auth.currentUser.uid}/contacts/${props.id}`)
    await docRef.update({ liked: !liked })
  }

  return (
    <>
      <RemoveModal
        modalOpen={modalOpen}
        close={handleCloseModal}
        id={props.id}
      />
      <TableRow>
        <TableCell>
          <Link href={`/${props.id}`} passHref>
            <a className={classes.nameTag}>{`${lastName} ${firstName}`}</a>
          </Link>
        </TableCell>
        <TableCell>{address.prefecture}</TableCell>
        <TableCell>
          {birthday && DateTime.fromJSDate(birthday).toFormat('yyyy-MM-dd')}
        </TableCell>
        <TableCell align='center'>
          <IconButton onClick={toggleLike}>
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton onClick={handleClickMenu}>
            <MoreVertIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleCloseMenu}>
        <Link href={`/edit/${props.id}`} passHref>
          <MenuItem>
            <EditIcon />
            <a className={classes.link}>編集</a>
          </MenuItem>
        </Link>
        <MenuItem
          onClick={() => {
            handleCloseMenu()
            handleOpenModal()
          }}>
          <DeleteIcon />
          削除
        </MenuItem>
      </Menu>
    </>
  )
}

export default ContactView
