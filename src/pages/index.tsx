import { Button } from "@material-ui/core"
import { useRouter } from "next/router"
import { createContext, useContext, useEffect, useState } from "react"
import Layout from "../components/Layout"
import { UserContext } from "../lib/context"
import { emailLogin, listenAuthstate } from "../lib/operating"


const Home = () => {
  const userState = useContext(UserContext);
  const router = useRouter()
  console.log(userState)

  useEffect(()=>{
    // emailLogin()
    listenAuthstate()
  })
  return (
    <Layout title={"連絡帳"}>
      {/* サインインしてるかどうかで表示を変える */}
      <h1>hello nextjs</h1>
      {userState.isSignedin ? (
        <p>サインイン</p>
      ):(
        <p>unsignin</p>
      )}
      <Button onClick={()=>{}}>ログイン</Button>
      <div></div>
    </Layout>
  );
};

export default Home