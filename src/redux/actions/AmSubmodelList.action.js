import { axioslogin } from 'src/views/Axios/Axios'
import { ActionTyps } from '../constants/action.type'
const { FETCH_ASSET_SUBMODEL } = ActionTyps

export const getSubmodel = model => async dispatch => {
  const result = await axioslogin.get(`/amSelectComponent/submodelDropdown/${model}`)
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_ASSET_SUBMODEL, payload: data, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_ASSET_SUBMODEL, payload: [], loadingStatus: false })
  }
}
