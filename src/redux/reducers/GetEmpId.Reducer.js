import { ActionTyps } from '../constants/action.type'
const { FETCH_EMP_ID } = ActionTyps
//intial state
const empid = {
  emp: [],
  loadingStatus: false,
}
/*** Deptsection action type check then payload set to the state and loading status set as true */
export const getEmpId = (state = empid, { type, payload }) => {
  switch (type) {
    case FETCH_EMP_ID:
      return { ...state, emp: payload, loadingStatus: true }
    default:
      return state
  }
}
