import { axioslogin } from 'src/views/Axios/Axios'
import { ActionTyps } from '../constants/action.type'
const { FETCH_CRM_OTHERS } = ActionTyps

export const getCRMOthers = () => async dispatch => {
  const result = await axioslogin.get('/newCRFRegister/getApprovList/others')
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_CRM_OTHERS, payload: data, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_CRM_OTHERS, payload: [], loadingStatus: false })
  }
}
