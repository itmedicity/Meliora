import React, { memo, useState } from 'react';

import {
    Box,
    Avatar,
    Chip,
    Tooltip,
    IconButton,
    Drawer,
    Divider
} from '@mui/joy';

import {
    FaBed,
    FaUserInjured,
    FaUserDoctor
} from "react-icons/fa6";

import {
    MdMeetingRoom,
    MdLocalHospital
} from "react-icons/md";

import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import moment from 'moment';
import DietTextComponent from '../../DietComponent/DietTextComponent';

const PatientCard = ({ patient, onClick }) => {

    const [openDrawer, setOpenDrawer] = useState(false);

    const statusColor = {
        R: 'success',
        E: 'danger'
    };

    const activeDiet = patient?.diet_history?.find(
        (diet) => diet?.diet_status === "ACTIVE"
    );

    const DietDetail = activeDiet?.diet_name;

    return (
        <>
            {/* CARD */}
            <Box
                onClick={() => onClick(patient)}
                sx={{
                    flex: '1 1 320px',
                    borderRadius: 12,
                    bgcolor: 'white',
                    border: '1px solid #e4e4e4',
                    p: 1.5,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    boxShadow: 'sm',
                    transition: '0.2s',
                    cursor: "pointer",

                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 'md'
                    }
                }}
            >

                {/* HEADER */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start'
                    }}
                >

                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1.2
                        }}
                    >
                        <Avatar
                            size='md'
                            color={patient.ptc_sex === "M" ? "primary" : "danger"}
                        >
                            <FaUserInjured />
                        </Avatar>

                        <Box>
                            <DietTextComponent
                                value={patient.ptc_ptname}
                                size={15}
                                weight={700}
                            />

                            <DietTextComponent
                                value={`${patient.pt_no} | ${patient.ip_no}`}
                                size={11}
                                color='#6b6b6b'
                            />
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}
                    >
                        {
                            patient.ipd_status &&
                            <Chip
                                size='sm'
                                color={statusColor[patient.ipd_status] || 'neutral'}
                                variant='soft'
                            >
                                {patient.ipd_status}
                            </Chip>
                        }

                        {/* OPEN DRAWER */}
                        <IconButton
                            size='sm'
                            variant='plain'
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpenDrawer(true);
                            }}
                        >
                            <KeyboardArrowRightRoundedIcon />
                        </IconButton>
                    </Box>
                </Box>

                {/* QUICK DETAILS */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        bgcolor: '#f7f7f7',
                        borderRadius: 8,
                        p: 1
                    }}
                >

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.7
                        }}
                    >
                        <FaBed size={14} />

                        <DietTextComponent
                            value={patient.fb_bdc_no}
                            size={12}
                            weight={600}
                        />
                    </Box>
                    <DietTextComponent
                        value={DietDetail || 'Not Assigned'}
                        size={12}
                        weight={700}
                        color={DietDetail ? '#0b6bcb' : '#d32f2f'}
                    />
                </Box>

            </Box>

            {/* DRAWER */}
            <Drawer
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                anchor='right'
                size='md'
            >

                <Box
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        bgcolor: '#f8fafc'
                    }} >

                    {/* TOP HEADER */}
                    <Box
                        sx={{
                            p: 2,
                            bgcolor: 'white',
                            borderBottom: '1px solid #e5e7eb',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >

                        <Box
                            sx={{
                                display: 'flex',
                                gap: 1.5,
                                alignItems: 'center'
                            }}
                        >
                            <Avatar
                                size='lg'
                                color={patient.ptc_sex === "M" ? "primary" : "danger"}
                            >
                                <FaUserInjured />
                            </Avatar>

                            <Box>
                                <DietTextComponent
                                    value={patient.ptc_ptname}
                                    size={18}
                                    weight={700}
                                />

                                <DietTextComponent
                                    value={`${patient.pt_no} | ${patient.ip_no}`}
                                    size={12}
                                    color='#6b6b6b'
                                />
                            </Box>
                        </Box>

                        <IconButton
                            variant='soft'
                            color='danger'
                            onClick={() => setOpenDrawer(false)}
                        >
                            <CloseRoundedIcon />
                        </IconButton>
                    </Box>

                    {/* CONTENT */}
                    <Box
                        sx={{
                            flex: 1,
                            overflowY: 'auto',
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2
                        }}
                    >

                        {/* BED */}
                        <Box
                            sx={{
                                bgcolor: 'white',
                                borderRadius: 12,
                                p: 2,
                                boxShadow: 'sm'
                            }}>

                            <DietTextComponent
                                value={'Room & Bed'}
                                size={14}
                                weight={700}
                            />

                            <Divider sx={{ my: 1 }} />

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1
                                    }}
                                >
                                    <FaBed size={15} />

                                    <DietTextComponent
                                        value={patient.fb_bdc_no}
                                        size={13}
                                        weight={600}
                                    />
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1
                                    }}
                                >
                                    <MdMeetingRoom size={16} />

                                    <DietTextComponent
                                        value={patient.fb_rtc_desc}
                                        size={13}
                                    />
                                </Box>
                            </Box>
                        </Box>

                        {/* DOCTOR */}
                        <Box
                            sx={{
                                bgcolor: 'white',
                                borderRadius: 12,
                                p: 2,
                                boxShadow: 'sm'
                            }}
                        >

                            <DietTextComponent
                                value={'Doctor'}
                                size={14}
                                weight={700}
                            />

                            <Divider sx={{ my: 1 }} />

                            <Tooltip title={patient.doc_name}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1
                                    }}
                                >
                                    <FaUserDoctor
                                        size={15}
                                        color='#7c51a1'
                                    />

                                    <DietTextComponent
                                        value={patient.doc_name}
                                        size={13}
                                    />
                                </Box>
                            </Tooltip>
                        </Box>

                        {/* NS STATION */}
                        <Box
                            sx={{
                                bgcolor: 'white',
                                borderRadius: 12,
                                p: 2,
                                boxShadow: 'sm'
                            }}
                        >

                            <DietTextComponent
                                value={'Nursing Station'}
                                size={14}
                                weight={700}
                            />

                            <Divider sx={{ my: 1 }} />

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1
                                    }}
                                >
                                    <MdLocalHospital
                                        size={16}
                                        color='#009688'
                                    />

                                    <DietTextComponent
                                        value={patient.fb_ns_name}
                                        size={13}
                                    />
                                </Box>

                                <DietTextComponent
                                    value={moment(patient.ipd_date).format('DD MMM YYYY')}
                                    size={12}
                                    color='#6b6b6b'
                                />
                            </Box>
                        </Box>

                        {/* DIET */}
                        <Box
                            sx={{
                                bgcolor: 'white',
                                borderRadius: 12,
                                p: 2,
                                boxShadow: 'sm'
                            }}
                        >

                            <DietTextComponent
                                value={'Active Diet'}
                                size={14}
                                weight={700}
                            />

                            <Divider sx={{ my: 1 }} />

                            <DietTextComponent
                                value={DietDetail || 'Not Assigned'}
                                size={15}
                                weight={700}
                                color={DietDetail ? '#0b6bcb' : '#d32f2f'}
                            />
                        </Box>

                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

export default memo(PatientCard);





// import React, { memo, useState } from 'react';
// import {
//     Box,
//     Avatar,
//     Chip,
//     Tooltip,
//     IconButton
// } from '@mui/joy';
// import {
//     FaBed,
//     FaUserInjured,
//     FaUserDoctor
// } from "react-icons/fa6";
// import {
//     MdMeetingRoom,
//     MdLocalHospital
// } from "react-icons/md";

// import moment from 'moment';
// import DietTextComponent from '../../DietComponent/DietTextComponent'

// import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
// import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';

// const PatientCard = ({ patient, onClick }) => {


//     const [expanded, setExpanded] = useState(false);
//     const statusColor = {
//         R: 'success',
//         E: 'danger'
//     }

//     const activeDiet = patient?.diet_history?.find(
//         (diet) => diet?.diet_status === "ACTIVE"
//     );

//     const DietDetail = activeDiet?.diet_name;

//     return (
//         <Box
//             onClick={() => onClick(patient)}
//             sx={{
//                 flex: '1 1 320px',
//                 minHeight: expanded ? 170 : 'auto',
//                 borderRadius: 12,
//                 bgcolor: 'white',
//                 border: '1px solid #e4e4e4',
//                 p: 1.5,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: 1,
//                 boxShadow: 'sm',
//                 transition: '0.2s',
//                 '&:hover': {
//                     transform: 'translateY(-2px)',
//                     boxShadow: 'md'
//                 },
//                 cursor: "pointer",
//                 alignSelf: 'flex-start',
//             }}
//         >

//             {/* Header */}
//             <Box
//                 sx={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'flex-start'
//                 }}
//             >

//                 <Box
//                     sx={{
//                         display: 'flex',
//                         gap: 1.2
//                     }}
//                 >
//                     <Avatar
//                         size='md'
//                         color={patient.ptc_sex === "M" ? "primary" : "danger"}
//                     >
//                         <FaUserInjured />
//                     </Avatar>

//                     <Box>
//                         <DietTextComponent
//                             value={patient.ptc_ptname}
//                             size={15}
//                             weight={700}
//                         />

//                         <DietTextComponent
//                             value={`${patient.pt_no} | ${patient.ip_no}`}
//                             size={11}
//                             color='#6b6b6b'
//                         />
//                     </Box>
//                 </Box>
//                 <Box
//                     sx={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: 1
//                     }}
//                 >

//                     {
//                         patient.ipd_status &&
//                         <Chip
//                             size='sm'
//                             color={statusColor[patient.ipd_status] || 'neutral'}
//                             variant='soft'
//                         >
//                             {patient.ipd_status}
//                         </Chip>
//                     }
//                     <IconButton
//                         size='sm'
//                         variant='plain'
//                         onClick={(e) => {
//                             e.stopPropagation();
//                             setExpanded(prev => !prev);
//                         }}
//                     >
//                         {
//                             expanded
//                                 ? <KeyboardArrowUpRoundedIcon />
//                                 : <KeyboardArrowDownRoundedIcon />
//                         }
//                     </IconButton>
//                 </Box>
//             </Box>
//             {
//                 expanded && (
//                     <Box
//                         sx={{
//                             overflow: 'hidden',
//                             transition: 'all 0.25s ease',
//                             maxHeight: expanded ? 500 : 0,
//                             opacity: expanded ? 1 : 0,
//                             mt: expanded ? 1 : 0
//                         }}
//                     >
//                         {/* Bed & Room */}
//                         <Box
//                             sx={{
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'space-between',
//                                 bgcolor: '#f7f7f7',
//                                 borderRadius: 8,
//                                 p: 1
//                             }}
//                         >

//                             <Box
//                                 sx={{
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     gap: 0.7
//                                 }}
//                             >
//                                 <FaBed size={14} />

//                                 <DietTextComponent
//                                     value={patient.fb_bdc_no}
//                                     size={12}
//                                     weight={600}
//                                 />
//                             </Box>

//                             <Box
//                                 sx={{
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     gap: 0.7
//                                 }}
//                             >
//                                 <MdMeetingRoom size={15} />

//                                 <DietTextComponent
//                                     value={patient.fb_rtc_desc}
//                                     size={11}
//                                 />
//                             </Box>

//                         </Box>

//                         {/* Doctor */}
//                         <Tooltip title={patient.doc_name}>
//                             <Box
//                                 sx={{
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     gap: 1
//                                 }}
//                             >
//                                 <FaUserDoctor
//                                     size={14}
//                                     color='#7c51a1'
//                                 />

//                                 <DietTextComponent
//                                     value={patient.doc_name}
//                                     size={12}
//                                 />
//                             </Box>
//                         </Tooltip>

//                         {/* Ward */}
//                         <Box
//                             sx={{
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'space-between'
//                             }}
//                         >

//                             <Box
//                                 sx={{
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     gap: 0.7
//                                 }}
//                             >
//                                 <MdLocalHospital
//                                     size={15}
//                                     color='#009688'
//                                 />

//                                 <DietTextComponent
//                                     value={patient.fb_ns_name}
//                                     size={12}
//                                 />
//                             </Box>

//                             <DietTextComponent
//                                 value={moment(patient.ipd_date).format('DD MMM YYYY')}
//                                 size={11}
//                                 color='#6b6b6b'
//                             />
//                         </Box>

//                         {/* Diet */}
//                         <Box
//                             sx={{
//                                 mt: 'auto',
//                                 display: 'flex',
//                                 justifyContent: 'space-between',
//                                 alignItems: 'center',
//                                 pt: 1,
//                                 borderTop: '1px dashed #dcdcdc'
//                             }}
//                         >

//                             <Box>
//                                 <DietTextComponent
//                                     value={'Diet'}
//                                     size={10}
//                                     color='#888'
//                                 />

//                                 <DietTextComponent
//                                     value={DietDetail || 'Not Assigned'}
//                                     size={12}
//                                     weight={700}
//                                     color={DietDetail ? '#0b6bcb' : '#d32f2f'}
//                                 />
//                             </Box>

//                             <Chip
//                                 size='sm'
//                                 variant='soft'
//                                 color={patient.ptc_sex === "M" ? "primary" : "danger"}
//                             >
//                                 {patient.ptc_sex}
//                             </Chip>

//                         </Box>
//                     </Box>
//                 )
//             }
//         </Box>
//     )
// }

// export default memo(PatientCard)
