import React, { memo, useEffect, useMemo, useState } from 'react'
import Modal from '@mui/joy/Modal';
import Sheet from '@mui/joy/Sheet';
import { CssVarsProvider } from '@mui/joy';
import { Box } from '@mui/material'
import Button from '@mui/joy/Button';
import { axioslogin } from 'src/views/Axios/Axios';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';


const DataCollectedImageDispy = ({ open, handleCloseCollect, dataCollSlno, req_slno }) => {

    const postdata = useMemo(() => {
        return {
            req_slno: req_slno,
            crf_data_collect_slno: dataCollSlno
        }
    }, [req_slno, dataCollSlno])



    const [disArry, setDissArry] = useState([])
    const [imagearray, setImageArry] = useState([])
    useEffect(() => {

        const getImage = async (postdata) => {
            const result = await axioslogin.post('/CrfImageUpload/crf/getDataCollectionImage', postdata)
            const { success, data } = result.data
            if (success === 1) {
                const fileNames = data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/datacollection/${dataCollSlno}/${fileName}`;
                });
                setImageArry(fileUrls);
            }
        }

        getImage(postdata)
    }, [postdata, dataCollSlno, req_slno])

    useEffect(() => {
        if (imagearray.length !== 0) {
            const disimage = imagearray.map((val) => {
                const parts = val.split('/');
                // console.log(parts);
                const fileNamePart = parts[parts.length - 1];
                const obj = {
                    imageName: fileNamePart,
                    url: val
                }
                return obj
            })
            setDissArry(disimage)
        }
    }, [imagearray])

    return (
        <CssVarsProvider>
            <Modal aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                sx={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', maxHeight: 700, }}>
                <Sheet
                    variant="outlined"
                    sx={{
                        minWidth: "50%", borderRadius: 'md', p: 3, boxShadow: 'lg', minHeight: 500,
                        maxWidth: 300, maxHeight: 700,
                    }}
                >
                    <Box sx={{
                        width: '100%', flex: 1, borderRadius: 1,
                        border: '0.1px solid #454545', minHeight: 500, margin: "auto",
                        height: window.innerHeight - 350, overflowX: "auto", '::-webkit-scrollbar': { display: "none" }
                    }}>
                        {disArry && disArry.map((value, index) => (
                            <Box key={index} sx={{ display: 'flex', flexDirection: "column" }}>

                                {
                                    value.imageName.endsWith('.pdf') ? (
                                        <embed
                                            src={value.url}
                                            type="application/pdf"
                                            height={820}
                                            width="100%"
                                        />) : (
                                        <img
                                            alt=''
                                            src={value.url}
                                            height={820}
                                            style={{ maxWidth: '100%', maxHeight: '100%' }}
                                        />
                                    )
                                }
                            </Box>
                        ))
                        }
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: "flex-end", }}>
                        <Button variant="outlined" color="secondary"
                            size="md" onClick={handleCloseCollect}>Cancel</Button>
                    </Box>
                </Sheet>
            </Modal>
        </CssVarsProvider >
    )
}

export default memo(DataCollectedImageDispy)