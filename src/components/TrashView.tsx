import { useState } from 'react'
import { DateTime } from 'luxon'
import {
  Avatar,
  IconButton,
  TableCell,
  TableRow,
  MenuItem,
  Menu,
} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import RestoreFromTrash from '@material-ui/icons/RestoreFromTrash'
import DeleteForever from '@material-ui/icons/DeleteForever'
import { toggleIsTrash } from '../lib/utils'
import DeletionConfirmationModal from './DeletionConfirmationModal'

const TrashView = (props) => {
  const { firstName, lastName, avatarImg, birthday, address ,isTrash} = props.trashList
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)
  const [modalOpen,setModalOpen]=useState<boolean>(false)

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
      id={props.id}
      modalOpen={modalOpen}
      onClose={handleCloseModal}
      isTrash={isTrash}
    />
    
      <TableRow>
        <TableCell>
          <Avatar src={avatarImg.path} alt='avatar' />
        </TableCell>
        <TableCell>
          {lastName} {firstName}
        </TableCell>
        <TableCell>{address.prefecture}</TableCell>
        <TableCell>
          {birthday && DateTime.fromJSDate(birthday).toFormat('yyyy-MM-dd')}
        </TableCell>
        <TableCell align='center'>
          <IconButton onClick={handleClickMenu}>
            <MoreVertIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleCloseMenu}>
        <MenuItem
          onClick={() => {
            toggleIsTrash(props.id)
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
