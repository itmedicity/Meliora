import { combineReducers } from 'redux';
import { changeState } from '../reducers/SideBarToggerReducer';
import { LoginUserData } from '../reducers/LoginReducer'

const reducer = combineReducers({
    changeState,
    LoginUserData
})

export default reducer;