import { ActionTyps } from '../constants/action.type'
const { FETCH_LOGIN_PROFILE_DATA } = ActionTyps
//intial state
const loginProfile = {
  loginProfiledata: [],
  loadingStatus: false
}
/*** Deptsection action type check then payload set to the state and loading status set as true */
export const getLoginProfileData = (state = loginProfile, { type, payload }) => {
  switch (type) {
    case FETCH_LOGIN_PROFILE_DATA:
      return { ...state, loginProfiledata: payload, loadingStatus: true }
    default:
      return state
  }
}
