import { Box, Modal, ModalDialog, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';
import { Paper } from '@mui/material';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import { axioslogin } from 'src/views/Axios/Axios';

const FileViews = ({ fileModalOpen, fileData, setfileOpenFlag, setfileModalOpen }) => {

    const { condem_mast_slno, am_condem_detail_slno } = fileData

    const [filePaths, setFilePaths] = useState({});

    const fetchCondemFiles = useCallback(async () => {
        if (!condem_mast_slno || !am_condem_detail_slno) return;
        try {
            const { data } = await axioslogin.post("/AssetFileUpload/uploadFile/getCondemnation", {
                id: condem_mast_slno,
                detailId: am_condem_detail_slno
            });
            const { success, data: files } = data;
            const paths = (success === 1 && Array.isArray(files))
                ? files.map(fileName =>
                    `${PUBLIC_NAS_FOLDER}/AssetCondemDetails/${condem_mast_slno}/${am_condem_detail_slno}/${fileName}`
                )
                : [];

            setFilePaths({ [am_condem_detail_slno]: paths });
        } catch {
            setFilePaths({ [am_condem_detail_slno]: [] });
        } finally {
        }
    }, [condem_mast_slno, am_condem_detail_slno]);

    useEffect(() => {
        fetchCondemFiles();
    }, [fetchCondemFiles]);


    const CloseFile = useCallback(() => {
        setfileOpenFlag(0)
        setfileModalOpen(false)
    }, [setfileModalOpen, setfileOpenFlag])


    return (
        <Box>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={fileModalOpen}
            >
                < ModalDialog
                    sx={{
                        overflow: 'auto',
                        minWidth: '30vw',
                        minHeight: '15vw',
                        bgcolor: '#4C5270'
                    }}
                >
                    <Box sx={{ flex: 1, }}>
                        <Box sx={{ flex: 1, display: 'flex', }}>
                            <Typography sx={{ flex: 1, color: 'white', fontSize: 20, fontWeight: 600 }}>Files</Typography>
                            <Tooltip title="Close">
                                < HighlightOffSharpIcon sx={{
                                    cursor: 'pointer', color: 'white', height: 25, width: 25,
                                    '&:hover': {
                                        color: '#5C97B8',
                                    },
                                }}
                                    onClick={CloseFile}
                                />
                            </Tooltip>
                        </Box>
                        <Box sx={{ gap: 2, }}>

                            {/* {filePaths[am_condem_detail_slno]?.map((Url, index) => (
                                <Paper
                                    key={index}
                                    sx={{ bgcolor: '#EBEBE8', cursor: 'pointer', height: 800, width: 1000, mb: 0.5 }}
                                >
                                    <embed
                                        id={`pdf-embed-${index}`}
                                        src={Url}
                                        type="application/pdf"
                                        height={800}
                                        width="100%"
                                    />
                                </Paper>
                            ))} */}
                            {filePaths[am_condem_detail_slno]?.map((Url, index) => {
                                const isPdf = Url.toLowerCase().endsWith('.pdf');

                                return (
                                    <Paper
                                        key={index}
                                        sx={{
                                            bgcolor: '#EBEBE8',
                                            cursor: 'pointer',
                                            height: 800,
                                            width: 1000,
                                            mb: 0.5,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        {isPdf ? (
                                            <embed
                                                id={`pdf-embed-${index}`}
                                                src={Url}
                                                type="application/pdf"
                                                height="100%"
                                                width="100%"
                                            />
                                        ) : (
                                            <img
                                                src={Url}
                                                alt={`File ${index}`}
                                                style={{
                                                    maxWidth: '100%',
                                                    maxHeight: '100%',
                                                    objectFit: 'contain'
                                                }}
                                            />

                                        )}
                                    </Paper>
                                );
                            })}

                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', }}>
                            <Box sx={{
                                m: .5, borderRadius: 5, width: 134, py: .5, fontSize: 18, bgcolor: '#151B25', color: 'white', cursor: 'pointer',
                                textAlign: 'center',
                                '&:hover': {
                                    bgcolor: '#444444',
                                    color: 'white'
                                },
                            }}
                                onClick={CloseFile}>
                                cancel
                            </Box>
                        </Box>
                    </Box>
                </ModalDialog>
            </Modal>
        </Box >
    )
}


export default memo(FileViews)