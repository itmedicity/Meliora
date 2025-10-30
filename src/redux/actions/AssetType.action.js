import { axioslogin } from 'src/views/Axios/Axios'
import { ActionTyps } from '../constants/action.type'
const { FETCH_ASSET_TYPE } = ActionTyps
/*** when call dispatch function call aa api
 * success is '1'  retrun data set to payload and status set to true otherwise set null array and status false
 */
export const getAssetType = () => async dispatch => {
  const result = await axioslogin.get('/assettype/status')
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_ASSET_TYPE, payload: data, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_ASSET_TYPE, payload: [], loadingStatus: false })
  }
}
