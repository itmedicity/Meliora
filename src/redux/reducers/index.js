import { combineReducers } from 'redux';
import { changeState } from '../reducers/SideBarToggerReducer';
import { LoginUserData } from '../reducers/LoginReducer'
import { getModuleName } from '../reducers/Module.Reducer'
import { getUserGroup } from '../reducers/UserGroup.Reducer'
import { setMenuName } from '../reducers/MenuName.Reducer'
import { getDepartment } from './Department.Reducer';
import { getComplaintDept } from './ComplaintDepartment.Reducer'
import { getHicpolicy } from './HicPolicy.Reducer'
import { getRequesttype } from './RequestType.reducer'
import { getDeptsection } from './DeptSection.Reducer'
import { getComplainttype } from './ComplaintType.Reducer'
const reducer = combineReducers({
    changeState,
    LoginUserData,
    getModuleName,
    getUserGroup,
    setMenuName,
    getDepartment,
    getComplaintDept,
    getHicpolicy,
    getRequesttype,
    getDeptsection,
    getComplainttype

})
export default reducer;