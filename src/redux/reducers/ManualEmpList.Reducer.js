import { ActionTyps } from '../constants/action.type'
const { FETCH_MANUAL_EMP_LIST } = ActionTyps
//intial state
const ManualEmpList = {
  ManualEmpListdata: [],
  loadingStatus: false,
}
/*** Deptsection action type check then payload set to the state and loading status set as true */
export const setManualEmpList = (state = ManualEmpList, { type, payload }) => {
  switch (type) {
    case FETCH_MANUAL_EMP_LIST:
      return { ...state, ManualEmpListdata: payload, loadingStatus: true }
    default:
      return state
  }
}
