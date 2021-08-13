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
  const [contactAddress, setContactAddress] = useState<entryForm>({
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
    setContactAddress({ ...contactAddress, [e.target.name]: e.target.value })
  }

  const onChangeAddress = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setContactAddress({
      ...contactAddress,
      address: { ...contactAddress.address, [e.target.name]: e.target.value },
    })
  }

  //firestoreに保存
  const saveContactAddress = async (data: entryForm) => {
    if (!contactAddress.firstName || !contactAddress.lastName) {
      alert('必須項目を入力してください')
      return
    }
    const contactListRef = db
      .doc(`users/${user.uid}`)
      .collection('contactList')
      .doc()
    await contactListRef.set(data)
    setUser({ ...user, contactList: [...user.contactList, data] })
    console.log('success!', user)
    router.push('/')
  }

  return (
    <Layout title='連絡先の作成'>
      <div className={classes.entryArea}>
        <h1>連絡先の作成</h1>
        <TextField
          label='姓(必須)'
          value={contactAddress.lastName}
          name='lastName'
          onChange={onChangeValue}
        />
        <TextField
          label='名(必須)'
          value={contactAddress.firstName}
          name='firstName'
          onChange={onChangeValue}
        />
        <TextField
          label='メール'
          type='email'
          name='email'
          value={contactAddress.email}
          onChange={onChangeValue}
        />
        <TextField
          label='電話番号'
          name='phoneNumber'
          value={contactAddress.phoneNumber}
          onChange={onChangeValue}
        />
        <p>住所</p>
        <TextField
          label='郵便番号'
          name='postalCode'
          value={contactAddress.address.postalCode}
          onChange={onChangeAddress}
        />
        <TextField
          label='都道府県'
          name='prefectures'
          value={contactAddress.address.prefectures}
          onChange={onChangeAddress}
        />
        <TextField
          label='市区町村'
          name='municipalities'
          value={contactAddress.address.municipalities}
          onChange={onChangeAddress}
        />
        <TextField
          label='番地'
          name='houseNumber'
          value={contactAddress.address.houseNumber}
          onChange={onChangeAddress}
        />
        <p>生年月日</p>
        <TextField
          type='date'
          name='birthday'
          value={contactAddress.birthday}
          onChange={onChangeValue}
        />
      </div>
      <div className={classes.button}>
        <PrimaryButton
          label='保存'
          onClick={() => saveContactAddress(contactAddress)}
        />
      </div>
    </Layout>
  )
}

export default EntryAddress
