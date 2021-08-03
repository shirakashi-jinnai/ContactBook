import { TextField } from '@material-ui/core';
import { useCallback, useContext, useState } from 'react';
import Layout from '../components/Layout';
import PrimaryButton from '../components/UIkit/PrimaryButton';
import TextInput from '../components/UIkit/TextInput';
import { UserContext } from '../lib/context';
import { sendEmail } from '../lib/operating';

const SignupPage = () => {
  const [email, setEmail] = useState<string>('');

  return (
    <Layout title={'signup'}>
      <form className='form-container' onSubmit={() => sendEmail(email)}>
        <h1>メールリンク認証</h1>
        <TextInput
          fullWidth={true}
          label={'メールアドレス'}
          margin='dense'
          multiline={false}
          required={true}
          rows={1}
          value={email}
          type={'email'}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <div className='module-spacer--medium' />
        <PrimaryButton label='SIGNUP' onClick={() => sendEmail(email)} />
        <div className='module-spacer--medium' />
      </form>
    </Layout>
  );
};

export default SignupPage;
