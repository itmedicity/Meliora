import React from 'react'

const Home = React.lazy(() => import('./views/dashboard/Home'))
const Settings = React.lazy(() => import('../src/Menus/Settings'))
const Administrtion = React.lazy(() => import('../src/views/Administration/Test'))
const DepartmentMast = React.lazy(() => import('./views/Master/Department/DepartmentMast'))
const DepartmentSectionMast = React.lazy(() => import('./views/Master/DepartmentSectionMast/DeptSectionMast'))
const ComplaintDepartment = React.lazy(() => import('./views/Master/ComplaintDepartment/ComplaintDeptMast'))
const ComplaintRegister = React.lazy(() => import('./views/ComManagement/ComplaintRegister/ComplaintRegistrMast'))
const UserGroupMast = React.lazy(() => import('./views/Master/UserGroupMaster/UserGroupMast'))
const ModuleMast = React.lazy(() => import('./views/Master/ModuleMaster/ModuleMaster'))
const UserGroupRights = React.lazy(() => import('./views/Master/UserGroupRight/UserGroupRight'))
const ModuleGroupMast = React.lazy(() => import('./views/Master/ModuleGroupMaster/ModuleGroupMast'))
const RequestType = React.lazy(() => import('./views/Master/RequestType/RequestTypeMast'))
const ComplaintType = React.lazy(() => import('./views/Master/ComplaintType/ComplaintTypeMast'))
const HicPolicy = React.lazy(() => import('./views/Master/HicPolicy/HicPolicyMast'));
const moduleuserRight = React.lazy(() => import('./views/Master/ModuleUserRight/ModuleUserRight'))
const assignComplaint = React.lazy(() => import('./views/ComManagement/AssignComplaint/AssignComplaintTable'))
const ComplaintList = React.lazy(() => import('./views/ComManagement/ComplaintList'))
const AssetType = React.lazy(() => import('./views/Master/AssetMasters/AssetType/AssetTypeMaster'))
const ItemType = React.lazy(() => import('./views/Master/AssetMasters/ItemType/ItemTypeMast'))
const ItemCategory = React.lazy(() => import('./views/Master/AssetMasters/Category/CategoryMaster'))
const SubCategory = React.lazy(() => import('./views/Master/AssetMasters/SubCategory/SubCategoryMast'))
const AssetGroup = React.lazy(() => import('./views/Master/AssetMasters/Group/GroupMast'))
const SubGroup = React.lazy(() => import('./views/Master/AssetMasters/SubGroup/SubGroupMast'))
const Manufacture = React.lazy(() => import('./views/Master/AssetMasters/Manufacture/ManufactureMast'))
const Building = React.lazy(() => import('./views/Master/RoomMasters/BuildingMaster/BuildingMaster'))
const Floor = React.lazy(() => import('./views/Master/RoomMasters/FloorMaster/FloorMaster'))
const RoomType = React.lazy(() => import('./views/Master/RoomMasters/RoomType/RoomTypeMast'))
const RoomCategory = React.lazy(() => import('./views/Master/RoomMasters/RoomCategory/RoomCategoryMast'))
const NursingStation = React.lazy(() => import('./views/Master/NursingStation/NursingStationMast'))
const DietCategory = React.lazy(() => import('./views/Master/DietMasters/Diet/DietMaster'))
const DietType = React.lazy(() => import('./views/Master/DietMasters/DietType/DietTypeMast'))
const RateList = React.lazy(() => import('./views/Master/DietMasters/RateList/RateListMast'))
const DietIssue = React.lazy(() => import('./views/Master/DietMasters/DietIssueSchedule/DietIssueScheduleMast'))
const InpatientList = React.lazy(() => import('./views/NursingStation/InPatientList'))
const DietProcess = React.lazy(() => import('./views/Diet/DietProcess'))
const UserCreation = React.lazy(() => import('./views/Master/UserCreation/UserCreation'))
const UserCreationTable = React.lazy(() => import('./views/Master/UserCreation/UserCreationTable'))
const RoomCreation = React.lazy(() => import('./views/RoomManagement/Roomcreation/RoomCreation'))
const SubRoomCreation = React.lazy(() => import('./views/RoomManagement/SubRoomCreation/SubRoomCreation'))
const DietMenuSetting = React.lazy(() => import('./views/Master/DietMasters/DietMenuSetting/DietMenuSetting'))
const ItemGroup = React.lazy(() => import('./views/Master/DietMasters/ItemGroup/ItemGroupMast'))
const ItemMaster = React.lazy(() => import('./views/Master/DietMasters/ItemMaster/ItemMaster'))
const DietDetail = React.lazy(() => import('./views/Master/DietMasters/DietDetail/DietDetailMast'))
const DietApproval = React.lazy(() => import('./views/NursingStation/DietApprovalList'));
const DietPlanList = React.lazy(() => import('./views/NursingStation/DietPlanList'));
const DietOrderList = React.lazy(() => import('./views/Diet/DietOrderList'));
const DietExtraOrder = React.lazy(() => import('./views/Diet/ExtraOrder'));
const DietDelivery = React.lazy(() => import('./views/Diet/DietDeliveryMark'))
const RectifyComplaint = React.lazy(() => import('./views/ComManagement/RectifyComplaint/RectifyCompalint'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/Home', exact: true, name: 'Home', component: Home },
  { path: '/Home/Settings', exact: true, name: 'Settings', component: Settings },
  { path: '/Home/Administration', exact: true, name: 'Administator', component: Administrtion },
  { path: '/Home/Department', exact: true, name: 'Department Mast', component: DepartmentMast },
  { path: '/Home/DepartmentSection', exact: true, name: 'Department Mast', component: DepartmentSectionMast },
  { path: '/Home/ComplaintDepartment', exact: true, name: 'Complaint Department', component: ComplaintDepartment },
  { path: '/Home/ComplaintRegister', exact: true, name: 'Complaint Register', component: ComplaintRegister },
  { path: '/Home/Group', exact: true, name: 'User Group Master', component: UserGroupMast },
  { path: '/Home/ModuleMast', name: 'Module Master', component: ModuleMast },
  { path: '/Home/UserGroupRight', exact: true, name: 'User Group Rights', component: UserGroupRights },
  { path: '/Home/ModuleGroupMast', exact: true, name: 'Module group Master', component: ModuleGroupMast },
  { path: '/Home/RequestType', exact: true, name: 'Request Type', component: RequestType },
  { path: '/Home/ComplaintType', exact: true, name: 'Complaint Type', component: ComplaintType },
  { path: '/Home/HicPolicy', exact: true, name: 'Hic Policy', component: HicPolicy },
  { path: '/Home/ModuleUserRight', exact: true, name: 'Module User Right', component: moduleuserRight },
  { path: '/Home/AssignComplaint', exact: true, name: 'Assign Complaint', component: assignComplaint },
  { path: '/Home/ComplaintList', exact: true, name: 'Compliant List', component: ComplaintList },
  { path: '/Home/AssetType', exact: true, name: 'Asset Type', component: AssetType },
  { path: '/Home/ItemType', exact: true, name: 'Item Type', component: ItemType },
  { path: '/Home/ItemCategory', exact: true, name: 'Item Category', component: ItemCategory },
  { path: '/Home/SubCategory', exact: true, name: 'Sub Category', component: SubCategory },
  { path: '/Home/AssetGroup', exact: true, name: 'Group', component: AssetGroup },
  { path: '/Home/SubGroup', exact: true, name: 'SubGroup', component: SubGroup },
  { path: '/Home/Manufacture', exact: true, name: 'Manufacture', component: Manufacture },
  { path: '/Home/Building', exact: true, name: 'Building', component: Building },
  { path: '/Home/Floor', exact: true, name: 'Floor', component: Floor },
  { path: '/Home/RoomType', exact: true, name: 'RoomType', component: RoomType },
  { path: '/Home/RoomCategory', exact: true, name: 'RoomCategory', component: RoomCategory },
  { path: '/Home/NursingStation', exact: true, name: 'NursingStation', component: NursingStation },
  { path: '/Home/Diet', exact: true, name: 'DietCategory', component: DietCategory },
  { path: '/Home/DietIssue', exact: true, name: 'DietIssue', component: DietIssue },
  { path: '/Home/DietType', exact: true, name: 'DietType', component: DietType },
  { path: '/Home/RateList', exact: true, name: 'RateList', component: RateList },
  { path: '/Home/InpatientList', exact: true, name: 'In-Patient List', component: InpatientList },
  { path: '/Home/DietProcess', exact: true, name: 'Diet Process', component: DietProcess },
  { path: '/Home/UserCreation', exact: true, name: 'User Creation', component: UserCreation },
  { path: '/Home/UserCreationTable', exact: true, name: 'User Creation Table', component: UserCreationTable },
  { path: '/Home/RoomCreation', exact: true, name: 'Room Creation', component: RoomCreation },
  { path: '/Home/SubRoomCreation', exact: true, name: ' Sub Room Creation', component: SubRoomCreation },
  { path: '/Home/DietMenuSetting', exact: true, name: 'Diet Plan', component: DietMenuSetting },
  { path: '/Home/ItemGroup', exact: true, name: 'Item Group', component: ItemGroup },
  { path: '/Home/ItemMaster', exact: true, name: ' Item Master', component: ItemMaster },
  { path: '/Home/DietDetail', exact: true, name: 'Diet Detail', component: DietDetail },
  { path: '/Home/DietApproval', exact: true, name: ' Diet Approval', component: DietApproval },
  { path: '/Home/DietPlanList', exact: true, name: ' Diet Approval', component: DietPlanList },
  { path: '/Home/DietOrderList', exact: true, name: ' Diet Order List', component: DietOrderList },
  { path: '/Home/DietExtraOrder', exact: true, name: ' Diet Extra Order', component: DietExtraOrder },
  { path: '/Home/DietDelivery', exact: true, name: ' Diet Delivery', component: DietDelivery },
  { path: '/Home/RectifyComplaint', exact: true, name: 'Rectify Complaint', component: RectifyComplaint },

]

export default routes
