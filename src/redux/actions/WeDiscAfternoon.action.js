import { axioslogin } from 'src/views/Axios/Axios'
import { ActionTyps } from '../constants/action.type'
const { FETCH_DISCAFTERNOON_LIST } = ActionTyps

export const getDiscAfternoonList = () => async dispatch => {
  const result = await axioslogin.get(`/WeWork/get/discharge`)
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_DISCAFTERNOON_LIST, payload: data, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_DISCAFTERNOON_LIST, payload: [], loadingStatus: false })
  }
}
