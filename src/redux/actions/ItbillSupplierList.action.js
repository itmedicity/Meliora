import { axioslogin } from 'src/views/Axios/Axios'
import { ActionTyps } from '../constants/action.type'
const { FETCH_IT_MANAGEMENT_BILL_SUPPLIER_DETAILS } = ActionTyps

export const getSupplierList = () => async dispatch => {
  const result = await axioslogin.get('/ItBillType/itBillSupplierList')
  const { success, data } = result.data

  if (success === 1) {
    dispatch({
      type: FETCH_IT_MANAGEMENT_BILL_SUPPLIER_DETAILS,
      payload: data,
      loadingStatus: true
    })
  } else {
    dispatch({ type: FETCH_IT_MANAGEMENT_BILL_SUPPLIER_DETAILS, payload: [], loadingStatus: false })
  }
}
