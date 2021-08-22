import Link from 'next/link'
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

const HeaderDrawer = ({ toggleDrawer, toggleOpen }) => {
  const menus = [
    { label: 'ホームへ', path: '/', icon: <HomeIcon /> },
    {
      label: '連絡先を登録',
      path: '/entryForm',
      icon: <AddCircleOutlineIcon />,
    },
    { label: 'お気に入りリスト', path: '/entryForm', icon: <FavoriteIcon /> },
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
        anchor={'left'}
        open={toggleOpen}
        onClose={(e) => toggleDrawer(false, e)}>
        <List>
          {menus.map((menu) => (
            <>
              <Link href={menu.path}>
                <ListItem button>
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <ListItemText primary={menu.label} />
                </ListItem>
              </Link>
              <Divider />
            </>
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

export default HeaderDrawer
