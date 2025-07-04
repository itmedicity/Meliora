import { ActionTyps } from '../constants/action.type'
const { FETCH_REQUEST_TYPE } = ActionTyps
//intial state
const requestType = {
  requesttypeList: [],
  loadingStatus: false
}
/*** Requesttype action type check then payload set to the state and loading status set as true */
export const getRequesttype = (state = requestType, { type, payload }) => {
  switch (type) {
    case FETCH_REQUEST_TYPE:
      return { ...state, requesttypeList: payload, loadingStatus: true }
    default:
      return state
  }
}
