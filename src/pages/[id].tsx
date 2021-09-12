import Layout from '../components/Layout'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import { auth, db } from '../lib/firebase'
import { TimestampConberter } from '../lib/TimestampConverter'
import { Container } from '@material-ui/core'

const ContactDetaile = () => {
  const router = useRouter()
  const { id } = router.query
  const [contact, setContact] = useState({
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
  })
  useEffect(() => {
    db.doc(`users/${auth.currentUser.uid}/contacts/${id}`)
      .withConverter(new TimestampConberter())
      .onSnapshot((s) => {
        s.data()
        console.log(s.data())
        setContact(s.data() as Contact)
      })
  }, [id])
  return (
    <Layout title='連絡先の詳細'>
      <Container maxWidth='md'>
        <h1>連絡先の詳細</h1>
      </Container>
    </Layout>
  )
}
export default ContactDetaile
