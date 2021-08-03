export const USER_SIGNIN = 'USER_SIGNIN';
export const userSignin = () => {
  return {
    isSigndin: true,
    contactList: [],
  };
};

export const USER_SIGNOUT = 'USER_SIGNOUT';
export const userSignout = () => {
  return {
    type: USER_SIGNOUT,
  };
};
