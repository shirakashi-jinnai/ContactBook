import { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'
import Layout from '../components/Layout'
import PrimaryButton from '../components/UIkit/PrimaryButton'
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core'

const useStyles = makeStyles({
  entryArea: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    width: '600px',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
  },
})

type address = {
  postalCode: number | undefined
  Prefectures: string
  municipalities: string | number
}

type contactForm = {
  firstName: string
  lastName: string
  phoneNumber: number | undefined
  email: string
  birthday: string
  address: address
}

const EntryAddress = () => {
  const classes = useStyles()
  const [contactValue, setContactValue] = useState<contactForm>({
    firstName: '',
    lastName: '',
    phoneNumber: undefined,
    email: '',
    birthday: '',
    address: {
      postalCode: undefined,
      Prefectures: '',
      municipalities: '',
    },
  })

  const onChangeValue = (e) => {
    setContactValue({ ...contactValue, [e.target.name]: e.target.value })
  }

  const inputAddress = (e) => {
    setContactValue({
      ...contactValue,
      address: { ...contactValue.address, [e.target.name]: e.target.value },
    })
  }

  return (
    <Layout title='連絡先の作成'>
      <h1>連絡先の作成</h1>
      <div className={classes.entryArea}>
        <TextField
          label='姓'
          value={contactValue.lastName}
          name='lastName'
          onChange={(e) => onChangeValue(e)}
        />
        <TextField
          label='名'
          value={contactValue.firstName}
          name='firstName'
          onChange={(e) => onChangeValue(e)}
        />
        <TextField
          label='メール'
          type='email'
          name='email'
          value={contactValue.email}
          onChange={(e) => onChangeValue(e)}
        />
        <TextField
          label='電話番号'
          name='phoneNumber'
          value={contactValue.phoneNumber}
          onChange={(e) => onChangeValue(e)}
        />
        <p>住所</p>
        <TextField
          label='郵便番号'
          name='postalCode'
          value={contactValue.address.postalCode}
          onChange={(e) => {
            inputAddress(e)
          }}
        />
        <TextField
          label='都道府県'
          name='Prefectures'
          value={contactValue.address.Prefectures}
          onChange={(e) => {
            inputAddress(e)
          }}
        />
        <TextField
          label='市区町村'
          name='municipalities'
          value={contactValue.address.municipalities}
          onChange={(e) => {
            inputAddress(e)
          }}
        />
        <p>生年月日</p>
        <TextField
          type='date'
          name='birthday'
          value={contactValue.birthday}
          onChange={(e) => onChangeValue(e)}
        />
      </div>
      <div className={classes.button}>
        <PrimaryButton
          label='保存'
          onClick={() => {
            console.log(contactValue)
          }}
        />
      </div>
    </Layout>
  )
}

export default EntryAddress
