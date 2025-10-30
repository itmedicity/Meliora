import { axioslogin } from 'src/views/Axios/Axios'
import { ActionTyps } from '../constants/action.type'
const { FETCH_EQUIPMENT_SELECT } = ActionTyps

export const getEquipmentList = dept => async dispatch => {
  const result = await axioslogin.get(`/equipMast/active/${dept}`)
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_EQUIPMENT_SELECT, payload: data, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_EQUIPMENT_SELECT, payload: [], loadingStatus: false })
  }
}
