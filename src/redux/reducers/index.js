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
import { setExtraOrderList } from '../reducers/DietExtraOrder.Reducer'
import { getEscalation } from '../reducers/Level1Escalation.reducer'
import { getEscalationMaster } from '../reducers/EscalationMaster.Reducer'
import { getEscalationMapping } from '../reducers/EscalationMapping.Reducer'
import { getEscalationlvl2 } from '../reducers/Level2Escalation.Reducer'
import { getescalationlvl3 } from '../reducers/Level3Escalation.Reducer'
import { getescalationlvl4 } from '../reducers/Level4Escalation.Reducer'
import { getescalationtoplvl } from '../reducers/TopLevelEscalation.Reducer'
import { getEscalationMappingmaintenenace } from '../reducers/EscmappingMain.Reducer'
import { getEscalationMappingIt } from '../reducers/EscalationMappingIt.reducer'
import { getEscalationMappingToplvlIt } from '../reducers/EscalationMappingToplvlIt.Reducer'
import { getEscalationMappingToplvlmaintenenace } from '../reducers/EscalationMappingToplvlMain.Reducer'
import { getEscalationMappingLvl2It } from '../reducers/EscalationMappingLvl2It.Reducer'
import { getEscalationMappingLvl2Main } from '../reducers/EscalationMappingLvl2Main.Reducer'
import { getEscalationMappingLvl3It } from '../reducers/EscalationMappingLvl3It.Reducer'
import { getEscalationMappingLvl3Main } from '../reducers/EscalationLvl3Main.Reducer'
import { getEscalationMappingLvl4It } from '../reducers/EscalationMappingLvl4It.Reducer'
import { getEscalationMappingLvl4Main } from '../reducers/EscalationMappingLvl4Main.Reducer'

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
    getTotalAdmission,
    setExtraOrderList,
    getEscalation,
    getEscalationMaster,
    getEscalationMapping,
    getEscalationlvl2,
    getescalationlvl3,
    getescalationlvl4,
    getescalationtoplvl,
    getEscalationMappingmaintenenace,
    getEscalationMappingIt,
    getEscalationMappingToplvlIt,
    getEscalationMappingToplvlmaintenenace,
    getEscalationMappingLvl2It,
    getEscalationMappingLvl2Main,
    getEscalationMappingLvl3It,
    getEscalationMappingLvl3Main,
    getEscalationMappingLvl4It,
    getEscalationMappingLvl4Main
})
export default reducer;
