import { axioslogin } from 'src/views/Axios/Axios'
import { ActionTyps } from '../constants/action.type'
const { FETCH_IT_MANAGEMENT_BILL_TYPE } = ActionTyps

export const getBillType = () => async dispatch => {
  const result = await axioslogin.get('/ItBillType/itBilltype')
  const { success, data } = result.data

  if (success === 1) {
    dispatch({ type: FETCH_IT_MANAGEMENT_BILL_TYPE, payload: data, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_IT_MANAGEMENT_BILL_TYPE, payload: [], loadingStatus: false })
  }
}
