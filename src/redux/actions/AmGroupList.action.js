import { axioslogin } from 'src/views/Axios/Axios'
import { ActionTyps } from '../constants/action.type'
const { FETCH_ASSET_GROUP } = ActionTyps

export const getGroup = () => async dispatch => {
  const result = await axioslogin.get('/amSelectComponent/groupDropdown')
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_ASSET_GROUP, payload: data, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_ASSET_GROUP, payload: [], loadingStatus: false })
  }
}
