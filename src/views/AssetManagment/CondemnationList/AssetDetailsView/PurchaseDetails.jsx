import React, { memo, useCallback, useState } from 'react'
import TextComponent from 'src/views/Components/TextComponent'
import { Box, Input } from '@mui/joy'
import { format } from 'date-fns'
import FileView from '../../AssetFileView/FileView'
import { axioslogin } from 'src/views/Axios/Axios'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static'
import { warningNotify } from 'src/views/Common/CommonCode'

const PurchaseDetails = ({ AssetDetails }) => {

    const { asset_am_grn_date, asset_am_grn_no, spare_am_grn_no, spare_am_grn_date, asset_am_bill_no, spare_am_bill_no, asset_am_bill_date, spare_am_bill_date,
        asset_supplier_name, spare_supplier_name, asset_bill_amount, spare_bill_amount, asset_am_bill_mast_slno, spare_am_bill_mast_slno, asset_am_bill_image,
        spare_am_bill_image
    } = AssetDetails

    const billNo = spare_am_bill_mast_slno !== null ? spare_am_bill_mast_slno : asset_am_bill_mast_slno
    const billStat = asset_am_bill_image !== null ? asset_am_bill_image : spare_am_bill_image

    const [imageshowFlag, setImageShowFlag] = useState(0)
    const [imagearray, setImageArry] = useState([])
    const [imageshow, setImageShow] = useState(false)

    const formattedDate =
        asset_am_grn_date || spare_am_grn_date
            ? format(new Date(asset_am_grn_date || spare_am_grn_date), 'dd-MMM-yyyy')
            : '';
    const formatedBillDate =
        asset_am_bill_date || spare_am_bill_date
            ? format(new Date(asset_am_bill_date || spare_am_bill_date), 'dd-MMM-yyyy')
            : '';

    const ViewBillImage = useCallback(() => {
        const getImage = async (billNo) => {
            const result = await axioslogin.get(`/AssetFileUpload/BillMasterImageView/${billNo}`)
            const { success, data } = result.data
            if (success === 1) {
                const fileNames = data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/Asset/BillMaster/${billNo}/${fileName}`;
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
        getImage(billNo)
    }, [billNo])

    const handleClose = useCallback(() => {
        setImageShowFlag(0)
        setImageShow(false)
    }, [])
    return (
        <Box>
            {imageshowFlag === 1 ? <FileView open={imageshow} handleClose={handleClose}
                images={imagearray} /> : null}
            <Box sx={{ border: 1, borderColor: '#E0E1E3', py: 1, pl: 2 }}>
                <TextComponent
                    text={"GRN DETAILS"}
                    sx={{
                        flex: 1,
                        fontWeight: 500,
                        color: 'black',
                        fontSize: 15,
                    }}
                />

                <Box sx={{ flex: 1, display: 'flex' }} >
                    <Box sx={{ width: 500 }}>
                        <Box sx={{ display: 'flex', pt: .5 }}>
                            <TextComponent
                                text={"GRN No"}
                                sx={{
                                    fontWeight: 600,
                                    color: '#727B8C',
                                    pt: 1,
                                    width: 120

                                }}
                            />
                            <Box sx={{ flex: 1 }}>
                                <Input
                                    type="text"
                                    size="sm"
                                    name="asset_am_grn_no"
                                    value={asset_am_grn_no || spare_am_grn_no || ''}
                                    readOnly

                                />
                            </Box>

                        </Box>
                        <Box sx={{ display: 'flex', pt: .5 }}>
                            <TextComponent
                                text={"GRN date"}
                                sx={{
                                    fontWeight: 600,
                                    color: '#727B8C',
                                    pt: 1,
                                    width: 120

                                }}
                            />
                            <Box sx={{ flex: 1 }}>
                                <Input
                                    type="text"
                                    size="sm"
                                    name="asset_am_grn_date"
                                    value={formattedDate || ''}
                                    readOnly

                                />
                            </Box>

                        </Box>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ border: 1, borderColor: '#E0E1E3', py: 1, pl: 2, mt: .5 }}>
                <TextComponent
                    text={"BILL DETAILS"}
                    sx={{
                        flex: 1,
                        fontWeight: 500,
                        color: 'black',
                        fontSize: 15,
                    }}
                />
                <Box sx={{ flex: 1, display: 'flex' }} >
                    <Box sx={{ width: 500 }}>
                        <Box sx={{ display: 'flex', pt: .5 }}>
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
                                <Input
                                    type="text"
                                    size="sm"
                                    name="asset_am_bill_no"
                                    value={asset_am_bill_no || spare_am_bill_no || ''}
                                    readOnly

                                />
                            </Box>

                        </Box>
                        <Box sx={{ display: 'flex', pt: .5 }}>
                            <TextComponent
                                text={"Bill date"}
                                sx={{
                                    fontWeight: 600,
                                    color: '#727B8C',
                                    pt: 1,
                                    width: 120

                                }}
                            />
                            <Box sx={{ flex: 1 }}>
                                <Input
                                    type="text"
                                    size="sm"
                                    name="asset_am_bill_date"
                                    value={formatedBillDate || ''}
                                    readOnly

                                />
                            </Box>

                        </Box>
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
                                <Input
                                    type="text"
                                    size="sm"
                                    name="asset_supplier_name"
                                    value={asset_supplier_name || spare_supplier_name || ''}
                                    readOnly

                                />
                            </Box>

                        </Box>
                        <Box sx={{ display: 'flex', pt: .5 }}>
                            <TextComponent
                                text={"Item Value"}
                                sx={{
                                    fontWeight: 600,
                                    color: '#727B8C',
                                    pt: 1,
                                    width: 120

                                }}
                            />
                            <Box sx={{ flex: 1 }}>
                                <Input
                                    type="text"
                                    size="sm"
                                    name="asset_supplier_name"
                                    value={asset_bill_amount || spare_bill_amount || ''}
                                    readOnly

                                />
                            </Box>

                        </Box>
                        <Box sx={{ display: 'flex', pt: .5 }}>
                            <Box sx={{ width: 120 }}></Box>
                            <Box sx={{ flex: 1 }}>
                                {
                                    billStat === 1 ?
                                        <Box
                                            sx={{
                                                bgcolor: '#7AB75E',
                                                width: 120,
                                                textAlign: 'center',
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

                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default memo(PurchaseDetails)