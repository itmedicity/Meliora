// import React, { Fragment, memo, } from 'react'
// import { Box, Paper, Typography } from '@mui/material'
// import { Virtuoso } from 'react-virtuoso'
// import { Button } from '@mui/joy'
// const MedicalRepTable = ({ GetRepData }) => {
//     console.log(GetRepData, "{GetRepData");

//     return (
//         <Fragment>
//             {/* {pendingPOList.length !== 0 ? ( */}
//             <>
//                 <Box
//                     sx={{
//                         pt: 0.4,
//                         flexWrap: 'wrap',
//                         maxHeight: window.innerHeight - 200,
//                         width: '100%',
//                         overflow: 'auto',
//                         '&::-webkit-scrollbar': { height: 8 },
//                     }}
//                 >
//                     <Paper sx={{ width: '100%' }}>
//                         {/* <Box display="flex" flexDirection="column" sx={{ width: '100%', bgcolor: 'yellow' }}> */}
//                         <Box
//                             display="flex"
//                             justifyContent="space-between"
//                             sx={{
//                                 bgcolor: '#e3f2fd',
//                                 flexWrap: 'nowrap',
//                                 py: 0.5,
//                                 position: 'sticky',
//                                 top: 0,
//                                 zIndex: 1,
//                                 px: 1,
//                                 borderBottom: '1px solid lightgrey',

//                             }}
//                         >
//                             <Typography sx={{ width: 50, textAlign: 'center', fontWeight: 550, fontSize: 12 }}>Sl.No</Typography>
//                             <Typography sx={{ width: 200, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Name</Typography>
//                             <Typography sx={{ width: 300, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Company</Typography>
//                             <Typography sx={{ width: 300, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Department</Typography>
//                             <Typography sx={{ width: 80, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Status</Typography>
//                             <Typography sx={{ width: 80, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Action</Typography>
//                             <Typography sx={{ width: 80, textAlign: 'left', fontWeight: 550, fontSize: 12 }}></Typography>

//                         </Box>
//                         <Virtuoso
//                             style={{ height: '73vh', width: '100%' }}
//                             data={GetRepData}
//                             itemContent={(index, val) => (
//                                 <React.Fragment key={val.slno}>
//                                     <Box
//                                         display="flex"
//                                         justifyContent="space-between"
//                                         sx={{ borderBottom: '1px solid lightgrey', flexWrap: 'nowrap' }}
//                                     >
//                                         <Typography sx={{ width: 50, textAlign: 'center', fontSize: 12, my: 1 }}>{index + 1}</Typography>
//                                         <Typography sx={{ width: 200, textAlign: 'left', fontSize: 12, my: 1 }}>{val.name}</Typography>
//                                         <Typography sx={{ width: 300, textAlign: 'left', fontSize: 12, my: 1 }}>{val.companyname}</Typography>
//                                         <Typography sx={{ width: 300, textAlign: 'left', fontSize: 12, my: 1 }}>{val.division} </Typography>
//                                         <Typography sx={{ width: 80, textAlign: 'left', fontSize: 12, my: 1, color: val.disablestatus === 'Active' ? 'green' : 'red', }}>{val.disablestatus} </Typography>
//                                         <Box sx={{ width: 80, }}>
//                                             <Button
//                                                 size="small"
//                                                 variant="outlined"
//                                                 sx={{
//                                                     width: 80,
//                                                     minWidth: 80,
//                                                     fontSize: 11,
//                                                     textTransform: 'none',
//                                                     color: val.status === 1 ? 'green' : 'red'

//                                                 }}
//                                             >
//                                                 {val.status === 1 ? 'Unblock' : 'Block'}
//                                             </Button>
//                                         </Box>
//                                         <Typography sx={{ width: 80, textAlign: 'left', fontSize: 12, my: 1 }}> </Typography>

//                                     </Box>

//                                 </React.Fragment>
//                             )}
//                         />
//                         {/* </Box> */}
//                     </Paper>
//                 </Box>
//             </>
//             {/* ) : null} */}
//         </Fragment>)
// }

// export default memo(MedicalRepTable)


import React, { Fragment, memo, useState } from 'react'
import {
    Paper
} from '@mui/material'
import { Virtuoso } from 'react-virtuoso'
import { Box, Button, DialogActions, DialogContent, DialogTitle, Modal, ModalDialog, Typography } from '@mui/joy'
import { useQueryClient } from '@tanstack/react-query'
import { postRepStatus } from 'src/api/CommonApiCRF'
import { succesNotify, errorNotify } from 'src/views/Common/CommonCode'

const MedicalRepTable = ({ GetRepData }) => {
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)

    const handleOpen = (row) => {
        setSelectedUser(row)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setSelectedUser(null)
    }

    const handleConfirm = async () => {
        if (!selectedUser) return

        const postData = {
            userId: selectedUser.userId,
            status: selectedUser.status === 1 ? 0 : 1
        }

        try {
            const result = await postRepStatus(postData)
            const { success, message } = result
            if (success === 1) {
                succesNotify(message || 'Status updated successfully')
                queryClient.invalidateQueries('getRepData')
            } else {
                errorNotify(message || 'Failed to update status')
            }
        } catch (error) {
            errorNotify('An error occurred while updating status')
            console.error(error)
        }

        handleClose()
    }

    return (
        <Fragment>
            <Box
                sx={{
                    pt: 0.4,
                    flexWrap: 'wrap',
                    maxHeight: window.innerHeight - 200,
                    width: '100%',
                    overflow: 'auto',
                    '&::-webkit-scrollbar': { height: 8 },
                }}
            >
                <Paper sx={{ width: '100%' }}>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        sx={{
                            bgcolor: '#e3f2fd',
                            flexWrap: 'nowrap',
                            py: 0.5,
                            position: 'sticky',
                            top: 0,
                            zIndex: 1,
                            px: 1,
                            borderBottom: '1px solid lightgrey',
                        }}
                    >
                        <Typography sx={{ width: 50, textAlign: 'center', fontWeight: 550, fontSize: 12 }}>
                            Sl.No
                        </Typography>

                        <Typography sx={{ width: 200, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>
                            Name
                        </Typography>

                        <Typography sx={{ width: 300, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>
                            Company
                        </Typography>

                        <Typography sx={{ width: 300, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>
                            Department
                        </Typography>
                        <Typography sx={{ width: 300, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>
                            PHONE NUMBER
                        </Typography>
                        <Typography sx={{ width: 80, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>
                            Status
                        </Typography>

                        <Typography sx={{ width: 80, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>
                            Action
                        </Typography>

                        <Typography sx={{ width: 80 }} />
                    </Box>

                    <Virtuoso
                        style={{ height: '73vh', width: '100%' }}
                        data={GetRepData}
                        itemContent={(index, val) => (
                            <Fragment key={val.medicalrep_id}>
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    sx={{
                                        borderBottom: '1px solid lightgrey',
                                        flexWrap: 'nowrap',
                                        px: 1
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            width: 50,
                                            textAlign: 'center',
                                            fontSize: 12,
                                            my: 1
                                        }}
                                    >
                                        {index + 1}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            width: 200,
                                            textAlign: 'left',
                                            fontSize: 12,
                                            my: 1
                                        }}
                                    >
                                        {val.name}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            width: 300,
                                            textAlign: 'left',
                                            fontSize: 12,
                                            my: 1
                                        }}
                                    >
                                        {val.companyname}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            width: 300,
                                            textAlign: 'left',
                                            fontSize: 12,
                                            my: 1
                                        }}
                                    >
                                        {val.division}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            width: 300,
                                            textAlign: 'left',
                                            fontSize: 12,
                                            my: 1
                                        }}
                                    >
                                        {val.contactno}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            width: 80,
                                            textAlign: 'left',
                                            fontSize: 12,
                                            my: 1,
                                            color:
                                                val.disablestatus === 'Active'
                                                    ? 'green'
                                                    : 'red',
                                        }}
                                    >
                                        {val.disablestatus}
                                    </Typography>

                                    <Box sx={{ width: 80 }}>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={() => handleOpen(val)}
                                            sx={{
                                                width: 80,
                                                minWidth: 80,
                                                fontSize: 11,
                                                textTransform: 'none',
                                                color:
                                                    val.status === 1
                                                        ? 'green'
                                                        : 'red'
                                            }}
                                        >
                                            {val.status === 1
                                                ? 'Unblock'
                                                : 'Block'}
                                        </Button>
                                    </Box>

                                    <Typography sx={{ width: 80 }} />
                                </Box>
                            </Fragment>
                        )}
                    />
                </Paper>
            </Box>

            {/* Confirmation Dialog */}

            <Modal open={open} onClose={handleClose}>
                <ModalDialog
                    variant="outlined"
                    role="alertdialog"
                    sx={{
                        width: 400,
                        borderRadius: 'md',
                        p: 2
                    }}
                >
                    <DialogTitle>
                        {selectedUser?.status === 1
                            ? 'Unblock User'
                            : 'Block User'}
                    </DialogTitle>

                    <DialogContent>
                        {selectedUser?.status === 1
                            ? 'Are you sure you want to unblock this user?'
                            : 'Are you sure you want to block this user?'}
                    </DialogContent>

                    <DialogActions sx={{ display: 'flex', justifyContent: 'flex-start' }}>

                        <Button
                            variant="outlined"
                            color="neutral"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="solid"
                            color={
                                selectedUser?.status === 1
                                    ? 'success'
                                    : 'danger'
                            }
                            onClick={handleConfirm}
                        >
                            {selectedUser?.status === 1
                                ? 'Yes, Unblock'
                                : 'Yes, Block'}
                        </Button>

                    </DialogActions>
                </ModalDialog>
            </Modal>
        </Fragment>
    )
}

export default memo(MedicalRepTable)