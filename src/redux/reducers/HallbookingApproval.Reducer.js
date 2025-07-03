import { ActionTyps } from '../constants/action.type'
const { FETCH_HALLBOOK_APPROVAL } = ActionTyps
//intial state
const HallbookApprvDept = {
  HallbookApproveList: [],
  loadingStatus: false,
}
/*** Deptsection action type check then payload set to the state and loading status set as true */
export const setdepthallbookApproval = (state = HallbookApprvDept, { type, payload }) => {
  switch (type) {
    case FETCH_HALLBOOK_APPROVAL:
      return { ...state, HallbookApproveList: payload, loadingStatus: true }
    default:
      return state
  }
}
