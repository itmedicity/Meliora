import React, { Fragment, memo } from 'react'
import { Box, Typography } from '@mui/material'
import CustomTextarea from 'src/views/Components/CustomTextarea'
import CusCheckBox from 'src/views/Components/CusCheckBox'

const ApprovalCompnt = ({ heading, approve, reject, updateApprove, updateReject, remark, updateRemark, updatePending, pending }) => {

    return (
        <Fragment>
            <Box sx={{ width: "100%", pb: 2 }}>
                <Box sx={{ pl: 1, pt: 1 }}>
                    <Typography >{heading} </Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    width: '100%',
                    pl: 1, pr: 1
                }}>
                    <CustomTextarea
                        required
                        type="text"
                        size="sm"
                        style={{
                            width: "100%",
                            height: 70,
                            boardColor: "#E0E0E0"
                        }}
                        placeholder=" Remarks"
                        value={remark}
                        onchange={updateRemark}
                    />
                </Box>
                <Box sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: 'center',
                }}>
                    <Box sx={{ width: "20%", pr: 1, mt: 1 }}>
                        <CusCheckBox
                            label="Approve"
                            color="primary"
                            size="md"
                            name="approve"
                            value={approve}
                            checked={approve}
                            onCheked={updateApprove}
                        />
                    </Box>
                    <Box sx={{ width: "20%", mt: 1 }}>
                        <CusCheckBox
                            label="Reject"
                            color="primary"
                            size="md"
                            name="reject"
                            value={reject}
                            checked={reject}
                            onCheked={updateReject}
                        />
                    </Box>
                    <Box sx={{ width: "20%", mt: 1 }}>
                        <CusCheckBox
                            label="Pending"
                            color="primary"
                            size="md"
                            name="pending"
                            value={pending}
                            checked={pending}
                            onCheked={updatePending}
                        />
                    </Box>

                </Box>
            </Box>
        </Fragment >
    )
}

export default memo(ApprovalCompnt)