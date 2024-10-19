import { Box, Chip, CssVarsProvider, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import ErrorIcon from '@mui/icons-material/Error';
import { keyframes } from '@mui/system';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import CountDownCm from '../../CountDownCM/CountDownCm';
import QueryBuilderRoundedIcon from '@mui/icons-material/QueryBuilderRounded';
import QueryModalview from '../Queries/QueryModalview';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DetailAssingModal from '../../CmSuperVisorList/DetailAssingModal';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import ChangeAssingeesModal from '../../CmSuperVisorList/ChangeAssingeesModal';
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import { warningNotify } from 'src/views/Common/CommonCode';
import ComFileView from '../../CmFileView/ComFileView';
import ViewAssetDetails from '../../ComplaintRegister/TicketLists/ViewAssetDetails';
import InventoryIcon from '@mui/icons-material/Inventory';

const AssingedInAllList = ({ pendingCompl }) => {

    const [count, setCount] = useState(0)
    const [queryflag, setqueryflag] = useState(0)
    const [queryOpen, setqueryOpen] = useState(false)
    const [valuee, setValuee] = useState([])
    const [assignedEmployees, setAssignedEmployees] = useState([])
    const [authorization, setAuthorization] = useState([])
    const [detailAssingOpen, setdetailAssingOpen] = useState(false)
    const [detailAssingFlag, setdetailAssingFlag] = useState(0)
    const [detailAssingData, setdetailAssingData] = useState([])
    const [empTransferOpen, setEmptransferOpen] = useState(false)
    const [empTransferFlag, setEmptransferFlag] = useState(0)
    const [emptransferData, setEmpTransferData] = useState([])
    const [image, setimage] = useState(0)
    const [fileDetails, setfileDetails] = useState([])
    const [imageUrls, setImageUrls] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageViewOpen, setimageViewOpen] = useState(false)
    const [assetArray, setAssetArray] = useState([])
    const [assetflag, setAssetflag] = useState(0)
    const [assetOpen, setAssetOpen] = useState(false)
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    const blinkAnimation = keyframes`
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
`;
    const RaiseQuery = useCallback((value) => {
        setqueryflag(1)
        setValuee(value)
        setqueryOpen(true)
    }, [])

    const EmpTransfer = useCallback((val) => {
        setEmptransferFlag(1)
        setEmpTransferData(val)
        setEmptransferOpen(true)
    }, [])

    useEffect(() => {
        const getAssignedEmployees = async () => {
            const updatedEmployees = {};
            for (let complaint of pendingCompl) {
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
    }, [pendingCompl]);

    useEffect(() => {
        const checkAuthorisation = async (id) => {
            const result = await axioslogin.get(`/Rectifycomplit/getAuthorization/${id}`);
            const { success, data } = result.data;
            if (success === 1) {
                if (data.length !== 0) {
                    setAuthorization(data)
                }
                else {
                    setAuthorization([])
                }

            } else {
                setAuthorization([])
            }
        }
        checkAuthorisation(id)
    }, [id])

    const DetailAssing = useCallback((val) => {
        setdetailAssingFlag(1)
        setdetailAssingData(val)
        setdetailAssingOpen(true)
    }, [])

    useEffect(() => {
        const getAssetinComplaint = async () => {
            const AssetedArray = {};
            for (let complaint of pendingCompl) {
                const result = await axioslogin.get(`complaintreg/getAssetinComplaint/${complaint.complaint_slno}`);
                const { success, data } = result.data;
                if (success === 2) {
                    AssetedArray[complaint.complaint_slno] = data;
                } else {
                    AssetedArray[complaint.complaint_slno] = [];
                }
            }
            setAssetArray(AssetedArray);
        };
        getAssetinComplaint();
    }, [pendingCompl]);

    const AssetView = useCallback((value) => {
        setValuee(value)
        setAssetflag(1)
        setAssetOpen(true)
    }, [setAssetflag, setAssetOpen])

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
        <Box sx={{
            bgcolor: 'white',
            borderRadius: 0
            , height: '70vh',
            overflow: 'auto'
        }}>
            {queryflag === 1 ?
                <QueryModalview open={queryOpen} setqueryOpen={setqueryOpen} valuee={valuee}
                    setqueryflag={setqueryflag}
                    setCount={setCount} count={count}
                />
                : null}
            {detailAssingFlag === 1 ?
                <DetailAssingModal
                    open={detailAssingOpen}
                    setdetailAssingOpen={setdetailAssingOpen}
                    detailAssingData={detailAssingData}
                    setdetailAssingFlag={setdetailAssingFlag}
                    setCount={setCount}
                    count={count}
                />
                : null}
            {assetflag === 1 ?
                <ViewAssetDetails
                    assetOpen={assetOpen}
                    setAssetOpen={setAssetOpen}
                    setAssetflag={setAssetflag}
                    valuee={valuee}
                    count={count}
                    setCount={setCount}
                />
                : null}

            {empTransferFlag === 1 ?
                <ChangeAssingeesModal
                    empTransferOpen={empTransferOpen}
                    setEmptransferOpen={setEmptransferOpen}
                    emptransferData={emptransferData}
                    setEmptransferFlag={setEmptransferFlag}
                    setCount={setCount} count={count}
                />
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

            {pendingCompl.length !== 0 ?
                <Box sx={{ p: .1, mb: .8 }}>
                    {pendingCompl?.map((val, index) => {
                        return (
                            <Box
                                key={val.complaint_slno}
                                sx={{
                                    flex: 1,
                                    border: 1, borderColor: '#CBAE11',
                                    borderRadius: 8,
                                    bgcolor: 'white',
                                    mb: .6
                                }}>
                                {val.aprrox_date !== null ?
                                    <Box sx={{
                                        flex: 1, bgcolor: '#E7D2CC', borderTopRightRadius: 5, borderTopLeftRadius: 5, mb: .1,
                                        mx: .1, display: 'flex', py: .3,
                                    }}>
                                        <Typography sx={{ color: '#026F7E', pl: 1, pt: .2, fontWeight: 700, fontSize: 13 }}>
                                            ASSINGED BY SUPERVISOR
                                        </Typography>
                                        <Typography sx={{ color: 'black', pt: .2, fontWeight: 500, fontSize: 13, ml: 3 }}>
                                            Priority :
                                        </Typography>
                                        <Chip sx={{ bgcolor: 'white', color: '#391306', border: 1, ml: 1, }}>
                                            {val.compalint_priority = 1 ? "Emergency" : val.compalint_priority = 2 ? 'High Priority' :
                                                val.compalint_priority = 3 ? 'Medium Priority' : val.compalint_priority = 4 ? 'Normal' :
                                                    "Normal"}
                                        </Chip>
                                        <Typography sx={{ color: 'black', pt: .2, fontWeight: 500, fontSize: 13, ml: 3 }}>
                                            Aprox Date :
                                        </Typography>
                                        <Chip sx={{ bgcolor: 'white', color: '#391306', border: 1, ml: 1, }}>
                                            {val.aprrox_date}
                                        </Chip>
                                        <Typography sx={{ color: 'black', pt: .2, fontWeight: 500, fontSize: 13, ml: 3 }}>
                                            Remarks :
                                        </Typography>
                                        <Typography sx={{ color: 'black', pt: .2, fontSize: 13, ml: 3 }}>
                                            {val.complaint_remark}
                                        </Typography>
                                    </Box> : null}

                                <Box sx={{ flex: 1, display: 'flex', p: .8, }}>
                                    <Box sx={{
                                        maxWidth: 200,
                                        mx: 1, pr: 1.3,
                                        borderRight: 1, borderColor: 'lightgrey'
                                    }}>
                                        <Typography sx={{ fontSize: 15, textAlign: 'center', fontWeight: 700 }}> Ticket {val.complaint_slno}</Typography>
                                        <Tooltip title='Ticket Registerd Date and time' placement='right'   >
                                            <Typography sx={{ fontSize: 11, textAlign: 'center', fontWeight: 600, color: "black", cursor: 'grab' }}>
                                                {val.compalint_date}
                                            </Typography>
                                        </Tooltip>
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
                                                    : <Tooltip title='Queries' >
                                                        <QuestionAnswerRoundedIcon sx={{
                                                            height: 28, width: 30,
                                                            color: 'lightgrey',
                                                            cursor: 'pointer', border: 1, mx: .5, borderRadius: 5, p: .1,

                                                        }
                                                        }
                                                        />
                                                    </Tooltip>}
                                            {authorization.length !== 0 ?
                                                <Tooltip title='Add Assingees' color='warning' >
                                                    <PersonAddIcon sx={{
                                                        height: 28, width: 30, color: '#CBAE77', cursor: 'pointer', border: 1, borderRadius: 5, p: .3,
                                                        '&:hover': { color: '#CBAE77' },
                                                    }}
                                                        onClick={() => DetailAssing(val)}
                                                    />
                                                </Tooltip> : null
                                            }
                                            {authorization.length !== 0 ?
                                                <Tooltip title='Change Assingees'  >
                                                    <SettingsAccessibilityIcon sx={{
                                                        height: 28, width: 30, color: '#603F8B', cursor: 'pointer', border: 1, borderRadius: 5, p: .3, mx: .5,
                                                        '&:hover': { color: '#A16AE8' },
                                                    }}
                                                        onClick={() => EmpTransfer(val)}
                                                    />
                                                </Tooltip> : null
                                            }
                                            {assetArray[val.complaint_slno]?.length !== 0 ?
                                                <Tooltip title='Asset Details' sx={{ bgcolor: '#524199' }} >
                                                    <InventoryIcon sx={{
                                                        height: 28, width: 30, border: 1, borderRadius: 5,
                                                        p: .1, color: '#939391', cursor: 'pointer'

                                                    }} onClick={() => AssetView(val)} />
                                                </Tooltip>
                                                :
                                                null
                                            }
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
                                    <CssVarsProvider>
                                        <Tooltip title='CountUp time Starts from Ticket Registration' color='warning' variant="soft" sx={{ width: 180 }}>
                                            <Box sx={{ textAlign: 'center', display: 'flex', cursor: 'grab', ml: .8, mr: .5 }}>
                                                <CountDownCm complaintDate={val.compalint_date} />
                                            </Box>
                                        </Tooltip>
                                        <Tooltip title='Ticket Assinged Date and time' placement='right'   >
                                            <Box sx={{ display: 'flex' }}>
                                                <QueryBuilderRoundedIcon sx={{ color: 'black', borderRadius: 1, pt: .7 }} />
                                                <Typography sx={{ fontSize: 12, textAlign: 'center', fontWeight: 600, color: "black", mr: .3, mt: .6, cursor: 'grab' }}>
                                                    {val.assigned_date}
                                                </Typography>
                                            </Box>
                                        </Tooltip>
                                    </CssVarsProvider>
                                    {val.priority_check === 1 ?
                                        <Box sx={{ display: 'flex', pl: 1.3 }}>

                                            <ErrorIcon
                                                sx={{
                                                    // mt: 3,
                                                    height: 30,
                                                    width: 25,
                                                    color: val.priority_check === 1 ? '#970C10' : 'lightgrey',
                                                    animation: val.priority_check === 1 ? `${blinkAnimation} 1s infinite` : 'none',
                                                }}
                                            />

                                            <Typography sx={{ fontWeight: 600, pl: .5, fontSize: 14, pt: .5, color: 'darkred' }}>
                                                {val.priority_reason}
                                            </Typography>

                                        </Box> : null}
                                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', }}>
                                        <Typography sx={{ fontSize: 13, fontWeight: 700, pt: .3 }}>Assingees :</Typography>&nbsp;&nbsp;
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
                    })}

                </Box> :
                <Box sx={{ flex: 1, height: '90%', m: 1, textAlign: 'center', fontWeight: 700, fontSize: 22, color: 'lightgray', pt: 10 }}>
                    Empty List

                </Box>}

        </Box >
    )
}

export default memo(AssingedInAllList)