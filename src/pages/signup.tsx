import { TextField } from "@material-ui/core";
import { useCallback, useContext, useState } from "react";
import Layout from "../components/Layout";
import PrimaryButton from "../components/UIkit/PrimaryButton";
import TextInput from "../components/UIkit/TextInput";
import { UserContext } from "../lib/context";
import {sendEmail, signup}from '../lib/operating'

const SignupPage = () => {
  const [email, setEmail] = useState<string>("");

  const inputEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );

  return (
    <Layout title={"signup"}>
      <h1>signup</h1>
      <div>
        <div>
          <TextInput
            fullWidth={true}
            label={"メールアドレス"}
            margin="dense"
            multiline={false}
            required={true}
            rows={1}
            value={email}
            type={"email"}
            onChange={inputEmail}
          />
          <PrimaryButton
            label="メールリンク認証"
            // onClick={() => signup(username, email, password, confirmpassword)}
            onClick={()=>sendEmail(email)}
          />
        </div>
      </div>
    </Layout>
  );
};

export default SignupPage;
