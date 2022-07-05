
import { ActionTyps } from '../constants/action.type'

const { FETCH_USER_GROUP_NAME } = ActionTyps;


const userGroupname = {
    userGroupnameList: [],
    loadingStatus: false

}


export const getUserGroup = (state = userGroupname, { type, payload }) => {

    switch (type) {
        case FETCH_USER_GROUP_NAME:
            return { ...state, userGroupnameList: payload, loadingStatus: true }
        default:
            return state

    }

}
