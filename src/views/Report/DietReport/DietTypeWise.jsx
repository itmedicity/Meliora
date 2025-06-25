import React, { useEffect, useCallback, useMemo, memo, useState } from 'react'
import CustomReportOne from 'src/views/Components/CustomReportOne'
import { useDispatch, useSelector } from 'react-redux'
import { getDiet } from 'src/redux/actions/Diet.action'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import { format } from 'date-fns'
import { ActionTyps } from 'src/redux/constants/action.type'
import { useNavigate } from 'react-router-dom'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'

const DietTypeWise = () => {
  const dispatch = useDispatch()
  const history = useNavigate()
  const [TableData, setTableData] = useState([])
  const [diet, setDiet] = useState([])
  const [dietslno, setDietslno] = useState([])
  const [startdate, setstartDate] = useState(new Date())
  const [daySelect, setdayselect] = useState(0)

  const dietdata = useSelector((state) => {
    return state.getDiet.dietList || 0
  })
  useEffect(() => {
    dispatch(getDiet())
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
    { headerName: 'Sl No ', field: 'slno', minWidth: 80 },
    { headerName: 'Room No', field: 'rmc_desc', minWidth: 150 },
    { headerName: 'Admission Date ', field: 'ipd_date', minWidth: 150 },
    { headerName: 'IP No', field: 'ip_no', minWidth: 150 },
    { headerName: 'Patient Id ', field: 'pt_no', minWidth: 150 },
    { headerName: 'Patient Name ', field: 'ptc_ptname', minWidth: 150 },
    { headerName: 'Nursing Station', field: 'nsc_desc', wrapText: true, minWidth: 150 },
    { headerName: 'Diet Name', field: 'diet_name', minWidth: 150 },
    { headerName: 'Remarks', field: 'plan_remark', wrapText: true, minWidth: 150 },
    { headerName: 'Breakfast', minWidth: 100 },
    { headerName: 'Lunch', minWidth: 100 },
    { headerName: 'Dinner', minWidth: 100 },
  ])

  const FilterSelect = useCallback(
    (event) => {
      dispatch({ type: ActionTyps.FETCH_CHANGE_STATE, aggridstate: 0 })
      if (event.api.getSelectedRows() === 0) {
        setDiet([])
      } else {
        setDiet(event.api.getSelectedRows())
      }
    },
    [dispatch],
  )

  useEffect(() => {
    const slno =
      diet &&
      diet.map((val) => {
        return val.diet_slno
      })
    setDietslno(slno)
  }, [diet])

  const postdata = useMemo(() => {
    return {
      process_date:
        daySelect === 0
          ? format(new Date(), 'yyyy-MM-dd ')
          : format(new Date(startdate), 'yyyy-MM-dd '),
      diet_slno: dietslno,
    }
  }, [daySelect, startdate, dietslno])

  const onclickreport = useCallback(
    (e) => {
      e.preventDefault()
      dispatch({ type: ActionTyps.FETCH_CHANGE_STATE, aggridstate: 0 })
      const getdatafromtable = async (postdata) => {
        const result = await axioslogin.post('/dietReport/getdietReport', postdata)
        const { success, data } = result.data
        if (success === 1) {
          setTableData(data)
        } else {
          warningNotify('No Patient Under Slelected Diet ')
          setTableData([])
        }
      }
      if (dietslno.length !== 0) {
        getdatafromtable(postdata)
      } else {
        warningNotify('Please Select Diet')
      }
    },
    [postdata, dietslno.length, dispatch],
  )

  const backToSetting = useCallback(() => {
    history(`/Home/Reports`)
  }, [history])
  return (
    <CardCloseOnly title="Diet Type Wise Report" close={backToSetting}>
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
    </CardCloseOnly>
  )
}

export default memo(DietTypeWise)
