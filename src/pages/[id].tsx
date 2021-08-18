import EntryForm from './entryForm'

const EntryEdit = () => {
  const path = window.location.pathname
  const id = path.split('/')[1]
  return <EntryForm id={id} title='連絡先の編集' />
}

export default EntryEdit
