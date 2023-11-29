import React, { Fragment, memo } from 'react'
import { Box } from '@mui/material'
import CustomTextarea from 'src/views/Components/CustomTextarea'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { CssVarsProvider, Typography } from '@mui/joy'
import { TypoHeadColor } from 'src/color/Color'

const ApprovalCompnt = ({ heading, approve, reject, pending, updateApprove, updateReject, remark,
    updateRemark, detailAnalis, updatePending, updatedetailAnalis }) => {


    return (

        <Fragment>
            <Box sx={{ width: "100%", }}>
                <Box sx={{ pt: 0.5 }}>
                    <CssVarsProvider>
                        <Typography sx={{ fontSize: 14, fontWeight: 700, color: TypoHeadColor }}  >{heading} </Typography>
                    </CssVarsProvider>
                </Box>

                {
                    reject === true ?
                        <Box sx={{
                            display: 'flex', width: '100%', fontSize: 15, flexDirection: "column",
                        }}>
                            <CssVarsProvider>
                                <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject </Typography>
                            </CssVarsProvider>
                            <CustomTextarea
                                required
                                type="text"
                                size="sm"
                                style={{
                                    width: "100%",
                                    height: 70,
                                    boardColor: "#E0E0E0",
                                    mt: 5
                                }}
                                placeholder="Reject Remark"
                                value={remark}
                                onchange={updateRemark}
                            />
                        </Box> :
                        pending === true ?
                            <Box sx={{
                                display: 'flex', width: '100%', fontSize: 15, flexDirection: "column",
                            }}>
                                <CssVarsProvider>
                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold  </Typography>
                                </CssVarsProvider>
                                <CustomTextarea
                                    required
                                    type="text"
                                    size="sm"
                                    style={{
                                        width: "100%",
                                        height: 70,
                                        boardColor: "#E0E0E0",
                                        mt: 5
                                    }}
                                    placeholder="On-Hold Remarks"
                                    value={remark}
                                    onchange={updateRemark}
                                />
                            </Box>
                            :
                            <Box sx={{
                                display: 'flex', width: '100%', fontSize: 15, flexDirection: "column",
                            }}>
                                <CssVarsProvider>
                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Description </Typography>
                                </CssVarsProvider>
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
                                <CssVarsProvider>
                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detailed Analysis of Requirement </Typography>
                                </CssVarsProvider>
                                <CustomTextarea
                                    required
                                    type="text"
                                    size="sm"
                                    style={{
                                        width: "100%",
                                        height: 70,
                                        boardColor: "#E0E0E0"
                                    }}
                                    placeholder="Detail Analysis"
                                    value={detailAnalis}
                                    onchange={updatedetailAnalis}
                                />
                            </Box>
                }
                <Box sx={{
                    width: "100%", display: "flex", flexDirection: "row", justifyContent: 'center',
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
                            label="On-Hold"
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
        </Fragment>
    )
}

export default memo(ApprovalCompnt)