import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { userSignin } from './actions'
import { db, auth } from './firebase'
import userReducer from './userReducer'

const dispatch = userReducer.reducer



export const sendEmail = (email) => {

    const callback = 'http://localhost:3000/'
    const actionCodeSettings = {
        url: callback,
        handleCodeInApp: true,
    }

    auth.sendSignInLinkToEmail(email, actionCodeSettings)
        .then(() => {
            window.localStorage.setItem('emailForSignIn', email);
            alert('メールを送信しました')
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
}


export const emailLogin = () => {
    //メールリンクによるloginなのかを判断する
    if (auth.isSignInWithEmailLink(window.location.href)) {
        console.log('login')
        const email = window.localStorage.getItem('emailForSignIn')
        if (!email) {
            email = window.prompt('Please provide your email for confirmation');
        }
        auth.signInWithEmailLink(email, window.location.href)
            .then(() => {
                window.localStorage.removeItem('emailForSignIn')
                const user = auth.currentUser
                dispatch(userSignin(user))
                console.log('login success', user)
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const listenAuthstate = () => {
    auth.onAuthStateChanged(user => {
        if (user) {
            console.log(user, 'success')
        } else {
            emailLogin()
        }
    })
}