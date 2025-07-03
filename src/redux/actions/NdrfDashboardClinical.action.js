import { axioslogin } from 'src/views/Axios/Axios'
import { ActionTyps } from '../constants/action.type'
const { FETCH_NDRFCLINICAL_DASHPENDING } = ActionTyps

export const getClinicalNDRFPending = () => async dispatch => {
  const result = await axioslogin.get('/crfDashBoard/getDashClinicalNDRF')
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_NDRFCLINICAL_DASHPENDING, payload: data, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_NDRFCLINICAL_DASHPENDING, payload: [], loadingStatus: false })
  }
}
