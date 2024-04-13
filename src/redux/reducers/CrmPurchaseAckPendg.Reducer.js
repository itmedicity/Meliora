import { ActionTyps } from '../constants/action.type'
const { FETCH_PURCHASE_ACK_PEND } = ActionTyps;
//intial state
const CRMPurchaseAckPending = {
    setCRMPurchaseAckPendingList: [],
    loadingStatus: false
}
/*** Requesttype action type check then payload set to the state and loading status set as true */
export const setCRMPurchaseAckPending = (state = CRMPurchaseAckPending, { type, payload }) => {
    switch (type) {
        case FETCH_PURCHASE_ACK_PEND:
            return { ...state, setCRMPurchaseAckPendingList: payload, loadingStatus: true }
        default:
            return state
    }

}