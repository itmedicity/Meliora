import { Box } from '@mui/material'
import React, { useCallback, memo, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import { getNdrfList } from 'src/redux/actions/NdrfList.action'
import { IconButton } from '@mui/material';
import { editicon } from 'src/color/Color';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
import { pdfdownloadTable } from './NdrfPdfView'
import { axioslogin } from 'src/views/Axios/Axios'
import { pdfdownload } from './NdrfPdfWithoutTable'
import ProfilePicDefault from 'src/assets/images/nosigature.jpg'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static'
import { urlExist } from 'src/views/Constant/Constant'

const NdrfFrom = () => {
    /*** Initializing */
    const history = useHistory();
    const dispatch = useDispatch();
    const [hodsign, setHodSign] = useState(ProfilePicDefault)

    useEffect(() => {
        dispatch(getNdrfList())
    }, [dispatch])

    const tabledata = useSelector((state) => {
        return state.setNdrfList.NdrfListdata
    })


    //column title setting
    const [column] = useState([

        {
            headerName: 'Action', minWidth: 120, cellRenderer: params => {
                return <IconButton onClick={() => pdfselect(params)}
                    sx={{ color: editicon, paddingY: 0.5 }} >
                    <CustomeToolTip title="pdf">
                        <DownloadForOfflineIcon color='primary' />
                    </CustomeToolTip>
                </IconButton>
            }
        },
        { headerName: "Req.Slno", field: "req_slno", minWidth: 120 },
        { headerName: "Actual Requirement", field: "actual_requirement", autoHeight: true, wrapText: true, minWidth: 300, filter: "true" },
        { headerName: "Location", field: "location", autoHeight: true, wrapText: true, minWidth: 200, filter: "true" },
        { headerName: "Req.Department", field: "req_dept", autoHeight: true, wrapText: true, minWidth: 300, filter: "true" },
        { headerName: "Req.DeptSec", field: "req_deptsec", autoHeight: true, wrapText: true, minWidth: 300, filter: "true" },
        { headerName: "Req.Date", field: "reqdate", autoHeight: true, wrapText: true, minWidth: 180, filter: "true" },
        { headerName: "Exp.DeptSec", field: "expdate", autoHeight: true, wrapText: true, minWidth: 180, filter: "true" },
        { headerName: "NDRF Date", field: "ndrf_date", autoHeight: true, wrapText: true, minWidth: 180, filter: "true" },
        { headerName: "Remarks", field: "remarks", autoHeight: true, wrapText: true, minWidth: 150, filter: "true" },
    ])
    const [pdf, setPdf] = useState(0)
    const [dataPost, setdataPost] = useState([])
    const [datapdf, setDataPdf] = useState([])

    const pdfselect = async (params) => {
        const data = params.api.getSelectedRows()
        const { req_slno, hod_user } = data[0]
        setDataPdf(data)
        const gethodSig = async () => {
            if (hod_user > 0) {
                const profilePic = JSON.stringify(`${PUBLIC_NAS_FOLDER + hod_user}/signature/signature.jpg`);
                urlExist(profilePic, (status) => {
                    if (status === true) {
                        const picUrl = JSON.parse(profilePic)
                        setHodSign(picUrl)
                    } else {
                        setHodSign(ProfilePicDefault)
                    }
                })
            }
        }
        if (req_slno !== 0) {
            gethodSig()
            const result = await axioslogin.get(`/requestRegister/getItemList/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                setdataPost(data)
            }
            else {
                setdataPost([])
            }
        }
        setPdf(1)
    }

    useEffect(() => {
        if (pdf !== 0 && Object.keys(dataPost).length !== 0) {
            pdfdownloadTable(datapdf, dataPost, hodsign)
            setPdf(0)
        }
        else if (pdf !== 0) {
            pdfdownload(datapdf, hodsign)
            setPdf(0)
        }

    }, [pdf, dataPost, hodsign, datapdf])
    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home')
    }, [history])

    return (
        <CardCloseOnly
            title="NDRF Form"
            close={backtoSetting}
        >
            <Box sx={{ p: 1 }}>
                <CusAgGridForMain
                    columnDefs={column}
                    tableData={tabledata}
                />
            </Box>
        </CardCloseOnly>
    )
}

export default memo(NdrfFrom)