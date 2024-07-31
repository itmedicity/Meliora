import { Box, CssVarsProvider, Table, Tooltip } from '@mui/joy'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';

const ComplaintListTable = ({ complaintList, EditData }) => {

    return (
        <>  {complaintList.length !== 0 ?
            <>
                <Box variant="outlined" sx={{ overflow: 'auto', maxHeight: 200, padding: 'none' }}>
                    <CssVarsProvider>
                        <Table aria-label="table with sticky header" borderAxis="both" padding={"none"} stickyHeader size='sm' stickyFooter hoverRow >
                            <thead style={{ alignItems: 'center' }}>
                                <tr style={{ height: 0.5 }}>
                                    <th size='sm' style={{ width: 50, fontWeight: 650, fontSize: 14, textAlign: 'center' }}>&nbsp;Edit</th>
                                    <th size='sm' style={{ width: 50, fontWeight: 650, fontSize: 14, textAlign: 'center' }}>&nbsp; Sl.No</th>
                                    <th size='sm' style={{ width: 100, fontWeight: 650, fontSize: 14 }}>&nbsp;Date & Time</th>
                                    <th size='sm' style={{ width: 100, fontWeight: 650, fontSize: 14 }}>&nbsp;Department</th>
                                    <th size='sm' style={{ width: 100, fontWeight: 650, fontSize: 14 }}>&nbsp;ComplaintType</th>
                                    <th size='sm' style={{ width: 100, fontWeight: 650, fontSize: 14 }}>&nbsp;Location</th>
                                    <th size='sm' style={{ width: 100, fontWeight: 650, fontSize: 14 }}>&nbsp;Description</th>
                                </tr>
                            </thead>
                            <tbody size='small'>
                                {complaintList?.map((val, index) => {
                                    return (< tr key={index} size='small'
                                        style={{ maxHeight: 2, cursor: 'pointer' }}  >
                                        <td size='sm' style={{ fontSize: 12, height: 5, textAlign: 'center' }}>
                                            <CssVarsProvider>
                                                <Tooltip title="Edit" placement='right'>
                                                    <EditIcon
                                                        sx={{
                                                            color: '#9e9e9e',
                                                            ":hover": {
                                                                color: '#424242'
                                                            }
                                                        }}
                                                        onClick={(e) => EditData(val, index)}
                                                    />
                                                </Tooltip>
                                            </CssVarsProvider>
                                        </td>
                                        <td size='sm' style={{ fontSize: 12, height: 5, textAlign: 'center' }}>{index + 1}</td>
                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.cmdate}</td>
                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.dpt}</td>
                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.cmtype}</td>
                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.locaname}</td>
                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.description}</td>
                                    </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </CssVarsProvider>
                </Box>
                <Box sx={{ height: 10 }}> </Box>
            </>
            : null
        }
        </>
    )
}

export default ComplaintListTable