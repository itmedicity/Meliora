import React, { useCallback, useEffect, useState, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ComplistAgGridcmp from '../../Components/ComplistAgGridcmp'
import CardCloseOnly from '../../Components/CardCloseOnly'
import { getHiccomplaintsall } from 'src/redux/actions/HicComplaintList.action'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const HicComplaintList = () => {
  const history = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getHiccomplaintsall())
  }, [dispatch])

  const compall = useSelector(state => {
    return state.setHICComplaintLists.HiccomplaintsLists
  })

  const [column] = useState([
    { headerName: 'SlNo', field: 'complaint_slno', minWidth: 90 },
    {
      headerName: 'Complaint Description',
      field: 'complaint_desc',
      autoHeight: true,
      wrapText: true,
      minWidth: 300
    },
    {
      headerName: 'Request Department',
      field: 'sec_name',
      filter: 'true',
      wrapText: true,
      autoHeight: true,
      minWidth: 200
    },
    { headerName: 'Section', field: 'location', minWidth: 200, autoHeight: true, wrapText: true },
    {
      headerName: 'Location',
      field: 'rm_room_name',
      minWidth: 350,
      cellRendererFramework: params => {
        const { rm_room_name, rm_roomtype_name, rm_insidebuildblock_name, rm_floor_name } = params.data
        return (
          <div>
            {rm_room_name !== null ? (
              <div>{`${rm_room_name} (${rm_roomtype_name} - ${rm_insidebuildblock_name} - ${rm_floor_name})`}</div>
            ) : (
              <div>Location not added</div>
            )}
          </div>
        )
      }
    },
    { headerName: 'Complaint Type', field: 'complaint_type_name', filter: 'true', minWidth: 180 },
    {
      headerName: 'Complaint Department',
      field: 'complaint_dept_name',
      filter: 'true',
      minWidth: 200
    },
    { headerName: 'Request Date', field: 'compalint_date', minWidth: 180 }
  ])

  const backtoSetting = useCallback(() => {
    history('/Home')
  }, [history])

  return (
    <CardCloseOnly title="HIC Complaint List" close={backtoSetting}>
      <Box sx={{ p: 1 }}>
        <ComplistAgGridcmp columnDefs={column} tableData={compall} rowHeight={30} />
      </Box>
    </CardCloseOnly>
  )
}

export default memo(HicComplaintList)
