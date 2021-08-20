import Link from 'next/link'
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import { useState } from 'react'
import { Menu } from '@material-ui/icons'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import HomeIcon from '@material-ui/icons/Home'
import FavoriteIcon from '@material-ui/icons/Favorite'

const HeaderDrawer = (props) => {
  const menus = [
    { label: 'ホームへ', path: '/', icon: <HomeIcon /> },
    {
      label: '連絡先を登録',
      path: '/entryAddress',
      icon: <AddCircleOutlineIcon />,
    },
    { label: 'お気に入りリスト', path: '/entryForm', icon: <FavoriteIcon /> },
    { label: 'サインアウト', path: '/entryForm', icon: <ExitToAppIcon /> },
  ]
  return (
    <>
      <IconButton onClick={(e) => props.toggleDrawer(true, e)}>
        <Menu />
      </IconButton>
      <Drawer
        anchor={'left'}
        open={props.toggleOpen}
        onClose={(e) => props.toggleDrawer(false, e)}>
        {/* <div> */}
        <List>
          {menus.map((menu) => (
            <Link href={menu.path}>
              <ListItem button onClick={(e) => props.toggleDrawer(false, e)}>
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            </Link>
          ))}
        </List>
        {/* </div> */}
      </Drawer>
    </>
  )
}

export default HeaderDrawer
