import { Box, Chip, CssVarsProvider, Grid, IconButton, Modal, ModalClose, ModalDialog, Table, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import { format } from 'date-fns'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import ImageDisplayModal from '../ImageDisplayModal'
import AttachmentTwoToneIcon from '@mui/icons-material/AttachmentTwoTone';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';

const CRFApprovalView = ({ modalData, handleClose, open }) => {

    const { req_slno, incharge, incharge_remark, hod, hod_remarks, dms_approve, dms, dms_remarks, ms_approve, ms,
        ms_approve_remark, om, manag_operation_remarks, smo, senior_manage_remarks, gm, gm_approve_remarks, md,
        md_approve_remarks, ed, ed_approve_remarks, incharge_apprv_date, incharge_user, hod_approve_date, hod_user,
        dms_approve_date, dms_user, ms_approve_date, ms_approve_user, om_approv_date, manag_operation_user,
        som_aprrov_date, senior_manage_user, gm_approv_date, gm_user, ed_approve_date, ed_user, md_approve_date, md_user,
        incharge_approve, hod_approve, manag_operation_approv, senior_manage_approv, gm_approve, md_approve, ed_approve,
        image_status
    } = modalData

    const [itemList, setItemList] = useState([])
    const [imageshowFlag, setImageShowFlag] = useState(0)
    const [imageshow, setImageShow] = useState(false)
    const [imagearray, setImageArry] = useState([])
    useEffect(() => {
        const getCRfItemDetails = async (req_slno) => {
            const result = await axioslogin.get(`/newCRFRegister/getDetailItemList/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const newData = data?.filter((val) => val.item_status_approved === 1)
                setItemList(newData)
            }
            else {
                setItemList([])
            }
        }
        getCRfItemDetails(req_slno)
    }, [req_slno])

    const ViewImage = useCallback(() => {
        const getImage = async (req_slno) => {
            const result = await axioslogin.get(`/CrfImageUpload/crfRegimageGet/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const fileNames = data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/${fileName}`;
                });
                setImageArry(fileUrls);
            }
        }
        getImage(req_slno)
        setImageShowFlag(1)
        setImageShow(true)
    }, [setImageShowFlag, setImageShow, req_slno])

    const handleCloseImage = useCallback(() => {
        setImageShowFlag(0)
        setImageShow(false)
    }, [])

    const capitalizeWords = (str) => str ? str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : '';
    return (
        <Fragment>
            {imageshowFlag === 1 ? <ImageDisplayModal open={imageshow} handleClose={handleCloseImage}
                images={imagearray} /> : null}
            <CssVarsProvider>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={open}
                    onClose={handleClose}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                >
                    <ModalDialog
                        variant="outlined"
                        sx={{
                            minWidth: '60vw',
                            minHeight: 400,
                            overflow: 'auto'
                        }}
                    >
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
                        <Box sx={{ mx: 0.5 }}>
                            <Typography sx={{ fontWeight: 550, fontSize: 16, fontFamily: 'system-ui' }}>
                                CRF Details</Typography>
                        </Box>
                        {itemList.length !== 0 ?
                            <Box sx={{ overflow: 'auto', flexWrap: 'wrap', maxHeight: 250 }}>
                                <Typography sx={{ fontWeight: 'bold', mx: 1, pb: 0.5, color: '#145DA0', fontSize: 14 }}>
                                    Requested Items
                                </Typography>
                                <Table aria-label="table with sticky header" borderAxis="both" padding={"none"} stickyHeader size='sm' >
                                    <thead style={{ height: 4 }} size='small'>
                                        <tr style={{ height: 4 }} size='small'>
                                            <th size='sm' style={{ width: 50, textAlign: 'center', backgroundColor: '#EBEBE8' }}>Sl.No</th>
                                            <th size='sm' style={{ width: 300, backgroundColor: '#EBEBE8' }}>&nbsp;&nbsp;Description</th>
                                            <th size='sm' style={{ width: 100, backgroundColor: '#EBEBE8' }}>&nbsp;&nbsp;Brand</th>
                                            <th size='sm' style={{ width: 80, textAlign: 'center', backgroundColor: '#EBEBE8' }}>Qty</th>
                                            <th size='sm' style={{ width: 80, textAlign: 'center', backgroundColor: '#EBEBE8' }}>UOM</th>
                                            <th size='sm' style={{ width: 350, textAlign: 'center', backgroundColor: '#EBEBE8' }}>Specification</th>
                                            <th size='sm' style={{ width: 100, textAlign: 'center', backgroundColor: '#EBEBE8' }}>Price</th>
                                            <th size='sm' style={{ width: 100, textAlign: 'center', backgroundColor: '#EBEBE8' }}>Approx.cost</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {itemList.map((item, ind) => (
                                            <tr key={ind}>
                                                <td style={{ textAlign: 'center' }}>{ind + 1}</td>
                                                <td style={{ fontSize: 13 }}>&nbsp;{item.item_desc}</td>
                                                <td style={{}}>&nbsp;{item.item_brand}</td>
                                                <td style={{ textAlign: 'center', }}>{item.item_qnty}</td>
                                                <td style={{ textAlign: 'center', }}>{item.item_unit === 0 ? 'Not Given' : item.uom_name}</td>
                                                <td style={{}}>&nbsp;{item.item_specification}</td>
                                                <td style={{ textAlign: 'center', }}>{item.item_unit_price === 0 ? 'Not Given' : item.item_unit_price}</td>
                                                <td style={{ textAlign: 'center', }}>{item.aprox_cost === 0 ? 'Not Given' : item.aprox_cost}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Box>
                            : null
                        }
                        {image_status === 1 ?
                            <Box sx={{ mr: 0.5, display: 'flex' }}>
                                <CssVarsProvider>
                                    <IconButton
                                        sx={{
                                            fontSize: 12, height: '30px', minHeight: '30px', lineHeight: '1.2',
                                            color: 'primary.main', bgcolor: 'white', width: '120px',
                                            '&:hover': {
                                                bgcolor: '#F0F4F8',
                                            },
                                            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', borderRadius: 5,
                                        }}
                                        onClick={ViewImage} >
                                        <Typography sx={{ fontSize: 14, px: 1 }}>File View</Typography>
                                        <AttachmentTwoToneIcon fontSize='small' sx={{ color: '#0277bd', width: 35, height: 25 }} />
                                    </IconButton>
                                </CssVarsProvider>
                            </Box> : null
                        }
                        {(hod_approve !== null || incharge_approve !== null) ?
                            <>
                                <Typography sx={{ fontWeight: 'bold', mx: 1, color: '#145DA0', fontSize: 14 }}>
                                    Approved Details
                                </Typography>
                                <Paper variant="outlined" square sx={{ flexWrap: 'wrap', }}>
                                    <Grid container spacing={0.5} sx={{ flexGrow: 1, py: 0.5 }}>
                                        {incharge_approve === 1 ?
                                            <Grid xs={4} sx={{ pl: 0.5 }}>
                                                <Paper sx={{ bgcolor: 'white', m: 0.5 }}>
                                                    <Box sx={{ display: 'flex' }}>
                                                        <Typography sx={{ fontSize: 14, pl: 1, pt: 0.5, flex: 0.3 }}>
                                                            Incharge
                                                        </Typography>
                                                        <Box sx={{ flex: 1 }}>
                                                            <Chip size="md" variant="outlined" sx={{
                                                                color: (incharge_approve === 1 ? '#2e7d32' : '#bf360c'), height: 25, pb: 0.5,
                                                                fontSize: 12, fontWeight: 550,
                                                            }}>
                                                                {incharge}
                                                            </Chip>
                                                        </Box>
                                                    </Box>
                                                    <Box sx={{ display: 'flex' }}>
                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.3 }}>Remarks </Typography>
                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                            : &nbsp;  {incharge_remark}</Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex' }}>
                                                        <Typography sx={{ pl: 1, fontSize: 13, flex: 0.5 }}>Approved by </Typography>
                                                        <Typography sx={{ height: 30, fontSize: 13, fontWeight: 550, flex: 0.7 }}>
                                                            : &nbsp;  {incharge_approve === 1 ? capitalizeWords(incharge_user) : ''}</Typography>
                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                            {incharge_approve === 1 ? format(new Date(incharge_apprv_date), 'dd-MM-yyyy hh :mm:ss a') : ''}</Typography>
                                                    </Box>
                                                </Paper>
                                            </Grid> : null}
                                        {hod_approve === 1 ?
                                            <Grid xs={4} sx={{ pl: 0.5 }}>
                                                <Paper sx={{ bgcolor: 'white', m: 0.5 }}>
                                                    <Box sx={{ display: 'flex' }}>
                                                        <Typography sx={{ fontSize: 13, pl: 1, pt: 0.5, flex: 0.3 }}>
                                                            HOD
                                                        </Typography>
                                                        <Box sx={{ flex: 1 }}>
                                                            <Chip size="md" variant="outlined" sx={{
                                                                color: (hod_approve === 1 ? '#2e7d32' : '#bf360c'), height: 25, pb: 0.5,
                                                                fontSize: 12, fontWeight: 550,
                                                            }}>
                                                                {hod}
                                                            </Chip>
                                                        </Box>
                                                    </Box>
                                                    <Box sx={{ display: 'flex' }}>
                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.3 }}>Remarks </Typography>
                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                            : &nbsp;  {hod_remarks}</Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex' }}>
                                                        <Typography sx={{ pl: 1, fontSize: 13, flex: 0.5 }}>Approved by </Typography>
                                                        <Typography sx={{ height: 30, fontSize: 13, fontWeight: 550, flex: 0.7 }}>
                                                            : &nbsp;  {hod_approve === 1 ? capitalizeWords(hod_user) : ''}</Typography>
                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                            {hod_approve === 1 ? format(new Date(hod_approve_date), 'dd-MM-yyyy hh :mm:ss a') : ''}</Typography>
                                                    </Box>
                                                </Paper>
                                            </Grid> : null}
                                        {dms_approve === 1 ?
                                            <Grid xs={4} sx={{ pl: 0.5 }}>
                                                <Paper sx={{ bgcolor: 'white', m: 0.5 }}>
                                                    <Box sx={{ display: 'flex' }}>
                                                        <Typography sx={{ fontSize: 13, pl: 1, pt: 0.5, flex: 0.3 }}>
                                                            DMS
                                                        </Typography>
                                                        <Box sx={{ flex: 1 }}>
                                                            <Chip size="md" variant="outlined" sx={{
                                                                color: (dms_approve === 1 ? '#2e7d32' : '#bf360c'), height: 25, pb: 0.5,
                                                                fontSize: 12, fontWeight: 550,
                                                            }}>
                                                                {dms}
                                                            </Chip>
                                                        </Box>
                                                    </Box>
                                                    <Box sx={{ display: 'flex' }}>
                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.3 }}>Remarks </Typography>
                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                            : &nbsp;  {dms_remarks}</Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex' }}>
                                                        <Typography sx={{ pl: 1, fontSize: 13, flex: 0.5 }}>Approved by </Typography>
                                                        <Typography sx={{ height: 30, fontSize: 13, fontWeight: 550, flex: 0.7 }}>
                                                            : &nbsp;  {dms_approve === 1 ? capitalizeWords(dms_user) : ''}</Typography>
                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                            {dms_approve === 1 ? format(new Date(dms_approve_date), 'dd-MM-yyyy hh :mm:ss a') : ''}</Typography>
                                                    </Box>
                                                </Paper>
                                            </Grid>
                                            : null}
                                        {ms_approve === 1 ?
                                            <Grid xs={4} sx={{ pl: 0.5 }}>
                                                <Paper sx={{ bgcolor: 'white', m: 0.5 }}>
                                                    <Box sx={{ display: 'flex' }}>
                                                        <Typography sx={{ fontSize: 13, pl: 1, pt: 0.5, flex: 0.3 }}>
                                                            MS
                                                        </Typography>
                                                        <Box sx={{ flex: 1 }}>
                                                            <Chip size="md" variant="outlined" sx={{
                                                                color: (ms_approve === 1 ? '#2e7d32' : '#bf360c'), height: 25, pb: 0.5,
                                                                fontSize: 12, fontWeight: 550,
                                                            }}>
                                                                {ms}
                                                            </Chip>
                                                        </Box>
                                                    </Box>
                                                    <Box sx={{ display: 'flex' }}>
                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.3 }}>Remarks </Typography>
                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                            : &nbsp;  {ms_approve_remark}</Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex' }}>
                                                        <Typography sx={{ pl: 1, fontSize: 13, flex: 0.5 }}>Approved by </Typography>
                                                        <Typography sx={{ height: 30, fontSize: 13, fontWeight: 550, flex: 0.7 }}>
                                                            : &nbsp;  {ms_approve === 1 ? capitalizeWords(ms_approve_user) : ''}</Typography>
                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                            {ms_approve === 1 ? format(new Date(ms_approve_date), 'dd-MM-yyyy hh :mm:ss a') : ''}</Typography>
                                                    </Box>
                                                </Paper>
                                            </Grid>
                                            : null}
                                        {manag_operation_approv === 1 ?
                                            <Grid xs={4} sx={{ pl: 0.5 }}>
                                                <Paper sx={{ bgcolor: 'white', m: 0.5 }}>
                                                    <Box sx={{ display: 'flex' }}>
                                                        <Typography sx={{ fontSize: 13, pl: 1, pt: 0.5, flex: 0.3 }}>
                                                            OM
                                                        </Typography>
                                                        <Box sx={{ flex: 1 }}>
                                                            <Chip size="md" variant="outlined" sx={{
                                                                color: (manag_operation_approv === 1 ? '#2e7d32' : '#bf360c'), height: 25, pb: 0.5,
                                                                fontSize: 12, fontWeight: 550,
                                                            }}>
                                                                {om}
                                                            </Chip>
                                                        </Box>
                                                    </Box>
                                                    <Box sx={{ display: 'flex' }}>
                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.3 }}>Remarks </Typography>
                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                            : &nbsp;  {manag_operation_remarks}</Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex' }}>
                                                        <Typography sx={{ pl: 1, fontSize: 13, flex: 0.5 }}>Approved by </Typography>
                                                        <Typography sx={{ height: 30, fontSize: 13, fontWeight: 550, flex: 0.7 }}>
                                                            : &nbsp;  {manag_operation_approv === 1 ? capitalizeWords(manag_operation_user) : ''}</Typography>
                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                            {manag_operation_approv === 1 ? format(new Date(om_approv_date), 'dd-MM-yyyy hh :mm:ss a') : ''}</Typography>
                                                    </Box>
                                                </Paper>
                                            </Grid>
                                            : null}
                                        {senior_manage_approv === 1 ?
                                            <Grid xs={4} sx={{ pl: 0.5 }}>
                                                <Paper sx={{ bgcolor: 'white', m: 0.5 }}>
                                                    <Box sx={{ display: 'flex' }}>
                                                        <Typography sx={{ fontSize: 13, pl: 1, pt: 0.5, flex: 0.3 }}>
                                                            SMO
                                                        </Typography>
                                                        <Box sx={{ flex: 1 }}>
                                                            <Chip size="md" variant="outlined" sx={{
                                                                color: (senior_manage_approv === 1 ? '#2e7d32' : '#bf360c'), height: 25, pb: 0.5,
                                                                fontSize: 12, fontWeight: 550,
                                                            }}>
                                                                {smo}
                                                            </Chip>
                                                        </Box>
                                                    </Box>
                                                    <Box sx={{ display: 'flex' }}>
                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.3 }}>Remarks </Typography>
                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                            : &nbsp;  {senior_manage_remarks}</Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex' }}>
                                                        <Typography sx={{ pl: 1, fontSize: 13, flex: 0.5 }}>Approved by </Typography>
                                                        <Typography sx={{ height: 30, fontSize: 13, fontWeight: 550, flex: 0.7 }}>
                                                            : &nbsp;  {senior_manage_approv === 1 ? capitalizeWords(senior_manage_user) : ''}</Typography>
                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                            {senior_manage_approv === 1 ? format(new Date(som_aprrov_date), 'dd-MM-yyyy hh :mm:ss a') : ''}</Typography>
                                                    </Box>
                                                </Paper>
                                            </Grid>
                                            : null}
                                        {gm_approve === 1 ?
                                            <Grid xs={4} sx={{ pl: 0.5 }}>
                                                <Paper sx={{ bgcolor: 'white', m: 0.5 }}>
                                                    <Box sx={{ display: 'flex' }}>
                                                        <Typography sx={{ fontSize: 13, pl: 1, pt: 0.5, flex: 0.3 }}>
                                                            GM
                                                        </Typography>
                                                        <Box sx={{ dlex: 1 }}>
                                                            <Chip size="md" variant="outlined" sx={{
                                                                color: (gm_approve === 1 ? '#2e7d32' : '#bf360c'), height: 25, pb: 0.5,
                                                                fontSize: 12, fontWeight: 550,
                                                            }}>
                                                                {gm}
                                                            </Chip>
                                                        </Box>
                                                    </Box>
                                                    <Box sx={{ display: 'flex' }}>
                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.3 }}>Remarks </Typography>
                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                            : &nbsp;  {gm_approve_remarks}</Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex' }}>
                                                        <Typography sx={{ pl: 1, fontSize: 13, flex: 0.5 }}>Approved by </Typography>
                                                        <Typography sx={{ height: 30, fontSize: 13, fontWeight: 550, flex: 0.7 }}>
                                                            : &nbsp;  {gm_approve === 1 ? capitalizeWords(gm_user) : ''}</Typography>
                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                            {gm_approve === 1 ? format(new Date(gm_approv_date), 'dd-MM-yyyy hh :mm:ss a') : ''}</Typography>
                                                    </Box>
                                                </Paper>
                                            </Grid>
                                            : null}
                                        {md_approve === 1 ?
                                            <Grid xs={4} sx={{ pl: 0.5 }}>
                                                <Paper sx={{ bgcolor: 'white', m: 0.5 }}>
                                                    <Box sx={{ display: 'flex' }}>
                                                        <Typography sx={{ fontSize: 13, pl: 1, pt: 0.5, flex: 0.3 }}>
                                                            MD
                                                        </Typography>
                                                        <Box sx={{ flex: 1 }}>
                                                            <Chip size="md" variant="outlined" sx={{
                                                                color: (md_approve === 1 ? '#2e7d32' : '#bf360c'), height: 25, pb: 0.5,
                                                                fontSize: 12, fontWeight: 550,
                                                            }}>
                                                                {md}
                                                            </Chip>
                                                        </Box>
                                                    </Box>
                                                    <Box sx={{ display: 'flex' }}>
                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.3 }}>Remarks </Typography>
                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                            : &nbsp;  {md_approve_remarks}</Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex' }}>
                                                        <Typography sx={{ pl: 1, fontSize: 13, flex: 0.5 }}>Approved by </Typography>
                                                        <Typography sx={{ height: 30, fontSize: 13, fontWeight: 550, flex: 0.7 }}>
                                                            : &nbsp;  {md_approve === 1 ? capitalizeWords(md_user) : ''}</Typography>
                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                            {md_approve === 1 ? format(new Date(md_approve_date), 'dd-MM-yyyy hh :mm:ss a') : ''}</Typography>
                                                    </Box>
                                                </Paper>
                                            </Grid>
                                            : null}
                                        {ed_approve === 1 ?
                                            <Grid xs={4} sx={{ pl: 0.5 }}>
                                                <Paper sx={{ bgcolor: 'white', m: 0.5 }}>
                                                    <Box sx={{ display: 'flex' }}>
                                                        <Typography sx={{ fontSize: 13, pl: 1, pt: 0.5, flex: 0.3 }}>
                                                            ED
                                                        </Typography>
                                                        <Box sx={{ flex: 1 }}>
                                                            <Chip size="md" variant="outlined" sx={{
                                                                color: (ed_approve === 1 ? '#2e7d32' : '#bf360c'), height: 25, pb: 0.5,
                                                                fontSize: 12, fontWeight: 550,
                                                            }}>
                                                                {ed}
                                                            </Chip>
                                                        </Box>
                                                    </Box>
                                                    <Box sx={{ display: 'flex' }}>
                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.3 }}>Remarks </Typography>
                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                            : &nbsp;  {ed_approve_remarks}</Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex' }}>
                                                        <Typography sx={{ pl: 1, fontSize: 13, flex: 0.5 }}>Approved by </Typography>
                                                        <Typography sx={{ height: 30, fontSize: 13, fontWeight: 550, flex: 0.7 }}>
                                                            : &nbsp;  {ed_approve === 1 ? capitalizeWords(ed_user) : ''}</Typography>
                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                            {ed_approve === 1 ? format(new Date(ed_approve_date), 'dd-MM-yyyy hh :mm:ss a') : ''}</Typography>
                                                    </Box>
                                                </Paper>
                                            </Grid> : null}
                                    </Grid>
                                </Paper>
                            </>
                            :
                            <Box sx={{
                                display: 'flex', justifyContent: 'center', fontSize: 25, opacity: 0.5,
                                pt: 10, color: 'grey'
                            }}>
                                No Report Found
                            </Box>}
                    </ModalDialog>
                </Modal>
            </CssVarsProvider >
        </Fragment>
    )
}

export default memo(CRFApprovalView)
