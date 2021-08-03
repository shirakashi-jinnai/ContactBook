import { db, auth } from './firebase';

export const sendEmail = async (email) => {
  if (!email) {
    alert('メールアドレスを入力してください');
    return;
  }
  const callback = 'https://pineapple-8d06c.web.app/';

  const actionCodeSettings = {
    url: callback,
    handleCodeInApp: true,
  };

  auth
    .sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => {
      window.localStorage.setItem('emailForSignIn', email);
      alert('メールを送信しました');
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
      alert(error.message);
    });
};

export const emailSignin = async () => {
  //メールリンクによるloginなのかを判断する
  let email = window.localStorage.getItem('emailForSignIn');
  console.log(email);
  if (auth.isSignInWithEmailLink(window.location.href)) {
    if (!email) {
      email = window.prompt('確認のためにメールアドレスを入力してください');
    }
    auth
      .signInWithEmailLink(email, window.location.href)
      .then(() => {
        window.localStorage.removeItem('emailForSignIn');
        auth.onAuthStateChanged((user) => {
          const uid = user.uid;
          console.log('login success', uid);
          db.collection('users').doc(uid).set({
            uid: uid,
            contactlist: [],
          });
        });
      })
      .catch((error) => {
        console.log('エラー', error);
      });
  } else {
    console.log('not emailLink');
  }
};

export const listenAuthstate = async () => {
  return new Promise((resolve) => {
    auth.onAuthStateChanged((user: any) => {
      if (user != null) {
        // ユーザー情報取得成功
        console.log(user, 'signin');
        resolve(user);
      } else {
        console.log('null');
        resolve(null);
      }
    });
  });
};
