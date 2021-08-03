import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { userSignin } from '../lib/actions';
import { UserContext, UserUpdateContext } from '../lib/context';
import { emailSignin, listenAuthstate } from '../lib/operating';

const Home = () => {
   const userState = useContext(UserContext);
   const dispatch = useContext(UserUpdateContext);
   const router = useRouter();
   console.log(userState);

   useEffect(() => {
      emailSignin();
      listenAuthstate();
   });
   return (
      <Layout title={'連絡帳'}>
         <h1>hello nextjs</h1>
         {userState.isSignedin ? <p>サインイン</p> : <p>unsignin</p>}
         <Button
            onClick={() => {
               dispatch(userSignin());
            }}>
            ログイン
         </Button>
         <div></div>
      </Layout>
   );
};

export default Home;
