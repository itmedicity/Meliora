import React from 'react'

const ApprovalPendingMainList = () => {
    return (
        <div>ApprovalPendingMainList</div>
    )
}

export default ApprovalPendingMainList
// import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
// import { getAllDeptCondemPendingDatas } from 'src/api/AssetApis'
// import { useQuery } from 'react-query'
// import { Box, CircularProgress, CssVarsProvider, IconButton, Table } from '@mui/joy'
// import CondemnationApproveModal from '../CondemnationApproveModal'
// import VerifiedIcon from '@mui/icons-material/Verified';
// import { format } from 'date-fns'

// const ApprovalPendingMainList = ({ level_no, empId, empdept, menuRightsList }) => {

//     const condemStatusFrom = level_no + 1
//     const condemstatusTo = level_no - 1

//     const postCondemAllDept = useMemo(() => {
//         return {
//             condemStatusFrom: condemStatusFrom,
//             condemstatusTo: condemstatusTo
//         }
//     }, [condemStatusFrom, condemstatusTo])

//     const [formDetails, setformDetails] = useState([])
//     const [modalApproveFlag, setmodalApproveFlag] = useState(0);
//     const [modalApproveOpen, setmodalApproveOpen] = useState(false);
//     const [formCount, setformCount] = useState(0)
//     const [PendingApproveData, setPendingApproveData] = useState([]);

//     const ApproveForm = useCallback((val) => {
//         setformDetails(val)
//         setmodalApproveFlag(1)
//         setmodalApproveOpen(true)
//     }, [])

//     const { data: PendingApprovals = [], isLoading } = useQuery({
//         queryKey: ['getAllDeptCondemPendingAcc', formCount],
//         queryFn: () => getAllDeptCondemPendingDatas(postCondemAllDept),
//     });

//     useEffect(() => {
//         if (PendingApprovals.length > 0) {
//             setPendingApproveData(PendingApprovals);
//         }
//     }, [PendingApprovals]);

//     return (
//         <Box sx={{ py: 1, px: .5 }}>
//             {modalApproveFlag === 1 ?
//                 <CondemnationApproveModal
//                     modalApproveOpen={modalApproveOpen}
//                     setmodalApproveOpen={setmodalApproveOpen}
//                     setmodalApproveFlag={setmodalApproveFlag}
//                     empId={empId}
//                     formDetails={formDetails}
//                     empdept={empdept}
//                     setformCount={setformCount}
//                     formCount={formCount}
//                     menuRightsList={menuRightsList}
//                 />
//                 : null}
//             <CssVarsProvider>
//                 {isLoading ? (
//                     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
//                         <CircularProgress />
//                     </Box>
//                 ) : PendingApproveData.length > 0 ? (
//                     <Table stickyHeader size='sm'
//                         sx={{ borderRadius: 2 }} borderAxis='both' >
//                         <thead>
//                             <tr>
//                                 <th style={{ textAlign: 'center', width: 12 }}>
//                                     <IconButton sx={{ color: 'black', fontSize: 13 }}>
//                                         Serial No.
//                                     </IconButton>
//                                 </th>
//                                 <th style={{ textAlign: 'center', width: 12 }}>
//                                     <IconButton sx={{ color: 'black', fontSize: 13 }}>
//                                         Action
//                                     </IconButton>
//                                 </th>

//                                 <th style={{ textAlign: 'center', width: 22 }}>
//                                     <IconButton sx={{ color: 'black', fontSize: 13 }}>
//                                         Form Number
//                                     </IconButton>
//                                 </th>
//                                 <th style={{ textAlign: 'center', width: 15 }}>
//                                     <IconButton sx={{ color: 'black', fontSize: 13 }}>
//                                         Registered Date
//                                     </IconButton>
//                                 </th>
//                                 <th style={{ textAlign: 'center', width: 10 }}>
//                                     <IconButton sx={{ color: 'black', fontSize: 13 }}>
//                                         Asset Count
//                                     </IconButton>
//                                 </th>
//                                 <th style={{ textAlign: 'center', width: 10 }}>
//                                     <IconButton sx={{ color: 'black', fontSize: 13 }}>
//                                         Spare Count
//                                     </IconButton>
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody >
//                             {PendingApproveData?.map((val, index) => (
//                                 <tr key={index} >
//                                     <td style={{ textAlign: 'center', }}>{val.condem_mast_slno}</td>
//                                     <td >
//                                         <Box sx={{
//                                             bgcolor: '#0E8898', textAlign: 'center', justifyContent: 'center', fontWeight: 700, cursor: 'pointer',
//                                             fontSize: 13, color: 'white',
//                                             '&:hover': { bgcolor: '#11A7BB' },
//                                         }}
//                                             onClick={() => ApproveForm(val)}
//                                         >
//                                             <VerifiedIcon size={6}
//                                                 sx={{ cursor: 'pointer', p: .4, color: 'white' }} />
//                                             Verify
//                                         </Box>
//                                     </td>
//                                     <td style={{ textAlign: 'center', }}>{val.condem_form_prefix}/{val.condem_form_no}</td>
//                                     <td style={{ textAlign: 'center', }}>{val.reg_date ? format(new Date(val.reg_date), 'dd-MMM-yyyy') : 'N/A'}</td>
//                                     <td style={{ textAlign: 'center', }}>{val.count_of_asset || '-'}</td>
//                                     <td style={{ textAlign: 'center', }}>{val.count_of_spare || '-'}</td>
//                                 </tr>
//                             ))}
//                         </tbody>

//                     </Table>
//                 ) : (
//                     <Box
//                         sx={{
//                             fontSize: 26,
//                             pt: 10,
//                             fontWeight: 600,
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             minHeight: "40vh",
//                             width: "100%",
//                             textAlign: "center",
//                             color: 'lightgrey'
//                         }}
//                     >
//                         Empty List
//                     </Box>
//                 )}
//             </CssVarsProvider>
//         </Box>
//     )
// }

// export default memo(ApprovalPendingMainList)