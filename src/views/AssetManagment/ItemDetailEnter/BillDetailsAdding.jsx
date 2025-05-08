
import React, { memo, useCallback, useState, useMemo, useEffect } from 'react'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusIconButton from '../../Components/CusIconButton';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import RefreshIcon from '@mui/icons-material/Refresh';
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import { format } from 'date-fns'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import SupplierSelectMaster from './SupplierSelectMaster';
import { useDispatch } from 'react-redux'
import { getSupplierList } from 'src/redux/actions/AmSupplierListSelect'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import BillAddMaster from './BillAddMaster';
import BillAddingModal from './BillAddingModal';
import { Box } from '@mui/joy';
import TextComponent from 'src/views/Components/TextComponent';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import CloseIcon from '@mui/icons-material/Close';
import FileView from '../AssetFileView/FileView';
import LinkSharpIcon from '@mui/icons-material/LinkSharp';

const BillDetailsAdding = ({ detailArry, grndetailarry, assetSpare, count, setCount }) => {
    const { am_item_map_slno, am_spare_item_map_slno, } = detailArry
    const { am_bill_mast_slno, am_bill_mastslno, am_bill_no, am_bill_date, am_bill_amount, am_bill_image,
        bill_supplier_name } = grndetailarry

    const dispatch = useDispatch();
    const [supplier, setSupplier] = useState(0)
    const [billDate, setBillDate] = useState(format(new Date(), "yyyy-MM-dd"))
    const [billAmount, setBillAmount] = useState(am_bill_amount !== null ? am_bill_amount : 0)
    const [BillDtl, setBillDetail] = useState({
        billNo: '',
        billdate: format(new Date(), "yyyy-MM-dd"),
        vendor: '',
        billImage: '',
        bill_mastslno: ''
    })
    //Destructuring
    const { billNo, billdate, vendor, billImage, bill_mastslno } = BillDtl

    const [imageshowFlag, setImageShowFlag] = useState(0)
    const [imagearray, setImageArry] = useState([])
    const [imageshow, setImageShow] = useState(false)
    const [AddBillFlg, setBillFlg] = useState(0)

    const updateBillAmount = useCallback((e) => {
        setBillAmount(e.target.value)
    }, [])

    const [SupplerModal, setSupplerModal] = useState(0)
    const [BillArray, setBillArray] = useState([])

    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    useEffect(() => {
        dispatch(getSupplierList())
    }, [dispatch])

    useEffect(() => {
        if (am_bill_mast_slno !== null && am_bill_mast_slno !== undefined) {
            const fromSetting = {
                billNo: am_bill_no,
                billdate: am_bill_date,
                vendor: bill_supplier_name,
                billImage: am_bill_image,
                bill_mastslno: am_bill_mastslno
            }
            setBillDetail(fromSetting)
            setBillAmount(am_bill_amount)
        }

    }, [am_bill_mast_slno, am_bill_no, am_bill_date, am_bill_amount, bill_supplier_name, am_bill_image,
        am_bill_mastslno])

    const updateBillDate = useCallback((e) => {
        setBillDate(e.target.value)
    }, [])

    const searchdata = useMemo(() => {
        return {
            am_bill_supplier: supplier,
            am_bill_date: billDate,
        }
    }, [billDate, supplier])


    const searchBillList = useCallback(() => {
        const gettingData = async (searchdata, am_bill_mast_slno) => {
            const result = await axioslogin.post('/ItemMapDetails/GetBillBySupplNDate', searchdata)
            const { success, data } = result.data
            if (success === 1) {
                setBillArray(data);
                setSupplerModal(1)
            } else {
                warningNotify("No Bill Added in selected conditions")
                setBillArray([])
                setSupplerModal(2)
                if (am_bill_mast_slno === null || am_bill_mast_slno === undefined) {

                    const resetdata = {
                        billNo: '',
                        billdate: format(new Date(), "yyyy-MM-dd"),
                        vendor: '',
                        billImage: '',
                        bill_mastslno: ''
                    }
                    setBillDetail(resetdata)
                }
            }
        }
        if (supplier === 0) {
            warningNotify("Please Select supplier before search")
        } else {
            gettingData(searchdata, am_bill_mast_slno)
        }

    }, [searchdata, am_bill_mast_slno, supplier])

    const AddBillMaster = useCallback(() => {
        setBillFlg(1)
    }, [])

    const rowSelect = useCallback((value) => {
        const { am_bill_date, am_bill_image, am_bill_mastslno, am_bill_no, it_supplier_name
        } = value

        const fromdataset = {
            billNo: am_bill_no,
            billdate: format(new Date(am_bill_date), "yyyy-MM-dd"),
            vendor: it_supplier_name,
            billImage: am_bill_image,
            bill_mastslno: am_bill_mastslno
        }
        setBillDetail(fromdataset)
    }, [])


    const ViewBillImage = useCallback(() => {
        const getImage = async (bill_mastslno) => {
            const result = await axioslogin.get(`/AssetFileUpload/BillMasterImageView/${bill_mastslno}`)
            const { success, data } = result.data
            if (success === 1) {
                const fileNames = data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/Asset/BillMaster/${bill_mastslno}/${fileName}`;
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
        getImage(bill_mastslno)
    }, [bill_mastslno])

    const handleClose = useCallback(() => {
        setImageShowFlag(0)
        setImageShow(false)
    }, [])

    const billpatchData = useMemo(() => {
        return {
            am_bill_mast_slno: bill_mastslno,
            am_bill_amount: billAmount,
            edit_user: id,
            am_item_map_slno: am_item_map_slno
        }
    }, [bill_mastslno, billAmount, id, am_item_map_slno])


    const billpatchDataSpare = useMemo(() => {
        return {
            am_bill_mast_slno: bill_mastslno,
            am_bill_amount: billAmount,
            edit_user: id,
            am_spare_item_map_slno: am_spare_item_map_slno
        }
    }, [bill_mastslno, billAmount, id, am_spare_item_map_slno])

    const SaveBillDetails = useCallback((e) => {
        e.preventDefault()
       

        const updateBillDetails = async (billpatchData) => {
            const result = await axioslogin.patch('/ItemMapDetails/BillDetailsUpdate', billpatchData);
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message)
                setBillArray([]);
                setSupplerModal(0)
                setBillLink(0)
                setCount(count + 1)
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
                setBillArray([]);
                setSupplerModal(0)
                setBillLink(0)
                setCount(count + 1)
            }
            else {
                warningNotify(message)
            }
        }

        if(billAmount === 0){
            infoNotify(`Enter ${assetSpare === 1 ? "Asset Value" : "Spare Value"}`);
        }else{
        if (bill_mastslno === '') {
            warningNotify("Please Select Any Bill before save")
        } else {
            if (assetSpare === 1) {
                updateBillDetails(billpatchData)
            } else {
                updateBillDetailsSpare(billpatchDataSpare)
            }
        }
    }
    }, [billpatchData, assetSpare, billpatchDataSpare, bill_mastslno, setCount, count,billAmount])

    const BillReferesh = useCallback(() => {
        const resetfrm = {
            billNo: '',
            billdate: format(new Date(), "yyyy-MM-dd"),
            vendor: '',
            billImage: '',
            bill_mastslno: ''
        }
        setBillDetail(resetfrm)
    }, [])

    const [billLink, setBillLink] = useState(0)

    const linkBill = useCallback(() => {
        setBillLink(1)
    }, [])
    const CloseLink = useCallback(() => {
        setBillLink(0)
    }, [])

    return (
        <Box sx={{ overflow: 'auto', }}>
            {AddBillFlg === 1 ? <BillAddMaster setBillFlg={setBillFlg}
            /> : null}
            {imageshowFlag === 1 ? <FileView open={imageshow} handleClose={handleClose}
                images={imagearray} /> : null}

            {billLink === 1 ?
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    mt: 1, mb: 2,
                }}>
                    <Box sx={{ width: 500 }}>
                        <Box sx={{ display: 'flex', pt: .5 }}>
                            <TextComponent
                                text={"Supplier"}
                                sx={{
                                    fontWeight: 600,
                                    color: '#727B8C',
                                    pt: 1,
                                    width: 120

                                }}
                            />
                            <Box sx={{ flex: 1 }}>
                                <SupplierSelectMaster
                                    supplier={supplier}
                                    setSupplier={setSupplier}
                                />
                            </Box>

                        </Box>
                        <Box sx={{ display: 'flex', pt: .5 }}>
                            <TextComponent
                                text={"Bill Date"}
                                sx={{
                                    fontWeight: 600,
                                    color: '#727B8C',
                                    width: 120
                                }}
                            />
                            <Box sx={{ flex: 1 }}>
                                <TextFieldCustom
                                    type="date"
                                    size="sm"
                                    name="billDate"
                                    value={billDate}
                                    onchange={updateBillDate}
                                ></TextFieldCustom>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', pt: .8 }}>
                            <Box sx={{ width: 120 }}></Box>
                            <Box sx={{ flex: 1, gap: .5, display: 'flex' }}>
                                <Box>
                                    <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={searchBillList} >
                                        <SearchOutlinedIcon fontSize='small' />
                                    </CusIconButton>
                                </Box>
                                <Box>
                                    <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={AddBillMaster} >
                                        <LinkSharpIcon fontSize='small' />
                                    </CusIconButton>
                                </Box>

                                <Box>
                                    <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={CloseLink} >
                                        <CloseIcon fontSize='small' />
                                    </CusIconButton>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ flex: 1, py: .5, px: 1 }}>
                        {SupplerModal === 1 ? <Box sx={{ flex: 1 }}>
                            <BillAddingModal BillArray={BillArray} rowSelect={rowSelect} />
                        </Box>
                            :
                            SupplerModal === 2 ?
                                <Box sx={{
                                    border: 1, borderColor: 'lightgrey', height: 120,
                                    overflow: 'auto',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }} >
                                    <Box>
                                        <TextComponent
                                            text={"No Bills Match"}
                                            sx={{
                                                flex: 1, fontSize: 32,
                                                fontWeight: 700,
                                                color: 'lightgrey',
                                                pt: 1

                                            }}
                                        />
                                        <Box
                                            sx={{
                                                // ml: 10,
                                                bgcolor: '#3D86D0',
                                                width: 120,
                                                textAlign: 'center',
                                                margin: 'auto',
                                                borderRadius: 4,
                                                color: 'white',
                                                fontWeight: 600,
                                                cursor: 'pointer',
                                                py: .3,
                                                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3), -2px -2px 4px rgba(255, 255, 255, 0.6)', // Outward shadow effect
                                                transform: 'translateZ(0)', // For smoother shadow rendering
                                                transition: 'transform 0.2s ease', // Smooth transition on hover
                                                '&:hover': {
                                                    boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.4), -3px -3px 6px rgba(255, 255, 255, 0.7)', // Increase shadow on hover
                                                }
                                            }}
                                            onClick={AddBillMaster}
                                        >
                                            Add New Bill
                                        </Box>
                                    </Box>
                                </Box> : null}

                    </Box>
                </Box> : null}
            <Box sx={{ flex: 1, display: 'flex' }} >
                <Box sx={{ width: 500 }}>
                    <Box sx={{ display: 'flex', }}>
                        <TextComponent
                            text={"Bill No"}
                            sx={{
                                fontWeight: 600,
                                color: '#727B8C',
                                pt: 1,
                                width: 120

                            }}
                        />
                        <Box sx={{ flex: 1 }}>
                            <TextFieldCustom
                                type="text"
                                size="sm"
                                name="billNo"
                                value={billNo}
                                disabled={true}
                            ></TextFieldCustom>
                        </Box>

                    </Box>
                    <Box sx={{ display: 'flex', pt: .5 }}>
                        <TextComponent
                            text={"Bill Date"}
                            sx={{
                                fontWeight: 600,
                                color: '#727B8C',
                                pt: 1,
                                width: 120

                            }}
                        />
                        <Box sx={{ flex: 1 }}>
                            <TextFieldCustom
                                type="date"
                                size="sm"
                                name="billdate"
                                value={billdate}
                                disabled={true}
                            ></TextFieldCustom>
                        </Box>

                    </Box>
                    <Box sx={{ display: 'flex', pt: .5 }}>
                        <TextComponent
                            text={"Vendor"}
                            sx={{
                                fontWeight: 600,
                                color: '#727B8C',
                                pt: 1,
                                width: 120

                            }}
                        />
                        <Box sx={{ flex: 1 }}>
                            <TextFieldCustom
                                type="text"
                                size="sm"
                                name="vendor"
                                value={vendor}
                                disabled={true}
                            ></TextFieldCustom>
                        </Box>

                    </Box>
                    <Box sx={{ display: 'flex', pt: .5 }}>
                        <TextComponent
                            text={assetSpare === 1 ? "Asset Value" : "Spare Value"}
                            sx={{
                                fontWeight: 600,
                                color: '#727B8C',
                                pt: 1,
                                width: 120
                            }}
                        />
                        <Box sx={{ flex: 1 }}>
                            <TextFieldCustom
                                type="number"
                                size="sm"
                                name="billAmount"
                                value={billAmount}
                                onchange={updateBillAmount}
                            ></TextFieldCustom>
                        </Box>

                    </Box>
                    <Box sx={{ display: 'flex', }}>
                        <Box sx={{ width: 120 }}>
                        </Box>
                        <Box sx={{ flex: 1, my: .5 }}>
                            {
                                billImage === 1 ?
                                    <Box
                                        sx={{
                                            bgcolor: '#7AB75E',
                                            width: 120,
                                            textAlign: 'center',
                                            // margin: 'auto',
                                            borderRadius: 4,
                                            color: 'white',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            py: .3,
                                            boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3), -2px -2px 4px rgba(255, 255, 255, 0.6)',
                                            transform: 'translateZ(0)',
                                            transition: 'transform 0.2s ease',
                                            '&:hover': {
                                                boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.4), -3px -3px 6px rgba(255, 255, 255, 0.7)',
                                            }
                                        }}
                                        onClick={ViewBillImage}
                                    >
                                        Attached Bill
                                    </Box>
                                    : null
                            }
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', }}>
                        <Box sx={{ width: 120, }}>
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', gap: .5 }}>
                            <Box>
                                <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={SaveBillDetails} >
                                    <LibraryAddIcon fontSize='small' />
                                </CusIconButton>
                            </Box>
                            <Box >
                                <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={BillReferesh} >
                                    <RefreshIcon fontSize='small' />
                                </CusIconButton>
                            </Box>
                            <Box>
                                <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={linkBill}>
                                    <InsertLinkIcon fontSize='small' />
                                </CusIconButton>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                </Box>
            </Box>
        </Box >
    )
}

export default memo(BillDetailsAdding)
