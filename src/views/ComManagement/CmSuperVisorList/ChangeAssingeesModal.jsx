import { Box, Button, Chip, CssVarsProvider, Modal, ModalDialog, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import { axioslogin } from 'src/views/Axios/Axios';
import { useSelector } from 'react-redux';
import AssistantEmpSelect from 'src/views/CommonSelectCode/AssistantEmpSelect';
import { format } from 'date-fns';
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';

const ChangeAssingeesModal = ({ empTransferOpen, setEmptransferOpen, emptransferData, setEmptransferFlag, setCount, count }) => {

    const { complaint_slno, complaint_desc, compalint_date, rm_roomtype_name, rm_room_name, rm_insidebuildblock_name,
        rm_floor_name, location, complaint_type_name } = emptransferData

    const empdept = useSelector((state) => state?.LoginUserData?.empdept)
    const id = useSelector((state) => state?.LoginUserData?.empid)

    const [assing, setAssing] = useState([])
    const [empName, setempname] = useState([])

    const Close = useCallback(() => {
        setEmptransferFlag(0)
        setEmptransferOpen(false)
        setempname([])
        setAssing([])
    }, [setEmptransferOpen, setEmptransferFlag, setAssing, setempname])

    useEffect(() => {
        const getEmployeees = async () => {
            const result = await axioslogin.get(`Rectifycomplit/getAssignEmps/${complaint_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                setempname(data)
            }
            else {
                setempname([])
            }
        }
        getEmployeees();
    }, [complaint_slno])

    //data setting to indert to db
    const postData = assing && assing.map((val) => {
        return {
            complaint_slno: complaint_slno,
            assigned_emp: val,
            assigned_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            assign_rect_status: 0,
            assigned_user: id,
            assign_status: 1
        }
    })
    const inactive = empName && empName.map((value) => {
        return {
            complaint_slno: complaint_slno,
            assigned_emp: value.assigned_emp
        }
    })

    const Transfer = useCallback(() => {
        const Assignemp = async (postData) => {
            const result = await axioslogin.post(`/complaintassign/transfer/insert`, postData);
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                Close()
                setCount(count + 1)
            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }
        const Inactiveemp = async (inactive) => {
            const result = await axioslogin.post(`/complaintassign/employeeTrans/Inactive`, inactive);
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }
        if (empName.length === 0) {
            infoNotify("Please Select Employee")
        } else {
            Inactiveemp(inactive)
            Assignemp(postData);
        }

    }, [postData, inactive, count, setCount, Close, empName])

    const postdata = {
        em_department: empdept,
        em_id: id
    }
    const buttonStyle = {
        fontSize: 16,
        color: '#523A28',
        cursor: 'pointer',
        boxShadow: 5,
        border: 'none',
        transition: 'transform 0.2s, bgcolor 0.2s',
        '&:hover': {
            bgcolor: 'white',
            color: '#523A28',
            transform: 'scale(1.1)',
        },
        '&:active': {
            transform: 'scale(0.95)',
        },
    }

    return (
        <Box>
            <CssVarsProvider>
                <Modal
                    open={empTransferOpen}>
                    < ModalDialog
                        sx={{
                            width: '55vw',
                            p: 0,
                            overflow: 'auto'
                        }}
                    >
                        <Box sx={{ flex: 1, display: 'flex', mt: 1, p: 1, }}>
                            <Box sx={{ flex: 1, color: 'grey', }}>
                                Change Assignees
                            </Box>
                            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                <CancelIcon sx={{ color: 'darkred', cursor: 'pointer' }}
                                    onClick={Close}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', bgcolor: '#ECEDEF', py: .5 }}>
                            <Box sx={{ flex: 2, pl: .5 }}>
                                <Typography sx={{ pl: .5, fontWeight: 600, color: 'Black', }}>Ticket No.{complaint_slno}</Typography>
                                <Typography sx={{ pl: .5, fontSize: 14, color: 'Black', }}>
                                    {complaint_desc}
                                </Typography>
                                <Typography sx={{ pl: .5, fontSize: 13, color: 'Black', py: .5 }}>
                                    Complaint Type: {complaint_type_name}
                                </Typography>
                            </Box>
                            <Box sx={{ flex: 1, textAlign: 'right', pr: 1.5 }}>
                                <Typography sx={{ pl: .5, fontSize: 13, color: 'Black', }}>
                                    {location}
                                </Typography>
                                {rm_room_name !== null ?
                                    <Typography sx={{ pl: .5, fontSize: 13, color: 'Black', }}>
                                        {rm_room_name}
                                        {rm_roomtype_name || rm_insidebuildblock_name || rm_floor_name ?
                                            ` (${rm_roomtype_name ? rm_roomtype_name : ''}${rm_roomtype_name && rm_insidebuildblock_name ? ' - ' : ''}${rm_insidebuildblock_name ? rm_insidebuildblock_name : ''}${(rm_insidebuildblock_name && rm_floor_name) ? ' - ' : ''}${rm_floor_name ? rm_floor_name : ''})`
                                            : "Not Updated"}
                                    </Typography> : null}
                                <Typography sx={{ pl: .5, fontSize: 13, color: 'Black', }}>
                                    {compalint_date}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', mt: 2, mx: 8, }}>
                            <Typography sx={{ flex: 1.5 }}>
                                Assignees :
                            </Typography>
                            <Box sx={{
                                flex: 3,
                                // border: 1, borderColor: 'lightgrey', borderRadius: 4,
                                minHeight: 30,
                            }}>
                                {empName?.map((val, index) => {
                                    return (
                                        <Chip key={index} sx={{ bgcolor: '#D3C7A1', ml: .5 }}>
                                            {val.em_name}
                                        </Chip>
                                    )
                                })}
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', mx: 8, }}>
                            <Typography sx={{ flex: 1.5 }}>
                                Change Assignees to :
                            </Typography>
                            <Box sx={{ flex: 3, }}>
                                <AssistantEmpSelect postdata={postdata} value={assing} setValue={setAssing} />
                            </Box>

                        </Box>

                        <Box sx={{ textAlign: 'right', pb: 3, mr: 1 }}>
                            <Button
                                variant='plain'
                                sx={buttonStyle}
                                onClick={Transfer}
                            >Save</Button>
                            <Button
                                variant='plain'
                                sx={buttonStyle}
                                onClick={Close}
                            >Cancel</Button>
                        </Box>
                    </ModalDialog>
                </Modal>
            </CssVarsProvider>
        </Box >
    )
}

export default memo(ChangeAssingeesModal)