import React from 'react'
import { useState, useCallback, useEffect, memo, Fragment } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Box, Paper } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import MasterDetailCompnt from '../ComonComponent/MasterDetailCompnt'
import CusIconButton from 'src/views/Components/CusIconButton'
import CrfStoreModal from './CrfStoreModal'
import CustomBackDrop from 'src/views/Components/CustomBackDrop'
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { Typography } from '@mui/joy';
import { Virtuoso } from 'react-virtuoso'
import { getCrsReceiceAllList, getCrsReceicePending } from '../ComonComponent/ComonFunctnFile'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const CrfStoreProcessMain = () => {

    /*** Initializing */
    const history = useHistory();
    const [disData, setDisData] = useState([])
    const [open, setOpen] = useState(false)
    const [count, setCount] = useState(0)
    const [backdropfalg, setBackDropFlag] = useState(false)//Modal Backdrop
    //For Modal
    const [storeFlag, setStoreFlag] = useState(0)
    const [storeModal, setStoreModal] = useState(false)
    const [storeData, setStoreData] = useState([])
    const [radiovalue, setRadioValue] = useState('1')

    useEffect(() => {
        setOpen(true)
        //API for initialy getting data
        getCrsReceicePending(setDisData, setOpen)
    }, [count])


    //Radio button OnClick function starts
    const updateRadioClick = useCallback(async (e) => {
        e.preventDefault()
        setOpen(false)
        setRadioValue(e.target.value)
        if (e.target.value === '1') {
            getCrsReceicePending(setDisData, setOpen)
        } else if (e.target.value === '2') {
            getCrsReceiceAllList(setDisData, setOpen)
        }
    }, [])

    // Onclick function when process button click
    const ModalOpenfctn = useCallback((val) => {
        setStoreFlag(1)
        setStoreModal(true)
        setStoreData(val)
        setBackDropFlag(true)

    }, [])

    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home')
    }, [history])

    return (
        <Fragment>
            {/* store receiving details modal */}
            {
                storeFlag === 1 ? <CrfStoreModal open={storeModal}
                    setStoreFlag={setStoreFlag} setStoreModal={setStoreModal}
                    storeData={storeData} setStoreData={setStoreData}
                    count={count} setCount={setCount} backdropfalg={backdropfalg}
                    setBackDropFlag={setBackDropFlag} /> : null
            }
            <CustomBackDrop open={open} text="Please Wait" />

            <Box sx={{ height: 35, backgroundColor: "#f0f3f5", display: 'flex' }}>
                <Box sx={{ fontWeight: 550, flex: 1, pl: 1, pt: .5, color: '#385E72', }}>CRF CRS Store</Box>
                <Box>
                    <CusIconButton size="sm" variant="outlined" color="primary" onClick={backtoSetting} >
                        <CloseIcon fontSize='small' />
                    </CusIconButton>
                </Box>
            </Box>
            <Paper >
                <Box sx={{
                    width: "100%", pl: 1, pt: 0.5, pr: 1, pb: 0.5, flex: 1,
                    display: "flex",
                    flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                    justifyContent: 'center',
                }}>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={radiovalue}
                        onChange={(e) => updateRadioClick(e)}
                    >
                        <FormControlLabel value='1' control={<Radio />} label="Pending" />
                        <FormControlLabel sx={{ pl: 2 }} value='2' control={<Radio />} label="All List" />
                    </RadioGroup>
                </Box>
            </Paper>

            <Box sx={{ height: window.innerHeight - 150, overflow: 'auto', }}>
                <Virtuoso
                    // style={{ height: '400px' }}
                    data={disData}
                    totalCount={disData?.length}
                    itemContent={(index, val) => <Box key={index} sx={{ width: "100%", }}>
                        <Paper sx={{
                            width: '100%',
                            mt: 0.8,
                            border: "2 solid #272b2f",
                            borderRadius: 3,
                            overflow: 'hidden',
                            boxShadow: 1,
                            backgroundColor: '#BBBCBC'
                        }} variant='outlined'>
                            <MasterDetailCompnt val={val} />
                            <Box sx={{
                                height: 40, backgroundColor: "#f0f3f5", display: 'flex', width: "100%",
                                flexDirection: "row", pt: 0.5, pb: 0.5
                            }}>
                                <Box sx={{ pl: 2, }}>
                                    <CusIconButton size="sm" variant="outlined" color="primary" clickable="true"
                                        onClick={() => ModalOpenfctn(val)}
                                    >
                                        <Typography color="primary" sx={{ fontSize: 15, pl: 1 }}></Typography>
                                        <SaveAsIcon fontSize='small' />
                                        <Typography color="primary" sx={{ fontSize: 15, pl: 2, pr: 2 }}>Procees</Typography>
                                    </CusIconButton>
                                </Box>
                            </Box>
                        </Paper>
                    </Box>} />
            </Box>
        </Fragment >
    )
}

export default memo(CrfStoreProcessMain)