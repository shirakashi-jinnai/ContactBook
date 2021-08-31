import _ from 'lodash'
import { useState, useContext, ChangeEvent, useEffect } from 'react'
import { useRouter } from 'next/router'
import { DateTime } from 'luxon'
import { auth, db } from '../lib/firebase'
import { makeStyles } from '@material-ui/styles'
import { TextField } from '@material-ui/core'
import Layout from '../components/Layout'
import PrimaryButton from '../components/UIkit/PrimaryButton'
import firebase from 'firebase'

const useStyles = makeStyles({
  contactArea: {
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

type ContactField = {
  firstName: string
  lastName: string
  phoneNumber: number
  email: string
  birthday: Date | null
  address: Address
  liked: boolean
}

const ContactForm = ({ id, title = '連絡先の登録' }) => {
  const classes = useStyles()
  const router = useRouter()
  const [contactAddress, setContactAddress] = useState<ContactField>({
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
  const saveContactAddress = async (data: ContactField) => {
    if (_.isEmpty(contactAddress.firstName) || _.isEmpty(contactAddress.lastName)) {
      alert('必須項目を入力してください')
      return
    }

    contactAddress.birthday = new Date(contactAddress.birthday)
    const colRef = db.collection(`users/${auth.currentUser.uid}/contacts`)
    id ? colRef.doc(id).update(data) : colRef.add(data)
    router.push('/')
  }

  useEffect(() => {
    if (!id) return
    const unsub = db
      .doc(`users/${auth.currentUser.uid}/contacts/${id}`)
      .onSnapshot((s) => {
        setContactAddress(s.data() as ContactField)
      })
    return () => unsub()
  }, [id])

  return (
    <Layout title={title}>
      <div className={classes.contactArea}>
        <h1>{title}</h1>
        <TextField
          label='姓(必須)'
          required
          value={contactAddress.lastName}
          name='lastName'
          onChange={onChangeValue}
        />
        <TextField
          label='名(必須)'
          required
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
          name='prefecture'
          value={contactAddress.address.prefecture}
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

export default ContactForm
