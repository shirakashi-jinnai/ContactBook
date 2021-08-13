import { useState, useContext, ChangeEvent } from 'react'
import { makeStyles } from '@material-ui/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'
import Layout from '../components/Layout'
import PrimaryButton from '../components/UIkit/PrimaryButton'
import { TextField } from '@material-ui/core'
import { db } from '../lib/firebase'
import { UserContext } from '../lib/context'
import { useRouter } from 'next/router'
import _ from 'lodash'

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
  postalCode: number | string
  prefectures: string
  municipalities: string
  houseNumber: number | string
}

type entryForm = {
  firstName: string
  lastName: string
  phoneNumber: number | string
  email: string
  birthday: string
  address: address
}

const EntryAddress = () => {
  const classes = useStyles()
  const router = useRouter()
  const { user, setUser } = useContext(UserContext)
  const [entryAddress, setEntryAddress] = useState<entryForm>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    birthday: '',
    address: {
      postalCode: '',
      prefectures: '',
      municipalities: '',
      houseNumber: '',
    },
  })

  const onChangeValue = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setEntryAddress({ ...entryAddress, [e.target.name]: e.target.value })
  }

  const onChangeAddress = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setEntryAddress({
      ...entryAddress,
      address: { ...entryAddress.address, [e.target.name]: e.target.value },
    })
  }

  //firestoreに保存
  const saveEntryAddress = async (data: entryForm) => {
    if (_.isEmpty(entryAddress.firstName) || _.isEmpty(entryAddress.lastName)) {
      alert('必須項目を入力してください')
      return
    }
    const contactsRef = db.doc(`users/${user.uid}`).collection('contacts').doc()
    await contactsRef.set(data)
    setUser({ ...user, contacts: [...user.contacts, data] })
    console.log('success!', user)
    router.push('/')
  }

  return (
    <Layout title='連絡先の作成'>
      <div className={classes.entryArea}>
        <h1>連絡先の作成</h1>
        <TextField
          label='姓(必須)'
          required
          value={entryAddress.lastName}
          name='lastName'
          onChange={onChangeValue}
        />
        <TextField
          label='名(必須)'
          required
          value={entryAddress.firstName}
          name='firstName'
          onChange={onChangeValue}
        />
        <TextField
          label='メール'
          type='email'
          name='email'
          value={entryAddress.email}
          onChange={onChangeValue}
        />
        <TextField
          label='電話番号'
          name='phoneNumber'
          value={entryAddress.phoneNumber}
          onChange={onChangeValue}
        />
        <p>住所</p>
        <TextField
          label='郵便番号'
          name='postalCode'
          value={entryAddress.address.postalCode}
          onChange={onChangeAddress}
        />
        <TextField
          label='都道府県'
          name='prefectures'
          value={entryAddress.address.prefectures}
          onChange={onChangeAddress}
        />
        <TextField
          label='市区町村'
          name='municipalities'
          value={entryAddress.address.municipalities}
          onChange={onChangeAddress}
        />
        <TextField
          label='番地'
          name='houseNumber'
          value={entryAddress.address.houseNumber}
          onChange={onChangeAddress}
        />
        <p>生年月日</p>
        <TextField
          type='date'
          name='birthday'
          value={entryAddress.birthday}
          onChange={onChangeValue}
        />
      </div>
      <div className={classes.button}>
        <PrimaryButton
          label='保存'
          onClick={() => saveEntryAddress(entryAddress)}
        />
      </div>
    </Layout>
  )
}

export default EntryAddress
