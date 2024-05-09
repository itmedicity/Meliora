import React, { memo, useCallback, useState, useMemo, useEffect } from 'react'
import { Box, Typography, Paper, Button } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusIconButton from '../../Components/CusIconButton';
import CustomeToolTip from 'src/views/Components/CustomeToolTip'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import RefreshIcon from '@mui/icons-material/Refresh';
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { format } from 'date-fns'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import BillMastSelectComp from './BillMastSelectComp';
import BillAddMaster from './BillAddMaster';
import ImageDisplayModal from 'src/views/CentralRequestManagement/CRFRequestMaster/ImageDisplayModal';

const BillDetailAdd = ({ detailArry, grndetailarry, exist, setExist, assetSpare }) => {
    const { am_item_map_slno, am_spare_item_map_slno, } = detailArry
    const { am_bill_mast_slno } = grndetailarry

    const [BillAdd, setBillAdd] = useState({
        billNo: '',
        billdate: format(new Date(), "yyyy-MM-dd"),
        billAmount: '',
        vendor: '',
        billImage: '',
    })

    //Destructuring
    const { billNo, billdate, billAmount, vendor, billImage } = BillAdd

    const [BillMast, setBillMast] = useState(am_bill_mast_slno)
    const [AddBillFlg, setBillFlg] = useState(0)
    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const AddBillMaster = useCallback(() => {
        setBillFlg(1)
    }, [])
    useEffect(() => {
        setBillMast(am_bill_mast_slno)
    }, [am_bill_mast_slno])
    const [imageshowFlag, setImageShowFlag] = useState(0)
    const [imagearray, setImageArry] = useState([])
    const [imageshow, setImageShow] = useState(false)
    const ViewBillImage = useCallback(() => {
        const getImage = async (BillMast) => {
            const result = await axioslogin.get(`/AssetFileUpload/BillMasterImageView/${BillMast}`)
            const { success, data } = result.data
            if (success === 1) {
                const fileNames = data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/Asset/BillMaster/${BillMast}/${fileName}`;
                });
                setImageArry(fileUrls);
                setImageShowFlag(1)
                setImageShow(true)
            } else {
                warningNotify("Error Occured to display image")
                setImageShowFlag(0)
                setImageShow(false)
                setImageArry([])
            }
        }
        getImage(BillMast)

    }, [BillMast])

    useEffect(() => {
        const GetBillDetailById = async (BillMast) => {
            const result = await axioslogin.get(`/ItemMapDetails/GetBillMasterById/${BillMast}`);
            const { success, data } = result.data
            if (success === 1) {
                const { am_bill_no, am_bill_date, am_bill_amount, am_bill_vendor_detail, am_bill_image } = data[0]
                const frmdata = {
                    billNo: am_bill_no,
                    billdate: format(new Date(am_bill_date), "yyyy-MM-dd"),
                    billAmount: am_bill_amount,
                    vendor: am_bill_vendor_detail,
                    billImage: am_bill_image,
                }
                setBillAdd(frmdata)

            }
            else {
                const frmdata = {
                    billNo: '',
                    billdate: '',
                    billAmount: '',
                    vendor: '',
                    billImage: '',
                    billSlno: ''
                }
                setBillAdd(frmdata)
            }
        }

        GetBillDetailById(BillMast)
    }, [BillMast])
    const handleClose = useCallback(() => {
        setImageShowFlag(0)
        setImageShow(false)
    }, [])

    const reset = useCallback(() => {
        setBillMast(0)
        setBillFlg(0)
    }, [])


    const billpatchData = useMemo(() => {
        return {
            am_bill_mast_slno: BillMast,
            edit_user: id,
            am_item_map_slno: am_item_map_slno
        }
    }, [BillMast, id, am_item_map_slno])

    const billpatchDataSpare = useMemo(() => {
        return {
            am_bill_mast_slno: BillMast,
            edit_user: id,
            am_spare_item_map_slno: am_spare_item_map_slno
        }
    }, [BillMast, id, am_spare_item_map_slno])

    const SaveAMCPMDetails = useCallback((e) => {
        e.preventDefault()
        const updateBillDetails = async (billpatchData) => {
            const result = await axioslogin.patch('/ItemMapDetails/BillDetailsUpdate', billpatchData);
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message)
            }
            else {
                warningNotify(message)
            }
        }
        const updateBillDetailsSpare = async (billpatchDataSpare) => {
            const result = await axioslogin.patch('/ItemMapDetails/BillDetailsUpdateSpare', billpatchDataSpare);
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message)
            }
            else {
                warningNotify(message)
            }
        }

        if (assetSpare === 1) {
            updateBillDetails(billpatchData)
        } else {
            updateBillDetailsSpare(billpatchDataSpare)
        }
    }, [billpatchData, assetSpare, billpatchDataSpare])


    const AmcPmReferesh = useCallback(() => {
        reset()
    }, [reset])

    return (
        <Paper sx={{ overflow: 'auto', border: 1, mb: 1 }}>
            {AddBillFlg === 1 ? <BillAddMaster setBillFlg={setBillFlg}
            /> : null}
            {imageshowFlag === 1 ? <ImageDisplayModal open={imageshow} handleClose={handleClose}
                images={imagearray} /> : null}
            <Box sx={{
                display: 'flex', flexDirection: 'column', flexWrap: 'wrap',
            }} >

                <Box sx={{
                    display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                }} >

                    <Box sx={{ display: 'flex', width: '10%', p: 0.5, flexDirection: 'column' }} >
                        <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Bill No</Typography>
                        <Box>
                            <TextFieldCustom
                                type="text"
                                size="sm"
                                name="billNo"
                                value={billNo}
                                disabled={true}
                            ></TextFieldCustom>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', width: '10%', p: 0.5, flexDirection: 'column' }} >
                        <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Bill Date</Typography>
                        <Box>
                            <TextFieldCustom
                                type="date"
                                size="sm"
                                name="billdate"
                                value={billdate}
                                disabled={true}
                            ></TextFieldCustom>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', width: '10%', p: 0.5, flexDirection: 'column' }} >
                        <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Bill Amount</Typography>
                        <Box>
                            <TextFieldCustom
                                type="text"
                                size="sm"
                                name="billAmount"
                                value={billAmount}
                                disabled={true}
                            ></TextFieldCustom>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', width: '40%', p: 0.5, flexDirection: 'column' }} >
                        <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Vendor </Typography>
                        <Box>
                            <TextFieldCustom
                                type="text"
                                size="sm"
                                name="vendor"
                                value={vendor}
                                disabled={true}
                            ></TextFieldCustom>
                        </Box>
                    </Box>
                    {
                        billImage === 1 ?
                            <Box sx={{ display: 'flex', width: "30%", height: 55, pt: 3, pl: 1 }}>
                                <Button onClick={ViewBillImage} variant="contained"
                                    size="small" color="primary">View Image</Button>
                            </Box> : null
                    }
                </Box>
                <Box sx={{
                    display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                }} >
                    <Box sx={{
                        display: 'flex', width: '100%', flexDirection: 'row', flexWrap: 'wrap',
                    }} >

                        <Box sx={{ display: 'flex', width: '30%', p: 0.5, flexDirection: 'column' }} >
                            <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550, pl: 3 }} >Select Bill</Typography>
                            <Box>
                                <BillMastSelectComp
                                    AmcCmc={BillMast}
                                    setAmcCmc={setBillMast}
                                    AddBillFlg={AddBillFlg}
                                />
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', width: "25%", height: 50, pt: 3, pl: 3 }}>
                            <Button onClick={AddBillMaster} variant="contained"
                                size="small" color="primary">AddBill</Button>
                        </Box>

                    </Box>

                </Box>
                <Box sx={{
                    display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                }}>
                    <CustomeToolTip title="Save" placement="left" >
                        <Box sx={{ width: '3%', pl: 7, pt: 3, }}>
                            <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={SaveAMCPMDetails} >
                                <LibraryAddIcon fontSize='small' />
                            </CusIconButton>
                        </Box>
                    </CustomeToolTip>

                    <CustomeToolTip title="Refresh" placement="right" >
                        <Box sx={{ width: '3%', pl: 5, pt: 3, }}>
                            <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={AmcPmReferesh} >
                                <RefreshIcon fontSize='small' />
                            </CusIconButton>
                        </Box>
                    </CustomeToolTip>
                </Box>
            </Box>


        </Paper>
    )
}

export default memo(BillDetailAdd)