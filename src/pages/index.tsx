import { Button } from '@material-ui/core'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { firebaseContext } from '../lib/context'
import Link from 'next/link'

const Home = () => {
  const { state } = useContext(firebaseContext)
  console.log(state)

  return (
    <Layout title={'連絡帳'}>
      <h1>hello nextjs</h1>
      <Link href='/signup'>
        <a>サインアップ</a>
      </Link>
      <div></div>
    </Layout>
  )
}

export default Home
