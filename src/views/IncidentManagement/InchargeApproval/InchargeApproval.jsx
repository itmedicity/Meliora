// //@ not using details InchargeApproval

// import React, { memo, useMemo } from 'react';
// import Inciwrapper from '../../Components/Inciwrapper';
// import { Box } from '@mui/joy';
// import { useSelector } from 'react-redux';
// import CustomeIncidentLoading from '../Components/CustomeIncidentLoading';
// import TabComponent from '../Components/TabComponent';
// import { groupIncidents } from '../CommonComponent/CommonFun';
// import { useInchargeHodApprovalIncidents } from '../CommonComponent/useQuery';

// const InchargeApproval = () => {

//     const { empdept, empsecid } = useSelector(state => {
//         return state.LoginUserData
//     });

//     const {
//         data: InchargeHodApprovalIncidents,
//         isLoading: InciHodApprovalLoading,
//         refetch: FetchAllInchargeHodIncident,
//     } = useInchargeHodApprovalIncidents(empdept, empsecid);


//     // grouping data and returning them based on the tabllist
//     const { rejectData, PendingList, ApprovedList } = useMemo(() => {
//         const grouped = groupIncidents(InchargeHodApprovalIncidents)?.sort(
//             (a, b) => b?.inc_register_slno - a?.inc_register_slno
//         );

//         return {
//             rejectData: grouped.filter(
//                 (item) => item?.inc_incharge_ack === 0 && item?.inc_incharge_reivew_state === 'R'),
//             PendingList: grouped?.filter((item) => item?.inc_incharge_ack === 0 && item?.inc_hod_ack === 0 &&
//                 (item?.inc_incharge_reivew_state !== 'R' || item?.inc_incharge_reivew_state === null)),
//             ApprovedList: grouped?.filter(
//                 (item) => item?.inc_incharge_ack === 1 && item?.inc_incharge_reivew_state === 'A'
//             ),
//         };
//     }, [InchargeHodApprovalIncidents]);

//     const TabDetails = [
//         { id: 0, name: "Pending", data: PendingList, },
//         { id: 1, name: "Rejected", data: rejectData },
//         { id: 2, name: "Approved", data: ApprovedList, }
//     ];

//     return (
//         <Box sx={{ width: '100vw' }}>
//             <Inciwrapper title="Incharge Approval">

//                 {
//                     InciHodApprovalLoading &&
//                     <CustomeIncidentLoading
//                         text={"Loading Registerd Incidents"}
//                     />
//                 }

//                 <TabComponent
//                     level={"INCHARGE"}
//                     TabDetails={TabDetails}
//                     fetchAgain={FetchAllInchargeHodIncident}
//                 />
//             </Inciwrapper>
//         </Box>
//     );
// };

// export default memo(InchargeApproval);
