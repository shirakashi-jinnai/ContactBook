import { db, auth } from './firebase';

export const sendEmail = async (email) => {
  if (!email) {
    alert('メールアドレスを入力してください');
    return;
  }
  const callback = 'http://localhost:3000/';
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
  if (auth.isSignInWithEmailLink(window.location.href)) {
    const email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      email = window.prompt('Please provide your email for confirmation');
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
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log('signin user',user.uid,) ;
      //dispatch
    }
  });
};
