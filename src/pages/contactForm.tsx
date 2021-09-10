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
import { Contacts } from '@material-ui/icons'

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
  const [contact, setContact] = useState<ContactField>({
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

  const onValueChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setContact({
      ...contact,
      [e.target.name]:
        e.target.name !== 'birthday'
          ? e.target.value
          : new Date(e.target.value),
    })
  }

  const onAddressChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setContact({
      ...contact,
      address: { ...contact.address, [e.target.name]: e.target.value },
    })
  }

  //firestoreに保存
  const savecontact = async (data: ContactField) => {
    if (_.isEmpty(contact.firstName) || _.isEmpty(contact.lastName)) {
      alert('必須項目を入力してください')
      return
    }

    const colRef = db.collection(`users/${auth.currentUser.uid}/contacts`)
    id ? colRef.doc(id).update(data) : colRef.add(data)
    router.push('/')
  }
  console.log('birthday', contact.birthday)

  useEffect(() => {
    if (!id) return
    const unsub = db
      .doc(`users/${auth.currentUser.uid}/contacts/${id}`)
      .onSnapshot((s) => {
        if (s.data().birthday) {
          const data = {
            ...s.data(),
            birthday: new Date(s.data().birthday.toDate()),
          }
          setContact(data as ContactField)
          return
        }
        setContact(s.data() as ContactField)
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
          value={contact.lastName}
          name='lastName'
          onChange={onValueChange}
        />
        <TextField
          label='名(必須)'
          required
          value={contact.firstName}
          name='firstName'
          onChange={onValueChange}
        />
        <TextField
          label='メール'
          type='email'
          name='email'
          value={contact.email}
          onChange={onValueChange}
        />
        <TextField
          label='電話番号'
          name='phoneNumber'
          value={contact.phoneNumber}
          onChange={onValueChange}
        />
        <p>住所</p>
        <TextField
          label='郵便番号'
          name='postalCode'
          value={contact.address.postalCode}
          onChange={onAddressChange}
        />
        <TextField
          label='都道府県'
          name='prefecture'
          value={contact.address.prefecture}
          onChange={onAddressChange}
        />
        <TextField
          label='市区町村'
          name='municipalities'
          value={contact.address.municipalities}
          onChange={onAddressChange}
        />
        <TextField
          label='番地'
          name='houseNumber'
          value={contact.address.houseNumber}
          onChange={onAddressChange}
        />
        <p>生年月日</p>
        <TextField
          type='date'
          name='birthday'
          value={DateTime.fromJSDate(contact.birthday).toFormat('yyyy-MM-dd')}
          onChange={onValueChange}
        />
      </div>
      <div className={classes.button}>
        <PrimaryButton label='保存' onClick={() => savecontact(contact)} />
      </div>
    </Layout>
  )
}

export default ContactForm
