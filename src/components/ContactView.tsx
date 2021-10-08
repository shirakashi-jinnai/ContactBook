import React from 'react'
import { useState, FC } from 'react'
import Link from 'next/link'
import { DateTime } from 'luxon'
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
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
  contactId: string
}

const ContactView: FC<Props> = (props) => {
  const classes = useStyles()
  const { avatarImg, firstName, lastName, liked, address, birthday, trashed } =
    props.contact

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
        id={props.contactId}
        trashed={trashed}
      />
      <TableRow>
        <TableCell>
          <Avatar src={avatarImg.path || '/user.png'} alt='avatar' />
        </TableCell>
        <TableCell>
          <Link href={`/${props.contactId}`} passHref>
            <a className={classes.nameTag}>{`${lastName} ${firstName}`}</a>
          </Link>
        </TableCell>
        <TableCell>{address.prefecture}</TableCell>
        <TableCell>
          {birthday && DateTime.fromJSDate(birthday).toFormat('yyyy-MM-dd')}
        </TableCell>
        <TableCell align='center'>
          <IconButton onClick={() => toggleLike(props.contactId)}>
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton onClick={handleClickMenu}>
            <MoreVertIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleCloseMenu}>
        <Link href={`/edit/${props.contactId}`} passHref>
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
