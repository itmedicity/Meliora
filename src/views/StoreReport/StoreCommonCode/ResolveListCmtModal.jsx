import React, { memo } from 'react'
import {
    Modal,
    ModalDialog,
    Box,
    Typography,
    Divider,
    Avatar,
    IconButton,
    Chip
} from '@mui/joy'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import WorkRoundedIcon from '@mui/icons-material/WorkRounded'

const ResolveListCmtModal = ({ openModal, setOpenModal, selecetdRow }) => {

    const handleClose = () => setOpenModal(false)

    const firstRow = Array.isArray(selecetdRow) && selecetdRow.length > 0
        ? selecetdRow[0]
        : null

    return (
        <Modal open={openModal} onClose={handleClose}>
            <ModalDialog
                sx={{
                    width: 700,
                    maxHeight: '90vh',
                    borderRadius: 5,
                    p: 0,
                    overflow: 'hidden',
                    boxShadow: 'xl',
                    bgcolor: '#F9FAFB'
                }}
            >
                {/* HEADER */}
                <Box
                    sx={{
                        px: 3,
                        py: 2,
                        background: '#9B7EBD',
                        color: 'white',
                        position: 'relative'
                    }}
                >
                    <Typography level="title-lg" fontWeight={700} color='white'>
                        💬 Comment Discussion
                    </Typography>

                    {firstRow && (
                        <Typography fontSize={13} sx={{ opacity: 0.9, color: 'white' }}>
                            {firstRow.cmt_item_name} • GRN No: {firstRow.cmt_grn_no}
                        </Typography>
                    )}

                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            borderRadius: 5,
                            bgcolor: 'white',
                            color: 'white',
                            // '&:hover': {
                            //     bgcolor: 'rgba(255,255,255,0.25)'
                            // }
                        }}
                    >
                        <CloseRoundedIcon />
                    </IconButton>
                </Box>

                {/* BODY */}
                <Box
                    sx={{
                        p: 3,
                        maxHeight: '70vh',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}
                >
                    {Array.isArray(selecetdRow) && selecetdRow.length > 0 ? (
                        selecetdRow.map((row, index) => {
                            const isAlt = index % 2 === 0

                            return row?.comment ? (
                                <Box
                                    key={row.cmt_slno}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: isAlt ? 'row' : 'row-reverse',
                                        gap: 1.5,
                                        alignItems: 'flex-start'
                                    }}
                                >
                                    {/* AVATAR */}
                                    {/* <Avatar
                                        sx={{
                                            bgcolor: isAlt ? '#3291B6' : '#9333EA',
                                            color: 'white'
                                        }}
                                    >
                                        <PersonRoundedIcon />
                                    </Avatar> */}

                                    <Avatar
                                        size="sm"
                                        sx={{
                                            mt: 0.5,
                                            bgcolor: isAlt ? "#3674B5" : "#4C7B8B",
                                            fontSize: 12,
                                            color: "white"
                                        }}
                                    >
                                        {row.em_name?.[0]?.toUpperCase() || "U"}
                                    </Avatar>



                                    {/* COMMENT CARD */}
                                    <Box
                                        sx={{
                                            flex: 1,
                                            p: 2,
                                            borderRadius: 4,
                                            background: 'rgba(255,255,255,0.85)',
                                            backdropFilter: 'blur(8px)',
                                            border: '1px solid #E5E7EB',
                                            boxShadow: 'sm',
                                            maxWidth: '85%'
                                        }}
                                    >
                                        {/* HEADER ROW */}
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                mb: 0.5
                                            }}
                                        >
                                            <Typography fontSize={13} fontWeight={600}>
                                                {row.em_name
                                                    ? row.em_name.charAt(0).toUpperCase() +
                                                    row.em_name.slice(1).toLowerCase()
                                                    : 'User'}
                                            </Typography>

                                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                                <AccessTimeRoundedIcon sx={{ fontSize: 14, color: '#6B7280' }} />
                                                <Typography fontSize={11} color="neutral">
                                                    {row.cmt_date}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        {/* ROLE CHIP */}
                                        {row.cmt_done_by && (
                                            <Chip
                                                size="sm"
                                                startDecorator={<WorkRoundedIcon />}
                                                sx={{
                                                    mb: 1,
                                                    bgcolor: '#EEF2FF',
                                                    color: '#1E3A8A',
                                                    fontSize: 11
                                                }}
                                            >
                                                {row.cmt_done_by.charAt(0).toUpperCase() +
                                                    row.cmt_done_by.slice(1).toLowerCase()}
                                            </Chip>
                                        )}

                                        {/* COMMENT */}
                                        <Typography
                                            fontSize={14}
                                            sx={{
                                                lineHeight: 1.6,
                                                whiteSpace: 'pre-wrap',
                                                color: '#111827'
                                            }}
                                        >
                                            {row.comment.charAt(0).toUpperCase() +
                                                row.comment.slice(1)}
                                        </Typography>
                                    </Box>
                                </Box>
                            ) : null
                        })
                    ) : (
                        <Box sx={{ textAlign: 'center', py: 6 }}>
                            <Typography level="body-sm" color="neutral">
                                No comments available
                            </Typography>
                        </Box>
                    )}
                </Box>

                <Divider />
            </ModalDialog>
        </Modal>
    )
}

export default memo(ResolveListCmtModal)




