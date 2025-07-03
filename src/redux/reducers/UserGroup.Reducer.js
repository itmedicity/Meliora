import { ActionTyps } from '../constants/action.type'
const { FETCH_USER_GROUP_NAME } = ActionTyps
//initial state
const userGroupname = {
  userGroupnameList: [],
  loadingStatus: false,
}
/*** User group action type check then payload set to the state and loading status set as true */
export const getUserGroup = (state = userGroupname, { type, payload }) => {
  switch (type) {
    case FETCH_USER_GROUP_NAME:
      return { ...state, userGroupnameList: payload, loadingStatus: true }
    default:
      return state
  }
}
