import { Box } from '@mui/joy';
import React, { useEffect, useState, memo } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const HoldReasonMasterTable = ({ count, rowSelect }) => {
    const [tabledata, setTabledata] = useState([]);

    useEffect(() => {
        const getComplaintHold = async () => {
            const result = await axioslogin.get('complaintHoldReason/gethold');
            const { success, data } = result.data;
            if (success === 1) {
                setTabledata(data);
            } else {
                setTabledata([]);
            }
        };
        getComplaintHold();
    }, [count]);

    return (
        <Box sx={{ maxWidth: '100%', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f5f5f5' }}>
                        <th style={{ padding: '7px', borderBottom: '1px solid #ddd', fontSize: 12, width: 50 }}>SlNo</th>
                        <th style={{ padding: '7px', borderBottom: '1px solid #ddd', fontSize: 12, textAlign: 'center', width: 80 }}>Action</th>
                        <th style={{ padding: '7px', borderBottom: '1px solid #ddd', fontSize: 12, width: 140 }}>Hold Reason Color</th>
                        <th style={{ padding: '7px', borderBottom: '1px solid #ddd', fontSize: 12, flex: 1, }}>Hold Reasons</th>
                        <th style={{ padding: '7px', borderBottom: '1px solid #ddd', fontSize: 12, width: 70, textAlign: 'center', }}>Status</th>

                    </tr>
                </thead>
                <tbody>
                    {tabledata.map((row, index) => (
                        <tr key={row.cm_hold_id} style={{
                            borderBottom: '1px solid #ddd',
                            backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#FCFCFC', // Alternate row colors
                        }}>
                            <td style={{ fontSize: 14, textAlign: 'center', }}>
                                {row.cm_hold_id}
                            </td>
                            <td style={{ padding: '2px', fontSize: 14, textAlign: 'center', }}>
                                <EditOutlinedIcon onClick={() => rowSelect(row)} sx={{ cursor: 'pointer', color: '#0B6BCB' }} />
                            </td>
                            <td style={{ padding: '2px', fontSize: 14, display: 'flex', gap: 3, pl: 5 }}>
                                <Box
                                    sx={{
                                        display: 'inline-block',
                                        width: 20,
                                        height: 20,
                                        bgcolor: row.hold_color,
                                        borderRadius: '4px',

                                    }}
                                />
                                <Box >
                                    {row.hold_color}
                                </Box>

                            </td>
                            <td style={{ padding: '2px', fontSize: 14 }}>
                                {row.cm_hold_reason}
                            </td>
                            <td style={{ padding: '2px', fontSize: 14, textAlign: 'center', }}>
                                {row.hold_reason_status === 1 ? 'Yes' : 'No'}
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </Box >
    );
};

export default memo(HoldReasonMasterTable);













// import { Box } from '@mui/joy';
// import React, { useEffect, useState, memo } from 'react'
// import { axioslogin } from 'src/views/Axios/Axios';
// import CusAgGridMast from 'src/views/Components/CusAgGridMast';
// import EditButton from 'src/views/Components/EditButton';

// const HoldReasonMasterTable = ({ count, rowSelect }) => {
//     const [tabledata, setTabledata] = useState([])
//     //column title setting
//     // const [column] = useState([
//     //     { headerName: "SlNo", field: "cm_hold_id", },
//     //     { headerName: "Hold Reason Color", field: "hold_color", },
//     //     { headerName: "Hold Reasons", field: "cm_hold_reason", autoHeight: true, wrapText: true, filter: "true" },
//     //     { headerName: "Status", valueGetter: (params) => params.data.hold_reason_status === 1 ? 'Yes' : 'No' },
//     //     { headerName: 'Action', cellRenderer: params => <EditButton onClick={() => rowSelect(params)} /> },
//     // ])
//     const [column] = useState([
//         { headerName: "SlNo", field: "cm_hold_id" },
//         {
//             headerName: "Hold Reason Color",
//             field: "hold_color",
//             cellRenderer: params => (
//                 <Box
//                     sx={{ width: 20, height: 20, bgcolor: params.value, }}
//                 />
//             ),
//             autoHeight: true,
//             wrapText: true,
//             filter: "true",
//             width: 50
//         },
//         {
//             headerName: "Hold Reasons",
//             field: "cm_hold_reason",
//             autoHeight: true,
//             wrapText: true,
//             filter: "true",
//             width: 500   // Set custom width
//         },
//         {
//             headerName: "Status",
//             valueGetter: (params) => params.data.hold_reason_status === 1 ? 'Yes' : 'No'
//         },
//         {
//             headerName: 'Action',
//             cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />
//         },
//     ]);



//     useEffect(() => {
//         const getComplaintHold = async () => {
//             const result = await axioslogin.get('complaintHoldReason/gethold')
//             const { success, data } = result.data
//             if (success === 1) {
//                 setTabledata(data);
//             } else {
//                 setTabledata([])
//             }
//         }
//         getComplaintHold()
//     }, [count]);

//     return (
//         <CusAgGridMast
//             columnDefs={column}
//             tableData={tabledata}
//             onClick={rowSelect}
//         />
//     )
// }
// export default memo(HoldReasonMasterTable)