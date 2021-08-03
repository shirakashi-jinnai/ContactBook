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
      <h1>signup</h1>
      <div>
        <div>
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
          <PrimaryButton
            label='メールリンク認証'
            onClick={() => sendEmail(email)}
          />
        </div>
      </div>
    </Layout>
  );
};

export default SignupPage;
