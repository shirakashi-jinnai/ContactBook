import Link from 'next/link'
import React, { memo, ReactElement } from 'react'
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import HomeIcon from '@material-ui/icons/Home'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { auth } from '../../lib/firebase'
import { FC, useState } from 'react'

type MenuItem = {
  label: string
  path: string
  icon: ReactElement
}

const HeaderDrawer: FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const toggleDrawer = (setDrawerOpen: boolean, e: any) => {
    if (
      e.type === 'keydown' &&
      ((e as React.KeyboardEvent).key === 'Tab' ||
        (e as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }
    setIsDrawerOpen(setDrawerOpen)
  }
  const menuItems: MenuItem[] = [
    { label: 'ホームへ', path: '/', icon: <HomeIcon /> },
    {
      label: '連絡先を登録',
      path: '/contactForm',
      icon: <AddCircleOutlineIcon />,
    },
    {
      label: 'お気に入りリスト',
      path: '/favoritesView',
      icon: <FavoriteIcon />,
    },
  ]

  const signout = () => {
    try {
      auth.signOut()
      console.log('signout')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <IconButton onClick={(e) => toggleDrawer(true, e)}>
        <Menu />
      </IconButton>
      <Drawer
        anchor='left'
        open={isDrawerOpen}
        onClose={(e) => toggleDrawer(false, e)}>
        <List>
          {menuItems.map((item, i) => (
            <React.Fragment key={i}>
              <Link href={item.path} passHref>
                <ListItem button>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              </Link>
              <Divider />
            </React.Fragment>
          ))}
          <ListItem button onClick={signout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary='サインアウト' />
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}

export default memo(HeaderDrawer)
