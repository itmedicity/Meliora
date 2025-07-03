import { axioslogin } from 'src/views/Axios/Axios'
import { ActionTyps } from '../constants/action.type'
const { FETCH_NDRFNONCLINICAL_DASHPENDING } = ActionTyps

export const getNonClinicalNDRFPending = () => async dispatch => {
  const result = await axioslogin.get('/crfDashBoard/getDashNonClinicalNDRF')
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_NDRFNONCLINICAL_DASHPENDING, payload: data, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_NDRFNONCLINICAL_DASHPENDING, payload: [], loadingStatus: false })
  }
}
