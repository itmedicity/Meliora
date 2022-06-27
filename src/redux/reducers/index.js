import { combineReducers } from 'redux';
import { changeState } from '../reducers/SideBarToggerReducer';
import { LoginUserData } from '../reducers/LoginReducer'
import { getModuleName } from '../reducers/Module.Reducer'

const reducer = combineReducers({
    changeState,
    LoginUserData,
    getModuleName
})

export default reducer;