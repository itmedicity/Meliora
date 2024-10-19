import { Box, Chip, CssVarsProvider, Input, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import { Virtuoso } from 'react-virtuoso';
import ErrorIcon from '@mui/icons-material/Error';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import moment from 'moment';
import { format } from 'date-fns';
import QueryModalview from '../Queries/QueryModalview';
import RectifyDetailsModal from '../../ComplaintRegister/TicketLists/RectifyDetailsModal';
import MoreIcon from '@mui/icons-material/More';
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import { warningNotify } from 'src/views/Common/CommonCode';
import ComFileView from '../../CmFileView/ComFileView';

const VerifiedInAllList = () => {

    const [verifiedList, setRectifiedList] = useState([]);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [flagz, setflagz] = useState(0)
    const [queryflag, setqueryflag] = useState(0)
    const [queryOpen, setqueryOpen] = useState(false)
    const [valuee, setValuee] = useState([])
    const [assignedEmployees, setAssignedEmployees] = useState([])
    const [detailsData, setDetailsData] = useState([])
    const [detailsFlag, setDetailsFlag] = useState(0)
    const [deatilsOpen, setDetailsOpen] = useState(false)
    const [count, setCount] = useState(0)
    const [image, setimage] = useState(0)
    const [fileDetails, setfileDetails] = useState([])
    const [imageUrls, setImageUrls] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageViewOpen, setimageViewOpen] = useState(false)

    const empdept = useSelector((state) => {
        return state.LoginUserData.empdept
    })

    const RaiseQuery = useCallback((val) => {
        setqueryflag(1)
        setValuee(val)
        setqueryOpen(true)
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
        setRectifiedList([])
    };

    const handleToDateChange = (event) => {
        setToDate(event.target.value);
        setRectifiedList([])
    };

    const searchDate = useMemo(() => {
        if (fromDate && toDate) {
            return {
                from: format(new Date(fromDate), 'yyyy-MM-dd 00:00:00'),
                to: format(new Date(toDate), 'yyyy-MM-dd 23:59:59'),
                complaint_deptslno: empdept,
            };
        }
        return null;
    }, [fromDate, toDate, empdept]);

    const rectifiedListCall = useCallback(() => {
        if (searchDate) { // Check if searchDate is valid
            const getAllPendingHoldComplaints = async () => {
                const result = await axioslogin.post('/Rectifycomplit/getDepartmentVerifiedList', searchDate);
                const { success, data } = result.data;
                if (success === 1) {
                    setRectifiedList(data);
                    setCount(count + 1)
                    setflagz(1)
                } else {
                    setRectifiedList([]);
                    setflagz(1)
                }
            };
            getAllPendingHoldComplaints();
        }
    }, [searchDate, setCount, count]);

    useEffect(() => {
        const getAssignedEmployees = async () => {
            const updatedEmployees = {};
            for (let complaint of verifiedList) {
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
    }, [verifiedList]);

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
            {queryflag === 1 ?
                <QueryModalview open={queryOpen} setqueryOpen={setqueryOpen} valuee={valuee}
                    setqueryflag={setqueryflag}
                />
                : null}

            {detailsFlag === 1 ?
                <RectifyDetailsModal
                    open={deatilsOpen}
                    setDetailsOpen={setDetailsOpen}
                    detailsData={detailsData}
                    setDetailsFlag={setDetailsFlag}
                    count={count} />
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

            <Box sx={{ flex: 1, py: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>

                <Typography sx={{ pt: .5 }}>
                    From
                </Typography>
                <Input

                    sx={{ borderRadius: 15, pl: 3, cursor: 'pointer', color: 'grey' }}
                    name="fromDate"
                    type="date"
                    size="sm"
                    value={fromDate}
                    onChange={handleFromDateChange}
                />
                <Typography sx={{ ml: 2, pt: .5 }}>
                    To
                </Typography>
                <Input
                    sx={{ borderRadius: 15, pl: 3, cursor: 'pointer', color: 'grey' }}
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
                <Typography>
                    <ReplayCircleFilledIcon sx={{ width: 30, height: 30, cursor: 'pointer' }} onClick={rectifiedListCall} />
                </Typography>
            </Box>
            {verifiedList.length !== 0 ?
                <Virtuoso
                    style={{ height: '73vh' }}
                    totalCount={verifiedList?.length}
                    itemContent={(index) => {
                        const val = verifiedList[index];
                        return (

                            <Box
                                key={val.complaint_slno}
                                sx={{
                                    flex: 1,
                                    border: 1, borderColor: '#3399FF',
                                    borderRadius: 8,
                                    bgcolor: 'white',
                                    mb: .5

                                }}>

                                <Box sx={{ flex: 1, display: 'flex', p: .8, }}>

                                    <Box sx={{
                                        // flex: 1,
                                        maxWidth: 200,
                                        mx: .5, pr: 1,
                                        borderRight: 1, borderColor: 'lightgrey'
                                    }}>
                                        <Typography sx={{ fontSize: 15, textAlign: 'center', fontWeight: 700 }}> Ticket No. {val.complaint_slno}</Typography>
                                        <CssVarsProvider>
                                            <Tooltip title='Ticket Registerd Date and time' placement='right' >
                                                <Typography sx={{ fontSize: 11, textAlign: 'center', fontWeight: 600, color: "black", mr: .3, cursor: 'grab' }}>
                                                    {val.compalint_date}
                                                </Typography>
                                            </Tooltip>
                                        </CssVarsProvider>
                                        <Box sx={{ flex: 1, display: 'flex', my: .5, justifyContent: "center", }}>

                                            {val.cm_file_status === 1 ?
                                                <Tooltip title='File View' >
                                                    <FilePresentRoundedIcon sx={{
                                                        color: '#41729F',
                                                        cursor: 'pointer',
                                                        height: 28, width: 30,
                                                        border: 1, borderRadius: 5, p: .1,
                                                        '&:hover': { color: '#274472' }
                                                    }}
                                                        onClick={() => fileView(val)}
                                                    />
                                                </Tooltip> :
                                                null}

                                            {val.cm_query_status === 1 ?
                                                <Tooltip title='Queries' >
                                                    <QuestionAnswerRoundedIcon sx={{
                                                        height: 28, width: 30,
                                                        color: '#0E86D4',
                                                        cursor: 'pointer', border: 1, mx: .5, borderRadius: 5, p: .1,
                                                        '&:hover': { color: '#41729F' },
                                                    }
                                                    }
                                                        onClick={() => RaiseQuery(val)}
                                                    />
                                                </Tooltip> :
                                                val.cm_query_status === 2 ?
                                                    <Tooltip title='Queries' >
                                                        <QuestionAnswerRoundedIcon sx={{
                                                            height: 28, width: 30,
                                                            color: '#0E86D4',
                                                            cursor: 'pointer', border: 1, mx: .5, borderRadius: 5, p: .1,
                                                            '&:hover': { color: '#41729F' },
                                                        }
                                                        }
                                                            onClick={() => RaiseQuery(val)}
                                                        />
                                                    </Tooltip>
                                                    :
                                                    <Tooltip title='No Queries' >
                                                        <QuestionAnswerRoundedIcon sx={{
                                                            height: 28, width: 30,
                                                            color: 'lightgrey',
                                                            cursor: 'pointer', border: 1, mx: .5, borderRadius: 5,
                                                        }
                                                        }
                                                        />
                                                    </Tooltip>}
                                            <Tooltip title='More Details' >
                                                <MoreIcon sx={{
                                                    height: 28, width: 30,
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
                                        pl: .5,
                                        maxWidth: 500,
                                    }}>
                                        <Box sx={{
                                            // flex: 1,
                                            display: 'flex', mt: .5
                                        }}>
                                            <Typography sx={{ fontSize: 13, fontWeight: 700, width: 140 }}>
                                                Department Section
                                            </Typography>
                                            <Typography sx={{ fontSize: 14, flex: 1, textTransform: 'capitalize' }}>
                                                {val.location.charAt(0).toUpperCase() + val.location.slice(1).toLowerCase()}
                                            </Typography>
                                        </Box>
                                        <Box sx={{
                                            // flex: 1,
                                            display: 'flex', mt: .5
                                        }}>
                                            <Typography sx={{ fontSize: 13, fontWeight: 700, width: 140 }}>
                                                Location
                                            </Typography>
                                            <Typography sx={{ fontSize: 13, flex: 1, }}>
                                                {val.rm_room_name}
                                                {val.rm_roomtype_name || val.rm_insidebuildblock_name || val.rm_floor_name ?
                                                    ` (${val.rm_roomtype_name ? val.rm_roomtype_name : ''}${val.rm_roomtype_name && val.rm_insidebuildblock_name ? ' - ' : ''}${val.rm_insidebuildblock_name ? val.rm_insidebuildblock_name : ''}${(val.rm_insidebuildblock_name && val.rm_floor_name) ? ' - ' : ''}${val.rm_floor_name ? val.rm_floor_name : ''})`
                                                    : "Not Updated"}
                                            </Typography>
                                        </Box>
                                        <Box sx={{
                                            // flex: 1,
                                            display: 'flex', mt: .5
                                        }}>
                                            <Typography sx={{ fontSize: 13, fontWeight: 700, width: 140 }}>
                                                Complaint Type
                                            </Typography>
                                            <Typography sx={{ fontSize: 14, flex: 1, }}>
                                                {val.complaint_type_name.charAt(0).toUpperCase() + val.complaint_type_name.slice(1).toLowerCase()}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, pl: 1.5, }}>
                                        <Typography sx={{ fontSize: 13, fontWeight: 700 }}>
                                            Complaint Describtion
                                        </Typography>
                                        <Typography sx={{
                                            pr: .5, pt: .3, fontSize: 14,
                                            maxHeight: 50,
                                            overflow: 'auto'
                                        }}>
                                            {val.complaint_desc || 'Not Updated'}
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

                            </Box>
                        )
                    }}
                />
                :
                <Box sx={{ flex: 1, m: 1, height: '55vh', textAlign: 'center', fontWeight: 700, fontSize: 22, color: 'lightgray', pt: 10 }}>
                    {flagz === 1 ?
                        <>
                            Empty list Under Selected Date Range
                        </> :
                        <>
                            Select Date Range to View Verified Complaints Under Department
                        </>}


                </Box>}
        </Box >
    )
}

export default memo(VerifiedInAllList)