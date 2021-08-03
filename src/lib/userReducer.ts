import * as actions from './actions';

const initialState = {
  user: {
    isSignedin: false,
    username: '',
    contactList: [],
  },
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case actions.USER_SIGNIN:
      return { ...state, user: { ...action.payload } };
    case actions.USER_SIGNOUT:
      return initialState;
    default:
      return state;
  }
};

export default {
  initialState,
  reducer,
};
