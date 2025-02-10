import { Box, Chip, Typography } from '@mui/joy'
import { Paper } from '@mui/material';
import { format } from 'date-fns';
import React, { Fragment, memo } from 'react'

const CommonInchargeReqCmp = ({ DetailViewData }) => {

    const { incharge_approve, inch_detial_analysis, incharge, incharge_remarks, incharge_user, incharge_apprv_date
    } = DetailViewData

    const capitalizeWords = (str) =>
        str
            ? str
                .toLowerCase()
                .trim()
                .replace(/\s+/g, ' ')
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
            : '';
    return (
        <Fragment>
            <Paper variant="outlined" sx={{ overflow: 'auto', flexWrap: 'wrap', }}>
                <Box sx={{ display: 'flex', pt: 0.5, borderBottom: '1px solid lightgrey' }}>
                    <Typography sx={{ fontWeight: 'bold', mx: 1, py: 0.5, color: '#145DA0', fontSize: 14, flex: 0.4 }}>
                        Department Approval
                    </Typography>
                    <Box sx={{ flex: 1, display: 'flex' }}>
                        <Typography sx={{ fontWeight: 'bold', mx: 1, py: 0.5, color: '#145DA0', fontSize: 14, }}>
                            Incharge
                        </Typography>
                        <Box sx={{ py: 0.4 }}>
                            <Chip size="md" variant="outlined" sx={{
                                color: (incharge_approve === 1 ? '#2e7d32' : incharge_approve === 2 ? '#bf360c' : incharge_approve === 3 ? '#FF9800' : '#607D8B'), height: 25, pb: 0.5,
                                fontSize: 12, fontWeight: 550,
                            }}>
                                {incharge}
                            </Chip>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ pt: 0.1 }}>
                    {incharge_approve === 1 && incharge_remarks !== null ?
                        <Box sx={{ pt: 0.5 }}>
                            <Box sx={{ display: 'flex' }}>
                                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>Justification/ Requirement Description </Typography>
                                <Typography sx={{ pl: 0.5 }} >  :&nbsp;</Typography>
                                <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, flex: 1, pr: 0.5, pt: 0.3 }}>
                                    {incharge_remarks === null ? 'Not Updated' : incharge_remarks}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', pt: 1 }}>
                                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>Detailed Analysis of Requirement</Typography>
                                <Typography sx={{ pl: 0.5 }} >  :&nbsp;</Typography>
                                <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, flex: 1, pr: 0.5, pt: 0.3 }}>
                                    {inch_detial_analysis === null ? 'Not Updated' : inch_detial_analysis}</Typography>
                            </Box>

                        </Box> :
                        incharge_approve === 2 && incharge_remarks !== null ?
                            <Box sx={{ display: 'flex', pt: 0.5 }}>
                                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>Justification for Reject </Typography>
                                <Typography sx={{ pl: 0.5 }} >  :&nbsp;</Typography>
                                <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, flex: 1, pr: 0.5, pt: 0.3 }}>
                                    {incharge_remarks === null ? 'Not Updated' : incharge_remarks}</Typography>
                            </Box>
                            : incharge_approve === 3 && incharge_remarks !== null ?
                                <Box sx={{ display: 'flex', pt: 0.5 }}>
                                    <Typography sx={{ pl: 1, fontSize: 14, flex: 0.4 }}>Justification for On-Hold</Typography>
                                    <Typography sx={{ pl: 0.5 }} >  :&nbsp;</Typography>
                                    <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, flex: 1, pr: 0.5, pt: 0.3 }}>
                                        {incharge_remarks === null ? 'Not Updated' : incharge_remarks}</Typography>
                                </Box>
                                : null}
                    {
                        incharge_apprv_date !== null ?
                            <Box sx={{ display: 'flex', py: 1 }}>
                                {incharge_approve === 1 ?
                                    <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>Approved by </Typography>
                                    : incharge_approve === 2 ?
                                        <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>Rejected by </Typography>
                                        : incharge_approve === 3 ?
                                            <Typography sx={{ pl: 1, fontSize: 13, flex: 0.4 }}>On-Hold by </Typography>
                                            : null}
                                <Box sx={{ display: 'flex', flex: 1 }}>
                                    <Typography >  :&nbsp;</Typography>
                                    <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, pt: 0.3, pl: 0.2 }}>
                                        {capitalizeWords(incharge_user)}</Typography>
                                    <Typography sx={{ height: 'auto', fontSize: 13, fontWeight: 550, pl: 2, pt: 0.3 }}>
                                        {format(new Date(incharge_apprv_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                </Box>
                            </Box>
                            : null}
                </Box>
            </Paper>
        </Fragment>
    )
}

export default memo(CommonInchargeReqCmp)