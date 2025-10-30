import { axioslogin } from 'src/views/Axios/Axios'
import { ActionTyps } from '../constants/action.type'
const { FETCH_CRFNONCLINICAL_DASHPENDING } = ActionTyps

export const getNonClinicalCrfPending = () => async dispatch => {
  const result = await axioslogin.get('/crfDashBoard/getDashNonClinicalCRF')
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_CRFNONCLINICAL_DASHPENDING, payload: data, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_CRFNONCLINICAL_DASHPENDING, payload: [], loadingStatus: false })
  }
}
