import { ActionTyps } from '../constants/action.type'
const { FETCH_MULT_DEPT_SECTION } = ActionTyps
//intial state
const deptSectionDept = {
  deptsectiondeptList: [],
  loadingStatus: false,
}
/*** Deptsection action type check then payload set to the state and loading status set as true */
export const getMultDepSection = (state = deptSectionDept, { type, payload }) => {
  switch (type) {
    case FETCH_MULT_DEPT_SECTION:
      return { ...state, deptsectiondeptList: payload, loadingStatus: true }
    default:
      return state
  }
}
