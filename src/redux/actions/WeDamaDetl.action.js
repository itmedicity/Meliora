import { axioslogin } from 'src/views/Axios/Axios'
import { ActionTyps } from '../constants/action.type'
const { FETCH_DAMA_DETAIL } = ActionTyps

export const getWeDamaDetl = () => async dispatch => {
  const result = await axioslogin.get(`/WeWork/get/DamaList`)
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_DAMA_DETAIL, payload: data, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_DAMA_DETAIL, payload: [], loadingStatus: false })
  }
}
