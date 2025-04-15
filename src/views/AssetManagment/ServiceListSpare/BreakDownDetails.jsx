import { Box, Chip, Typography } from '@mui/joy'
import React from 'react'
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import { format } from 'date-fns';

const BreakDownDetails = ({ alldetailsService, fileView, deptServiceempList, fileViewAssetService }) => {

    return (
        <Box>
            {alldetailsService.length !== 0 ?
                <Box>
                    {alldetailsService?.map((val, index) => {
                        return (
                            <Box
                                key={index} sx={{ ml: .5, my: .8, border: 1, py: 2, mr: 1 }}>
                                <Box sx={{ display: 'flex' }}>
                                    <Box sx={{ px: 1, borderRadius: 10 }}>
                                        {index + 1}.
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ flex: 1, display: 'flex' }}>
                                            <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                Ticket No.
                                            </Typography>
                                            <Typography sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, }}>
                                                : {val.complaint_slno !== null ? val.complaint_slno : 'Not Updated'}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ flex: 1, display: 'flex' }}>
                                            <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                Ticket type.
                                            </Typography>
                                            <Typography sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, }}>
                                                : {val.complaint_type_name !== null ? val.complaint_type_name : 'Not Updated'}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ flex: 1, display: 'flex' }}>
                                            <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                Ticket desc.
                                            </Typography>
                                            <Typography sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, }}>
                                                : {val.complaint_desc !== null ? val.complaint_desc : 'Not Updated'}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ flex: 1, display: 'flex' }}>
                                            <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                Section
                                            </Typography>
                                            <Typography sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, }}>
                                                : {val.sec_name !== null ? val.sec_name : 'Not Updated'}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ flex: 1, display: 'flex' }}>
                                            <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                Location
                                            </Typography>
                                            <Typography sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, }}>
                                                : {val.rm_room_name}
                                                {val.rm_roomtype_name || val.rm_insidebuildblock_name || val.rm_floor_name ?
                                                    ` (${val.rm_roomtype_name ? val.rm_roomtype_name : ''}${val.rm_roomtype_name &&
                                                        val.rm_insidebuildblock_name ? ' - ' : ''}
                                                                ${val.rm_insidebuildblock_name ? val.rm_insidebuildblock_name : ''}${(val.rm_insidebuildblock_name &&
                                                        val.rm_floor_name) ? ' - ' : ''}
                                                                ${val.rm_floor_name ? val.rm_floor_name : ''})`
                                                    : "Not Updated"}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ flex: 1, display: 'flex' }}>
                                            <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                Registered Date
                                            </Typography>
                                            <Typography sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, }}>
                                                :{val.compalint_date
                                                    ? format(new Date(val.compalint_date), 'dd MMM yyyy,  hh:mm a')
                                                    : 'Invalid Date'}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ flex: 1, display: 'flex' }}>
                                            <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                Assignees
                                            </Typography>
                                            <Box sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, }}>
                                                {val.assigned_employees?.split(',').filter(Boolean).map((name, index) => (
                                                    <Chip
                                                        key={index}
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{ bgcolor: '#D3C7A1', fontSize: 13, px: 0.8, marginRight: 0.1 }}
                                                    >
                                                        {name.trim()}
                                                    </Chip>
                                                ))}
                                            </Box>
                                        </Box>
                                        <Box sx={{ flex: 1, display: 'flex' }}>
                                            <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                Ticket Attachments
                                            </Typography>
                                            <Box sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, pt: .5 }}>
                                                <Box
                                                    onClick={() => fileView(val)}
                                                    sx={{ bgcolor: '#41729F', color: 'white', width: 85, pl: 1, borderRadius: 10, cursor: 'pointer' }}
                                                >
                                                    <FilePresentRoundedIcon sx={{
                                                        color: 'white',
                                                        cursor: 'pointer',
                                                        height: 20, width: 18, pb: .1
                                                    }} />file view
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Typography sx={{ fontWeight: 700, mt: .5 }}>
                                            Department serviced Details
                                        </Typography>
                                        <Box sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, mr: 3 }}>
                                            <Box sx={{ display: 'flex', pl: .5, flex: 1, mt: .5, bgcolor: '#EBEFFB' }}>

                                                <Box sx={{ flex: .3 }} >
                                                    #
                                                </Box>
                                                <Box sx={{ flex: 1 }} >
                                                    Attended by
                                                </Box>
                                                <Box sx={{ flex: 2 }} >
                                                    Serviced Date
                                                </Box>
                                                <Box sx={{ flex: 3 }} >
                                                    Issues Identified
                                                </Box>
                                                <Box sx={{ flex: 3 }} >
                                                    Remarks
                                                </Box>
                                            </Box>
                                            {deptServiceempList[val.serviced_emp_details_slno]?.map((emp, index) => (
                                                <Box key={index} sx={{
                                                    display: 'flex', pl: .5, flex: 1, mt: .5, borderBottom: 1, borderBottomColor: 'lightgrey'
                                                }}>
                                                    <Box sx={{ flex: .3 }} >
                                                        {index + 1}
                                                    </Box>
                                                    <Box sx={{ flex: 1 }} >
                                                        {emp.em_name}
                                                    </Box>
                                                    <Box sx={{ flex: 2 }} >
                                                        {emp.serviced_date
                                                            ? format(new Date(emp.serviced_date), 'dd MMM yyyy,  hh:mm a')
                                                            : 'Invalid Date'}
                                                    </Box>
                                                    <Box sx={{ flex: 3 }} >
                                                        {emp.service_issues_identified}
                                                    </Box>
                                                    <Box sx={{ flex: 3 }} >
                                                        {emp.serviced_issue_remarks}
                                                    </Box>
                                                </Box>
                                            ))}
                                        </Box>
                                        <Typography sx={{ fontWeight: 700, mt: 2 }}>
                                            Serviced Details
                                        </Typography>
                                        <Box sx={{ flex: 1, display: 'flex' }}>
                                            <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                Serviced Date
                                            </Typography>
                                            <Typography sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, }}>
                                                :    {val.suppl_serviced_date
                                                    ? format(new Date(val.suppl_serviced_date), 'dd MMM yyyy,  hh:mm a')
                                                    : 'Not updated'}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ flex: 1, display: 'flex' }}>
                                            <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                Services Performed
                                            </Typography>
                                            <Typography sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, }}>
                                                : {val.suppl_serviced_remarks !== null ? val.suppl_serviced_remarks : 'Not Updated'}
                                            </Typography>
                                        </Box>

                                        <Typography sx={{ fontWeight: 700, mt: 2 }}>
                                            Service Completion Marked Details
                                        </Typography>
                                        <Box sx={{ flex: 1, display: 'flex' }}>
                                            <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                Marked date
                                            </Typography>
                                            <Typography sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, }}>
                                                :    {val.add_to_store_date
                                                    ? format(new Date(val.add_to_store_date), 'dd MMM yyyy,  hh:mm a')
                                                    : 'Not updated'}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ flex: 1, display: 'flex' }}>
                                            <Typography sx={{ flex: 1, fontSize: 15, }}>
                                                Marked Employee
                                            </Typography>
                                            <Typography sx={{ flex: 4, fontWeight: 600, color: 'Black', fontSize: 13, }}>
                                                : {val.em_name !== null ? val.em_name : 'Not Updated'}
                                            </Typography>
                                        </Box>
                                        <Box
                                            onClick={() => fileViewAssetService(val)}
                                            sx={{
                                                bgcolor: '#41729F', color: 'white', width: 110,
                                                px: 1, borderRadius: 10, cursor: 'pointer',
                                                flex: 4, fontSize: 13, mt: 1, display: 'flex'
                                            }}
                                        >
                                            <FilePresentRoundedIcon sx={{
                                                color: 'white',
                                                cursor: 'pointer',
                                                height: 20, width: 18, pb: .1
                                            }} />Attachments
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        )
                    })}
                </Box> :
                <Box sx={{ my: 10, fontWeight: 600, color: 'lightgray', fontSize: 20, flex: 1, display: 'flex', justifyContent: 'center' }}>
                    No Service Done Yet!
                </Box>}
        </Box>
    )
}

export default BreakDownDetails