import { Box } from '@mui/joy'
import React, { useCallback, useEffect, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'
import { axioslogin } from 'src/views/Axios/Axios'
import TextComponent from 'src/views/Components/TextComponent'
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import FileView from '../../AssetFileView/FileView'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static'
import { warningNotify } from 'src/views/Common/CommonCode'
import { format } from 'date-fns'

const AmcCmcDetails = ({ AssetDetails }) => {

    const { am_item_map_slno } = AssetDetails
    const [amccmcDetailList, setamccmcDetailList] = useState([])
    const [imagearray, setImageArry] = useState([])
    const [imageshow, setImageShow] = useState(false)
    const [imageshowFlag, setImageShowFlag] = useState(0)

    useEffect(() => {
        const getServiceList = async (am_item_map_slno) => {
            const result = await axioslogin.get(`/ItemMapDetails/AmcCmcDetailList/${am_item_map_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                setamccmcDetailList(data)
            }
            else {
                setamccmcDetailList([])
            }
        }
        if (am_item_map_slno !== null || am_item_map_slno !== undefined) {
            getServiceList(am_item_map_slno)
        } else {
            setamccmcDetailList([])
        }
    }, [am_item_map_slno])

    const ViewAmcCmcAttachments = useCallback((val) => {
        const { amccmc_slno } = val
        const getImage = async (amccmc_slno) => {
            const result = await axioslogin.get(`/AssetFileUpload/AmcCmcImageView/${amccmc_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const fileNames = data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/Asset/AMCCMC/${amccmc_slno}/${fileName}`;
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
        getImage(amccmc_slno)
    }, [])
    const handleClose = useCallback(() => {
        setImageShowFlag(0)
        setImageShow(false)
    }, [])

    return (
        <Box sx={{ border: 1, borderColor: '#E0E1E3', py: 1.5, px: 2, mt: .5 }}>

            {imageshowFlag === 1 ? <FileView open={imageshow} handleClose={handleClose}
                images={imagearray} /> : null}
            <TextComponent
                text={"AMC/CMC DETAILS LIST"}
                sx={{
                    flex: 1,
                    fontWeight: 500,
                    color: 'black',
                    fontSize: 15,
                }}
            />

            <Box sx={{ flex: 1, pr: 1, pt: 1 }}>
                {amccmcDetailList.length === 0 ?
                    <Box sx={{ height: 160, fontSize: 24, fontWeight: 600, color: 'lightgrey', textAlign: 'center', pt: 5, }}>
                        Empty AMC/CMC Details
                    </Box>
                    :
                    <>
                        <Box sx={{ flex: 1, display: 'flex', borderTop: 1, borderBottom: 1, borderColor: 'lightgrey', pl: 1, py: .5, }}>
                            <Box sx={{ flex: .1, }}>
                                #
                            </Box>
                            <Box sx={{ flex: .3, }}>
                                Files
                            </Box>
                            <Box sx={{ flex: .3, }}>
                                AMC/CMC
                            </Box>
                            <Box sx={{ flex: 1, }}>
                                Supplier
                            </Box>
                            <Box sx={{ flex: .4, }}>
                                From Date
                            </Box>
                            <Box sx={{ flex: .4, }}>
                                To Date
                            </Box>

                            <Box sx={{ flex: .3, }}>
                                Status
                            </Box>
                        </Box>
                        <Virtuoso
                            style={{ height: '35vh' }}
                            totalCount={amccmcDetailList?.length}
                            itemContent={(index) => {
                                const sortedList = [...amccmcDetailList].sort((a, b) => (b.status === 1 ? 1 : 0) - (a.status === 1 ? 1 : 0));
                                const val = sortedList[index];

                                return (
                                    <Box key={index} sx={{ flex: 1, display: 'flex', borderBottom: 1, borderColor: 'lightgrey', pl: 1, py: .6 }}>
                                        <Box sx={{ flex: .1, fontWeight: 600 }}>
                                            {index + 1}
                                        </Box>
                                        <Box sx={{ flex: .3, fontWeight: 600, display: 'flex' }}>
                                            {val.image_upload === 1 ? (
                                                <FilePresentRoundedIcon sx={{ color: '#41729F', cursor: 'pointer' }} onClick={() => ViewAmcCmcAttachments(val)} />
                                            ) : (
                                                <FilePresentRoundedIcon sx={{ color: 'grey', cursor: 'pointer' }} />
                                            )}
                                        </Box>
                                        <Box sx={{ flex: .3, fontWeight: 600 }}>
                                            {val.master_amc_status === 1 ? "AMC" : val.master_cmc_status === 1 ? "CMC" : "Not Updated"}
                                        </Box>
                                        <Box sx={{ flex: 1, fontWeight: 600 }}>
                                            {val.it_supplier_name}
                                        </Box>
                                        <Box sx={{ flex: .4, fontWeight: 600 }}>
                                            {val.from_date ? format(new Date(val.from_date), 'dd MMM yyyy') : ''}
                                        </Box>
                                        <Box sx={{ flex: .4, fontWeight: 600 }}>
                                            {val.to_date ? format(new Date(val.to_date), 'dd MMM yyyy') : ''}
                                        </Box>
                                        <Box
                                            sx={{
                                                flex: 0.3,
                                                fontWeight: 600,
                                                color: val.status === 1 ? 'darkgreen' : val.status === 0 ? '#523A28' : 'black'
                                            }}
                                        >
                                            {val.status === 1 ? "Active *" : val.status === 2 ? "Inactive" : val.status === 0 ? "Expired" : "NotUpdated"}
                                        </Box>
                                    </Box>
                                );
                            }}
                        />
                    </>}
            </Box>
        </Box>
    )
}

export default AmcCmcDetails