import { ActionTyps } from '../constants/action.type'
const { FETCH_DEPARTMENT } = ActionTyps
//initial state
const departmentName = {
  departmentList: [],
  loadingStatus: false,
}
/*** Department action type check then payload set to the state and loading status set as true */
export const getDepartment = (state = departmentName, { type, payload }) => {
  switch (type) {
    case FETCH_DEPARTMENT:
      return { ...state, departmentList: payload, loadingStatus: true }
    default:
      return state
  }
}
