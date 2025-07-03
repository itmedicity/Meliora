import { ActionTyps } from '../constants/action.type'
const { FETCH_DEPTSECT_DEPT } = ActionTyps
//intial state
const deptSectionDept = {
  deptsectiondeptList: [],
  loadingStatus: false,
}
/*** Deptsection action type check then payload set to the state and loading status set as true */
export const getDeptsectionDept = (state = deptSectionDept, { type, payload }) => {
  switch (type) {
    case FETCH_DEPTSECT_DEPT:
      return { ...state, deptsectiondeptList: payload, loadingStatus: true }
    default:
      return state
  }
}
