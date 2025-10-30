import { axioslogin } from 'src/views/Axios/Axios'
import { ActionTyps } from '../constants/action.type'
const { FETCH_STORE_RECEIVE_PENDING, FETCH_STORE_RECEIVE_ALL } = ActionTyps

export const getStoreReceivePendingAction = () => async dispatch => {
  const result = await axioslogin.get('/newCRFStore/getCRSStorePending')
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_STORE_RECEIVE_PENDING, payload: data, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_STORE_RECEIVE_PENDING, payload: [], loadingStatus: false })
  }
}

export const getStoreReceiveAllAction = () => async dispatch => {
  const result = await axioslogin.get('/newCRFStore/getCrsReceiveAllList')
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_STORE_RECEIVE_ALL, payload: data, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_STORE_RECEIVE_ALL, payload: [], loadingStatus: false })
  }
}

// export const getGrnDetailsAction = () => async (dispatch) => {
//     const result = await axioslogin.get('/newCRFStore/getGrnCount')
//     const { success, data } = result.data
//     if (success === 1) {
//         dispatch({ type: FETCH_GRN_DETAILS, payload: data, loadingStatus: true })
//     }
//     else {
//         dispatch({ type: FETCH_GRN_DETAILS, payload: [], loadingStatus: false })
//     }
// }
