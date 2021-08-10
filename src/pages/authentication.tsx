import { makeStyles } from '@material-ui/styles'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { auth, db } from '../lib/firebase'

const useStyles = makeStyles({
  authomation: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const Authentication = () => {
  const classes = useStyles()
  const router = useRouter()

  const emailSignin = async () => {
    //メールリンクによるloginなのかを判断する
    let email = localStorage.getItem('emailForSignIn')
    console.log(email)

    if (auth.isSignInWithEmailLink(window.location.href)) {
      if (!email) {
        email = window.prompt('確認のためにメールアドレスを入力してください')
      }

      try {
        await auth.signInWithEmailLink(email, window.location.href)
        window.localStorage.removeItem('emailForSignIn')
        auth.onAuthStateChanged(({ uid }) => {
          console.log('signup success', uid)
          db.collection('users').doc(uid).set({
            uid: uid,
            email: email,
          })
        })
        router.push('/')
      } catch (error) {
        console.log('エラー', error)
        window.localStorage.removeItem('emailForSignIn')
        router.push('/signup')
      }
    } else {
      console.log('not emailLink')
      window.localStorage.removeItem('emailForSignIn')
    }
  }

  useEffect(() => {
    emailSignin()
  }, [])

  return (
    <div className={classes.authomation}>
      <h1>認証中...</h1>
    </div>
  )
}

export default Authentication
