import { CssVarsProvider, Table } from '@mui/joy'
import { Box, Paper, } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { memo } from 'react'
import { Fragment } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import EditIcon from '@mui/icons-material/Edit'

const PswdSoftWareTable = ({ swTableCount, rowSelectForSw }) => {
    const [viewSoftTable, setviewSoftTable] = useState(0)
    const [tabledata, setTabledata] = useState([])
    useEffect(() => {
        const getSoftwareTable = async () => {
            const result = await axioslogin.get('PasswordManagementMain/SoftwareView')
            const { success, data } = result.data
            if (success === 2) {
                const arr = data?.map((val) => {
                    const obj = {
                        paswd_soft_slno: val.paswd_soft_slno,
                        paswd_soft_webname: val.paswd_soft_webname,
                        paswd_soft_linkname: val.paswd_soft_linkname,
                        paswd_soft_username: val.paswd_soft_username,
                        paswd_soft_password: val.paswd_soft_password,
                        paswd_soft_remarks: val.paswd_soft_remarks,
                    }
                    return obj
                })
                setTabledata(arr)
            } else {
                warningNotify('error occured')
            }
        }
        getSoftwareTable()
    }, [swTableCount])

    useEffect(() => {
        if (tabledata.length !== 0) {
            setviewSoftTable(1)
        }
        else {
            setviewSoftTable(0)
        }
    }, [tabledata])
    return (
        <Fragment>
            <Box>
                {viewSoftTable === 1 ?
                    <Paper variant="outlined" sx={{ maxHeight: '90%', maxWidth: '100%', overflow: 'auto', }}>
                        <CssVarsProvider>
                            <Table padding={"none"} stickyHeader hoverRow>
                                <thead>
                                    <tr >
                                        <th style={{ width: 50 }} >Action</th>
                                        <th style={{ width: 50 }}>SlNo</th>
                                        <th style={{ width: 150 }}>Web Name </th>
                                        <th style={{ width: 150 }}>URLs</th>
                                        <th style={{ width: 150 }}>User Name</th>
                                        <th style={{ width: 150 }}>Password</th>
                                        <th style={{ width: 150 }}>Credential Remarks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tabledata?.map((val, index) => {
                                        return (
                                            <tr
                                                key={index}
                                                sx={{
                                                    '&:last-child td, &:last-child th': { border: 0 }, maxHeight: 60,
                                                    minHeight: 5
                                                }}
                                            >
                                                <td>
                                                    <EditIcon
                                                        sx={{ cursor: 'pointer' }} size={6} onClick={() => rowSelectForSw(val)}
                                                    />
                                                </td>
                                                <td> {index + 1}</td>
                                                <td> {val.paswd_soft_webname || 'not given'}</td>
                                                <td> {val.paswd_soft_linkname || 'not given'}</td>
                                                <td> {val.paswd_soft_username || 'not given'}</td>
                                                <td> {val.paswd_soft_password || 'not given'}</td>
                                                <td> {val.paswd_soft_remarks || 'not given'}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </CssVarsProvider>
                    </Paper>
                    : <Box>
                    </Box>
                }
            </Box>
        </Fragment>
    )
}

export default memo(PswdSoftWareTable)