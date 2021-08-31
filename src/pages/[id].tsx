import ContactForm from './contactForm'
import { useRouter } from 'next/dist/client/router'

const ContactEdit = () => {
  const router = useRouter()
  const { id } = router.query
  return <ContactForm id={id} title='連絡先の編集' />
}

export default ContactEdit
