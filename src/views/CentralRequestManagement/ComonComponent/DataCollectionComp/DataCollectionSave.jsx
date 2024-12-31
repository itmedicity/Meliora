
import React, { useCallback, memo, Fragment, useState } from 'react'
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { Box } from '@mui/joy';
import { Button } from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';
import { GetItemDetailsOfCRFCmp } from '../GetItemDetailsOfCRFCmp';
import DataCollectionActionModal from '../../CrfDatacollection/DataCollectionActionModal';
import { axioslogin } from 'src/views/Axios/Axios';
import DataCollectionViewModal from '../../CrfDatacollection/DataCollectionViewModal';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';

const DataCollectionSave = ({ flag, val, empdeptsec }) => {

    const [dcReplyModal, setDcReplyModal] = useState(false)
    const [dcReplyFlag, setdcReplyFlag] = useState(0)
    const [dcData, setDcData] = useState([])

    const [dtaEnterViewFlag, setDataEnterViewFlag] = useState(0)
    const [dtaEnterViewModal, setDataEnterViewModal] = useState(false)
    const [dtaEnterViewData, setDataEnterViewData] = useState([])

    const [reqItems, setReqItems] = useState([])
    const [approveTableData, setApproveTableData] = useState([])
    const [poDetails, setPoDetails] = useState([])
    const [imagearray, setImageArry] = useState([])
    const ActionFctn = useCallback(() => {
        const { req_slno } = val
        const getImage = async (req_slno) => {
            const result = await axioslogin.get(`/newCRFRegisterImages/crfRegimageGet/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const fileNames = data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/${fileName}`;
                });

                const savedFiles = fileUrls.map((val) => {
                    const parts = val.split('/');
                    const fileNamePart = parts[parts.length - 1];
                    const obj = {
                        imageName: fileNamePart,
                        url: val
                    }
                    return obj
                })
                setImageArry(savedFiles)
            } else {
                setImageArry([])
            }
        }
        getImage(req_slno)
        GetItemDetailsOfCRFCmp(req_slno, setReqItems, setApproveTableData, setPoDetails)
        setDcReplyModal(true)
        setdcReplyFlag(1)
        setDcData(val)
    }, [val])

    const ViewFctn = useCallback(() => {
        const { req_slno } = val
        const getImage = async (req_slno) => {
            const result = await axioslogin.get(`/newCRFRegisterImages/crfRegimageGet/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const fileNames = data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/${fileName}`;
                });

                const savedFiles = fileUrls.map((val) => {
                    const parts = val.split('/');
                    const fileNamePart = parts[parts.length - 1];
                    const obj = {
                        imageName: fileNamePart,
                        url: val
                    }
                    return obj
                })
                setImageArry(savedFiles)
            } else {
                setImageArry([])
            }
        }
        getImage(req_slno)
        GetItemDetailsOfCRFCmp(req_slno, setReqItems, setApproveTableData, setPoDetails)
        setDataEnterViewFlag(1)
        setDataEnterViewModal(true)

        const checkDataCollectComplete = async (req_slno) => {
            const result = await axioslogin.get(`/CRFRegisterApproval/DataCollectComplete/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const yy = data?.filter((val) => val.crf_dept_status === 1)
                const datas = yy.map((val) => {
                    const obj = {
                        req_slno: val.crf_requst_slno,
                        crf_dept_remarks: val.crf_dept_remarks,
                        datagive_user: val.datagive_user,
                        data_entered: val.data_entered !== null ? val.data_entered.toLowerCase() : '',
                        reqest_one: val.reqest_one,
                        req_user: val.req_user !== null ? val.req_user.toLowerCase() : '',
                        create_date: val.create_date,
                        update_date: val.update_date,
                        crf_req_remark: val.crf_req_remark,
                        data_coll_image_status: val.data_coll_image_status,
                        crf_data_collect_slno: val.crf_data_collect_slno,
                    }
                    return obj
                })
                setDataEnterViewData(datas)
            } else {
                setDataEnterViewData([])
            }
        }
        checkDataCollectComplete(req_slno)
    }, [setDataEnterViewFlag, setDataEnterViewModal, setDataEnterViewData, val])

    const buttonstyle = {
        // textTransform: 'capitalize',
        px: 2,
        fontSize: 12,
        height: '30px',
        minHeight: '30px',
        lineHeight: '1.2',
        color: '#01579b',
        bgcolor: 'white',
        '&:hover': {
            bgcolor: '#F0F4F8',
        },
        borderRadius: 1,
    }
    const handleClose = useCallback(() => {
        setDcReplyModal(false)
        setdcReplyFlag(0)
        setDcData([])
        setDataEnterViewFlag(0)
        setDataEnterViewModal(false)
        setDataEnterViewData([])
    }, [])
    return (
        <Fragment>

            {dcReplyFlag === 1 ? <DataCollectionActionModal open={dcReplyModal} handleClose={handleClose} reqItems={reqItems}
                approveTableData={approveTableData} poDetails={poDetails} dcData={dcData} setApproveTableData={setApproveTableData}
                empdeptsec={empdeptsec} imagearray={imagearray} /> : null}

            {dtaEnterViewFlag === 1 ? <DataCollectionViewModal open={dtaEnterViewModal} handleClose={handleClose} flag={flag}
                dtaEnterViewData={dtaEnterViewData} reqItems={reqItems} approveTableData={approveTableData} reqData={val}
                imagearray={imagearray} /> : null}
            <Box sx={{
                display: 'flex', flex: 1, bgcolor: '#e3f2fd', borderRadius: 2, borderTopLeftRadius: 0,
                borderTopRightRadius: 0, flexWrap: 'wrap',
            }}>
                <Box sx={{ pl: 2, p: 0.6 }}>
                    {flag === 1 ?
                        <Button
                            variant="contained"
                            startIcon={
                                <SaveAsIcon sx={{ height: 19, width: 19, color: '#0277bd' }} />
                            }
                            sx={buttonstyle}
                            onClick={ActionFctn}
                        >
                            Action
                        </Button>
                        :
                        <Button
                            variant="contained"
                            startIcon={
                                <PreviewIcon sx={{ height: 19, width: 19, color: '#0277bd' }} />
                            }
                            sx={buttonstyle}
                            onClick={ViewFctn}
                        >
                            View
                        </Button>
                    }
                </Box>
            </Box>
        </Fragment >
    )
}

export default memo(DataCollectionSave)