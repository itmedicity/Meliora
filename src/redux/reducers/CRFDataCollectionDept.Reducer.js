import { ActionTyps } from '../constants/action.type'
const { FETCH_DATA_COLLECTIONDEPT } = ActionTyps;
//intial state
const dataCollectionCrf = {
    dataCollectionCrfList: [],
    loadingStatus: false
}
/*** Requesttype action type check then payload set to the state and loading status set as true */
export const setdataCollectionCRF = (state = dataCollectionCrf, { type, payload }) => {
    switch (type) {
        case FETCH_DATA_COLLECTIONDEPT:
            return { ...state, dataCollectionCrfList: payload, loadingStatus: true }
        default:
            return state
    }

}