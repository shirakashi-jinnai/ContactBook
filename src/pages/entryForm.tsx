import _ from 'lodash'
import { useState, useContext, ChangeEvent, useEffect } from 'react'
import { useRouter } from 'next/router'
import { auth, db } from '../lib/firebase'
import { makeStyles } from '@material-ui/styles'
import { TextField } from '@material-ui/core'
import Layout from '../components/Layout'
import PrimaryButton from '../components/UIkit/PrimaryButton'

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

type EntryField = {
  firstName: string
  lastName: string
  phoneNumber: number
  email: string
  birthday: Date | null
  address: Address
  liked: boolean
}

const EntryForm = ({ id, title = '連絡先の登録' }) => {
  const classes = useStyles()
  const router = useRouter()
  const [entryAddress, setEntryAddress] = useState<EntryField>({
    firstName: '',
    lastName: '',
    phoneNumber: 0,
    email: '',
    birthday: null,
    address: {
      postalCode: '',
      prefecture: '',
      municipalities: '',
      houseNumber: '',
    },
    liked: false,
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
  const saveEntryAddress = async (data: EntryField) => {
    if (_.isEmpty(entryAddress.firstName) || _.isEmpty(entryAddress.lastName)) {
      alert('必須項目を入力してください')
      return
    }

    const colRef = db.collection(`users/${auth.currentUser.uid}/contacts`)
    id ? colRef.doc(id).update(data) : colRef.add(data)
    router.push('/')
  }

  useEffect(() => {
    if (!id) return
    const unsub = db
      .doc(`users/${auth.currentUser.uid}/contacts/${id}`)
      .onSnapshot((s) => {
        setEntryAddress(s.data() as EntryField)
      })
    return () => unsub()
  }, [id])

  return (
    <Layout title={title}>
      <div className={classes.entryArea}>
        <h1>{title}</h1>
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
          name='prefecture'
          value={entryAddress.address.prefecture}
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

export default EntryForm
