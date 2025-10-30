import { axioslogin } from 'src/views/Axios/Axios'
import { ActionTyps } from '../constants/action.type'
const { FETCH_INSIDE_BUILDING_BLOCK_SELECT } = ActionTyps
export const getInsideBuildingBlock = () => async dispatch => {
  const result = await axioslogin.get('/selectComponent/insideBuildingBlockDropdown')
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_INSIDE_BUILDING_BLOCK_SELECT, payload: data, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_INSIDE_BUILDING_BLOCK_SELECT, payload: [], loadingStatus: false })
  }
}
