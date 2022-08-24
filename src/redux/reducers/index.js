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
import { getEmployeeName } from '../reducers/EmpName.Reducer'
import { getModuleGroup } from '../reducers/ModuleGroup.Reducer'
import { getAssetType } from '../reducers/AssetType.Reducer'
import { getSubModuleGroup } from './SubModuleGroup.Reducer'
import { getBranch } from './Branch.Reducer'
import { getDesignation } from './Designation.Reducer'
import { getitemGrpName } from './Itemgroup.Reducer'
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
    getComplainttype,
    getEmployeeName,
    getModuleGroup,
    getAssetType,
    getSubModuleGroup,
    getBranch,
    getDesignation,
    getitemGrpName
})
export default reducer;
