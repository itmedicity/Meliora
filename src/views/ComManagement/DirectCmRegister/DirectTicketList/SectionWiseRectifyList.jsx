import { Box, Chip, CssVarsProvider, Radio, RadioGroup, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { Virtuoso } from 'react-virtuoso';
import ErrorIcon from '@mui/icons-material/Error';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import moment from 'moment';
import { format } from 'date-fns';
import ReplyModalvieww from '../../AssignComplaint/Queries/ReplyModalvieww';
import CmDeptSectionFilter from 'src/views/CommonSelectCode/CmDeptSectionFilter';
import { infoNotify, warningNotify } from 'src/views/Common/CommonCode';
import RectifyDetailsModal from '../../ComplaintRegister/TicketLists/RectifyDetailsModal';
import MoreIcon from '@mui/icons-material/More';
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import ComFileView from '../../CmFileView/ComFileView';
import TextComponent from 'src/views/Components/TextComponent';
import FilterAltSharpIcon from '@mui/icons-material/FilterAltSharp';
import { FormControlLabel } from '@mui/material';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';

const SectionWiseRectifyList = ({ count, setCount }) => {

    const [flagz, setflagz] = useState(0)
    const [valuee, setValuee] = useState([])
    const [replyflag, setReplyflag] = useState(0)
    const [replyOpen, setReplyOpen] = useState(false)
    const [depsec, setDepsec] = useState(0)
    const [dataa, setDataa] = useState([])
    const [detailsData, setDetailsData] = useState([])
    const [detailsFlag, setDetailsFlag] = useState(0)
    const [deatilsOpen, setDetailsOpen] = useState(false)
    const [imageViewOpen, setimageViewOpen] = useState(false)
    const [image, setimage] = useState(0)
    const [fileDetails, setfileDetails] = useState([])
    const [imageUrls, setImageUrls] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedRadio, setSelectedRadio] = useState(1);
    const [fromDate, setFromDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [toDate, setToDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [selectDateFlag, setselectDateFlag] = useState(0)

    const handleRadioChange = useCallback((event) => {
        const value = Number(event.target.value);
        setSelectedRadio(value);
        if (value === 1) {
            setselectDateFlag(0);
            setFromDate(format(new Date(), 'yyyy-MM-dd'));
            setToDate(format(new Date(), 'yyyy-MM-dd'))
            setDataa([])
            setflagz(0)

        } else if (value === 2) {
            setselectDateFlag(1);
            setFromDate(format(new Date(), 'yyyy-MM-dd'));
            setToDate(format(new Date(), 'yyyy-MM-dd'));
            setDataa([])
            setflagz(0)

        }
        else {
            setDataa([])
        }
    }, [setToDate, setFromDate,]);

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
                    const result = await axioslogin.post('/Rectifycomplit/getUserEndRectfiedList', searchDate);
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
            }
            else {
                infoNotify("Please Select a Date Range")
            }
        }
        else {
            infoNotify("Please Choose a Department Section")
        }
    }, [searchDate, depsec])

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
        <Box sx={{ bgcolor: 'white', p: .5 }}>

            <Box sx={{ border: 1, borderColor: 'lightgrey' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'lightgrey', flex: 1, display: 'flex', py: .8, pl: .5 }}>
                    <Box sx={{ display: 'flex', py: .5 }}>
                        <FilterAltSharpIcon />
                        <TextComponent
                            sx={{
                                color: '#5A676C',
                                fontWeight: 510,
                                fontFamily: 'Arial'
                            }}
                            text="filter :"
                        />
                    </Box>

                    <Box sx={{ width: 320, ml: 1 }}>
                        <CmDeptSectionFilter cmSection={depsec} setCmSection={setDepsec} setDataa={setDataa} />
                    </Box>
                    <RadioGroup value={selectedRadio} onChange={handleRadioChange} sx={{ display: 'flex', flexDirection: 'row', ml: 3, gap: 2 }}>
                        <FormControlLabel
                            sx={{ gap: .5, fontWeight: 500, }}
                            value={1}
                            control={<Radio color="success" />}
                            label="Today's"
                        />
                        <FormControlLabel
                            sx={{ gap: .5, fontWeight: 500, }}
                            value={2}
                            control={<Radio color="success" />}
                            label="Select Date"
                        />
                    </RadioGroup>
                    {selectDateFlag === 1 ?
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <TextComponent
                                text={"From "}
                                sx={{ fontWeight: 500, ml: 1, pt: .4 }} />
                            <TextFieldCustom
                                type="date"
                                size="sm"
                                name="fromDate"
                                value={fromDate}
                                onchange={handleFromDateChange}
                            ></TextFieldCustom>
                            <TextComponent
                                text={"To "}
                                sx={{ fontWeight: 500, ml: 2, pt: .4 }} />
                            <TextFieldCustom
                                type="date"
                                size="sm"
                                name="toDate"
                                value={toDate}
                                onchange={handleToDateChange}
                                disabled={!fromDate}
                                slotProps={{
                                    input: {
                                        min: fromDate,
                                        max: moment().format('YYYY-MM-DD'),
                                    },
                                }}
                            ></TextFieldCustom>
                        </Box> : null}
                    <Tooltip text="Search to Find Rectified List">
                        <Box
                            onClick={handleClick}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 50,
                                height: 32,
                                backgroundColor: '#E3FBE3',
                                color: '#0F4B0F',
                                borderRadius: 5,
                                cursor: 'pointer',
                                ml: 1,
                                fontWeight: 600,
                                fontSize: 15,
                                transition: 'all 0.3s ease-in-out',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                '&:hover': {
                                    backgroundColor: '#C8F0C8',  // Lighter green for hover
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                                },
                                '&:active': {
                                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
                                }
                            }}
                        >
                            <SearchSharpIcon sx={{ width: 25, height: 25, color: '#0F4B0F' }} />
                        </Box>
                    </Tooltip>
                </Box>
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

                <Box sx={{ p: .5 }}>
                    {dataa.length !== 0 ?
                        <Virtuoso
                            style={{ height: '65vh', overflow: 'auto' }}
                            totalCount={dataa?.length}
                            itemContent={(index) => {
                                const val = dataa[index];
                                return (

                                    <Box
                                        key={val.complaint_slno}
                                        sx={{
                                            flex: 1,
                                            border: 1, borderColor: '#59981A',
                                            borderRadius: 8,
                                            bgcolor: 'white',
                                            m: .5
                                        }}>
                                        <Box sx={{
                                            flex: 1, bgcolor: '#E5E8E9', borderTopRightRadius: 6, borderTopLeftRadius: 6,
                                            mx: .1, display: 'flex',
                                        }}>
                                            <CssVarsProvider>
                                                <Tooltip title='Ticket Registered Date and time' placement='top-start' >
                                                    <Box sx={{ cursor: 'pointer' }}>
                                                        <TextComponent
                                                            sx={{
                                                                color: 'black',
                                                                fontWeight: 540,
                                                                flex: 1,
                                                                fontSize: 15,
                                                                pl: 1,
                                                                py: .5,
                                                                fontFamily: 'Arial',
                                                            }}
                                                            text={
                                                                val.compalint_date
                                                                    ? format(new Date(val.compalint_date), 'dd MMM yyyy,   hh:mm a')
                                                                    : 'Not Updated'
                                                            }
                                                        />
                                                    </Box>
                                                </Tooltip>
                                            </CssVarsProvider>
                                            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', }}>
                                                <Box sx={{ my: .3, mr: .1, px: 2, fontWeight: 500, fontSize: 14, cursor: 'pointer' }}>
                                                    Ticket Registered by :  {val.comp_reg_emp}
                                                </Box>
                                            </Box>
                                        </Box>
                                        <CssVarsProvider>
                                            <Box sx={{ flex: 1, display: 'flex', p: .8, }}>
                                                <Box sx={{
                                                    maxWidth: 200,
                                                    mx: 1, pr: 1,
                                                    borderRight: 1, borderColor: 'lightgrey'
                                                }}>
                                                    <Typography sx={{ fontSize: 15, textAlign: 'center', fontWeight: 700 }}> Ticket No. </Typography>
                                                    <Typography sx={{ fontSize: 15, textAlign: 'center', fontWeight: 700 }}>{val.complaint_slno}</Typography>
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
                                                    pl: .5,
                                                    maxWidth: 500,
                                                }}>
                                                    <Box sx={{

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

                                                        display: 'flex', mt: .5
                                                    }}>
                                                        <Typography sx={{ fontSize: 13, fontWeight: 700, width: 140 }}>
                                                            Location
                                                        </Typography>
                                                        <Typography sx={{ fontSize: 13, flex: 1, }}>
                                                            {/* {val.rm_room_name}
                                                            {val.rm_roomtype_name || val.rm_insidebuildblock_name || val.rm_floor_name ?
                                                                ` (${val.rm_roomtype_name ? val.rm_roomtype_name : ''}${val.rm_roomtype_name && val.rm_insidebuildblock_name ? ' - ' : ''}${val.rm_insidebuildblock_name ? val.rm_insidebuildblock_name : ''}${(val.rm_insidebuildblock_name && val.rm_floor_name) ? ' - ' : ''}${val.rm_floor_name ? val.rm_floor_name : ''})`
                                                                : "Not Updated"} */}
                                                            {val.rm_room_name}
                                                            {(val.rm_roomtype_name || val.rm_insidebuildblock_name || val.rm_floor_name) ? (
                                                                ` (${val.rm_roomtype_name || ''}${val.rm_roomtype_name && val.rm_insidebuildblock_name ? ' - ' : ''}${val.rm_insidebuildblock_name || ''}${val.rm_insidebuildblock_name && val.rm_floor_name ? ' - ' : ''}${val.rm_floor_name || ''})`
                                                            ) : (
                                                                val.cm_complaint_location || "Not Updated"
                                                            )}
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{
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
                                                        pr: .5, pt: .3, fontSize: 15,
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
                                                        {val.assigned_employees === null ?
                                                            <Chip>
                                                                Not Updated
                                                            </Chip>
                                                            :
                                                            <>
                                                                {val.assigned_employees.split(',').map((name, index) => (
                                                                    <Chip
                                                                        key={index}
                                                                        size="small"
                                                                        variant="outlined"
                                                                        sx={{ bgcolor: '#D3C7A1', fontSize: 13, px: 0.8, marginRight: 0.1 }}
                                                                    >
                                                                        {name.trim()}
                                                                    </Chip>
                                                                ))}
                                                            </>}
                                                    </Box>

                                                </Box>
                                            </Box>
                                        </CssVarsProvider>
                                    </Box>
                                )
                            }}
                        />
                        :
                        <Box sx={{ flex: 1, height: '60vh', display: 'flex', justifyContent: 'center', fontWeight: 700, fontSize: 22, color: 'lightgray', pt: 15 }}>
                            {flagz === 1 ?
                                <>
                                    Empty list Under Selected Date Range
                                </> :
                                <>
                                    Search Section & Date Range to View Rectified Complaints
                                </>}
                        </Box>
                    }

                </Box>

            </Box >
        </Box>
    )
}

export default memo(SectionWiseRectifyList)