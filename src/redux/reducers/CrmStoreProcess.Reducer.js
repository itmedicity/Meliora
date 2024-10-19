import { ActionTyps } from '../constants/action.type'
const { FETCH_STORE_RECEIVE_PENDING, FETCH_STORE_RECEIVE_ALL, FETCH_SUBSTORE_CRF_PO } = ActionTyps;

const CRMStorePending = {
    setCRMStorePendingList: [],
    loadingStatus: false
}
export const getStoreReceivePendingReducer = (state = CRMStorePending, { type, payload }) => {
    switch (type) {
        case FETCH_STORE_RECEIVE_PENDING:
            return { ...state, setCRMStorePendingList: payload, loadingStatus: true }
        default:
            return state
    }

}

const CRMStoreAllData = {
    setCRMStoreAllList: [],
    loadingStatus: false
}
export const getStoreReceiveAllReducer = (state = CRMStoreAllData, { type, payload }) => {
    switch (type) {
        case FETCH_STORE_RECEIVE_ALL:
            return { ...state, setCRMStoreAllList: payload, loadingStatus: true }
        default:
            return state
    }

}


const CRFSubstoreView = {
    CRFSubstore: [],
    loadingStatus: false
}
export const getCrfPOStorReducer = (state = CRFSubstoreView, { type, payload }) => {
    switch (type) {
        case FETCH_SUBSTORE_CRF_PO:
            return { ...state, CRFSubstore: payload, loadingStatus: true }
        default:
            return state
    }

}
// const GrnDetails = {
//     setGrnDetails: [],
//     loadingStatus: false
// }
// export const getGrnDetailsReducer = (state = GrnDetails, { type, payload }) => {
//     switch (type) {
//         case FETCH_GRN_DETAILS:
//             return { ...state, setGrnDetails: payload, loadingStatus: true }
//         default:
//             return state
//     }

// }