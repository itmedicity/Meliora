import { ActionTyps } from '../constants/action.type'
const { FETCH_EMP_DEPTSECTION_LIST } = ActionTyps
//intial state
const departsecemployee = {
  departsecempList: [],
  loadingStatus: false
}
/***  Departmentemployee action type check then payload set to the state and loading status set as true */
export const getDepartSecemployee = (state = departsecemployee, { type, payload }) => {
  switch (type) {
    case FETCH_EMP_DEPTSECTION_LIST:
      return { ...state, departsecempList: payload, loadingStatus: true }
    default:
      return state
  }
}
