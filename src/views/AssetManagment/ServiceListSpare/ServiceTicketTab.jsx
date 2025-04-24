import { Box, Chip, } from '@mui/joy'
import React, { memo, } from 'react'
import TextComponent from 'src/views/Components/TextComponent'
import { format } from 'date-fns';
import ComplaintAttachFiles from 'src/views/ComManagement/AssignComplaint/MyTicketList/ComplaintAttachFiles';

const ServiceTicketTab = ({ complDetails, }) => {

    const complaint_slno = complDetails?.[0]?.complaint_slno || null
    return (
        <Box
            sx={{
                flexGrow: 1,
                overflowY: 'auto',
                maxHeight: '100%',
                m: 0,
                pt: .5
            }}>
            {complDetails.length !== 0 ?
                <Box sx={{ border: 1, borderColor: '#E0E1E3', py: 1, pl: 2 }}>
                    <TextComponent
                        text={"TICKET DETAILS"}
                        sx={{
                            flex: 1,
                            fontWeight: 500,
                            color: 'black',
                            fontSize: 15,

                        }}
                    />

                    {complDetails?.map((val, index) => {
                        return (
                            <Box key={index} sx={{ flex: 1, }} >
                                <Box sx={{ display: 'flex', pt: .5 }}>
                                    <TextComponent
                                        text={" Ticket No."}
                                        sx={{
                                            fontWeight: 600,
                                            color: '#727B8C',
                                            pt: 1,
                                            width: 150

                                        }}
                                    />
                                    <Box sx={{ flex: 1, pt: 1 }}>
                                        <Chip sx={{ bgcolor: '#C6DCF3', color: 'black', px: 2 }}>
                                            {val.complaint_slno}
                                        </Chip>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', }}>
                                    <TextComponent
                                        text={" Ticket Type"}
                                        sx={{
                                            fontWeight: 600,
                                            color: '#727B8C',
                                            pt: 1,
                                            width: 150

                                        }}
                                    />
                                    <Box sx={{ flex: 1 }}>
                                        <TextComponent
                                            text={val.complaint_type_name}
                                            sx={{
                                                color: 'black',
                                                pt: 1,
                                            }}
                                        />
                                    </Box>

                                </Box>
                                <Box sx={{ display: 'flex', }}>
                                    <TextComponent
                                        text={"Describtion"}
                                        sx={{
                                            fontWeight: 600,
                                            color: '#727B8C',
                                            pt: 1,
                                            width: 150

                                        }}
                                    />
                                    <Box sx={{ flex: 1 }}>
                                        <TextComponent
                                            text={val.complaint_desc}
                                            sx={{
                                                color: 'black',
                                                pt: 1,
                                            }}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', }}>
                                    <TextComponent
                                        text={"Department Section"}
                                        sx={{
                                            fontWeight: 600,
                                            color: '#727B8C',
                                            pt: 1,
                                            width: 150

                                        }}
                                    />
                                    <Box sx={{ flex: 1 }}>
                                        <TextComponent
                                            text={val.location}
                                            sx={{
                                                color: 'black',
                                                pt: 1,
                                            }}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', }}>
                                    <TextComponent
                                        text={"Location"}
                                        sx={{
                                            fontWeight: 600,
                                            color: '#727B8C',
                                            pt: 1,
                                            width: 150

                                        }}
                                    />
                                    <Box sx={{
                                        flex: 1, color: 'black',
                                        pt: 1,
                                    }}>
                                        {val.rm_room_name -
                                            val.rm_roomtype_name || val.rm_insidebuildblock_name || val.rm_floor_name ?
                                            ` (${val.rm_roomtype_name ? val.rm_roomtype_name : ''}${val.rm_roomtype_name &&
                                                val.rm_insidebuildblock_name ? ' - ' : ''}
                                    ${val.rm_insidebuildblock_name ? val.rm_insidebuildblock_name : ''}${(val.rm_insidebuildblock_name &&
                                                val.rm_floor_name) ? ' - ' : ''}
                                    ${val.rm_floor_name ? val.rm_floor_name : ''})`
                                            : "Not Updated"}

                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', }}>
                                    <TextComponent
                                        text={" Registered Date"}
                                        sx={{
                                            fontWeight: 600,
                                            color: '#727B8C',
                                            pt: 1,
                                            width: 150

                                        }}
                                    />
                                    <Box sx={{ flex: 1 }}>
                                        <TextComponent
                                            text={
                                                val.compalint_date
                                                    ? format(new Date(val.compalint_date), 'dd MMM yyyy,  hh:mm a')
                                                    : 'Invalid Date'
                                            }
                                            sx={{
                                                color: 'black',
                                                pt: 1,
                                            }}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', }}>
                                    <TextComponent
                                        text={"Assignees"}
                                        sx={{
                                            fontWeight: 600,
                                            color: '#727B8C',
                                            pt: 1,
                                            width: 150

                                        }}
                                    />
                                    <Box sx={{ flex: 1, fontWeight: 400, color: 'Black', fontSize: 13, pt: 1, }}>
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
                                <Box sx={{ display: 'flex', }}>
                                    <TextComponent
                                        text={"Attachments"}
                                        sx={{
                                            fontWeight: 600,
                                            color: '#727B8C',
                                            pt: 1,
                                            width: 150
                                        }}
                                    />
                                    <Box sx={{ flex: 1, mr: 1, mt: 1 }}>
                                        <ComplaintAttachFiles complaint_slno={complaint_slno} />
                                    </Box>
                                </Box>
                            </Box>
                        )
                    })}
                </Box> : null
            }
        </Box >
    )
}

export default memo(ServiceTicketTab)