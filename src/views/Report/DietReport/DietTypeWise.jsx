import React, { Fragment, useEffect, useCallback, useMemo, useState } from 'react'
import CustomReportOne from 'src/views/Components/CustomReportOne'
import { useDispatch, useSelector } from 'react-redux';
import { getDiet } from 'src/redux/actions/Diet.action'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode';
import { format } from 'date-fns'
import { ToastContainer } from 'react-toastify';
import { ActionTyps } from 'src/redux/constants/action.type'

const DietTypeWise = () => {
    const dispatch = useDispatch();
    const [TableData, setTableData] = useState([]);
    const [diet, setDiet] = useState([])
    const [dietslno, setDietslno] = useState([])
    const [startdate, setstartDate] = useState(new Date())
    const [daySelect, setdayselect] = useState(0)

    const dietdata = useSelector((state) => {
        return state.getDiet.dietList || 0
    })
    useEffect(() => {
        dispatch(getDiet());
    }, [dispatch])

    /** Menu Selection for Diet  */
    const [columnDefsMenu] = useState([
        {
            headerName: 'Diet',
            field: 'diet_name',
            checkboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            headerCheckboxSelection: true,
            resizable: true,
        },
    ])

    const [columnDefMain] = useState([
        { headerName: 'Sl No ', field: 'slno' },
        { headerName: 'Room No', field: 'rmc_desc' },
        { headerName: 'Admission Date ', field: 'ipd_date' },
        { headerName: 'IP No', field: 'ip_no' },
        { headerName: 'Patient Id ', field: 'pt_no' },
        { headerName: 'Patient Name ', field: 'ptc_ptname' },
        { headerName: 'Diet Name', field: 'diet_name' },
        { headerName: 'Remarks', field: 'plan_remark', wrapText: true },
        { headerName: 'Breakfast', minWidth: 100 },
        { headerName: 'Lunch', minWidth: 100 },
        { headerName: 'Dinner', minWidth: 100 },
    ])

    const FilterSelect = useCallback((event) => {
        dispatch({ type: ActionTyps.FETCH_CHANGE_STATE, aggridstate: 0 })
        if (event.api.getSelectedRows() === 0) {
            setDiet([])
        }
        else {
            setDiet(event.api.getSelectedRows())
        }
    }, [dispatch])

    useEffect(() => {
        const slno = diet && diet.map((val) => {
            return val.diet_slno
        })
        setDietslno(slno)
    }, [diet])

    const postdata = useMemo(() => {
        return {
            process_date: daySelect === 0 ? format(new Date(), "yyyy-MM-dd ") : format(new Date(startdate), "yyyy-MM-dd "),
            diet_slno: dietslno
        }
    }, [daySelect, startdate, dietslno])


    const onclickreport = useCallback((e) => {
        e.preventDefault();
        dispatch({ type: ActionTyps.FETCH_CHANGE_STATE, aggridstate: 0 })
        const getdatafromtable = async (postdata) => {
            const result = await axioslogin.post('/dietReport/getdietReport', postdata)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            } else {
                warningNotify("No Patient Under Slelected Diet ")
                setTableData([])
            }
        }
        if (dietslno.length !== 0) {
            getdatafromtable(postdata)
        }
        else {
            warningNotify("Please Select Diet")
        }
    }, [postdata, dietslno.length, dispatch])

    return (
        <Fragment>
            <ToastContainer />
            <CustomReportOne
                /**  Menu Select for filtering */
                columnDefs={columnDefsMenu}
                tableData={dietdata}
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

export default DietTypeWise