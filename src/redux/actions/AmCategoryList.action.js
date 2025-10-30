import { axioslogin } from 'src/views/Axios/Axios'
import { ActionTyps } from '../constants/action.type'
const { FETCH_ASSET_CATEGORY } = ActionTyps

export const getCategory = () => async dispatch => {
  const result = await axioslogin.get('/amSelectComponent/categoryDropdown')
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_ASSET_CATEGORY, payload: data, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_ASSET_CATEGORY, payload: [], loadingStatus: false })
  }
}
