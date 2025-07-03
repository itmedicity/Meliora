import { axioslogin } from 'src/views/Axios/Axios'
import { ActionTyps } from '../constants/action.type'
const { FETCH_AM_ASSET_TYPE } = ActionTyps

export const getAmAssetType = () => async dispatch => {
  const result = await axioslogin.get('/amSelectComponent/AssetTypeDropdown')
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_AM_ASSET_TYPE, payload: data, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_AM_ASSET_TYPE, payload: [], loadingStatus: false })
  }
}
