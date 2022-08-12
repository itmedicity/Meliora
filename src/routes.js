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
const AssetType = React.lazy(() => import('./views/dashboard/Home'))
const ItemType = React.lazy(() => import('./views/dashboard/Home'))
const ItemCategory = React.lazy(() => import('./views/dashboard/Home'))
const SubCategory = React.lazy(() => import('./views/dashboard/Home'))
const Group = React.lazy(() => import('./views/dashboard/Home'))
const SubGroup = React.lazy(() => import('./views/dashboard/Home'))
const Manufacture = React.lazy(() => import('./views/dashboard/Home'))
const Building = React.lazy(() => import('./views/dashboard/Home'))
const Floor = React.lazy(() => import('./views/dashboard/Home'))
const RoomType = React.lazy(() => import('./views/dashboard/Home'))
const RoomCategory = React.lazy(() => import('./views/dashboard/Home'))
const NursingStation = React.lazy(() => import('./views/Master/NursingStation/NursingStationMast'))
const Dietition = React.lazy(() => import('./views/Master/DietMasters/DietionMaster/DietitionMaster'))
const DietCategory = React.lazy(() => import('./views/Master/DietMasters/Diet/DietMaster'))
const TimeSlamb = React.lazy(() => import('./views/Master/DietMasters/TimeSlamb/TimeSlampMast'))
const DietType = React.lazy(() => import('./views/Master/DietMasters/DietType/DietTypeMast'))
const RateList = React.lazy(() => import('./views/Master/DietMasters/RateList/RateListMast'))
const DietIssue = React.lazy(() => import('./views/Master/DietMasters/DietIssueSchedule/DietIssueScheduleMast'))


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
  { path: '/Home/Group', exact: true, name: 'Group', component: Group },
  { path: '/Home/SubGroup', exact: true, name: 'SubGroup', component: SubGroup },
  { path: '/Home/Manufacture', exact: true, name: 'Manufacture', component: Manufacture },
  { path: '/Home/Building', exact: true, name: 'Building', component: Building },
  { path: '/Home/Floor', exact: true, name: 'Floor', component: Floor },
  { path: '/Home/RoomType', exact: true, name: 'RoomType', component: RoomType },
  { path: '/Home/RoomCategory', exact: true, name: 'RoomCategory', component: RoomCategory },
  { path: '/Home/NursingStation', exact: true, name: 'NursingStation', component: NursingStation },
  { path: '/Home/Dietition', exact: true, name: 'Dietition', component: Dietition },
  { path: '/Home/Diet', exact: true, name: 'DietCategory', component: DietCategory },
  { path: '/Home/TimeSlamb', exact: true, name: 'TimeSlamb', component: TimeSlamb },
  { path: '/Home/DietIssue', exact: true, name: 'DietIssue', component: DietIssue },
  { path: '/Home/DietType', exact: true, name: 'DietType', component: DietType },
  { path: '/Home/RateList', exact: true, name: 'RateList', component: RateList },




]

export default routes
