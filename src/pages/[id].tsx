import EntryForm from './entryForm'
import { useRouter } from 'next/dist/client/router'

const EntryEdit = () => {
  const router = useRouter()
  const { id } = router.query
  return <EntryForm id={id} title='連絡先の編集' />
}

export default EntryEdit
