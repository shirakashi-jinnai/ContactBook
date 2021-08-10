import { makeStyles } from '@material-ui/styles'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { auth, db } from '../lib/firebase'

const useStyles = makeStyles({
  authentication: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const Authentication = () => {
  const classes = useStyles()
  const router = useRouter()

  const emailSignin = async () => {
    //メールリンクによるsigninなのかを判断する
    const email =
      localStorage.getItem('emailForSignIn') ||
      window.prompt('確認のためにメールアドレスを入力してください')

    if (!auth.isSignInWithEmailLink(window.location.href)) {
      console.log('not emailLink')
      window.localStorage.removeItem('emailForSignIn')
      return
    }

    try {
      await auth.signInWithEmailLink(email, window.location.href)
      window.localStorage.removeItem('emailForSignIn')
      const { uid } = auth.currentUser
      console.log(uid, email)
      db.collection('users').doc(uid).set({
        uid: uid,
        email: email,
      })
      router.push('/')
    } catch (error) {
      console.log('エラー', error)
      window.localStorage.removeItem('emailForSignIn')
      router.push('/signup')
    }
  }

  useEffect(() => {
    emailSignin()
  }, [])

  return (
    <div className={classes.authentication}>
      <h1>認証中...</h1>
    </div>
  )
}

export default Authentication
