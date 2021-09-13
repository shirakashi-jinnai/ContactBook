import _ from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import { auth, db } from '../lib/firebase'
import { DateTime } from 'luxon'
import { TimestampConberter } from '../lib/TimestampConverter'
import Layout from '../components/Layout'
import { Container, Divider, Typography, makeStyles } from '@material-ui/core'
import PrimaryButton from '../components/UIkit/PrimaryButton'

const useStyles = makeStyles({
  button: {
    textDecoration: 'none',
    display: 'flex',
    justifyContent: 'center',
  },
})

const ContactDetaile = () => {
  const router = useRouter()
  const { id } = router.query
  const classes = useStyles()
  const [contact, setContact] = useState<Contact>()

  useEffect(() => {
    db.doc(`users/${auth.currentUser.uid}/contacts/${id}`)
      .withConverter(new TimestampConberter())
      .onSnapshot((s) => {
        s.data()
        setContact(s.data() as Contact)
      })
  }, [id])
  return (
    <Layout title='連絡先の詳細'>
      <Container maxWidth='sm'>
        <Typography variant='h5' gutterBottom color='inherit'>
          連絡先の詳細
        </Typography>
        {contact && (
          <div>
            <Typography variant='caption' color='inherit'>
              名前
            </Typography>
            <Typography color='inherit'>
              {contact.lastName} {contact.firstName}
            </Typography>
            <Divider />

            <Typography variant='caption' color='inherit'>
              電話番号
            </Typography>
            <Typography>{contact.phoneNumber || 'none'}</Typography>
            <Divider />

            <Typography variant='caption' color='inherit'>
              メールアドレス
            </Typography>
            <Typography>{contact.email || 'none'}</Typography>
            <Divider />

            <Typography variant='caption' color='inherit'>
              生年月日
            </Typography>
            <Typography color='inherit'>
              {DateTime.fromJSDate(contact.birthday).toFormat('yyyy-MM-dd') ||
                'none'}
            </Typography>
            <Divider />

            <p>住所</p>
            <Typography color='inherit'>
              {contact.address.postalCode || 'none'}
            </Typography>
            <Divider />

            <Typography variant='caption' color='inherit'>
              都道府県
            </Typography>
            <Typography color='inherit'>
              {contact.address.prefecture || 'none'}
            </Typography>
            <Divider />

            <Typography variant='caption' color='inherit'>
              市区町村
            </Typography>
            <Typography color='inherit'>
              {contact.address.municipalities || 'none'}
            </Typography>
            <Divider />

            <Typography variant='caption' color='inherit'>
              番地
            </Typography>
            <Typography color='inherit'>
              {contact.address.houseNumber || 'none'}
            </Typography>
            <Divider />
          </div>
        )}
        <div className={classes.button}>
          <Link href={`/edit/${id}`}>
            <a style={{ textDecoration: 'none' }}>
              <PrimaryButton label='編集する' onClick={() => ''} />
            </a>
          </Link>
        </div>
      </Container>
    </Layout>
  )
}
export default ContactDetaile
