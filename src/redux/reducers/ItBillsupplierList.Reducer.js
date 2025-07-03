import { ActionTyps } from '../constants/action.type'
const { FETCH_IT_MANAGEMENT_BILL_SUPPLIER_DETAILS } = ActionTyps

const Supplier = {
  BillSupplierlist: [],
  loadingStatus: false,
}

export const getSupplierList = (state = Supplier, { type, payload }) => {
  switch (type) {
    case FETCH_IT_MANAGEMENT_BILL_SUPPLIER_DETAILS:
      return { ...state, BillSupplierlist: payload, loadingStatus: true }
    default:
      return state
  }
}
