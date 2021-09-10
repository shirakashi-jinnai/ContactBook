import _ from 'lodash'
import { useEffect, useReducer } from 'react'
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

type Profile = {
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  birthday: Date | null
}

type ContactField = {
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  birthday: Date | null
  address: Address
}

const ContactForm = ({ id, title = '連絡先の登録' }) => {
  const classes = useStyles()
  const router = useRouter()
  const [profile, setProfile] = useReducer(
    (state: Profile, data: Partial<Profile>) => _.assign({}, state, data),
    {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      birthday: null,
    }
  )
  const [address, setAddress] = useReducer(
    (state: Address, data: Partial<Address>) => _.assign({}, state, data),
    {
      postalCode: '',
      prefecture: '',
      municipalities: '',
      houseNumber: '',
    }
  )

  const onAddressChange = (e) => {
    setAddress({ [e.target.name]: e.target.value })
  }

  const onValueChange = (e) => {
    const value = {
      [e.target.name]:
        e.target.name == 'birthday' ? new Date(e.target.value) : e.target.value,
    }
    setProfile(value)
  }

  //firestoreに保存
  const saveContact = (data: ContactField) => {
    if (_.isEmpty(profile.firstName) || _.isEmpty(profile.lastName)) {
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
        setAddress(s.data().address)
        delete s.data().address
        if (s.data().birthday) {
          const data = {
            ...s.data(),
            birthday: new Date(s.data().birthday.toDate()),
          }
          setProfile(data)
          return
        }
        setProfile(s.data())
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
          value={profile.lastName}
          name='lastName'
          onChange={onValueChange}
        />
        <TextField
          label='名(必須)'
          required
          value={profile.firstName}
          name='firstName'
          onChange={onValueChange}
        />
        <TextField
          label='メール'
          type='email'
          name='email'
          value={profile.email}
          onChange={onValueChange}
        />
        <TextField
          label='電話番号'
          name='phoneNumber'
          value={profile.phoneNumber}
          onChange={onValueChange}
        />
        <p>住所</p>
        <TextField
          label='郵便番号'
          name='postalCode'
          value={address.postalCode}
          onChange={onAddressChange}
        />
        <TextField
          label='都道府県'
          name='prefecture'
          value={address.prefecture}
          onChange={onAddressChange}
        />
        <TextField
          label='市区町村'
          name='municipalities'
          value={address.municipalities}
          onChange={onAddressChange}
        />
        <TextField
          label='番地'
          name='houseNumber'
          value={address.houseNumber}
          onChange={onAddressChange}
        />
        <p>生年月日</p>
        <TextField
          type='date'
          name='birthday'
          value={DateTime.fromJSDate(profile.birthday).toFormat('yyyy-MM-dd')}
          onChange={onValueChange}
        />
      </div>
      <div className={classes.button}>
        <PrimaryButton
          label='保存'
          onClick={() => saveContact({ ...profile, address })}
        />
      </div>
    </Layout>
  )
}

export default ContactForm
