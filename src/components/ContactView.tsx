import React from 'react'
import { useState, FC } from 'react'
import Link from 'next/link'
import { DateTime } from 'luxon'
import {
  Avatar,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  TableCell,
  TableRow,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DeletionConfirmationModal from './DeletionConfirmationModal'
import { toggleLike } from '../lib/utils'
import { Theme } from '@mui/system'

const useStyles = makeStyles((theme: Theme) => ({
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
  responsiveCell: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}))

type Props = {
  contact: Contact
  contactId: string
}

const ContactView: FC<Props> = ({ contact, contactId }) => {
  const classes = useStyles()
  const {
    avatarImg,
    firstName,
    lastName,
    liked,
    address,
    birthday,
    trashed,
  } = contact

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
        id={contactId}
        trashed={trashed}
      />
      <TableRow>
        <TableCell>
          <Avatar src={avatarImg.path || '/user.png'} alt='avatar' />
        </TableCell>
        <TableCell>
          <Link href={`/${contactId}`} passHref>
            <a className={classes.nameTag}>{`${lastName} ${firstName}`}</a>
          </Link>
        </TableCell>
        <TableCell className={classes.responsiveCell}>
          {address.prefecture}
        </TableCell>
        <TableCell className={classes.responsiveCell}>
          {birthday && DateTime.fromJSDate(birthday).toFormat('yyyy-MM-dd')}
        </TableCell>
        <TableCell align='center'>
          <IconButton onClick={() => toggleLike(contactId)}>
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton onClick={handleClickMenu}>
            <MoreVertIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleCloseMenu}>
        <Link href={`/edit/${contactId}`} passHref>
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
