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
import { getSalutation } from './Salutation.Reducer'
import { getDeptsectionDept } from './DeptSecDept.Reducer'
import { getBuilding } from './Building.Reducer'
import { getoraRoomtype } from './Roomtype.Reducer'
import { getRoomtypemeli } from './Roomtypemeliora.Reducer'
import { getRmmasteroracle } from './RmmasterOra.Reducer'
import { getRmmastermeliora } from './Rmmastermeliora.Reducer'
import { getRoomcatora } from './RoomCatOra.Reducer'
import { getDiet } from './Diet.Reducer'
import { getDiettype } from './DietType.Reducer'
import { getOutlet } from './OutletOra.Reducer'
import { getItem } from './ItemMaster.Reducer'
import { getitemGrpName } from './Itemgroup.Reducer'
import { getNusringStation } from './NursingStation.Reducer'
import { getLoginProfileData } from './LoginProfile.Reducer'
import { getOraRoomByRoomType } from './OraRoomByType.Reducer'
import { getNusringStationMeli } from './NurseStatnMeli.Reducer'
import { getDepartemployee } from './Departwiseemployee.Reducer'
import { getAssistantemployee } from './AssistantEmp.Reducer'
import { changeStateAggrid } from '../reducers/StatechangeAgGrid';
import { getAsignedstaffnurse } from '../reducers/Asignrdstaff.reducer';
import { getTotalcomplaints } from '../reducers/ComplaintDashboard.Reducer';
import { getComplaintLists } from '../reducers/ComplaintLists.Reducer'
import { getAssignedComplaintLists } from '../reducers/AssignedcmLists.Reducer'
import { getAssistComplaintLists } from '../reducers/AssistcmLists.Reducer'
import { getAllComplaintLists } from '../reducers/AllcomplaintsLists.Reducer'
import { getComplaintRights } from '../reducers/CmpRightsDashboard.Reducer'
import { getDepartSecemployee } from '../reducers/EmpNameDeptSec.Reducer'
import { getTotalAdmission } from '../reducers/WeworkAdmission.Reducer'
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
    getSalutation,
    getDeptsectionDept,
    getBuilding,
    getoraRoomtype,
    getRoomtypemeli,
    getRmmasteroracle,
    getRmmastermeliora,
    getRoomcatora,
    getDiet,
    getDiettype,
    getOutlet,
    getItem,
    getitemGrpName,
    getNusringStation,
    getLoginProfileData,
    getOraRoomByRoomType,
    getNusringStationMeli,
    getDepartemployee,
    getAssistantemployee,
    changeStateAggrid,
    getAsignedstaffnurse,
    getTotalcomplaints,
    getComplaintLists,
    getAssignedComplaintLists,
    getAssistComplaintLists,
    getAllComplaintLists,
    getComplaintRights,
    getDepartSecemployee,
    getTotalAdmission
})
export default reducer;
