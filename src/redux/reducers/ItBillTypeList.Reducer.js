import { ActionTyps } from '../constants/action.type'
const { FETCH_IT_MANAGEMENT_BILL_TYPE } = ActionTyps

const BillType = {
  BillTypelist: [],
  loadingStatus: false
}

export const getBillType = (state = BillType, { type, payload }) => {
  switch (type) {
    case FETCH_IT_MANAGEMENT_BILL_TYPE:
      return { ...state, BillTypelist: payload, loadingStatus: true }
    default:
      return state
  }
}
