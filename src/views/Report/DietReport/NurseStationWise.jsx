import React, { Fragment, useEffect, useCallback, useMemo, useState } from 'react'
import CustomReportOne from 'src/views/Components/CustomReportOne'
import { useDispatch, useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode';
import { format } from 'date-fns'
import { ToastContainer } from 'react-toastify';
import { ActionTyps } from 'src/redux/constants/action.type'
import { setNurseStationMeli } from "src/redux/actions/NuseStationMeli.action";

const NurseStationWise = () => {
    const dispatch = useDispatch();
    const [TableData, setTableData] = useState([]);
    const [nurse, setNurse] = useState([])
    const [nurseslno, setnurseslno] = useState([])
    const [startdate, setstartDate] = useState(new Date())
    const [daySelect, setdayselect] = useState(0)

    const nursestationdata = useSelector((state) => {
        return state.getNusringStationMeli.nusreStationList || 0
    })
    useEffect(() => {
        dispatch(setNurseStationMeli())
    }, [dispatch])

    /** Menu Selection for Diet  */
    const [columnDefsMenu] = useState([
        {
            headerName: 'Nursing Station',
            field: 'co_nurse_desc',
            checkboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            headerCheckboxSelection: true,
            resizable: true,
        },
    ])

    const [columnDefMain] = useState([
        {
            headerName: '#',
            filterParams: {
                buttons: ['reset', 'apply'],
                debounceMs: 200,
            },
            width: 30,
        },
        { headerName: 'Process Slno ', field: 'proc_slno', minWidth: 5 },
        { headerName: 'Process Date ', field: 'process_date', minWidth: 20 },
        { headerName: 'IP No', field: 'ip_no', minWidth: 60 },
        { headerName: 'Patient Id ', field: 'pt_no', minWidth: 60 },
        { headerName: 'Patient Name ', field: 'ptc_ptname', minWidth: 150 },
        { headerName: 'Room No', field: 'rmc_desc', minWidth: 100 },
        { headerName: 'Diet Name', field: 'diet_name', minWidth: 100 },
    ])

    const FilterSelect = useCallback((event) => {
        dispatch({ type: ActionTyps.FETCH_CHANGE_STATE, aggridstate: 0 })
        if (event.api.getSelectedRows() === 0) {
            setNurse([])
        }
        else {
            setNurse(event.api.getSelectedRows())
        }
    }, [dispatch])

    useEffect(() => {
        const slno = nurse && nurse.map((val) => {
            return val.co_ora_nurse
        })
        setnurseslno(slno)
    }, [nurse])

    const postdata = useMemo(() => {
        return {
            process_date: daySelect === 0 ? format(new Date(), "yyyy-MM-dd ") : format(new Date(startdate), "yyyy-MM-dd "),
            ns_code: nurseslno
        }
    }, [daySelect, startdate, nurseslno])

    const onclickreport = useCallback((e) => {
        e.preventDefault();
        dispatch({ type: ActionTyps.FETCH_CHANGE_STATE, aggridstate: 0 })
        const getdatafromtable = async (postdata) => {
            const result = await axioslogin.post('/dietReport/getNurseStatntReport', postdata)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            }
        }
        if (nurseslno.length !== 0) {
            getdatafromtable(postdata)
        }
        else {
            warningNotify("Please Select Diet")
        }
    }, [postdata, dispatch, nurseslno.length])

    return (
        <Fragment>
            <ToastContainer />
            <CustomReportOne
                /**  Menu Select for filtering */
                columnDefs={columnDefsMenu}
                tableData={nursestationdata}
                SelectFilter={FilterSelect}

                /** Data get by Filter. Result table Show */
                columnDefForTable={columnDefMain}
                tableDataForTable={TableData}
                onClick={onclickreport}
                daySelect={daySelect}
                setdayselect={setdayselect}
                startdate={startdate}
                setstartDate={setstartDate}
            />
        </Fragment>
    )
}

export default NurseStationWise