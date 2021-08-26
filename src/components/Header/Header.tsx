import _ from 'lodash'
import { useState, useContext } from 'react'
import { auth } from '../../lib/firebase'
import {
  alpha,
  AppBar,
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import HeaderDrawer from './HeaderDrawer'
import { UserContext } from '../../lib/context'

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
  searchIcon: {
    position: 'absolute',
    pointerEvents: 'none',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  select: {
    color: 'white',
    marginTop: theme.spacing(2),
  },
  form: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}))

const Header = () => {
  const classes = useStyles()
  const [age, setAge] = useState<string>('')
  const { user, setUser } = useContext(UserContext)

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string)
  }

  const onChangeRange = (range: string) => {
    if (_.isEmpty(range)) {
      setUser({
        ...user,
        isSearchAgeRange: false,
        ageRange: { ranges: [], isLessThan: false },
      })
      return
    }
    const ranges: string[] = range.match(/\d./g)
    const isLessThan: boolean = /[未満]/.test(range)
    setUser({ ageRange: { ranges, isLessThan }, isSearchAgeRange: true })
  }

  const options = [
    { label: '10歳未満' },
    { label: '10歳~19歳' },
    { label: '20歳~29歳' },
    { label: '30歳~39歳' },
    { label: '40歳~49歳' },
    { label: '50歳~59歳' },
    { label: '60歳~69歳' },
    { label: '70歳~79歳' },
    { label: '80歳以上' },
  ]

  return (
    <div className={classes.grow}>
      {auth.currentUser && (
        <AppBar position='fixed'>
          <Toolbar>
            <HeaderDrawer />
            <Typography className={classes.title} variant='h6'>
              連絡帳
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder='連絡先を検索'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <FormControl className={classes.form}>
              <Select
                className={classes.select}
                value={age}
                onChange={handleChange}>
                <MenuItem value='None' onClick={() => onChangeRange('')}>
                  <em>年齢検索</em>
                </MenuItem>
                {options.map((option, i) => (
                  <MenuItem
                    key={i}
                    value={option.label}
                    onClick={() => onChangeRange(option.label)}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Toolbar>
        </AppBar>
      )}
    </div>
  )
}

export default Header
