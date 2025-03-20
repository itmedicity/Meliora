import { Box, CssVarsProvider, IconButton, Table } from '@mui/joy'
import React, { memo, useCallback, useState } from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { format } from 'date-fns';

const AllPendingsAccounts = ({ filteredPendingCondemAllDeptAcc, viewForm, editForm }) => {
    return (
        <Box>
            <CssVarsProvider>
                {filteredPendingCondemAllDeptAcc && filteredPendingCondemAllDeptAcc.length > 0 ? (
                    <Table stickyHeader size='sm'
                        sx={{ borderRadius: 2 }} borderAxis='both' >
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'center', width: 12 }}>
                                    <IconButton sx={{ color: 'black', fontSize: 13 }}>
                                        Serial No.
                                    </IconButton>
                                </th>
                                <th style={{ textAlign: 'center', width: 12 }}>
                                    <IconButton sx={{ color: 'black', fontSize: 13 }}>
                                        Action
                                    </IconButton>
                                </th>
                                <th style={{ textAlign: 'center', width: 20 }}>
                                    <IconButton sx={{ color: 'black', fontSize: 13 }}>
                                        Status
                                    </IconButton>
                                </th>
                                <th style={{ textAlign: 'center', width: 22 }}>
                                    <IconButton sx={{ color: 'black', fontSize: 13 }}>
                                        Form Number
                                    </IconButton>
                                </th>
                                <th style={{ textAlign: 'center', width: 15 }}>
                                    <IconButton sx={{ color: 'black', fontSize: 13 }}>
                                        Registered Date
                                    </IconButton>
                                </th>
                                <th style={{ textAlign: 'center', width: 10 }}>
                                    <IconButton sx={{ color: 'black', fontSize: 13 }}>
                                        Asset Count
                                    </IconButton>
                                </th>
                                <th style={{ textAlign: 'center', width: 10 }}>
                                    <IconButton sx={{ color: 'black', fontSize: 13 }}>
                                        Spare Count
                                    </IconButton>
                                </th>
                            </tr>
                        </thead>
                        <tbody >
                            {filteredPendingCondemAllDeptAcc
                                ?.slice()
                                .sort((a, b) => a.condem_status - b.condem_status)
                                .map((val, index) => (
                                    <tr key={index}>
                                        <td style={{ textAlign: 'center', }}>{index + 1}</td>
                                        <td >{val.condem_status <= 5 ?
                                            <Box sx={{
                                                bgcolor: '#94BBD5', textAlign: 'center', justifyContent: 'center', fontWeight: 700, cursor: 'pointer',
                                                fontSize: 13,
                                                '&:hover': { bgcolor: '#7AA4C7' },
                                            }}
                                                onClick={() => editForm(val)}
                                            >
                                                <ModeEditIcon size={6}
                                                    sx={{ cursor: 'pointer', p: .4, color: 'black' }} />
                                                Edit
                                            </Box> :
                                            <Box sx={{
                                                bgcolor: '#A8BBB0', textAlign: 'center', justifyContent: 'center', fontWeight: 700, cursor: 'pointer',
                                                fontSize: 13, py: .2,
                                                '&:hover': { bgcolor: '#8FA297 ' },
                                            }}
                                                onClick={() => viewForm(val)}
                                            >
                                                View Details
                                            </Box>}
                                        </td>
                                        <td >
                                            <Box sx={{
                                                bgcolor:
                                                    val.condem_status === 2 && val.incharge_approve_status === 1 ? "#7AC7AD" :
                                                        val.condem_status === 2 && val.incharge_approve_status === 2 ? "#F4A3A3" :
                                                            val.condem_status === 3 && val.hod_approve_status === 1 ? "#7AC7AD" :
                                                                val.condem_status === 3 && val.hod_approve_status === 2 ? "#F4A3A3 " :
                                                                    val.condem_status === 4 && val.gm_approve_status === 1 ? "#7AC7AD" :
                                                                        val.condem_status === 4 && val.gm_approve_status === 2 ? "#F4A3A3 " :
                                                                            val.condem_status === 5 && val.acc_approve_status === 1 ? "#7AC7AD" :
                                                                                val.condem_status === 5 && val.acc_approve_status === 2 ? "#F4A3A3 " :
                                                                                    val.condem_status === 6 && val.store_approve_status === 1 ? "#7AC7AD" :
                                                                                        val.condem_status === 6 && val.store_approve_status === 2 ? "#F4A3A3 " :
                                                                                            val.condem_status === 7 && val.material_mangmnt_mangr_apprv_status === 1 ? "#7AC7AD" :
                                                                                                val.condem_status === 7 && val.material_mangmnt_mangr_apprv_status === 2 ? "#F4A3A3 "
                                                                                                    : '#EFF4F0',
                                                textAlign: 'center', justifyContent: 'center', fontWeight: 700, cursor: 'pointer',
                                                fontSize: 13, py: .2
                                            }}>
                                                {val.condem_status === 2 && val.incharge_approve_status === 1 ? "Incharge Approved" :
                                                    val.condem_status === 2 && val.incharge_approve_status === 2 ? "Incharge Rejected" :
                                                        val.condem_status === 3 && val.hod_approve_status === 1 ? "Hod Approved" :
                                                            val.condem_status === 3 && val.hod_approve_status === 2 ? "Hod Rejected" :
                                                                val.condem_status === 4 && val.gm_approve_status === 1 ? "GM Operations Approved" :
                                                                    val.condem_status === 4 && val.gm_approve_status === 2 ? "GM Operations Rejected" :
                                                                        val.condem_status === 5 && val.acc_approve_status === 1 ? "Accounts Approved" :
                                                                            val.condem_status === 5 && val.acc_approve_status === 2 ? "Accounts Rejected" :
                                                                                val.condem_status === 6 && val.store_approve_status === 1 ? "Store Approved" :
                                                                                    val.condem_status === 6 && val.store_approve_status === 2 ? "Store Rejected" :
                                                                                        val.condem_status === 7 && val.material_mangmnt_mangr_apprv_status === 1 ? "Condemnation Approved" :
                                                                                            val.condem_status === 7 && val.material_mangmnt_mangr_apprv_status === 2 ? "Condemnation Rejected" :
                                                                                                'Pending Approval'}
                                            </Box>
                                        </td>
                                        <td style={{ textAlign: 'center', }}>{val.condem_form_prefix}/{val.condem_form_no}</td>
                                        <td style={{ textAlign: 'center', }}>{val.reg_date ? format(new Date(val.reg_date), 'dd-MMM-yyyy') : 'N/A'}</td>
                                        <td style={{ textAlign: 'center', }}>{val.count_of_asset || '-'}</td>
                                        <td style={{ textAlign: 'center', }}>{val.count_of_spare || '-'}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                ) :
                    <Box
                        sx={{
                            fontSize: 26,
                            fontWeight: 600,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: '74vh',
                            width: "100%",
                            textAlign: "center",
                            color: 'lightgrey',
                            border: 1
                        }}
                    >
                        Empty List
                    </Box>}
            </CssVarsProvider>
        </Box>
    )
}
export default AllPendingsAccounts