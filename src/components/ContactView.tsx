import React from 'react'
import { useState, useContext, useCallback, FC } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { auth, db } from '../lib/firebase'
import { DateTime } from 'luxon'
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
import DeletionConfirmationModal from './DeletionConfirmationModal'
import { toggleLike } from '../lib/utils'

const useStyles = makeStyles((theme) => ({
  item: {
    height: 100,
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
  nameTag: {
    cursor: 'pointer',
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}))

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

  return (
    <>
      <DeletionConfirmationModal
        modalOpen={modalOpen}
        onClose={handleCloseModal}
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
          <IconButton onClick={() => toggleLike(props.id)}>
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
