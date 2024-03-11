import React from 'react'
import { useState, useCallback, useEffect, memo, Fragment } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axioslogin } from 'src/views/Axios/Axios'
import { useSelector } from 'react-redux'
import { Box, Paper } from '@mui/material'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import CusIconButton from 'src/views/Components/CusIconButton'
import CloseIcon from '@mui/icons-material/Close';
import _ from 'underscore'
import MasterDetailCompnt from '../ComonComponent/MasterDetailCompnt'
import DataCollectionSave from '../ComonComponent/DataCollectionSave'
import DataCollectnEntryModal from './DataCollectnEntryModal'
import DataCollectnEntryView from './DataCollectnEntryView'

const CrfDataCollectionTable = () => {

    /*** Initializing */
    const history = useHistory();

    const [done, setDone] = useState(false)
    const [pending, setPending] = useState(true)
    const [check, setCheck] = useState(0)
    const [count, setCount] = useState(0)

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

    const empdeptsec = useSelector((state) => state.LoginUserData.empsecid, _.isEqual)
    const [pendingData, setPendingData] = useState([])
    const [donedata, setDoneData] = useState([])

    useEffect(() => {
        const getdataCollReq = async (empdeptsec) => {
            const result = await axioslogin.get(`/CRFRegisterApproval/getDataCollectList/${empdeptsec}`)
            const { success, data } = result.data
            if (success === 1) {
                const datas = data.map((val) => {
                    const obj = {
                        req_slno: val.req_slno,
                        actual_requirement: val.actual_requirement,
                        needed: val.needed,
                        request_deptsec_slno: val.request_deptsec_slno,
                        req_deptsec: val.req_deptsec.toLowerCase(),
                        user_deptsection: val.user_deptsection.toLowerCase(),
                        em_name: val.create_user.toLowerCase(),
                        category: val.category,
                        location: val.location,
                        emergency_flag: val.emergency_flag,
                        emer_type_name: val.emer_type_name,
                        emer_slno: val.emer_slno,
                        emer_type_escalation: val.emer_type_escalation,
                        emergeny_remarks: val.emergeny_remarks,
                        total_approx_cost: val.total_approx_cost,
                        image_status: val.image_status,
                        req_date: val.create_date,
                        expected_date: val.expected_date,
                        status: val.rm_ndrf === 1 ? "NDRF" : "CRF",

                        crf_dept_remarks: val.crf_dept_remarks,
                        data_entered: val.data_entered !== null ? val.data_entered.toLowerCase() : '',
                        reqest_one: val.reqest_one,
                        req_user: val.requser !== null ? val.requser.toLowerCase() : '',
                        datagive_user: val.saveuser !== null ? val.saveuser.toLowerCase() : '',
                        create_date: val.create_date,
                        update_date: val.update_date,
                        crf_req_remark: val.crf_req_remark,
                        data_coll_image_status: val.data_coll_image_status,
                        crf_data_collect_slno: val.crf_data_collect_slno,
                        crf_requst_slno: val.crf_requst_slno,
                        requser: val.requser.toLowerCase(),
                        crf_dept_status: val.crf_dept_status
                    }
                    return obj
                })
                const pendingList = datas.filter((val) => {
                    return val.crf_dept_status !== 1
                })
                setPendingData(pendingList)

                const DoneList = datas.filter((val) => {
                    return val.crf_dept_status === 1
                })
                setDoneData(DoneList)
            }
        }
        getdataCollReq(empdeptsec)
    }, [empdeptsec, count])

    const [dtaEnterFlag, setDataEnterFlag] = useState(0)
    const [dtaEnterModal, setDataEnterModal] = useState(false)
    const [dtaEnterData, setDataEnterData] = useState([])

    const [dtaEnterViewFlag, setDataEnterViewFlag] = useState(0)
    const [dtaEnterViewModal, setDataEnterViewModal] = useState(false)
    const [dtaEnterViewData, setDataEnterViewData] = useState([])

    //close button function
    const backtoSetting = useCallback(() => {
        setDone(false)
        setPending(true)
        setCheck(0)
        setCount(0)
        setPendingData([])
        setDoneData([])
        setDataEnterFlag(0)
        setDataEnterModal(false)
        setDataEnterData([])
        setDataEnterViewFlag(0)
        setDataEnterViewModal(false)
        setDataEnterViewData([])
        history.push('/Home')
    }, [history])


    return (
        <Fragment >
            {dtaEnterFlag === 1 ? <DataCollectnEntryModal
                open={dtaEnterModal} setDataEnterFlag={setDataEnterFlag} setDataEnterModal={setDataEnterModal}
                dtaEnterData={dtaEnterData} setDataEnterData={setDataEnterData} setCount={setCount}
                count={count} /> : null
            }

            {dtaEnterViewFlag === 1 ? <DataCollectnEntryView open={dtaEnterViewModal}
                setDataEnterViewFlag={setDataEnterViewFlag} setDataEnterViewModal={setDataEnterViewModal}
                dtaEnterViewData={dtaEnterViewData} setDataEnterViewData={setDataEnterViewData}
                setCount={setCount} count={count} /> : null
            }
            <Box sx={{ height: 35, backgroundColor: "#f0f3f5", display: 'flex' }}>
                <Box sx={{ fontWeight: 550, flex: 1, pl: 1, pt: .5, color: '#385E72', }}>Data Collection For CRF</Box>
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
                    <Box sx={{ width: "13%", pr: 1, mt: 1 }}>
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
                    <Box sx={{ width: "13%", mt: 1 }}>
                        <CusCheckBox
                            label="Data Collection Given"
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

            <Box sx={{ height: window.innerHeight - 150, overflow: 'auto', }}>
                {check === 2 ?
                    <Box sx={{ width: "100%" }}>
                        {donedata && donedata.map((val) => {
                            return <Box key={val.crf_data_collect_slno} sx={{ width: "100%", }}>
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
                                    <DataCollectionSave setDataEnterFlag={setDataEnterFlag}
                                        setDataEnterModal={setDataEnterModal} setDataEnterData={setDataEnterData}
                                        val={val} flag={0}
                                        setDataEnterViewFlag={setDataEnterViewFlag} setDataEnterViewModal={setDataEnterViewModal}
                                        setDataEnterViewData={setDataEnterViewData}


                                    />
                                </Paper>
                            </Box>
                        })}
                    </Box>
                    : <Box>

                        {pendingData && pendingData.map((val) => {
                            return <Box key={val.crf_data_collect_slno} sx={{ width: "100%", }}>
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
                                    <DataCollectionSave setDataEnterFlag={setDataEnterFlag}
                                        setDataEnterModal={setDataEnterModal} setDataEnterData={setDataEnterData}
                                        val={val} flag={1}
                                        setDataEnterViewFlag={setDataEnterViewFlag} setDataEnterViewModal={setDataEnterViewModal}
                                        setDataEnterViewData={setDataEnterViewData} />
                                </Paper>
                            </Box>
                        })}
                    </Box>
                }
            </Box>
        </Fragment>
    )
}

export default memo(CrfDataCollectionTable)