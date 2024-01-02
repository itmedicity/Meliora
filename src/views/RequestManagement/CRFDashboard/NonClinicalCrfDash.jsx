import { Box, Paper } from '@mui/material'
import React, { useCallback, memo, useState, } from 'react'
import { taskColor } from 'src/color/Color';
import { Typography } from '@mui/joy'
import CloseIcon from '@mui/icons-material/Close';
import CusIconButton from 'src/views/Components/CusIconButton';
import CrfInchargeDashTable from './CRFInchargeDashboard/CrfInchargeDashTable';
import { warningNotify } from 'src/views/Common/CommonCode';
import CrfHodDashTable from './CRFHodDashBoard/CrfHodDashTable';
import CrfMODashTable from './CRFMODashBoard/CrfMODashTable';
import CrfSMODashTable from './CRFSMODashBoard/CrfSMODashTable';
import CrfCOODashTable from './CRFCOODashBoard/CrfCOODashTable';
import CrfMDDashTable from './CRFMDDashBoard/CrfMDDashTable';
import CrfEDDashTable from './CRFEDDashBoard/CrfEDDashTable';
import NDRFgenPendDashTable from './NDRFGenPendingDashBoard/NDRFgenPendDashTable';
import _ from 'underscore'
import { useSelector } from 'react-redux'
import NDRFgenPendTable from './NDRFgenPendingEDDashBord/NDRFgenPendTable';

const NonClinicalCrfDash = ({ setClinicalCrfFlag, subDaFlag, data, count, setCount }) => {
    const [wherePending, setWherePending] = useState(0)

    //redux for geting login id
    const em_id = useSelector((state) => state.LoginUserData.empid, _.isEqual)

    const InchargePending = data && data.filter((val) => val.incharge_approve === null)

    const HODPending = data && data.filter((val) => val.hod_approve === null)

    const MOPending = data && data.filter((val) => val.manag_operation_approv === null)

    const SMOPending = data && data.filter((val) => val.senior_manage_approv === null)

    const CAOCOOPending = data && data.filter((val) => val.cao_approve === null)

    const MDPending = data && data.filter((val) => val.md_approve_req === 1 && val.md_approve === null)

    const EDPending = data && data.filter((val) => val.ed_approve_req === 1 && val.ed_approve === null)

    const NDRFGenPending = data && data.filter((val) =>
        (val.cao_approve === 1 && val.ed_approve_req === 0 && val.md_approve_req === 0 && val.rm_ndrf !== 1) ||
        (val.ed_approve_req === 1 && val.ed_approve === 1 && val.md_approve === 1 && val.rm_ndrf !== 1))


    const crfPendingClinicalIncharge = useCallback(() => {
        if (InchargePending.length !== 0) {
            setWherePending(1)
        } else {
            warningNotify("No CRF For Incharge Approval Pending")
            setWherePending(0)
        }
    }, [InchargePending])

    const crfPendingClinicalHOD = useCallback(() => {
        if (HODPending.length !== 0) {
            setWherePending(2)
        } else {
            warningNotify("No CRF For HOD Approval Pending")
            setWherePending(0)
        }
    }, [HODPending])

    const crfPendingClinicalMO = useCallback(() => {
        if (MOPending.length !== 0) {
            setWherePending(3)
        } else {
            warningNotify("No CRF For Manager Opration Approval Pending")
            setWherePending(0)
        }
    }, [MOPending])
    const crfPendingClinicalSMO = useCallback(() => {
        if (SMOPending.length !== 0) {
            setWherePending(4)
        } else {
            warningNotify("No CRF For Senior Manager Operation Approval Pending")
            setWherePending(0)
        }
    }, [SMOPending])
    const crfPendingClinicalCOOCAO = useCallback(() => {
        if (CAOCOOPending.length !== 0) {
            setWherePending(5)
        } else {
            warningNotify("No CRF For CAO/COO Approval Pending")
            setWherePending(0)
        }
    }, [CAOCOOPending])

    const crfPendingClinicalMD = useCallback(() => {
        if (MDPending.length !== 0) {
            setWherePending(6)
        } else {
            warningNotify("No CRF For ND Approval Pending")
            setWherePending(0)
        }
    }, [MDPending])
    const crfPendingClinicalED = useCallback(() => {
        if (EDPending.length !== 0) {
            setWherePending(7)
        } else {
            warningNotify("No CRF For ED Approval Pending")
            setWherePending(0)
        }
    }, [EDPending])

    const crfPendingClinicalNDRFGen = useCallback(() => {
        if (NDRFGenPending.length !== 0) {
            setWherePending(8)
        } else {
            warningNotify("No CRF For NDRF Generation Pending")
            setWherePending(0)
        }
    }, [NDRFGenPending])


    const close = useCallback(() => {
        setClinicalCrfFlag(0)
    }, [setClinicalCrfFlag])


    return (
        < Box
            sx={{
                display: 'flex',
                minHeight: window.innerHeight - 85,
                borderRadius: 2,
                overflow: 'hidden',
                flexDirection: 'column',
                border: 1,
                borderWidth: 1.5,
                borderColor: taskColor.bgIndigo,
            }
            } >
            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor: '#ffffff',
                    maxHeight: 40,
                    alignItems: 'center',
                    borderBottom: 1,
                    borderColor: '#b5b3ca',
                    pl: 2
                }}
            >

                <Box sx={{ width: "95%", pl: 1, color: '#262065', display: 'flex', pt: 0.3 }} >Non Clinical CRF Dashboard</Box>

                <Box sx={{ width: "5%", }}>
                    <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={close}>
                        <CloseIcon fontSize='small' />
                    </CusIconButton>
                </Box>


            </Box>

            <Paper variant='none' sx={{
                mt: 1, width: "70%", ml: 30
                // alignItems: "center",
                // justifyItems: "center",
                // backgroundColor: "green"

            }} >

                <Box sx={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    padding: 1,
                    //backgroundColor: '#ffffff',
                    overflow: 'hidden',
                }} >
                    <Paper sx={{
                        width: '2.2%',

                    }}
                        variant='none'></Paper>
                    <Paper
                        sx={{
                            width: '23%', pl: 0.5,
                            height: 160,
                            backgroundColor: taskColor.bgIndigo,
                            border: 1,
                            padding: 2,
                            borderColor: taskColor.indigoDark,
                            cursor: 'grab',
                            ":hover": {
                                borderColor: '#7D18EA'
                            }
                        }}
                        variant='outlined'
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                height: '30%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: "center",
                                fontWeight: 600,
                                fontSize: 16,
                                fontSmooth: 'auto',
                                color: taskColor.FontindigoDark
                            }}
                        >Incharge Pending</Box>
                        <Box
                            sx={{
                                display: 'flex',
                                height: '50%',
                                fontSize: 48,
                                fontWeight: 500,
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: taskColor.FontindigoDark,
                            }}
                        >
                            <Typography
                                sx={{
                                    cursor: 'pointer',
                                    ":hover": {
                                        transition: 300,
                                        textShadow: '#939498 1px 0 5px'
                                    }
                                }}
                                onClick={() => crfPendingClinicalIncharge()}
                            >{InchargePending.length}</Typography>
                        </Box>

                    </Paper>

                    <Paper sx={{
                        width: '1%',

                    }}
                        variant='none'></Paper>
                    <Paper
                        sx={{
                            width: '23%',
                            height: 160, pl: 1,
                            backgroundColor: taskColor.bgIndigo,
                            border: 1,
                            padding: 2,
                            borderColor: taskColor.indigoDark,
                            cursor: 'grab',
                            ":hover": {
                                borderColor: '#7D18EA'
                            }
                        }}
                        variant='outlined'
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                height: '30%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: "center",
                                fontWeight: 600,
                                fontSize: 16,
                                fontSmooth: 'auto',
                                color: taskColor.FontindigoDark
                            }}
                        >HOD Pending</Box>
                        <Box
                            sx={{
                                display: 'flex',
                                height: '50%',
                                fontSize: 48,
                                fontWeight: 500,
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: taskColor.FontindigoDark,
                            }}
                        >
                            <Typography
                                sx={{
                                    cursor: 'pointer',
                                    ":hover": {
                                        transition: 300,
                                        textShadow: '#939498 1px 0 5px'
                                    }
                                }}
                                onClick={() => crfPendingClinicalHOD()}
                            >{HODPending.length}</Typography>
                        </Box>

                    </Paper>
                    <Paper sx={{
                        width: '1%',

                    }}
                        variant='none'></Paper>
                    <Paper
                        sx={{
                            width: '23%', pl: 0.5,
                            height: 160,
                            backgroundColor: taskColor.bgIndigo,
                            border: 1,
                            padding: 2,
                            borderColor: taskColor.indigoDark,
                            cursor: 'grab',
                            ":hover": {
                                borderColor: '#7D18EA'
                            }
                        }}
                        variant='outlined'
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                height: '30%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: "center",
                                fontWeight: 600,
                                fontSize: 16,
                                fontSmooth: 'auto',
                                color: taskColor.FontindigoDark
                            }}
                        >Manager Operation Pending</Box>
                        <Box
                            sx={{
                                display: 'flex',
                                height: '50%',
                                fontSize: 48,
                                fontWeight: 500,
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: taskColor.FontindigoDark,
                            }}
                        >
                            <Typography
                                sx={{
                                    cursor: 'pointer',
                                    ":hover": {
                                        transition: 300,
                                        textShadow: '#939498 1px 0 5px'
                                    }
                                }}
                                onClick={() => crfPendingClinicalMO()}
                            >{MOPending.length}</Typography>
                        </Box>

                    </Paper>

                    <Paper sx={{
                        width: '1%',

                    }}
                        variant='none'></Paper>
                    <Paper
                        sx={{
                            width: '23%', pl: 0.5,
                            height: 160,
                            backgroundColor: taskColor.bgIndigo,
                            border: 1,
                            padding: 2,
                            borderColor: taskColor.indigoDark,
                            cursor: 'grab',
                            ":hover": {
                                borderColor: '#7D18EA'
                            }
                        }}
                        variant='outlined'
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                height: '30%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: "center",
                                fontWeight: 600,
                                fontSize: 16,
                                fontSmooth: 'auto',
                                color: taskColor.FontindigoDark
                            }}
                        >Senior Manager Operation Pending</Box>
                        <Box
                            sx={{
                                display: 'flex',
                                height: '50%',
                                fontSize: 48,
                                fontWeight: 500,
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: taskColor.FontindigoDark,
                            }}
                        >
                            <Typography
                                sx={{
                                    cursor: 'pointer',
                                    ":hover": {
                                        transition: 300,
                                        textShadow: '#939498 1px 0 5px'
                                    }
                                }}
                                onClick={() => crfPendingClinicalSMO()}
                            >{SMOPending.length}</Typography>
                        </Box>

                    </Paper>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    padding: 1,
                    //backgroundColor: '#ffffff',
                    overflow: 'hidden',
                }} >
                    <Paper sx={{
                        width: '2.2%',

                    }}
                        variant='none'></Paper>
                    <Paper
                        sx={{
                            width: '23%',
                            height: 160,
                            backgroundColor: taskColor.bgIndigo,
                            border: 1,
                            padding: 2,
                            borderColor: taskColor.indigoDark,
                            cursor: 'grab',
                            ":hover": {
                                borderColor: '#7D18EA'
                            }
                        }}
                        variant='outlined'
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                height: '30%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: "center",
                                fontWeight: 600,
                                fontSize: 16,
                                fontSmooth: 'auto',
                                color: taskColor.FontindigoDark
                            }}
                        >CAO/COO Pending</Box>
                        <Box
                            sx={{
                                display: 'flex',
                                height: '50%',
                                fontSize: 48,
                                fontWeight: 500,
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: taskColor.FontindigoDark,
                            }}
                        >
                            <Typography
                                sx={{
                                    cursor: 'pointer',
                                    ":hover": {
                                        transition: 300,
                                        textShadow: '#939498 1px 0 5px'
                                    }
                                }}
                                onClick={() => crfPendingClinicalCOOCAO()}
                            >{CAOCOOPending.length}</Typography>
                        </Box>

                    </Paper>
                    <Paper sx={{
                        width: '1%',

                    }}
                        variant='none'></Paper>
                    <Paper
                        sx={{
                            width: '23%', pl: 0.5,
                            height: 160,
                            backgroundColor: taskColor.bgIndigo,
                            border: 1,
                            padding: 2,
                            borderColor: taskColor.indigoDark,
                            cursor: 'grab',
                            ":hover": {
                                borderColor: '#7D18EA'
                            }
                        }}
                        variant='outlined'
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                height: '30%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: "center",
                                fontWeight: 600,
                                fontSize: 16,
                                fontSmooth: 'auto',
                                color: taskColor.FontindigoDark
                            }}
                        >MD Pending</Box>
                        <Box
                            sx={{
                                display: 'flex',
                                height: '50%',
                                fontSize: 48,
                                fontWeight: 500,
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: taskColor.FontindigoDark,
                            }}
                        >
                            <Typography
                                sx={{
                                    cursor: 'pointer',
                                    ":hover": {
                                        transition: 300,
                                        textShadow: '#939498 1px 0 5px'
                                    }
                                }}
                                onClick={() => crfPendingClinicalMD()}
                            >{MDPending.length}</Typography>
                        </Box>

                    </Paper>
                    <Paper sx={{
                        width: '1%',

                    }}
                        variant='none'></Paper>
                    <Paper
                        sx={{
                            width: '23%', pl: 0.5,
                            height: 160,
                            backgroundColor: taskColor.bgIndigo,
                            border: 1,
                            padding: 2,
                            borderColor: taskColor.indigoDark,
                            cursor: 'grab',
                            ":hover": {
                                borderColor: '#7D18EA'
                            }
                        }}
                        variant='outlined'
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                height: '30%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: "center",
                                fontWeight: 600,
                                fontSize: 16,
                                fontSmooth: 'auto',
                                color: taskColor.FontindigoDark
                            }}
                        >ED Pending</Box>
                        <Box
                            sx={{
                                display: 'flex',
                                height: '50%',
                                fontSize: 48,
                                fontWeight: 500,
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: taskColor.FontindigoDark,
                            }}
                        >
                            <Typography
                                sx={{
                                    cursor: 'pointer',
                                    ":hover": {
                                        transition: 300,
                                        textShadow: '#939498 1px 0 5px'
                                    }
                                }}
                                onClick={() => crfPendingClinicalED()}
                            >{EDPending.length}</Typography>
                        </Box>

                    </Paper>

                    <Paper sx={{
                        width: '1%',

                    }}
                        variant='none'></Paper>
                    <Paper
                        sx={{
                            width: '23%',
                            height: 160,
                            backgroundColor: taskColor.bgIndigo,
                            border: 1,
                            padding: 2,
                            borderColor: taskColor.indigoDark,
                            cursor: 'grab',
                            ":hover": {
                                borderColor: '#7D18EA'
                            }
                        }}
                        variant='outlined'
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                height: '30%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: "center",
                                fontWeight: 600,
                                fontSize: 16,
                                fontSmooth: 'auto',
                                color: taskColor.FontindigoDark
                            }}
                        >NDRF Generation Pending</Box>
                        <Box
                            sx={{
                                display: 'flex',
                                height: '50%',
                                fontSize: 48,
                                fontWeight: 500,
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: taskColor.FontindigoDark,
                            }}
                        >
                            <Typography
                                sx={{
                                    cursor: 'pointer',
                                    ":hover": {
                                        transition: 300,
                                        textShadow: '#939498 1px 0 5px'
                                    }
                                }}
                                onClick={() => crfPendingClinicalNDRFGen()}
                            >{NDRFGenPending.length}</Typography>
                        </Box>

                    </Paper>
                </Box>


            </Paper>

            {wherePending === 1 ?
                <Box>
                    <CrfInchargeDashTable subDaFlag={subDaFlag} tabledata={InchargePending}
                        count={count} setCount={setCount} />
                </Box>
                : wherePending === 2 ?
                    <Box>
                        <CrfHodDashTable subDaFlag={subDaFlag} tabledata={HODPending}
                            count={count} setCount={setCount} />
                    </Box> : wherePending === 3 ?
                        <Box>
                            <CrfMODashTable subDaFlag={subDaFlag} tabledata={MOPending}
                                count={count} setCount={setCount} />
                        </Box> : wherePending === 4 ?
                            <Box>
                                <CrfSMODashTable subDaFlag={subDaFlag} tabledata={SMOPending}
                                    count={count} setCount={setCount} />
                            </Box> : wherePending === 5 ?
                                <Box>
                                    <CrfCOODashTable subDaFlag={subDaFlag} tabledata={CAOCOOPending}
                                        count={count} setCount={setCount} />
                                </Box> : wherePending === 6 ?
                                    <Box>
                                        <CrfMDDashTable subDaFlag={subDaFlag} tabledata={MDPending}
                                            count={count} setCount={setCount} />
                                    </Box> : wherePending === 7 ?
                                        <Box>
                                            <CrfEDDashTable subDaFlag={subDaFlag} tabledata={EDPending}
                                                count={count} setCount={setCount} />
                                        </Box> : wherePending === 8 ?
                                            <Box>
                                                {em_id === 2605 ?
                                                    < Box >
                                                        <NDRFgenPendTable subDaFlag={subDaFlag} tabledata={NDRFGenPending}
                                                            count={count} setCount={setCount}
                                                        />
                                                    </Box> : em_id === 2604 ?
                                                        < Box >
                                                            <NDRFgenPendTable subDaFlag={subDaFlag} tabledata={NDRFGenPending}
                                                                count={count} setCount={setCount}
                                                            />
                                                        </Box> :
                                                        em_id === 1851 ?
                                                            < Box >
                                                                <NDRFgenPendTable subDaFlag={subDaFlag} tabledata={NDRFGenPending}
                                                                    count={count} setCount={setCount}
                                                                />
                                                            </Box> :
                                                            < Box >
                                                                <NDRFgenPendDashTable subDaFlag={subDaFlag} tabledata={NDRFGenPending}
                                                                    count={count} setCount={setCount}
                                                                />
                                                            </Box>
                                                }
                                            </Box>
                                            : null

            }

        </Box >
    )
}

export default memo(NonClinicalCrfDash)