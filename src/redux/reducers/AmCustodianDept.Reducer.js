import { ActionTyps } from '../constants/action.type'
const { FETCH_AM_CUSTODIAN_DEPT } = ActionTyps
//intial state
const CustodianDept = {
  CustodianDeptList: [],
  loadingStatus: false
}
/*** Building action type check then payload set to the state and loading status set as true */
export const getCustodianDept = (state = CustodianDept, { type, payload }) => {
  switch (type) {
    case FETCH_AM_CUSTODIAN_DEPT:
      return { ...state, CustodianDeptList: payload, loadingStatus: true }
    default:
      return state
  }
}
