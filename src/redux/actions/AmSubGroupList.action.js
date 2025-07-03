import { axioslogin } from 'src/views/Axios/Axios'
import { ActionTyps } from '../constants/action.type'
const { FETCH_ASSET_SUBGROUP } = ActionTyps

export const getAmSubGroupList = group => async dispatch => {
  const result = await axioslogin.get(`/amSelectComponent/subGroupDropdown/${group}`)
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_ASSET_SUBGROUP, payload: data, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_ASSET_SUBGROUP, payload: [], loadingStatus: false })
  }
}
