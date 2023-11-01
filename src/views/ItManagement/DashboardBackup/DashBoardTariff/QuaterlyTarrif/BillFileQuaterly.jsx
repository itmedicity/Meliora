import React, { Fragment, memo } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Box } from '@mui/joy';
import CloseIcon from '@mui/icons-material/Close';


const BillFileQuaterly = ({ open, handleClose, imageUrls }) => {

    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="lg"
            >
                <DialogContent sx={{
                    width: "100%",
                    height: '60%',
                }}><Box sx={{ display: 'flex' }}>
                        <Box sx={{
                            flex: 1,
                            fontWeight: 'bold',
                            height: '50px',
                            color: '#0074B7',
                            fontSize: 20

                        }}>
                            Bill View
                        </Box>
                        <Box sx={{


                            marginLeft: 'auto',



                        }}>
                            <CloseIcon sx={{ fontSize: 30, color: '#0074B7', cursor: 'pointer' }} onClick={handleClose} />
                        </Box>
                    </Box>
                    <Box sx={{ mt: 1, gap: 5 }}>
                        {imageUrls.map((imageUrl, index) => (

                            < img alt="quaterly bill"

                                key={index}
                                src={imageUrl}
                                height={820}
                                style={{ maxWidth: '100%', maxHeight: '100%', margin: '6px', }}
                            />
                        ))
                        }
                    </Box>
                    <DialogActions>
                        <Button
                            sx={{ color: "#0074B7", fontWeight: 'bold' }}
                            onClick={handleClose}
                        >Cancel</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </Fragment >
    )
}


export default memo(BillFileQuaterly)