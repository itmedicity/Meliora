import { CssVarsProvider, Table, Tooltip } from '@mui/joy'
import React, { Fragment, memo, useCallback, useState } from 'react'
import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone';
import ModalIncidentMarking from './ModalIncidentMarking';
import { Paper } from '@mui/material'
import { format } from 'date-fns';

const IncidentListTableView = ({ tableData, SearchReport }) => {
    const [modalData, setModalData] = useState([])
    const [incFlag, setincFlag] = useState(0)
    const [modalopen, setModalOpen] = useState(false)
    const IncidentMarkingDetails = useCallback((val) => {
        setModalData(val)
        setincFlag(1)
        setModalOpen(true)
    }, [])
    const handleClose = useCallback(() => {
        setModalOpen(false)
    }, [setModalOpen])
    return (
        <Fragment>
            {incFlag === 1 ? < ModalIncidentMarking modalData={modalData} open={modalopen} handleClose={handleClose}
                SearchReport={SearchReport} /> : null}
            < Paper variant="outlined" sx={{
                overflow: 'auto', flex: 1, cursor: 'pointer',
                '&::-webkit-scrollbar': { height: 8 }, maxHeight: window.innerHeight - 220
            }}>
                <CssVarsProvider>
                    <Table borderAxis="bothBetween" padding={"none"} stickyHeader >
                        <thead style={{ alignItems: 'center' }}>
                            <tr>
                                <th size='sm' style={{ width: 80, textAlign: 'center', fontSize: 15, backgroundColor: '#eceff1' }}>Action</th>
                                <th size='sm' style={{ width: 60, textAlign: 'center', fontSize: 15, backgroundColor: '#eceff1' }}>Sl.No</th>
                                <th size='sm' style={{ width: 180, textAlign: 'center', fontSize: 15, backgroundColor: '#eceff1' }}>Incident Date</th>
                                <th size='sm' style={{ width: 170, textAlign: 'center', fontSize: 15, backgroundColor: '#eceff1' }}>Department</th>
                                <th size='sm' style={{ width: 160, textAlign: 'center', fontSize: 15, backgroundColor: '#eceff1' }}>Clinical/Non Clinical</th>
                                <th size='sm' style={{ width: 350, textAlign: 'center', fontSize: 15, backgroundColor: '#eceff1' }}>Reason</th>
                                <th size='sm' style={{ width: 350, textAlign: 'center', fontSize: 15, backgroundColor: '#eceff1' }}>Details</th>
                                <th size='sm' style={{ width: 130, textAlign: 'center', fontSize: 15, backgroundColor: '#eceff1' }}>Reported by</th>
                                <th size='sm' style={{ width: 190, textAlign: 'center', fontSize: 15, backgroundColor: '#eceff1' }}>Reported Incident Type</th>
                                <th size='sm' style={{ width: 150, textAlign: 'center', fontSize: 15, backgroundColor: '#eceff1' }}>Status</th>
                                <th size='sm' style={{ width: 200, textAlign: 'center', fontSize: 15, backgroundColor: '#eceff1' }}>Remarks</th>
                                <th size='sm' style={{ width: 170, textAlign: 'center', fontSize: 15, backgroundColor: '#eceff1' }}>Verified Incident Type</th>
                                <th size='sm' style={{ width: 120, textAlign: 'center', fontSize: 15, backgroundColor: '#eceff1' }}>Verified by</th>
                                <th size='sm' style={{ width: 160, textAlign: 'center', fontSize: 15, backgroundColor: '#eceff1' }}>Verified Date</th>

                            </tr>
                        </thead>
                        <tbody size='small'>
                            {tableData?.map((val, index) => {
                                return (
                                    < tr key={index} size='small'
                                        style={{ cursor: 'pointer' }}>
                                        <td size='sm' style={{ textAlign: 'center', height: 15 }}>
                                            {val.incident_flag === 1 ?
                                                <CssVarsProvider>
                                                    <Tooltip title="Incident Verified" placement='left'>
                                                        <VerifiedTwoToneIcon
                                                            sx={{
                                                                color: 'red', height: 24, width: 30,
                                                                cursor: 'pointer',
                                                                ":hover": {
                                                                    color: '#ef5350',
                                                                    boxShadow: 2,
                                                                }
                                                            }}
                                                            onClick={(e) => IncidentMarkingDetails(val)}
                                                        />
                                                    </Tooltip>
                                                </CssVarsProvider>
                                                : <CssVarsProvider>
                                                    <Tooltip title="Verify Incident" placement='left'>
                                                        <VerifiedTwoToneIcon
                                                            sx={{
                                                                color: 'darkgreen', height: 24, width: 30,
                                                                cursor: 'pointer',
                                                                ":hover": {
                                                                    color: '#4caf50',
                                                                    boxShadow: 2,
                                                                }
                                                            }}
                                                            onClick={(e) => IncidentMarkingDetails(val)}
                                                        />
                                                    </Tooltip>
                                                </CssVarsProvider>
                                            }</td>
                                        <td size='sm' style={{ textAlign: 'center', fontSize: 14, height: 15 }}>{index + 1}</td>
                                        <td size='sm' style={{ fontSize: 13, height: 15 }}>{format(new Date(val.incident_date), 'dd-MM-yyyy hh:mm a')}</td>
                                        <td size='sm' style={{ fontSize: 13, height: 15 }}>{val.qi_dept_desc}</td>
                                        <td size='sm' style={{ fontSize: 14, height: 15, textAlign: 'center' }}>{val.clinic_nonclinic === 1 ? 'Clinical' : 'Non Clinical'}</td>
                                        <td size='sm' style={{ fontSize: 13, height: 15 }}>{val.incident_reason}</td>
                                        <td size='sm' style={{ fontSize: 13, height: 15 }}>{val.incident_details}</td>
                                        <td size='sm' style={{ fontSize: 13, height: 15 }}>{val.create_emp}</td>
                                        <td size='sm' style={{ fontSize: 13, height: 15 }}>{val.initial_incident_type === 1 ? 'GENERAL' : val.initial_incident_type === 2 ? 'NEAR MISSESS' :
                                            val.initial_incident_type === 3 ? 'HARMFUL' : val.initial_incident_type === 4 ? 'SENTINEL' : 'Nil'}</td>
                                        <td size='sm' style={{ fontSize: 13, height: 15 }}>{val.incident_flag === 1 ? 'Reported as Incident' : 'Not Updated'}</td>
                                        <td size='sm' style={{ fontSize: 13, height: 15 }}>{val.incident_mark_remarks === '' ? 'Nil' : val.incident_mark_remarks}</td>
                                        <td size='sm' style={{ fontSize: 13, height: 15 }}>{val.final_incident_type === 1 ? 'GENERAL' : val.final_incident_type === 2 ? 'NEAR MISSESS' :
                                            val.final_incident_type === 3 ? 'HARMFUL' : val.final_incident_type === 4 ? 'SENTINEL' : 'Nil'}</td>
                                        <td size='sm' style={{ fontSize: 13, height: 15 }}>{val.verify_emp === null ? 'Not Verified' : val.verify_emp}</td>
                                        <td size='sm' style={{ fontSize: 13, height: 15 }}>{val.verified_date === null ? 'Not Verified' : format(new Date(val.verified_date), 'dd-MM-yyyy hh:mm a')}</td>

                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </CssVarsProvider>
            </Paper>
        </Fragment >
    )
}

export default memo(IncidentListTableView)