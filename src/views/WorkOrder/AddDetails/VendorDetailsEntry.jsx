
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Card, Typography, Input, Divider, Button } from '@mui/joy'
import BusinessIcon from '@mui/icons-material/Business'
import DescriptionIcon from '@mui/icons-material/Description'
import { useDispatch, useSelector } from 'react-redux'
import SelectVendorNames from './SelectVendorNames'
import { updateVendorDetails } from '../../../redux/actions/Workorder.action'
import TextComponent from 'src/views/Components/TextComponent'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusIconButton from 'src/views/Components/CusIconButton'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import CloseIcon from '@mui/icons-material/Close'
import { axiosellider, axioslogin } from 'src/views/Axios/Axios'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { getSupplierList } from 'src/redux/actions/AmSupplierListSelect'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import BillSupplerListOracleModal from './WorkOrderModals/BillSupplerListOracleModal '
import PersonIcon from "@mui/icons-material/Person"
import PhoneIcon from "@mui/icons-material/Phone"
import EmailIcon from "@mui/icons-material/Email"
import SelectDepartmentSection from 'src/views/IncidentManagement/Components/SelectDepartmentSection'

const VendorDetailsEntry = ({ last_wo_slno, SelectedData, localdata }) => {
    const { vendorDetails } = localdata ?? {};


    // console.log({
    //     vendorDetails
    // });

    const dispatch = useDispatch()

    const [suppName, setSupName] = useState('')
    const [OracleList, setOracleList] = useState([])
    const [OracleListFlag, setOracleListFlag] = useState(0)
    const [open, setOpen] = useState(false)

    const updateSuppName = useCallback(e => {
        setSupName(e.target.value.toUpperCase())
    }, [])

    const vendorDatas = useSelector((state) => state?.getworkOrderReducer?.vendorDetails)

    const vendorData = useMemo(() => vendorDatas, [vendorDatas])

    const { vendor_slno, wod, sup_name, sup_first_mob, sup_second_mob, sup_email_one, sup_email_two, req_date, sec_id } = vendorData ?? vendorDetails

    const { crfNo } = SelectedData;

    const labelStyle = { fontWeight: 600, mb: 0.5 }
    const inputStyle = { borderRadius: 'lg' }

    const searchdata = useMemo(() => {
        return {
            SUC_NAME: suppName
        }
    }, [suppName])

    const SearchSupplOrcle = useCallback(() => {
        const gettingOrcleData = async searchdata => {
            const result = await axiosellider.post('/supplierList/supplier', searchdata)
            const { success, data } = result.data
            if (success === 1) {
                setOracleList(data)
                setOracleListFlag(1)
            } else {
                warningNotify('No supplier found')
                setOracleList([])
                setOracleListFlag(0)
            }
        }
        gettingOrcleData(searchdata)
    }, [searchdata])

    const CloseOracleSearch = useCallback(() => {
        setOpen(false)
        setOracleListFlag(0)
    }, [setOpen])


    const SuppAddMeliora = useCallback(
        val => {
            const { SUC_NAME, SUC_PHONE, SUC_MOBILE, SUC_EMAIL, SUC_PERSON1, SUC_PERSON2 } = val
            const postdata = {
                it_supplier_name: SUC_NAME,
                it_supplier_land_one: parseInt(SUC_PHONE),
                it_supplier_mob_one: parseInt(SUC_MOBILE),
                it_supplier_email_one: SUC_EMAIL,
                it_supplier_escl_mob_one: parseInt(SUC_PERSON2),
                it_supplier_escl_land_one: parseInt(SUC_PERSON1),
                supplier_status: 1
            }
            const InsertSupplierInMeli = async postdata => {
                const result = await axioslogin.post('/ItemMapDetails/SupplierAdding', postdata)
                const { message, success } = result.data
                if (success === 1) {
                    succesNotify(message)
                    setOracleList([])
                    setOracleListFlag(0)
                    dispatch(getSupplierList())
                    setSupName('')
                    setOpen(false)
                } else {
                    warningNotify(message)
                }
            }
            InsertSupplierInMeli(postdata)
        },
        [dispatch]
    )

    const searchBillList = useCallback(() => {
        setOpen(true)
    }, [])


    useEffect(() => {
        if (SelectedData) {
            dispatch(
                updateVendorDetails({
                    req_date: SelectedData.req_date,
                    sec_id: SelectedData.request_deptsec_slno, // must be full object
                })
            );
        }
    }, [SelectedData, dispatch]);



    return (
        <Box
            sx={{
                p: 0,
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1.2fr' },
                gap: 2
            }}
        >
            {/* LEFT – Vendor Details */}
            <Card
                sx={{
                    height: 442,
                    borderRadius: '2xl',
                    p: 2,
                    background:
                        'linear-gradient(180deg,#ffffff,#f1f5ff)',
                    color: '#fff',
                    boxShadow: 'xl'
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <BusinessIcon />
                    <Typography level="h4" fontWeight={800}>
                        Vendor Details
                    </Typography>
                </Box>

                <Divider sx={{ mb: 0, borderColor: 'rgba(255,255,255,0.3)' }} />

                <Typography level="body-sm" sx={labelStyle}>
                    Vendor Name
                </Typography>

                <SelectVendorNames
                    value={vendor_slno}
                    onChange={(vendor) =>
                        dispatch(
                            updateVendorDetails({
                                vendor_slno: vendor.it_supplier_slno,
                                sup_name: vendor.it_supplier_name,
                                sup_first_mob: vendor.it_supplier_mob_one,
                                sup_second_mob: vendor.it_supplier_mob_two,
                                sup_email_one: vendor.it_supplier_email_one,
                                sup_email_two: vendor.it_supplier_email_two
                            })
                        )
                    }
                />
                <Box sx={{ pt: 0 }}>
                    <Button
                        onClick={searchBillList}
                        variant="outlined"
                        color="neutral"
                        startDecorator={<SearchOutlinedIcon />}
                        sx={{
                            '--Button-gap': '8px',
                            width: '100%'
                        }}
                    >
                        Search Supplier From Ellider{' '}
                    </Button>
                </Box>


                {/* showing vendor details */}
                {open === false ? (<Box
                    sx={{
                        p: 2,
                        borderRadius: 5,
                        boxShadow: 3,
                        border: "1px solid #e0e0e0"
                    }}
                >

                    {/* Vendor Name */}
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <PersonIcon sx={{ color: "#6a1b9a", mr: 1 }} />
                        <Box>
                            <Typography sx={{ fontSize: 13, color: "gray" }}>
                                Supplier Name
                            </Typography>
                            <Typography sx={{ fontWeight: 500 }}>
                                {sup_name || "Not Available"}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Mobile Numbers */}
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <PhoneIcon sx={{ color: "#2e7d32", mr: 1 }} />
                        <Box>
                            <Typography sx={{ fontSize: 13, color: "gray" }}>
                                Mobile Numbers
                            </Typography>
                            <Typography>
                                {sup_first_mob || "-"} {sup_second_mob ? `, ${sup_second_mob}` : ""}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Emails */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <EmailIcon sx={{ color: "#ef6c00", mr: 1 }} />
                        <Box>
                            <Typography sx={{ fontSize: 13, color: "gray" }}>
                                Email Address
                            </Typography>
                            <Typography>
                                {sup_email_one?.toLowerCase() || "-"}
                            </Typography>

                            {sup_email_two && (
                                <Typography>
                                    {sup_email_two.toLowerCase()}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </Box>) : null}

                {open === true ?
                    <Box sx={{ mt: 0.5, mb: 1 }}>
                        <TextComponent
                            text={'Find Supplier From Oracle'}
                            sx={{
                                fontWeight: 600,
                                color: '#0B6BCB',
                                pt: 0.5,
                                pl: 0.3
                            }}
                        />
                        <Box sx={{ flex: 1, display: 'flex' }}>
                            <Box sx={{ flex: 1, pr: 0.5 }}>
                                <TextFieldCustom
                                    type="text"
                                    size="sm"
                                    name="suppName"
                                    value={suppName}
                                    onchange={updateSuppName}
                                    placeholder={'Enter Supplier'}
                                ></TextFieldCustom>
                            </Box>
                            <CusIconButton size="sm" variant="outlined" color="primary" clickable="true"
                                onClick={SearchSupplOrcle}
                            >
                                <ManageSearchIcon fontSize="small" />
                            </CusIconButton>
                            &nbsp;
                            <CusIconButton
                                size="sm"
                                variant="outlined"
                                color="primary"
                                clickable="true"
                                onClick={CloseOracleSearch}
                            >
                                <CloseIcon fontSize="small" />
                            </CusIconButton>
                        </Box>
                    </Box>
                    : null}
            </Card>
            {OracleListFlag === 1 ? (
                <Box
                    sx={{
                        flex: 1,
                        my: 1,
                        mx: 0.2
                    }}
                >
                    <BillSupplerListOracleModal
                        open={open}
                        onClose={() => setOpen(false)}
                        OracleList={OracleList}
                        SuppAddMeliora={SuppAddMeliora}
                    />
                </Box>
            ) : <Card
                sx={{
                    borderRadius: '2xl',
                    p: 2,
                    background:
                        'linear-gradient(180deg,#ffffff,#f1f5ff)',
                    boxShadow: 'xl',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DescriptionIcon sx={{ color: '#4338ca' }} />
                    <Typography level="h4" fontWeight={800}>
                        Work Order Information
                    </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                        gap: 2
                    }}
                >
                    <Box>
                        <Typography level="body-sm" sx={labelStyle}>
                            Work Order No
                        </Typography>
                        <Input
                            placeholder="WO-2026-001"
                            sx={inputStyle}
                            value={`WO-${String(last_wo_slno + 1).padStart(5, '0')}`}
                            disabled
                        />
                    </Box>

                    <Box>
                        <Typography level="body-sm" sx={labelStyle}>
                            Work Order Date
                        </Typography>
                        <Input
                            type="date"
                            value={wod || ''}
                            onChange={(e) =>
                                dispatch(
                                    updateVendorDetails({
                                        wod: e.target.value
                                    })
                                )
                            }
                            sx={inputStyle}
                        />
                    </Box>

                    <Box>
                        <Typography level="body-sm" sx={labelStyle}>
                            BOM Req No
                        </Typography>
                        <Input
                            value={crfNo || ''}
                            disabled
                            onChange={(cno) =>
                                dispatch(
                                    updateVendorDetails({
                                        crfNo: cno
                                    })
                                )
                            }
                            sx={{ inputStyle }}
                        />
                    </Box>

                    <Box>
                        <Typography level="body-sm" sx={labelStyle}>
                            BOM Req Date
                        </Typography>

                        <Input
                            type="date"
                            value={req_date || ""}
                            onChange={(e) =>
                                dispatch(
                                    updateVendorDetails({
                                        req_date: e.target.value
                                    })
                                )
                            }
                            sx={{ inputStyle }}
                        />
                    </Box>

                    <Box sx={{ gridColumn: 'span 2' }}>
                        <Typography level="body-sm" sx={labelStyle}>
                            Department
                        </Typography>
                        <SelectDepartmentSection
                            departmentsec={sec_id}
                            setDepartmentSec={(value) =>
                                dispatch(updateVendorDetails({ sec_id: value }))
                            }
                        />
                    </Box>
                </Box>
            </Card>}

        </Box>
    )
}

export default memo(VendorDetailsEntry)


