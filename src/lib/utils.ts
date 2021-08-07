import { user } from 'firebase-functions/lib/providers/auth'
import { resolve } from 'path/posix'
import { db, auth } from './firebase'

export const sendEmail = async (email: string) => {
  if (!email) {
    alert('メールアドレスを入力してください')
    return
  }
  const callbackUrl = location.origin
  console.log(callbackUrl)

  const actionCodeSettings = {
    url: callbackUrl,
    handleCodeInApp: true,
  }

  window.localStorage.setItem('emailForSignIn', email), 'setitem'
  try {
    await auth.sendSignInLinkToEmail(email, actionCodeSettings)
    alert('メールを送信しました')
  } catch (error) {
    console.log(error.code)
    console.log(error.message)
    alert(error.message)
  }
}

export const emailSignin = async () => {
  //メールリンクによるloginなのかを判断する
  let email = localStorage.getItem('emailForSignIn')

  if (auth.isSignInWithEmailLink(window.location.href)) {
    if (!email) {
      email = window.prompt('確認のためにメールアドレスを入力してください')
    }

    try {
      await auth.signInWithEmailLink(email, window.location.href)
      window.localStorage.removeItem('emailForSignIn')
      auth.onAuthStateChanged(({uid}) => {
        console.log('signup success', uid)
        db.collection('users').doc(uid).set({
          uid: uid,
          contactlist: [],
        })
      })
    } catch (error) {
      console.log('エラー', error)
      window.localStorage.removeItem('emailForSignIn')
    }
  } else {
    console.log('not emailLink')
    window.localStorage.removeItem('emailForSignIn')
  }
}

