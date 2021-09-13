import _ from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import { auth, db } from '../lib/firebase'
import { DateTime } from 'luxon'
import { TimestampConberter } from '../lib/TimestampConverter'
import Layout from '../components/Layout'
import {
  Container,
  Divider,
  Typography,
  makeStyles,
  IconButton,
} from '@material-ui/core'
import PrimaryButton from '../components/UIkit/PrimaryButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'

const useStyles = makeStyles({
  button: {
    textDecoration: 'none',
    display: 'flex',
    justifyContent: 'center',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
})

const ContactDetaile = () => {
  const router = useRouter()
  const { id } = router.query
  const classes = useStyles()
  const [contact, setContact] = useState<Contact>()
  const [modalOpen, setModalOpen] = useState(false)

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

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
      {contact && (
        <Container maxWidth='sm'>
          <div className={classes.header}>
            <Typography variant='h5' gutterBottom color='inherit'>
              連絡先の詳細
            </Typography>
            <div>
              <IconButton>
                {contact.liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </div>
          </div>
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
          <div className={classes.button}>
            <Link href={`/edit/${id}`}>
              <a style={{ textDecoration: 'none' }}>
                <PrimaryButton label='編集する' onClick={() => ''} />
              </a>
            </Link>
          </div>
        </Container>
      )}
    </Layout>
  )
}
export default ContactDetaile
