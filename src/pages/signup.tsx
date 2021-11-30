import { useState } from 'react'
import { TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Layout from '../components/Layout'
import PrimaryButton from '../components/UIkit/PrimaryButton'
import { sendEmail } from '../lib/utils'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { useRouter } from 'next/dist/client/router'

const provider = new GoogleAuthProvider()

const useStyles = makeStyles({
  signup: {
    maxWidth: 450,
    width: '100%',
    margin: '40px auto 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgb(237, 228, 245)',
    borderRadius: 5,
  },
  signinButton: {
    display: 'flex',
    justifyContent: 'center',
  },
})

const SignupPage = () => {
  const classes = useStyles()
  const router = useRouter()
  const [email, setEmail] = useState<string>('')

  const googleSignin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        router.push('/')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log('errcode', errorCode)
        console.log('errMessage', errorMessage)
      })
  }

  return (
    <Layout title={'signup'}>
      <form className={classes.signup} onSubmit={() => sendEmail(email)}>
        <h1>メールリンク認証</h1>
        <TextField
          fullWidth={true}
          label={'メールアドレス'}
          value={email}
          type={'email'}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
        <PrimaryButton label='SIGNUP' onClick={() => sendEmail(email)} />
      </form>
      <div className={classes.signinButton}>
        <PrimaryButton
          label='Google でサインイン'
          onClick={() => googleSignin()}
        />
      </div>
    </Layout>
  )
}

export default SignupPage
