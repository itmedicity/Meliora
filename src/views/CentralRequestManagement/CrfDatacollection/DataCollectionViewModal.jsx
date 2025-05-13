import { Box, CssVarsProvider, Grid, Modal, ModalClose, ModalDialog } from '@mui/joy'
import React, { memo } from 'react'
import CrfReqDetailViewCmp from '../ComonComponent/CrfReqDetailViewCmp'
import ReqItemDisplay from '../ComonComponent/ReqItemDisplay'
import ApprovalItemView from './ApprovalItemView'
import ViewOreviousDataCollctnDetails from '../ComonComponent/DataCollectionComp/ViewOreviousDataCollctnDetails'
import PoAcknowComp from '../ComonComponent/PurchaseComp/PoAcknowComp'
import QuotationCallComp from '../ComonComponent/PurchaseComp/QuotationCallComp'
import QuotationNegoComp from '../ComonComponent/PurchaseComp/QuotationNegoComp'
import QuotationFinalComp from '../ComonComponent/PurchaseComp/QuotationFinalComp'

const DataCollectionViewModal = ({ open, handleClose, reqData, dtaEnterViewData, reqItems, approveTableData, flag,
    imagearray }) => {

    const { ack_status, quatation_calling_status, quatation_negotiation, quatation_fixing, } = reqData
    return (
        <CssVarsProvider>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={handleClose}
                sx={{ display: 'flex', justifyContent: 'center' }}
            >
                <ModalDialog variant="outlined">
                    <ModalClose
                        variant="outlined"
                        sx={{
                            m: 1,
                            top: 'calc(-1/4 * var(--IconButton-size))',
                            right: 'calc(-1/4 * var(--IconButton-size))',
                            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '50%',
                            bgcolor: 'background.body',
                            color: '#bf360c',
                            height: 35, width: 35
                        }}
                    />
                    <Box sx={{ minWidth: '65vw', minHeight: '62vh', maxHeight: '85vh', overflowY: 'auto', px: 0.5, }}>
                        <CrfReqDetailViewCmp ApprovalData={reqData} imagearray={imagearray} />
                        <Box sx={{ pt: 0.5 }}>
                            {reqItems.length !== 0 ?
                                <ReqItemDisplay reqItems={reqItems} />
                                : null
                            }
                        </Box>
                        <Box sx={{ mt: 0.5, flexWrap: 'wrap' }} >
                            <ApprovalItemView approveTableData={approveTableData} />
                            {dtaEnterViewData.length !== 0 ?
                                <ViewOreviousDataCollctnDetails datacolData={dtaEnterViewData} /> : null}
                        </Box>
                        {flag === 5 ?
                            <>
                                {ack_status === 1 ?
                                    <Box sx={{ flexWrap: 'wrap', mt: 0.5, mx: 0.2 }}>
                                        <Grid container spacing={0.5} sx={{ flexGrow: 1, }}>
                                            {ack_status === 1 ?
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                    <PoAcknowComp poData={reqData} />
                                                </Grid>
                                                : null
                                            }
                                            {quatation_calling_status === 1 ?
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                    <QuotationCallComp poData={reqData} />
                                                </Grid>
                                                : null
                                            }
                                            {quatation_negotiation === 1 ?
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                    <QuotationNegoComp poData={reqData} />
                                                </Grid>
                                                : null
                                            }
                                            {quatation_fixing === 1 ?
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pl: 0.5 }}>
                                                    <QuotationFinalComp poData={reqData} />
                                                </Grid>
                                                : null
                                            }
                                        </Grid>
                                    </Box>
                                    : null}
                            </>
                            : null}

                    </Box>
                </ModalDialog>
            </Modal>
        </CssVarsProvider >
    )
}
export default memo(DataCollectionViewModal)