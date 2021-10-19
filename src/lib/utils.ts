import _ from 'lodash'
import { sendSignInLinkToEmail } from '@firebase/auth'
import { db, auth } from './firebase'

export const sendEmail = async (email: string): Promise<void> => {
  if (!email) {
    alert('メールアドレスを入力してください')
    return
  }
  const callbackUrl = `${location.origin}/authentication`

  const actionCodeSettings = {
    url: callbackUrl,
    handleCodeInApp: true,
  }

  window.localStorage.setItem('emailForSignIn', email), 'setitem'
  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings)
    alert('メールを送信しました')
  } catch (error) {
    console.log(error.code)
    console.log(error.message)
    alert(error.message)
  }
}

export const toggleLike = async (id: string) => {
  const docRef = db.doc(`users/${auth.currentUser.uid}/contacts/${id}`)
  const { liked } = await docRef.get().then((doc) => doc.data())
  await docRef.update({ liked: !liked })
}

export const toggleTrashed = async (id: string) => {
  const docRef = db.doc(`users/${auth.currentUser.uid}/contacts/${id}`)
  const { trashed } = await docRef.get().then((doc) => doc.data())
  await docRef.update({ trashed: !trashed })
}
