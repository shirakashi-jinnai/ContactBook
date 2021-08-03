import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { userSignin } from './actions';
import { db, auth } from './firebase';


export const sendEmail = async (email) => {
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
    });
};

export const emailLogin = async () => {
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
        // dispatch(() => userSignin());
      })
      .catch((error) => {
        console.log('エラーコード', error);
      });
  }
};

export const listenAuthstate = async () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log(user.uid, 'success');
    } else {
      console.log('emailLogin');
      emailLogin();
    }
  });
};
