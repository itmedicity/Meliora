import { ActionTyps } from '../constants/action.type'
const { FETCH_SUPPLIER_SELECT } = ActionTyps
//intial state
const SupplierSelect = {
  SupplierSelectList: [],
  loadingStatus: false,
}
/*** Building action type check then payload set to the state and loading status set as true */
export const setSupplierSelect = (state = SupplierSelect, { type, payload }) => {
  switch (type) {
    case FETCH_SUPPLIER_SELECT:
      return { ...state, SupplierSelectList: payload, loadingStatus: true }
    default:
      return state
  }
}
