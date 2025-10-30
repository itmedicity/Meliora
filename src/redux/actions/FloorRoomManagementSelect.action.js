import { axioslogin } from 'src/views/Axios/Axios'
import { ActionTyps } from '../constants/action.type'
const { FETCH_FLOOR_SELECT } = ActionTyps
export const getFloorData = () => async dispatch => {
  const result = await axioslogin.get('/selectComponent/FloorDropdown')
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_FLOOR_SELECT, payload: data, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_FLOOR_SELECT, payload: [], loadingStatus: false })
  }
}
