import { db, auth } from './firebase'

export const sendEmail = async (email: string) => {
  if (!email) {
    alert('メールアドレスを入力してください')
    return
  }
  const callback = 'https://pineapple-8d06c.web.app/'

  const actionCodeSettings = {
    url: callback,
    handleCodeInApp: true,
  }

  window.localStorage.setItem('emailForSignIn', email), 'setitem'

  return new Promise(() => {
    auth
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        alert('メールを送信しました')
      })
      .catch((error) => {
        console.log(error.code)
        console.log(error.message)
        alert(error.message)
      })
  })
}

export const emailSignin = async () => {
  //メールリンクによるloginなのかを判断する
  // console.log(window.localStorage.getItem('emailForSignIn'), 'getitem')
  // let email = localStorage.getItem('emailForSignIn')
  let email=''

  return new Promise(() => {
    if (auth.isSignInWithEmailLink(window.location.href)) {
      if (!email) {
        email = window.prompt('確認のためにメールアドレスを入力してください')
      }
      auth
        .signInWithEmailLink(email, window.location.href)
        .then(() => {
          window.localStorage.removeItem('emailForSignIn')
          auth.onAuthStateChanged((user) => {
            const uid = user.uid
            console.log('login success', uid)
            db.collection('users').doc(uid).set({
              uid: uid,
              contactlist: [],
            })
          })
        })
        .catch((error) => {
          console.log('エラー', error)
          window.localStorage.removeItem('emailForSignIn')
        })
    } else {
      console.log('not emailLink')
      window.localStorage.removeItem('emailForSignIn')
    }
  })
}

export const listenAuthstate = async () => {
  return new Promise((resolve) => {
    auth.onAuthStateChanged((user: any) => {
      if (user != null) {
        // ユーザー情報取得成功
        console.log(user, 'signin')
        resolve(user)
      } else {
        console.log('null')
        resolve(null)
      }
    })
  })
}
