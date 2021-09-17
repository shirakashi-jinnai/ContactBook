import _ from 'lodash'
import { useEffect, useReducer } from 'react'
import { useRouter } from 'next/router'
import { DateTime } from 'luxon'
import { auth, db } from '../lib/firebase'
import { makeStyles } from '@material-ui/styles'
import { TextField } from '@material-ui/core'
import Layout from '../components/Layout'
import PrimaryButton from '../components/UIkit/PrimaryButton'
import { TimestampConverter } from '../lib/TimestampConverter'

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

const ContactForm = ({ id, title = '連絡先の登録' }) => {
  const classes = useStyles()
  const router = useRouter()

  const [contact, setContact] = useReducer(
    (state: Contact, data: Partial<Contact>) => _.merge({}, state, data),
    {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      birthday: null,
      address: {
        postalCode: '',
        prefecture: '',
        municipalities: '',
        houseNumber: '',
      },
    }
  )

  const onAddressChange = (e) => {
    setContact({ address: { [e.target.name]: e.target.value } })
  }

  const onValueChange = (e) => {
    const value = {
      [e.target.name]:
        e.target.name == 'birthday' ? new Date(e.target.value) : e.target.value,
    }
    setContact(value)
  }

  //firestoreに保存
  const saveContact = (data: Partial<Contact>) => {
    if (_.isEmpty(contact.firstName) || _.isEmpty(contact.lastName)) {
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
      .withConverter(new TimestampConverter())
      .onSnapshot((s) => setContact(s.data()))
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
        <PrimaryButton label='保存' onClick={() => saveContact(contact)} />
      </div>
    </Layout>
  )
}

export default ContactForm
