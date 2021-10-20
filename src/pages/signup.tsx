import { useState } from 'react'
import { TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Layout from '../components/Layout'
import PrimaryButton from '../components/UIkit/PrimaryButton'
import { sendEmail } from '../lib/utils'

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
})

const SignupPage = () => {
  const classes = useStyles()
  const [email, setEmail] = useState<string>('')

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
    </Layout>
  )
}

export default SignupPage
