import { Box } from '@mui/material'
import React, { useCallback, memo, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
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
import { getNdrfpdfList } from 'src/redux/actions/NdrfPdf.action'

const NdrfFrom = () => {
    /*** Initializing */
    const history = useHistory();
    const dispatch = useDispatch();
    const [inchargesign, setInchargeSign] = useState(ProfilePicDefault)
    const [hodsign, setHodSign] = useState(ProfilePicDefault)
    const [omsign, setOmSign] = useState(ProfilePicDefault)
    const [smosign, setSmoSign] = useState(ProfilePicDefault)
    const [caosign, setCaoSign] = useState(ProfilePicDefault)
    const [edsign, setEdSign] = useState(ProfilePicDefault)

    useEffect(() => {
        dispatch(getNdrfpdfList())
    }, [dispatch])

    const ndrfpdfList = useSelector((state) => {
        return state.setNdrfPdfList.NdrfPdfListdata
    })

    //column title setting
    const [column] = useState([
        {
            headerName: 'Action', minWidth: 100, cellRenderer: params => {
                if (params.data.ndrf_ed_approve !== null && params.data.ndrf_md_approve !== null) {
                    return <IconButton onClick={() => pdfselect(params)}
                        sx={{ color: editicon, paddingY: 0.5 }} >
                        <CustomeToolTip title="pdf">
                            <DownloadForOfflineIcon color='primary' />
                        </CustomeToolTip>
                    </IconButton>
                } else {
                    return <IconButton sx={{ color: editicon, paddingY: 0.5 }} disabled>
                        <DownloadForOfflineIcon />
                    </IconButton>

                }

            }
        },
        { headerName: "Req.Slno", field: "req_slno", minWidth: 100 },
        { headerName: "Actual Requirement", field: "actual_requirement", autoHeight: true, wrapText: true, minWidth: 300, filter: "true" },
        { headerName: "Location", field: "location", autoHeight: true, wrapText: true, minWidth: 200, filter: "true" },
        { headerName: "Req.Department", field: "req_dept", autoHeight: true, wrapText: true, minWidth: 300, filter: "true" },
        { headerName: "Req.DeptSec", field: "req_deptsec", autoHeight: true, wrapText: true, minWidth: 300, filter: "true" },
        { headerName: "Req.Date", field: "reqdate", autoHeight: true, wrapText: true, minWidth: 180, filter: "true" },
        { headerName: "Exp.Date", field: "expected_date", autoHeight: true, wrapText: true, minWidth: 180, filter: "true" },
        { headerName: "NDRF Date", field: "ndrf_date", autoHeight: true, wrapText: true, minWidth: 180, filter: "true" },
        { headerName: "Remarks", field: "remarks", autoHeight: true, wrapText: true, minWidth: 250, filter: "true" },
    ])

    const [pdf, setPdf] = useState(0)
    const [dataPost, setdataPost] = useState([])
    const [datapdf, setDataPdf] = useState([])

    const pdfselect = async (params) => {
        const data = params.api.getSelectedRows()
        const { req_slno, incharge_user, hod_user, ndrf_om_user, ndrf_smo_user,
            ndrf_cao_user, ndrf_ed_user } = data[0]
        setDataPdf(data)
        const getInchargeSign = async () => {
            if (incharge_user > 0) {
                const profilePic = JSON.stringify(`${PUBLIC_NAS_FOLDER + incharge_user}/signature/signature.jpg`);
                urlExist(profilePic, (status) => {
                    if (status === true) {
                        const picUrl = JSON.parse(profilePic)
                        setInchargeSign(picUrl)
                    } else {
                        setInchargeSign(ProfilePicDefault)
                    }
                })
            }
        }
        const gethodSign = async () => {
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
        const getOmSign = async () => {
            if (ndrf_om_user > 0) {
                const profilePic = JSON.stringify(`${PUBLIC_NAS_FOLDER + ndrf_om_user}/signature/signature.jpg`);
                urlExist(profilePic, (status) => {
                    if (status === true) {
                        const picUrl = JSON.parse(profilePic)
                        setOmSign(picUrl)
                    } else {
                        setOmSign(ProfilePicDefault)
                    }
                })
            }
        }
        const getSMOSign = async () => {
            if (ndrf_smo_user > 0) {
                const profilePic = JSON.stringify(`${PUBLIC_NAS_FOLDER + ndrf_smo_user}/signature/signature.jpg`);
                urlExist(profilePic, (status) => {
                    if (status === true) {
                        const picUrl = JSON.parse(profilePic)
                        setSmoSign(picUrl)
                    } else {
                        setSmoSign(ProfilePicDefault)
                    }
                })
            }
        }
        const getCAOSign = async () => {
            if (ndrf_cao_user > 0) {
                const profilePic = JSON.stringify(`${PUBLIC_NAS_FOLDER + ndrf_cao_user}/signature/signature.jpg`);
                urlExist(profilePic, (status) => {
                    if (status === true) {
                        const picUrl = JSON.parse(profilePic)
                        setCaoSign(picUrl)
                    } else {
                        setCaoSign(ProfilePicDefault)
                    }
                })
            }
        }
        const getEDSign = async () => {
            if (ndrf_ed_user > 0) {
                const profilePic = JSON.stringify(`${PUBLIC_NAS_FOLDER + ndrf_ed_user}/signature/signature.jpg`);
                urlExist(profilePic, (status) => {
                    if (status === true) {
                        const picUrl = JSON.parse(profilePic)
                        setEdSign(picUrl)
                    } else {
                        setEdSign(ProfilePicDefault)
                    }
                })
            }
        }
        if (req_slno !== 0) {
            getInchargeSign()
            gethodSign()
            getOmSign()
            getSMOSign()
            getCAOSign()
            getEDSign()
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
            pdfdownloadTable(datapdf, dataPost, inchargesign, hodsign, omsign,
                smosign, caosign, edsign)
            setPdf(0)
        }
        else if (pdf !== 0) {
            pdfdownload(datapdf, inchargesign, hodsign, omsign,
                smosign, caosign, edsign)
            setPdf(0)
        }

    }, [pdf, dataPost, inchargesign, hodsign, omsign, smosign, caosign, edsign, datapdf])
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
                    tableData={ndrfpdfList}
                />
            </Box>
        </CardCloseOnly>
    )
}

export default memo(NdrfFrom)