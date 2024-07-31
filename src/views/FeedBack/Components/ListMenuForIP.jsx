
import { Avatar, Box, Tooltip, Typography } from '@mui/joy'
import React, { Fragment, memo, useCallback } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import RoomCheckListForm from './RoomCheckListForm';
import IncidentRegistration from 'src/views/IncidentManagement/IncidentRegistration';
import ComplaintRegForm from './ComplaintRegForm';
import ViewDetailsInOneForm from './ViewDetailsInOneForm';
// import IPFeedbackForm from './IPFeedbackForm';

const ListMenuForIP = ({ setformFlag, ptDetails, regFormFlag, nsName, open, handleClose, detailFlag, setDetailFlag }) => {
    const { bed } = ptDetails
    const backtoHome = useCallback(() => {
        setformFlag(0)
        setDetailFlag(0)
    }, [setformFlag, setDetailFlag])

    return (
        <Fragment>
            <Box variant="outlined" >
                <Box sx={{ display: 'flex', height: 42, bgcolor: '#E3F2FD', }}>
                    <Box sx={{ flex: 1, fontSize: 19, pt: 1, pl: 2, }}>
                        <Typography sx={{ fontSize: 17, fontWeight: 550 }}>
                            {bed}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', flex: 1, fontSize: 20, pt: 0.7, pr: 0.2 }}>
                        <Tooltip title="Close" placement="bottom" >
                            <Avatar size="sm" variant="plain" sx={{ bgcolor: '#eceff1' }}>
                                <CloseIcon sx={{ cursor: 'pointer', size: 'lg', fontSize: 20, color: '#424242' }}
                                    onClick={backtoHome}
                                />
                            </Avatar>
                        </Tooltip>
                    </Box>
                </Box>

                {detailFlag === 0 ?
                    <Box sx={{ border: '1px solid lightgrey', overflow: 'auto' }}>
                        {regFormFlag === 1 ?
                            <Box sx={{ display: 'flex', alignItems: 'left', m: 0.5, p: 0, flexDirection: 'column' }}>
                                <RoomCheckListForm ptDetails={ptDetails} />
                            </Box>
                            : regFormFlag === 2 ?
                                <Box sx={{ display: 'flex', alignItems: 'left', m: 0.5, p: 0, flexDirection: 'column' }}>
                                    <ComplaintRegForm nsName={nsName} ptDetails={ptDetails} />
                                </Box>

                                : regFormFlag === 3 ?
                                    <Box sx={{ display: 'flex', alignItems: 'left', m: 0.5, p: 0, flexDirection: 'column' }}>
                                        <IncidentRegistration nsName={nsName} open={open} handleClose={handleClose} ptDetails={ptDetails} />
                                    </Box>
                                    : regFormFlag === 4 ?
                                        <Box sx={{ display: 'flex', alignItems: 'left', m: 0.5, p: 0, flexDirection: 'column' }}>
                                            {/* <IPFeedbackForm ptDetails={ptDetails} /> */}
                                        </Box>
                                        : null}
                        {/*  <Paper sx={{ padding: 2, display: 'flex', alignItems: 'left', }}>
                    <Typography>Feedback</Typography>
                </Paper> */}

                    </Box> :
                    <Box sx={{ display: 'flex', alignItems: 'left', m: 0.5, p: 0, flexDirection: 'column', overflow: 'auto', }}>
                        <ViewDetailsInOneForm ptDetails={ptDetails} nsName={nsName} />
                    </Box>
                }

            </Box>
        </Fragment>
    )
}

export default memo(ListMenuForIP)