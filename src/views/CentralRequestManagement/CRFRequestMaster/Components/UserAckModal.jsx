import { Box, Button, CssVarsProvider, Modal, ModalClose, ModalDialog, Table, Textarea, Tooltip, Typography } from '@mui/joy'
import { format } from 'date-fns'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import { Virtuoso } from 'react-virtuoso'
import { Paper } from '@mui/material'

const UserAckModal = ({ req_slno, handleClose, open, count, setCount }) => {
    const [Acknowledgement, setAcknowledmnt] = useState(true)
    const [Ackremark, setAckRemark] = useState('')
    const [expandedRow, setExpandedRow] = useState(null);
    const [expandedRowData, setExpandedRowData] = useState([])
    const [userAckReply, setUserAckReply] = useState('')
    const [ackCount, setackCount] = useState(0)
    const [ackdata, setAckdata] = useState([])
    const [reqItems, setReqItems] = useState([])
    const id = useSelector((state) => state.LoginUserData.empid)

    const updateAckRemark = useCallback((e) => {
        setAckRemark(e.target.value)
    }, [])
    const onchangeUserAckReply = useCallback((e) => {
        setUserAckReply(e.target.value)
    }, [])
    const updateAcknowldge = useCallback((e) => {
        if (e.target.checked === true) {
            setAcknowledmnt(true)
        }
        else {
            setAcknowledmnt(false)
        }
    }, [])

    const buttonStyle = {
        fontSize: 15,
        color: '#455a64',
        cursor: 'pointer',
        boxShadow: 5,
        border: 'none',
        transition: 'transform 0.2s, bgcolor 0.2s',
        '&:hover': {
            bgcolor: 'white',
            color: '#455a64',
            transform: 'scale(1.1)',
        },
        '&:active': {
            transform: 'scale(0.95)',
        },
    }
    useEffect(() => {
        const getackdetails = async (req_slno) => {
            const result = await axioslogin.get(`/newCRFStore/viewStoreAck/${req_slno}`)
            const { success, datas } = result.data
            if (success === 1) {
                setAckdata(datas)
                const getPOItems = async (req_slno) => {
                    const result = await axioslogin.get(`/newCRFStore/getReqItem/${req_slno}`)
                    const { success, data } = result.data
                    if (success === 1) {
                        setReqItems(data);
                    } else {
                        setReqItems([]);
                    }
                }
                getPOItems(req_slno)
            } else {
                setAckdata([])
            }
        }
        getackdetails(req_slno)
    }, [req_slno, ackCount])
    const ResetDetails = useCallback(() => {
        setAckRemark('')
        setExpandedRow(null)
    }, [])

    const cancelData = useCallback(() => {
        handleClose()
    }, [handleClose])
    const userAckPatch = useMemo(() => {
        return {
            user_acknldge: Acknowledgement === true ? 1 : null,
            user_acknldge_remarks: Ackremark,
            user_ack_user: id,
            user_ack_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            req_slno: req_slno
        }
    }, [Acknowledgement, Ackremark, id, req_slno])

    const saveUserAck = useCallback(() => {
        if (Acknowledgement === true) {
            if (Ackremark === '') {
                infoNotify("Enter Remarks")
            }
            else {
                const getReceiveStatus = async (req_slno) => {
                    const result = await axioslogin.get(`/CRFRegisterApproval/receiveStatus/${req_slno}`)
                    const { success, data } = result.data
                    if (success === 1) {
                        const { store_receive } = data[0]
                        if (store_receive === 1) {
                            const updateuserAckPatch = async (userAckPatch) => {
                                const result = await axioslogin.patch('/CRFRegisterApproval/userAck', userAckPatch);
                                const { success, message } = result.data;
                                if (success === 1) {
                                    setCount(count + 1)
                                    succesNotify(message)
                                    setAcknowledmnt(false)
                                    setAckRemark('')
                                    handleClose()
                                }
                                else {
                                    warningNotify(message)
                                }
                            }
                            updateuserAckPatch(userAckPatch)
                        } else {
                            infoNotify("Requested Item Not Received Fully")
                        }
                    }
                }
                getReceiveStatus(req_slno)
            }
        } else {
            infoNotify("Check the Acknowledgement Status")
        }
    }, [userAckPatch, Acknowledgement, handleClose, count, setCount, req_slno, Ackremark])

    const acknowAction = useCallback((val, index) => {
        setExpandedRowData(val)
        setExpandedRow(expandedRow === index ? null : index);
        setUserAckReply('')
    }, [expandedRow])

    const UpdateUserAcknowlegeReply = useCallback(() => {
        if (userAckReply === '') {
            infoNotify("Enter Remarks")
        } else {
            const { collect_slno } = expandedRowData

            const patchdata = {
                received_user_remarks: userAckReply,
                received_user: id,
                received_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                collect_slno: collect_slno
            }
            const updateUserAck = async (patchdata) => {
                const result = await axioslogin.patch('/newCRFStore/userReply', patchdata);
                const { success, message } = result.data;
                if (success === 1) {
                    succesNotify(message)
                    setackCount(ackCount + 1)
                    ResetDetails()
                }
                else {
                    warningNotify(message)
                }
            }
            updateUserAck(patchdata)
        }
    }, [expandedRowData, id, userAckReply, ackCount, ResetDetails])

    const capitalizeWords = (str) => str ? str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : '';
    return (
        <Box>
            <CssVarsProvider>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={open}
                    onClose={handleClose}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                >
                    <ModalDialog
                        variant="outlined"
                        sx={{
                            minWidth: '25vw',
                            minHeight: 150,
                            overflow: 'auto'
                        }}
                    >
                        <ModalClose
                            variant="outlined"
                            sx={{
                                m: 1,
                                top: 'calc(-1/4 * var(--IconButton-size))',
                                right: 'calc(-1/4 * var(--IconButton-size))',
                                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                                borderRadius: '50%',
                                bgcolor: 'background.body',
                                color: '#bf360c',
                                height: 25, width: 25
                            }}
                        />
                        <Box sx={{ flex: 0.5, mx: 0.5 }}>
                            <Typography sx={{ fontWeight: 550, fontSize: 15, color: '#607d8b', fontFamily: 'system-ui' }}>
                                User Acknowledgement</Typography>
                        </Box>
                        <Box>
                            <Typography sx={{ fontWeight: 'bold', color: '#145DA0', fontSize: 14, marginBottom: 0.5, pl: 0.5 }}>
                                Req. Item Details</Typography>
                            <Table aria-label="table with sticky header" borderAxis="both" padding={"none"} stickyHeader size='sm' >
                                <thead style={{ height: 4 }} size='small'>
                                    <tr style={{ height: 4 }} size='small'>
                                        <th size='sm' style={{ width: 50, textAlign: 'center', backgroundColor: '#EBEBE8' }}>Sl.No.</th>
                                        <th size='sm' style={{ width: 150, textAlign: 'center', backgroundColor: '#EBEBE8' }}>Item</th>
                                        <th size='sm' style={{ width: 40, textAlign: 'center', backgroundColor: '#EBEBE8' }}>Qty</th>
                                        <th size='sm' style={{ width: 70, textAlign: 'center', backgroundColor: '#EBEBE8' }}>Received Qty(Store)</th>
                                        <th size='sm' style={{ width: 70, textAlign: 'center', backgroundColor: '#EBEBE8' }}>Received Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reqItems?.map((item, ind) => (
                                        <tr key={item.po_itm_slno}>
                                            <td style={{ textAlign: 'center', fontSize: 13 }}>{ind + 1}</td>
                                            <td style={{ fontSize: 12 }}>{item.item_name}</td>
                                            <td style={{ textAlign: 'center', fontSize: 13, fontWeight: 650 }}>{item.item_qty}</td>
                                            <td style={{ textAlign: 'center', color: (item.received_qnty === item.item_qty) ? '#59981A' : '#e65100', fontWeight: 650 }}>{item.received_qnty}</td>
                                            <td style={{ textAlign: 'center', color: (item.item_receive_status === 1) ? '#59981A' : item.item_receive_status === 0 ? '#e65100' : 'transparent', }}>{item.item_receive_status === 1 ? 'Received' : item.item_receive_status === 0 ? 'Partially' : 'Pending'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Box>
                        {ackdata.length !== 0 ?
                            <Box>
                                <Typography sx={{ fontWeight: 'bold', color: '#145DA0', fontSize: 14, marginBottom: 0.5, pl: 0.5 }}>
                                    Store Acknowledgement Details</Typography>

                                <Paper elevation={3} sx={{ width: '100%' }}>
                                    {/* <Box display="flex" flexDirection="column" sx={{ width: '100%', bgcolor: 'yellow' }}> */}
                                    <Box display="flex" justifyContent="space-between" sx={{
                                        bgcolor: '#EBEBE8', flexWrap: 'nowrap', py: 0.5, position: 'sticky',
                                        top: 0,
                                        zIndex: 1, height: 30, borderBottom: '1px solid lightgrey', borderTop: '1px solid lightgrey',
                                    }}>
                                        <Typography sx={{ minWidth: 120, textAlign: 'left', fontWeight: 550, fontSize: 12, pl: 3 }}>CRF No.</Typography>
                                        <Typography sx={{ minWidth: 150, textAlign: 'left', fontWeight: 550, fontSize: 12, pl: 1 }}>Date</Typography>
                                        <Typography sx={{ minWidth: 150, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Store</Typography>
                                        <Typography sx={{ minWidth: 250, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Store Remarks</Typography>
                                        <Typography sx={{ minWidth: 110, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>User</Typography>
                                        <Typography sx={{ minWidth: 150, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Date</Typography>
                                        <Typography sx={{ minWidth: 110, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Received User</Typography>
                                        <Typography sx={{ minWidth: 250, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Remarks</Typography>
                                        <Typography sx={{ minWidth: 70, textAlign: 'center', fontWeight: 550, fontSize: 12 }}>Action</Typography>
                                    </Box>
                                    <Virtuoso
                                        style={{ height: 200, width: '100%', }}
                                        data={ackdata}
                                        itemContent={(index, val) => (
                                            <React.Fragment key={val.collect_slno}>
                                                <Box display="flex" justifyContent="space-between" sx={{ borderBottom: '1px solid lightgrey', flexWrap: 'nowrap' }}>
                                                    <Typography sx={{ minWidth: 120, textAlign: 'left', fontSize: 12, my: 1, pl: 1 }}>{"CRF/TMC/" + val.req_slno}</Typography>
                                                    <Typography sx={{ minWidth: 150, textAlign: 'left', fontSize: 12, my: 1 }}>{format(new Date(val.substore_ack_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                                    <Typography sx={{ minWidth: 150, textAlign: 'left', fontSize: 12, my: 1 }}>{val.sub_store_name}</Typography>
                                                    <Typography sx={{ minWidth: 250, textAlign: 'left', fontSize: 12, my: 1 }}>{val.substore_remarks}</Typography>
                                                    <Typography sx={{ minWidth: 110, textAlign: 'left', fontSize: 12, my: 1 }}>{capitalizeWords(val.store_user)}</Typography>
                                                    <Typography sx={{ minWidth: 150, textAlign: 'left', fontSize: 12, my: 1 }}>{val.received_status === 0 ? 'Not Updated' : format(new Date(val.received_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                                    <Typography sx={{ minWidth: 110, textAlign: 'left', fontSize: 12, my: 1 }}>{val.received_status === 0 ? 'Not Received' : capitalizeWords(val.receive_user)}</Typography>
                                                    <Typography sx={{ minWidth: 250, textAlign: 'left', fontSize: 12, my: 1 }}>{val.received_status === 0 ? 'Not Updated' : val.received_user_remarks}</Typography>
                                                    <Box sx={{ minWidth: 70, textAlign: 'center', pt: 0.5, cursor: 'pointer' }}>
                                                        {val.received_status === 1 ?
                                                            <CheckCircleTwoToneIcon
                                                                sx={{
                                                                    fontSize: 'lg',
                                                                    color: 'grey',
                                                                    height: 25,
                                                                    width: 30,
                                                                    borderRadius: 2,
                                                                    boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
                                                                }}
                                                            />
                                                            :
                                                            <Tooltip title="Edit" placement="left">
                                                                <CheckCircleTwoToneIcon
                                                                    sx={{
                                                                        fontSize: 'lg',
                                                                        color: '#01579b',
                                                                        height: 25,
                                                                        width: 30,
                                                                        borderRadius: 2,
                                                                        boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
                                                                        cursor: 'pointer',
                                                                        transition: 'transform 0.2s',
                                                                        '&:hover': {
                                                                            transform: 'scale(1.1)',
                                                                        },
                                                                    }}
                                                                    onClick={() => acknowAction(val, index)}
                                                                />
                                                            </Tooltip>
                                                        }
                                                    </Box>
                                                </Box>
                                                {expandedRow === index && (
                                                    <Box sx={{ mx: 2, pt: 0.5, boxShadow: '0px 8px 10px rgba(0, 0, 0, 0.16)' }}>
                                                        <Box display="flex" justifyContent="space-between" padding={0.5}>
                                                            <Box sx={{ flex: 1.5, py: 0.4, pl: 3 }}>
                                                                <CssVarsProvider>
                                                                    <Textarea
                                                                        required
                                                                        placeholder='User Acknowledgement Remarks'
                                                                        type="text"
                                                                        size="md"
                                                                        minRows={1}
                                                                        maxRows={2}
                                                                        value={userAckReply}
                                                                        onChange={onchangeUserAckReply}
                                                                    />
                                                                </CssVarsProvider>
                                                            </Box>
                                                            <Box sx={{ display: 'flex', flex: 0.5 }}>
                                                                <Box sx={{ pt: 0.4, pl: 2 }}>
                                                                    <Button
                                                                        variant="plain"
                                                                        sx={buttonStyle}
                                                                        onClick={UpdateUserAcknowlegeReply}
                                                                    >
                                                                        Save
                                                                    </Button>
                                                                </Box>
                                                                <Box sx={{ pr: 0.5, pt: 0.4 }}>
                                                                    <Button
                                                                        variant="plain"
                                                                        sx={buttonStyle}
                                                                        onClick={ResetDetails}
                                                                    >
                                                                        Cancel
                                                                    </Button>
                                                                </Box>
                                                            </Box>
                                                        </Box>

                                                    </Box>
                                                )}
                                            </React.Fragment>
                                        )}
                                    />
                                    {/* </Box> */}
                                </Paper>

                            </Box>
                            : null}
                        <Box display="flex" justifyContent="space-between" padding={0.5}>
                            <Box sx={{ m: 1, flex: 0.3, display: 'flex', pl: 2 }}>
                                <CusCheckBox
                                    color="primary"
                                    size="md"
                                    name="Acknowledgement"
                                    value={Acknowledgement}
                                    checked={Acknowledgement}
                                    onCheked={updateAcknowldge}
                                />
                                <Typography sx={{ fontSize: 13, fontWeight: 600, pl: 1 }}>All Item Received</Typography>
                            </Box>
                            <Box sx={{ flex: 2, py: 0.4 }}>
                                <CssVarsProvider>
                                    <Textarea
                                        required
                                        placeholder='Remarks'
                                        type="text"
                                        size="md"
                                        minRows={1}
                                        maxRows={2}
                                        value={Ackremark}
                                        onChange={updateAckRemark}
                                    />
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: 'flex', flex: 0.5 }}>
                                <Box sx={{ pt: 0.4, pl: 2 }}>
                                    <Button
                                        variant="plain"
                                        sx={buttonStyle}
                                        onClick={saveUserAck}
                                    >
                                        Save
                                    </Button>
                                </Box>
                                <Box sx={{ pr: 0.5, pt: 0.4 }}>
                                    <Button
                                        variant="plain"
                                        sx={buttonStyle}
                                        onClick={cancelData}
                                    >
                                        Cancel
                                    </Button>
                                </Box>
                            </Box>
                        </Box>


                        {/* {saveFlag === 1 ?
                            <Box>

                                {Acknowledgement === true ?
                                    <Box sx={{ flex: 1, pt: 0.5 }}>
                                        <CssVarsProvider>
                                            <Textarea
                                                required
                                                type="text"
                                                size="md"
                                                minRows={2}
                                                maxRows={2}
                                                value={Ackremark}
                                                onChange={updateAckRemark}
                                            />
                                        </CssVarsProvider>
                                    </Box>
                                    : null
                                }

                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Box sx={{ pt: 0.4 }}>
                                        <Button
                                            variant="plain"
                                            sx={buttonStyle}
                                            onClick={saveUserAck}
                                        >
                                            Save
                                        </Button>
                                    </Box>
                                    <Box sx={{ pr: 0.5, pt: 0.4 }}>
                                        <Button
                                            variant="plain"
                                            sx={buttonStyle}
                                            onClick={ResetDetails}
                                        >
                                            Cancel
                                        </Button>
                                    </Box>
                                </Box>
                            </Box> : null} */}
                        {/* <Box sx={{ flex: 1, }}>
                            <Typography sx={{ fontSize: 13, fontWeight: 600 }}>Store</Typography>
                            <Box sx={{ pt: 0.5 }}>
                                {sub_store_name}
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, }}>
                            <Typography sx={{ fontSize: 13, fontWeight: 600 }}>Remarks</Typography>
                            <Box sx={{ pt: 0.5 }}>
                                <CssVarsProvider>
                                    <Textarea
                                        readOnly
                                        maxRows={2}
                                        type="text"
                                        size="sm"
                                        name={substore_remarks}
                                        value={substore_remarks}
                                    />
                                </CssVarsProvider>
                            </Box>
                        </Box>
                        <Box>
                            <Box sx={{ width: "20%", pr: 1, display: 'flex', pl: 0.5, pb: 0.3 }}>
                                <CusCheckBox
                                    color="primary"
                                    size="md"
                                    name="Acknowledgement"
                                    value={Acknowledgement}
                                    checked={Acknowledgement}
                                    onCheked={updateAcknowldge}
                                />
                                <Typography sx={{ fontSize: 13, fontWeight: 600, pl: 1 }}>Acknowledgement</Typography>
                            </Box>
                            {Acknowledgement === true ?
                                <Box sx={{ flex: 1, pt: 0.5 }}>
                                    <CssVarsProvider>
                                        <Textarea
                                            required
                                            type="text"
                                            size="md"
                                            minRows={2}
                                            maxRows={2}
                                            value={Ackremark}
                                            onChange={updateAckRemark}
                                        />
                                    </CssVarsProvider>
                                </Box>
                                : null
                            }
                        </Box> */}


                    </ModalDialog>
                </Modal>
            </CssVarsProvider>
        </Box >
    )
}

export default memo(UserAckModal)