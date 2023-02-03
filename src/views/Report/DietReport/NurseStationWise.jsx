import React, { useEffect, useCallback, useMemo, memo, useState } from 'react'
import CustomReportOne from 'src/views/Components/CustomReportOne'
import { useDispatch, useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode';
import { format } from 'date-fns'
import { ActionTyps } from 'src/redux/constants/action.type'
import { setNurseStationMeli } from "src/redux/actions/NuseStationMeli.action";
import { useHistory } from 'react-router-dom';
import CardCloseOnly from 'src/views/Components/CardCloseOnly'

const NurseStationWise = () => {
    const dispatch = useDispatch();
    const history = useHistory();
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
        { headerName: 'Sl No ', field: 'slno', wrapText: true, minWidth: 50 },
        { headerName: 'Room No', field: 'rmc_desc', wrapText: true, minWidth: 100 },
        { headerName: 'Admission Date ', field: 'ipd_date', wrapText: true, minWidth: 100 },
        { headerName: 'IP No', field: 'ip_no', wrapText: true, minWidth: 150 },
        { headerName: 'Patient Id ', field: 'pt_no', wrapText: true, minWidth: 150 },
        { headerName: 'Patient Name ', field: 'ptc_ptname', wrapText: true, minWidth: 150 },
        { headerName: 'Nursing Station', field: 'nsc_desc', wrapText: true, minWidth: 150 },
        { headerName: 'Diet Name', field: 'diet_name', wrapText: true, minWidth: 100 },
        { headerName: 'Remarks', field: 'plan_remark', wrapText: true, minWidth: 150 },
        { headerName: 'Breakfast', minWidth: 100 },
        { headerName: 'Lunch', minWidth: 100 },
        { headerName: 'Dinner', minWidth: 100 },
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
            } else {
                warningNotify("No Patient Under Slelected Nursing Station ")
                setTableData([])
            }
        }
        if (nurseslno.length !== 0) {
            getdatafromtable(postdata)
        }
        else {
            warningNotify("Please Select Diet")
        }
    }, [postdata, dispatch, nurseslno.length])

    const backToSetting = useCallback(() => {
        history.push(`/Home/Reports`)
    }, [history])

    return (
        <CardCloseOnly
            title='Nursing Station Wise Report'
            close={backToSetting}
        >
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
        </CardCloseOnly>
    )
}

export default memo(NurseStationWise)