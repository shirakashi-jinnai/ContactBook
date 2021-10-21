/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { makeStyles } from '@mui/styles'
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

    if (!isSignInWithEmailLink(auth, window.location.href)) {
      console.log('not emailLink')
      window.localStorage.removeItem('emailForSignIn')
      return
    }

    try {
      await signInWithEmailLink(auth, email, window.location.href)
      window.localStorage.removeItem('emailForSignIn')
      const { uid } = auth.currentUser
      console.log(uid, email)
      await setDoc(doc(db, 'users', uid), {
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
