import _ from 'lodash'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import { DateTime } from 'luxon'
import { auth, db } from '../lib/firebase'
import {
  Container,
  Divider,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import PrimaryButton from '../components/UIkit/PrimaryButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import DeletionConfirmationModal from '../components/DeletionConfirmationModal'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Layout from '../components/Layout'
import { TimestampConverter } from '../lib/TimestampConverter'
import { toggleLike } from '../lib/utils'
import { makeStyles } from '@mui/styles'

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
  imageArea: {
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    objectFit: 'cover',
    borderRadius: '50%',
    objectPosition: '50% 50%',
  },
})

const ContactDetaile = () => {
  const router = useRouter()
  const id = router.query.id as string
  const classes = useStyles()
  const [contact, setContact] = useState<Contact>()
  const [modalOpen, setModalOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  useEffect(() => {
    const unsub = db
      .doc(`users/${auth.currentUser.uid}/contacts/${id}`)
      .withConverter(new TimestampConverter<Contact>())
      .onSnapshot((s) => {
        setContact(s.data())
      })
    return () => unsub()
  }, [id])

  return (
    <Layout title='連絡先の詳細'>
      <DeletionConfirmationModal
        id={id}
        modalOpen={modalOpen}
        onClose={handleCloseModal}
      />
      {contact && (
        <Container maxWidth='sm'>
          <div className={classes.header}>
            <Typography variant='h5' gutterBottom color='inherit'>
              連絡先の詳細
            </Typography>
            <div>
              <IconButton onClick={() => toggleLike(id)}>
                {contact.liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
              <IconButton onClick={handleClickMenu}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleCloseMenu}>
                <Link href={`/edit/${id}`} passHref>
                  <MenuItem>
                    <EditIcon />
                    <a>編集</a>
                  </MenuItem>
                </Link>
                <MenuItem
                  onClick={() => {
                    handleCloseMenu()
                    handleOpenModal()
                  }}>
                  <DeleteIcon />
                  削除
                </MenuItem>
              </Menu>
            </div>
          </div>
          <div>
            <div className={classes.imageArea}>
              <Image
                className={classes.image}
                src={contact.avatarImg.path}
                alt='avatar'
                width={200}
                height={200}
              />
            </div>

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
              {contact.birthday
                ? DateTime.fromJSDate(contact.birthday).toFormat('yyyy-MM-dd')
                : 'none'}
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
                <PrimaryButton label='編集する' />
              </a>
            </Link>
          </div>
        </Container>
      )}
    </Layout>
  )
}
export default ContactDetaile
