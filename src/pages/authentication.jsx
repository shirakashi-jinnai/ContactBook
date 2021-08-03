import { useEffect } from "react";
import { emailLogin } from "../lib/operating";

const Authentication = () => {
    // const path = emailLogin()
    // console.log(path)
  useEffect(() => {
    emailLogin();
  }, []);
  return <h1>Authentication...</h1>;
};

export default Authentication;
