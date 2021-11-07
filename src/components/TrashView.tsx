import { useState } from 'react'
import { DateTime } from 'luxon'
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  TableCell,
  TableRow,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import RestoreFromTrash from '@mui/icons-material/RestoreFromTrash'
import DeleteForever from '@mui/icons-material/DeleteForever'
import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/system'
import { toggleTrashed } from '../lib/utils'
import DeletionConfirmationModal from './DeletionConfirmationModal'

const useStyles = makeStyles((theme: Theme) => ({
  responsiveCell: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}))

type Props = {
  trashedContact: Contact
  contactId: string
}

const TrashView = ({ trashedContact, contactId }: Props) => {
  const {
    firstName,
    lastName,
    avatarImg,
    birthday,
    address,
    trashed,
    removeTime,
  } = trashedContact
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
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
        id={contactId}
        modalOpen={modalOpen}
        onClose={handleCloseModal}
        trashed={trashed}
      />

      <TableRow>
        <TableCell>
          <Avatar src={avatarImg.path} alt='avatar' />
        </TableCell>
        <TableCell>
          {lastName} {firstName}
        </TableCell>
        <TableCell className={classes.responsiveCell}>
          {address.prefecture}
        </TableCell>
        <TableCell className={classes.responsiveCell}>
          {birthday && DateTime.fromJSDate(birthday).toFormat('yyyy-MM-dd')}
        </TableCell>
        <TableCell align='center'>
          <IconButton onClick={handleClickMenu}>
            <MoreVertIcon />
          </IconButton>
        </TableCell>
        <TableCell align='center' className={classes.responsiveCell}>
          {DateTime.fromJSDate(removeTime).toFormat('yyyy-MM-dd')}
        </TableCell>
      </TableRow>

      <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleCloseMenu}>
        <MenuItem
          onClick={() => {
            toggleTrashed(contactId)
            handleCloseMenu()
          }}>
          <RestoreFromTrash />
          復元する
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleOpenModal()
            handleCloseMenu()
          }}>
          <DeleteForever />
          完全に削除する
        </MenuItem>
      </Menu>
    </>
  )
}

export default TrashView
