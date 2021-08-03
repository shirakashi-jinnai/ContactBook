export const USER_SIGNIN = "USER_SIGNIN";
export const userSignin = (user) => {
  return {
    type: USER_SIGNIN,
    payload: {
      isSignedin: true,
      list:[]
    },
  };
};

export const USER_SIGNOUT = "USER_SIGNOUT";
export const userSignout = () => {
  return {
    type: USER_SIGNOUT
  };
};

