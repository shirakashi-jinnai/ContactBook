import React from 'react'
import { useState, useContext, useCallback } from 'react'
import { useRouter } from 'next/router'
import {
  Divider,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { makeStyles } from '@material-ui/styles'
import { Delete, Edit, Favorite } from '@material-ui/icons'
import { UserContext } from '../lib/context'

const useStyles = makeStyles((theme) => ({
  item: {
    height: 100,
  },
}))

const EntrysView = (props: {
  entry: { firstName: string; lastName: string }
}) => {
  const router = useRouter()
  const classes = useStyles()
  const { user } = useContext(UserContext)
  console.log(user)
  const { firstName, lastName } = props.entry

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
    },
    [setAnchorEl]
  )

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <ListItem button className={classes.item}>
        <ListItemText primary={`${lastName} ${firstName}`} />
        <IconButton onClick={() => console.log('お気に入り登録ボタン')}>
          <Favorite />
        </IconButton>
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem
            onClick={() => {
              //routerで編集ページに遷移させる
              handleClose()
            }}>
            <Edit />
            編集
          </MenuItem>
          <MenuItem
            onClick={() => {
              // 削除される
              handleClose()
            }}>
            <Delete />
            削除
          </MenuItem>
        </Menu>
      </ListItem>
      <Divider />
    </>
  )
}

export default EntrysView
