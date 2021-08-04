import { makeStyles, TextField } from '@material-ui/core'
import { useCallback, useContext, useState } from 'react'
import Layout from '../components/Layout'
import PrimaryButton from '../components/UIkit/PrimaryButton'
import TextInput from '../components/UIkit/TextInput'
import { UserContext } from '../lib/context'
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
        <TextInput
          fullWidth={true}
          label={'メールアドレス'}
          margin='dense'
          multiline={false}
          required={true}
          rows={1}
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
