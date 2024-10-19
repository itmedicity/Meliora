import { Box, Chip, CssVarsProvider, Input, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { Virtuoso } from 'react-virtuoso';
import ErrorIcon from '@mui/icons-material/Error';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import moment from 'moment';
import ReplyModalvieww from '../../AssignComplaint/Queries/ReplyModalvieww';
import CmDeptSectionFilter from 'src/views/CommonSelectCode/CmDeptSectionFilter';
import { infoNotify, warningNotify } from 'src/views/Common/CommonCode';
import MoreIcon from '@mui/icons-material/More';
import RectifyDetailsModal from '../../ComplaintRegister/TicketLists/RectifyDetailsModal';
import { format } from 'date-fns';
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import ComFileView from '../../CmFileView/ComFileView';

const SectionwiseVerifyList = ({ count, setCount }) => {

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [flagz, setflagz] = useState(0)
    const [valuee, setValuee] = useState([])
    const [replyflag, setReplyflag] = useState(0)
    const [replyOpen, setReplyOpen] = useState(false)
    const [assignedEmployees, setAssignedEmployees] = useState([])
    const [depsec, setDepsec] = useState(0)
    const [dataa, setDataa] = useState([])
    const [emptyFlag, setEmptyFlag] = useState(0)
    const [rotate, setRotate] = useState(false);
    const [detailsData, setDetailsData] = useState([])
    const [detailsFlag, setDetailsFlag] = useState(0)
    const [deatilsOpen, setDetailsOpen] = useState(false)
    const [imageViewOpen, setimageViewOpen] = useState(false)
    const [image, setimage] = useState(0)
    const [fileDetails, setfileDetails] = useState([])
    const [imageUrls, setImageUrls] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);

    const ReplyDetails = useCallback((value) => {
        setReplyflag(1)
        setValuee(value)
        setReplyOpen(true)
    }, [])

    const MoreDetails = useCallback((val) => {
        setDetailsFlag(1)
        setDetailsData(val)
        setDetailsOpen(true)
    }, [])

    const handleFromDateChange = (event) => {
        const selectedFromDate = event.target.value;
        setFromDate(selectedFromDate);
        if (toDate && selectedFromDate > toDate) {
            setToDate('');
        }
        setDataa([])
    };

    const handleToDateChange = (event) => {
        setToDate(event.target.value);
        setDataa([])
    };

    const searchDate = useMemo(() => {
        if (fromDate && toDate) {
            return {
                from: format(new Date(fromDate), 'yyyy-MM-dd 00:00:00'),
                to: format(new Date(toDate), 'yyyy-MM-dd 23:59:59'),
                complaint_dept_secslno: depsec,
            };
        }
        return null;
    }, [fromDate, toDate, depsec]);

    const handleClick = useCallback(() => {
        if (depsec !== 0) {
            if (searchDate) {
                const getAllPendingCompalints = async () => {
                    const result = await axioslogin.post('/Rectifycomplit/getUserEndVerifiedList', searchDate);
                    const { success, data } = result.data;
                    if (success === 1) {
                        setDataa(data);
                        setflagz(1)
                    } else {
                        setDataa([]);
                        setflagz(1)
                    }
                }
                getAllPendingCompalints(depsec)
                setRotate(true);
                setTimeout(() => {
                    setRotate(false);
                }, 1500);
                setEmptyFlag(1)
            }
            else {
                infoNotify("Please Select a Date Range")
            }
        }
        else {
            infoNotify("Please Choose a Department Section")
        }
    }, [searchDate, depsec])

    useEffect(() => {
        const getAssignedEmployees = async () => {
            const updatedEmployees = {};
            for (let complaint of dataa) {
                const result = await axioslogin.get(`Rectifycomplit/getAssignEmps/${complaint.complaint_slno}`);
                const { success, data } = result.data;
                if (success === 1) {
                    updatedEmployees[complaint.complaint_slno] = data;
                } else {
                    updatedEmployees[complaint.complaint_slno] = [];
                }
            }
            setAssignedEmployees(updatedEmployees);
        };
        getAssignedEmployees();
    }, [dataa]);

    const fileView = async (val) => {
        const { complaint_slno } = val;
        setimage(1);
        setimageViewOpen(true);
        setfileDetails(val);
        try {
            const result = await axioslogin.get(`/complaintFileUpload/uploadFile/getComplaintFile/${complaint_slno}`);
            const { success } = result.data;
            if (success === 1) {
                const data = result.data;
                const fileNames = data.data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/ComplaintManagement/${complaint_slno}/${fileName}`;
                });
                setImageUrls(fileUrls);
                // Open the modal only if there are files
                if (fileUrls.length > 0) {
                    setSelectedImages(val);
                } else {
                    warningNotify("No Image attached");
                }
            } else {
                warningNotify("No Image Attached");
            }
        } catch (error) {
            warningNotify('Error in fetching files:', error);
        }
    }


    return (
        <Box sx={{ bgcolor: 'white', }}>
            {replyflag === 1 ?
                <ReplyModalvieww open={replyOpen} setReplyOpen={setReplyOpen} valuee={valuee}
                    setReplyflag={setReplyflag}
                    setCount={setCount} count={count}
                />
                : null}
            {detailsFlag === 1 ?
                <RectifyDetailsModal
                    open={deatilsOpen}
                    setDetailsOpen={setDetailsOpen}
                    detailsData={detailsData}
                    setDetailsFlag={setDetailsFlag}
                    setcount={setCount} count={count} />
                : null}
            {image === 1 ?
                <ComFileView
                    imageUrls={imageUrls}
                    imageViewOpen={imageViewOpen}
                    selectedImages={selectedImages}
                    fileDetails={fileDetails}
                    setimage={setimage}
                    setimageViewOpen={setimageViewOpen}

                /> : null}

            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2.5, pb: 1 }}>
                <Typography sx={{ fontWeight: 550, fontSize: 14, pt: .8, pr: 1 }}>
                    Complaint From :
                </Typography>
                <Box sx={{ width: 290, }}>
                    <CmDeptSectionFilter cmSection={depsec} setCmSection={setDepsec} setDataa={setDataa} setEmptyFlag={setEmptyFlag} />
                </Box>
                <Typography sx={{ fontWeight: 550, fontSize: 14, pt: .8, pr: 1, pl: 2 }}>
                    From :
                </Typography>
                <CssVarsProvider>
                    <Input
                        sx={{ borderRadius: 15, pl: 3, cursor: 'pointer', }}
                        name="fromDate"
                        type="date"
                        size="sm"
                        value={fromDate}
                        onChange={handleFromDateChange}
                    />
                </CssVarsProvider>
                <Typography sx={{ fontWeight: 550, fontSize: 14, pt: .8, pr: 1, pl: 2 }}>
                    To :
                </Typography>
                <CssVarsProvider>
                    <Input
                        sx={{ borderRadius: 15, pl: 3, cursor: 'pointer', }}
                        name="toDate"
                        type="date"
                        size="sm"
                        value={toDate}
                        onChange={handleToDateChange}
                        disabled={!fromDate}  // Disable until "From Date" is selected
                        slotProps={{
                            input: {
                                min: fromDate,
                                max: moment().format('YYYY-MM-DD'),

                            },
                        }}
                    />
                </CssVarsProvider>
                <Box
                    onClick={handleClick}
                    sx={{
                        ml: 1,
                        display: 'inline-block',
                        transition: 'transform 2s ease-in-out', // Duration of the rotation
                        transform: rotate ? 'rotate(-420deg)' : 'none',
                    }}
                >
                    <ReplayCircleFilledIcon sx={{ width: 32, height: 33, cursor: 'pointer' }} />
                </Box>
            </Box>
            {emptyFlag === 1 ?
                <>
                    {dataa.length !== 0 ?
                        <Virtuoso
                            style={{ height: '40vh' }}
                            totalCount={dataa?.length}
                            itemContent={(index) => {
                                const val = dataa[index];
                                return (

                                    <Box
                                        key={val.complaint_slno}
                                        sx={{
                                            flex: 1,
                                            border: 1, borderColor: '#3399FF',
                                            borderRadius: 2,
                                            bgcolor: 'white',
                                            mb: .5

                                        }}>
                                        <CssVarsProvider>

                                            <Box sx={{ flex: 1, display: 'flex', p: .8, }}>

                                                <Box sx={{
                                                    // flex: 1,
                                                    minWidth: 130,
                                                    mx: .3, pr: .5,
                                                    borderRight: 1, borderColor: 'lightgrey'
                                                }}>
                                                    <Typography sx={{ fontSize: 15, textAlign: 'center', fontWeight: 700 }}> Ticket No. {val.complaint_slno}</Typography>
                                                    <Tooltip title='Ticket Registerd Date and time' placement='right' >
                                                        <Typography sx={{ fontSize: 11, textAlign: 'center', fontWeight: 600, color: "black", mr: .3, cursor: 'grab' }}>11-12-2023  11:12:56</Typography>
                                                    </Tooltip>

                                                    <Box sx={{ flex: 1, display: 'flex', my: .5, justifyContent: "center", }}>
                                                        {val.cm_file_status === 1 ?
                                                            <FilePresentRoundedIcon sx={{
                                                                color: '#41729F',
                                                                cursor: 'pointer', border: 1, borderRadius: 5, p: .1,
                                                                '&:hover': { color: '#274472' }
                                                            }}
                                                                onClick={() => fileView(val)}
                                                            /> :
                                                            null
                                                        }
                                                        {val.cm_query_status === 1 ?
                                                            <Tooltip title='Queries' >
                                                                <QuestionAnswerRoundedIcon sx={{
                                                                    height: 25, width: 30,
                                                                    color: '#0E86D4',
                                                                    cursor: 'pointer', border: 1, mx: .5, borderRadius: 5, p: .1,
                                                                    '&:hover': { color: '#41729F' },
                                                                }
                                                                }
                                                                    onClick={() => ReplyDetails(val)}
                                                                />
                                                            </Tooltip> :
                                                            val.cm_query_status === 2 ?
                                                                <Tooltip title='Queries' >
                                                                    <QuestionAnswerRoundedIcon sx={{
                                                                        height: 25, width: 30,
                                                                        color: '#0E86D4',
                                                                        cursor: 'pointer', border: 1, mx: .5, borderRadius: 5, p: .1,
                                                                        '&:hover': { color: '#41729F' },
                                                                    }
                                                                    }
                                                                        onClick={() => ReplyDetails(val)}
                                                                    />
                                                                </Tooltip>
                                                                :
                                                                <Tooltip title='No Queries' >
                                                                    <QuestionAnswerRoundedIcon sx={{
                                                                        height: 25, width: 30,
                                                                        color: 'lightgrey',
                                                                        cursor: 'pointer', border: 1, mx: .5, borderRadius: 5,
                                                                    }
                                                                    }
                                                                    />
                                                                </Tooltip>}

                                                        <Tooltip title='More Details' >
                                                            <MoreIcon sx={{
                                                                height: 25, width: 30,
                                                                color: '#264D60',
                                                                cursor: 'pointer', border: 1, borderRadius: 5, p: .1,
                                                                '&:hover': { color: '#41729F' },
                                                            }
                                                            }
                                                                onClick={() => MoreDetails(val)}
                                                            />
                                                        </Tooltip>
                                                    </Box>
                                                </Box>
                                                <Box sx={{
                                                    minWidth: 500,
                                                    maxWidth: 650,
                                                    pl: .5,

                                                }}>
                                                    <Box sx={{ flex: 1, display: 'flex', mt: .5 }}>
                                                        <Typography sx={{ flex: 1, fontSize: 13, fontWeight: 700 }}>
                                                            Section
                                                        </Typography>
                                                        <Typography sx={{ fontSize: 15, flex: 3, fontWeight: 400 }}>
                                                            {val.location}
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{ flex: 1, display: 'flex', mt: .5 }}>
                                                        <Typography sx={{ flex: 1, fontSize: 13, fontWeight: 700 }}>
                                                            Location
                                                        </Typography>
                                                        <Typography sx={{ fontSize: 14, flex: 3, fontWeight: 400 }}>
                                                            {val.rm_room_name}
                                                            {val.rm_roomtype_name || val.rm_insidebuildblock_name || val.rm_floor_name ?
                                                                ` (${val.rm_roomtype_name ? val.rm_roomtype_name : ''}${val.rm_roomtype_name && val.rm_insidebuildblock_name ? ' - ' : ''}${val.rm_insidebuildblock_name ? val.rm_insidebuildblock_name : ''}${(val.rm_insidebuildblock_name && val.rm_floor_name) ? ' - ' : ''}${val.rm_floor_name ? val.rm_floor_name : ''})`
                                                                : "Not Updated"}
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{ flex: 1, display: 'flex', mt: .5 }}>
                                                        <Typography sx={{ flex: 1, fontSize: 13, fontWeight: 700 }}>
                                                            Complaint Type
                                                        </Typography>
                                                        <Typography sx={{ fontSize: 14, flex: 3, fontWeight: 400 }}>
                                                            {val.complaint_type_name || 'Not Updated'}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Box sx={{
                                                    flexGrow: 1,
                                                    pl: 1,
                                                }
                                                }>
                                                    <Typography sx={{ flex: 1, fontSize: 13, fontWeight: 700 }}>
                                                        Complaint Describtion
                                                    </Typography>
                                                    <Typography sx={{
                                                        pr: .5, pt: .3, fontSize: 15,
                                                        maxHeight: 88,
                                                        overflow: 'auto', fontWeight: 400
                                                    }}>
                                                        {val.complaint_desc}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box sx={{
                                                flex: 1, bgcolor: '#E5E8E9', borderBottomRightRadius: 5, borderBottomLeftRadius: 5, mb: .1,
                                                mx: .1, display: 'flex',
                                            }}>
                                                {val.priority_check === 1 ?
                                                    <Box sx={{ display: 'flex', pl: 1.5 }}>
                                                        <ErrorIcon
                                                            sx={{
                                                                // mt: 3,
                                                                height: 30,
                                                                width: 25,
                                                                color: val.priority_check === 1 ? '#970C10' : 'lightgrey',

                                                            }}
                                                        />

                                                        <Typography sx={{ fontWeight: 600, pl: .5, fontSize: 14, pt: .5, color: 'darkred' }}>
                                                            {val.priority_reason}
                                                        </Typography>

                                                    </Box> : null}
                                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', }}>
                                                    <Typography sx={{ fontSize: 13, fontWeight: 700, pt: .5 }}>Assingees :</Typography>&nbsp;&nbsp;
                                                    <Box sx={{ fontWeight: 600, display: 'flex', py: .4, gap: .3 }}>
                                                        {assignedEmployees[val.complaint_slno]?.map((emp, index) => (
                                                            <Chip
                                                                key={index}
                                                                size="small"
                                                                variant="outlined"
                                                                sx={{ bgcolor: '#D3C7A1', fontSize: 13, px: .8 }}>
                                                                {emp.em_name}
                                                            </Chip>
                                                        ))}
                                                    </Box>&nbsp;&nbsp;
                                                </Box>
                                            </Box>
                                        </CssVarsProvider>
                                    </Box>
                                )
                            }}
                        />
                        :
                        <Box sx={{ flex: 1, m: 1, height: '20vh', textAlign: 'center', fontWeight: 700, fontSize: 22, color: 'lightgray', pt: 10 }}>
                            {flagz === 1 ?
                                <>
                                    Empty list Under Selected Date Range
                                </> :
                                <>
                                    Select Date Range to View Verified Complaints
                                </>}


                        </Box>}
                </> :
                <Box sx={{ fontWeight: 700, fontSize: 20, color: 'lightgrey', textAlign: 'center', my: 4 }}>
                    Select the Section and Date Range to View Verified Complaints
                </Box>}
        </Box >
    )
}

export default memo(SectionwiseVerifyList)