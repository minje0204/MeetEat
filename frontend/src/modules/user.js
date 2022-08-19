// actions

const SET_USER_INFO = "user/SET_USER_INFO";
const CLEAR_USER_INFO = "user/CLEAR_USER_INFO";

export const SetUserInfo = data => ({
  type: SET_USER_INFO,
  data,
});
export const ClearUserInfo = () => ({
  type: CLEAR_USER_INFO,
});

const initialState = {
  loggedInfo: { nickname: "", email: "", bio: "", profile: "", id: null },
  logged: false,
  accessToken: "",
};

// reducer

export default function user(state = initialState, action) {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        loggedInfo: {
          nickname: action.data.nickname,
          email: action.data.email,
          bio: action.data.bio,
          profile: action.data.profile,
        },
        logged: true,
        accessToken: action.data.accessToken,
      };
    case CLEAR_USER_INFO:
      return initialState;
    default:
      return state;
  }
}
