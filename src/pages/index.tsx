import _ from 'lodash'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { db } from '../lib/firebase'
import Layout from '../components/Layout'
import { UserContext } from '../lib/context'

const Home = () => {
  const router = useRouter()
  const { user, setUser } = useContext(UserContext)
  console.log(user)

  // useEffect(() => {
  //   const unsub = db
  //     .doc(`users/${user.uid}`)
  //     .collection('contacts')
  //     .onSnapshot((s) => {
  //       const items = _.map(s.docs, (doc) => {
  //         return { id: doc.id, ...doc.data() }
  //       })
  //       const data = { ...user, contacts: items }
  //       setUser(data)
  //     })
  //   return () => unsub()
  // }, [])

  return (
    <Layout title={'連絡帳'}>
      <h1>hello nextjs</h1>
      <Link href='/signup'>
        <a>サインアップ</a>
      </Link>
      <Link href='/entryForm'>
        <a>登録ページ</a>
      </Link>
      <div></div>
    </Layout>
  )
}

export default Home
