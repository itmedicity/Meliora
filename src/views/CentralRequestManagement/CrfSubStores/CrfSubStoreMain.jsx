import React from 'react'
import { useState, useCallback, useEffect, memo, Fragment } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axioslogin } from 'src/views/Axios/Axios'
import { Box, Paper } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { warningNotify } from 'src/views/Common/CommonCode'
import CusIconButton from 'src/views/Components/CusIconButton'
import { ToastContainer } from 'react-toastify'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import CustomPaperTitle from 'src/views/Components/CustomPaperTitle'
import StoreSelectForStore from './StoreSelectForStore'
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain'
import { IconButton } from '@mui/material';
import { editicon } from 'src/color/Color';
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import CrfSubStoreModal from './CrfSubStoreModal'



const CrfSubStoreMain = () => {

    /*** Initializing */
    const history = useHistory();
    const [count, setCount] = useState(0)
    const [done, setDone] = useState(false)
    const [pending, setPending] = useState(true)
    const [check, setCheck] = useState(0)

    const updatedone = useCallback((e) => {
        if (e.target.checked === true) {
            setDone(true)
            setCheck(2)
            setPending(false)
        }
        else {
            setDone(false)
            setCheck(0)
            setPending(false)
        }
    }, [])
    const updatependng = useCallback((e) => {
        if (e.target.checked === true) {
            setPending(true)
            setCheck(1)
            setDone(false)
        }
        else {
            setDone(false)
            setCheck(0)
            setPending(false)
        }
    }, [])

    const [pendingData, setPendingData] = useState([])
    const [donedata, setDoneData] = useState([])
    const [substoreSlno, setsubStoreSlno] = useState(0)

    useEffect(() => {

        const getReqForDownload = async (substoreSlno) => {
            const result = await axioslogin.get(`/newCRFPurchase/getPOListSubStorewise/${substoreSlno}`)
            const { success, data } = result.data
            if (success === 1) {
                const datas = data.map((val, index) => {
                    const obj = {
                        slno: index + 1,
                        po_detail_slno: val.po_detail_slno,
                        req_slno: val.req_slno,
                        po_number: val.po_number,
                        po_date: val.po_date,
                        expected_delivery: val.expected_delivery,
                        supply_store: val.supply_store,
                        sub_store_name: val.sub_store_name,
                        main_store_slno: val.main_store_slno,
                        main_store: val.main_store,
                        store_code: val.store_code,
                        store_recieve: val.store_recieve,
                        store_receive_user: val.store_receive_user,
                        store_receive_date: val.store_receive_date,
                        sub_store_recieve: val.sub_store_recieve,
                        sub_store_recieve_user: val.sub_store_recieve_user,
                        sub_store_date: val.sub_store_date,
                        req_deptsec: val.req_deptsec,
                        user_deptsection: val.user_deptsection,
                        actual_requirement: val.actual_requirement,
                        needed: val.needed,
                        expected_date: val.expected_date,
                        req_date: val.req_date
                    }
                    return obj
                })

                const pendingList = datas.filter((val) => {
                    return val.sub_store_recieve !== 1
                })

                if (pendingList.length !== 0) {
                    setPendingData(pendingList)
                }
                else {
                    setPendingData([])
                    warningNotify("No CRF For Pending")
                }
                const DoneList = datas.filter((val) => {
                    return val.sub_store_recieve === 1
                })
                setDoneData(DoneList)



            } else {
                warningNotify("No CRF For Pending")
            }
        }
        if (substoreSlno !== 0) {
            getReqForDownload(substoreSlno);
        }

    }, [substoreSlno, count])

    const [column] = useState([
        {
            headerName: 'Action', minWidth: 100, cellRenderer: params => {
                return <IconButton onClick={() => rowSelect(params)}
                    sx={{ color: editicon, paddingY: 0.5 }} >
                    <CustomeToolTip title="Approval">
                        <PublishedWithChangesOutlinedIcon />
                    </CustomeToolTip>
                </IconButton>
            }
        },
        { headerName: "Slno", field: "slno", minWidth: 120 },
        { headerName: "PO No", field: "po_detail_slno", minWidth: 120 },
        { headerName: "Req.Slno", field: "req_slno", minWidth: 120 },
        { headerName: "Require Department", field: "req_deptsec", autoHeight: true, wrapText: true, minWidth: 250, filter: "true" },
        { headerName: "Requested Department", field: "user_deptsection", minWidth: 200 },
        // { headerName: "Req. Date", field: "req_date", minWidth: 200 },

    ])

    const [edit, setEdit] = useState(0)
    const [podetldata, setPodetlData] = useState([])
    const [okModal, setOkModal] = useState(false)


    //Data set for edit
    const rowSelect = useCallback((params) => {
        const data = params.api.getSelectedRows()
        setEdit(1)
        setPodetlData(data[0])
        setOkModal(true)
    }, [])

    const handleClose = useCallback(() => {
        setEdit(0)
        setPodetlData([])
    }, [])

    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home')
    }, [history])


    return (
        <Fragment>
            {edit === 1 ?
                <CrfSubStoreModal open={okModal} podetldata={podetldata} handleClose={handleClose}
                    count={count} setCount={setCount} /> : null
            }
            <ToastContainer />
            <Box sx={{ height: 35, backgroundColor: "#f0f3f5", display: 'flex' }}>
                <Box sx={{ fontWeight: 550, flex: 1, pl: 1, pt: .5, color: '#385E72', }}>CRF Store</Box>
                <Box>
                    <CusIconButton size="sm" variant="outlined" color="primary" onClick={backtoSetting} >
                        <CloseIcon fontSize='small' />
                    </CusIconButton>
                </Box>
            </Box>
            <Paper >
                <Box sx={{
                    width: "100%",
                    pl: 1, pt: 0.5, pr: 1, pb: 0.5, flex: 1,
                    display: "flex",
                    flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                    justifyContent: 'center',
                }}>
                    <Box sx={{ width: "10%", pt: 1 }}>
                        <CustomPaperTitle heading="Select Store" />
                    </Box>
                    <Box sx={{ width: "30%", pt: 1 }}>
                        <StoreSelectForStore
                            substoreSlno={substoreSlno} setsubStoreSlno={setsubStoreSlno}
                        />
                    </Box>
                    <Box sx={{ width: "13%", pr: 1, mt: 1, pl: 3 }}>
                        <CusCheckBox
                            label="Pending"
                            color="danger"
                            size="md"
                            name="pending"
                            value={pending}
                            checked={pending}
                            onCheked={updatependng}
                        />
                    </Box>
                    <Box sx={{ width: "13%", mt: 1, pl: 1 }}>
                        <CusCheckBox
                            label="All List"
                            color="danger"
                            size="md"
                            name="done"
                            value={done}
                            checked={done}
                            onCheked={updatedone}
                        />
                    </Box>
                </Box>
            </Paper>
            {
                substoreSlno !== 0 ?
                    <Box sx={{ height: window.innerHeight - 150, overflow: 'auto', }}>
                        {check === 2 ?
                            <Box sx={{ width: "100%", pt: 1 }}>
                                <CusAgGridForMain
                                    columnDefs={column}
                                    tableData={donedata}
                                />
                            </Box>
                            :
                            <Box sx={{ width: "100%", pt: 1 }}>
                                <CusAgGridForMain
                                    columnDefs={column}
                                    tableData={pendingData}
                                />
                            </Box>
                        }
                    </Box>
                    : null}

        </Fragment>
    )
}

export default memo(CrfSubStoreMain)