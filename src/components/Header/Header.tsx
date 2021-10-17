import _ from 'lodash'
import { useState, useContext } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import {
  AppBar,
  alpha,
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Toolbar,
  Typography,
} from '@mui/material'
import { makeStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core'
import { auth } from '../../lib/firebase'
import HeaderDrawer from './HeaderDrawer'
import { UserContext } from '../../lib/context'

const useStyles = makeStyles((theme: Theme) => ({
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
  },
  form: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  inputLabel: {
    color: '#fff',
  },
}))

type AgeFilterOption = {
  label: string
  min?: number
  max?: number
}

type AgeRange = {
  min?: number
  max?: number
}

const DEFAULT_LABEL = 'None'

const Header = () => {
  const classes = useStyles()
  const [age, setAge] = useState<AgeRange>({ min: null, max: null })
  const { setFilterCondition } = useContext(UserContext)

  const onAgeChange = (event: SelectChangeEvent<string>) => {
    const [min, max] = event.target.value.split('-')

    if (min === DEFAULT_LABEL) {
      setAge({ min: null, max: null })
      setFilterCondition({ ageRangeCondition: {} })
      return
    }

    const rangeValue = { min: Number(min), max: Number(max) }
    setAge(rangeValue)
    setFilterCondition({ ageRangeCondition: rangeValue })
  }

  const onQueryChange = (e) => {
    const query = e.target.value
    //queryを空白毎にくぎり、配列に変換
    //'山田　太郎'=>['山田','太郎']
    const queries = query.split(/\s+/).filter((v) => !_.isEmpty(v))
    setFilterCondition({ queries })
  }

  const ageFilterOptions: AgeFilterOption[] = [
    { label: '10歳未満', max: 10 },
    { label: '10歳~19歳', min: 10, max: 19 },
    { label: '20歳~29歳', min: 20, max: 29 },
    { label: '30歳~39歳', min: 30, max: 39 },
    { label: '40歳~49歳', min: 40, max: 49 },
    { label: '50歳~59歳', min: 50, max: 59 },
    { label: '60歳~69歳', min: 60, max: 69 },
    { label: '70歳~79歳', min: 70, max: 79 },
    { label: '80歳以上', min: 80 },
  ]

  //画面上にrenderさせるための値を加工する処理
  const renderValue = (v: string): string => {
    const [min, max] = v.split('-')

    if (!/\d/.test(v)) return DEFAULT_LABEL
    if (!/\d/.test(min)) return `${max}歳未満`
    if (!/\d/.test(max)) return `${min}歳以上`
    return `${min}歳~${max}歳`
  }

  //MenuItemに入力されるvalueと同じ値に変換する処理
  const convertValue = (v: AgeRange): string => {
    const { min, max } = v
    if (!min && !max) return DEFAULT_LABEL
    return `${min}-${max}`
  }

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
                onChange={onQueryChange}
              />
            </div>
            <FormControl className={classes.form}>
              <InputLabel className={classes.inputLabel} id='search-age-label'>
                年齢検索
              </InputLabel>
              <Select
                labelId='search-age-label'
                className={classes.select}
                value={convertValue(age)}
                renderValue={(v: string) => renderValue(v)}
                onChange={onAgeChange}>
                <MenuItem value={DEFAULT_LABEL}>
                  <em>None</em>
                </MenuItem>
                {ageFilterOptions.map(
                  (option, i): JSX.Element => (
                    <MenuItem key={i} value={`${option.min}-${option.max}`}>
                      {option.label}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Toolbar>
        </AppBar>
      )}
    </div>
  )
}

export default Header
