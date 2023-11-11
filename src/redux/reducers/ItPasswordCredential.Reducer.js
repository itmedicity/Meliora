import { ActionTyps } from '../constants/action.type'
const { FETCH_PASSWORD_CREDENTIAL } = ActionTyps;
//intial state
const credentialType = {
    credentialList: [],
    loadingStatus: false
}
/*** Building action type check then payload set to the state and loading status set as true */
export const getPasswordCredential = (state = credentialType, { type, payload }) => {
    switch (type) {
        case FETCH_PASSWORD_CREDENTIAL:
            return { ...state, credentialList: payload, loadingStatus: true }
        default:
            return state
    }

}