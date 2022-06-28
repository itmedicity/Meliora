import { ActionTyps } from '../constants/action.type'

const { FETCH_MODULE_NAME_LIST } = ActionTyps;


const moduleName = {
    moduleNameSelect: []
}


export const getModuleName = (state = moduleName, { type, payload }) => {

    switch (type) {
        case FETCH_MODULE_NAME_LIST:
            return { ...state, moduleNameSelect: payload }
        default:
            return state

    }

}
