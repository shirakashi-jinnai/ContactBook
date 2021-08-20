import {
  alpha,
  AppBar,
  IconButton,
  InputBase,
  makeStyles,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { Menu, Search } from '@material-ui/icons'
import HeaderDrawer from './HeaderDrawer'
import { useState } from 'react'
import { auth } from '../../lib/firebase'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    background: alpha(theme.palette.common.white, 0.15),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchicon: {
    position: 'absolute',
    pointerEvents: 'none',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

const Header = () => {
  const classes = useStyles()
  const [toggleOpen, setToggleOpen] = useState(false)

  const toggleDrawer = (
    open: boolean,
    e: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      e.type === 'keydown' &&
      ((e as React.KeyboardEvent).key === 'Tab' ||
        (e as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }
    setToggleOpen(open)
    console.log(open)
  }

  return (
    <div className={classes.grow}>
      {auth.currentUser && (
        <AppBar position='fixed'>
          <Toolbar>
            <HeaderDrawer toggleDrawer={toggleDrawer} toggleOpen={toggleOpen} />
            <Typography className={classes.title} variant='h6'>
              連絡帳
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchicon}>
                <Search />
              </div>
              <InputBase
                placeholder='連絡先を検索'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
          </Toolbar>
        </AppBar>
      )}
    </div>
  )
}

export default Header
