import { IconButton } from '@mui/material'
import React, { memo } from 'react'
import { useState } from 'react'
import { Fragment } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { editicon } from 'src/color/Color'
import { useCallback } from 'react'
import SheetRequiremodel from './SheetRequiremodel'
import CustomeToolTip from 'src/views/Components/CustomeToolTip'

const BedTrackingTable = ({ count, rowSelect, tabledata, rmSlno, setrmSlno, rmNo, setcount }) => {
  const [sheet, setsheet] = useState(0)
  const [open, setopen] = useState(true)
  const [dataa, setdataa] = useState()
  const [shift, setshift] = useState(0)
  const [column] = useState([
    { headerName: 'Slno', field: 'slno', width: 150 },
    { headerName: 'MRD No.', field: 'pt_no' },
    { headerName: 'IPNo', field: 'ip_no', wrapText: true, autoHeight: true },
    { headerName: 'Name', field: 'ptc_ptname', wrapText: true, autoHeight: true },
    { headerName: 'Transfer time', field: 'rmd_occupdate', wrapText: true, autoHeight: true },
    { headerName: 'Realese Time', field: 'rmd_relesedate', wrapText: true, autoHeight: true },
    { headerName: 'Transfer To', field: 'nsc_desc', wrapText: true, autoHeight: true },
    { headerName: 'Bed no.', field: 'bdc_no' },

    {
      headerName: 'Add',
      minWidth: 80,
      cellRenderer: params => {
        if (params.data.rmc_shifing_required !== 1) {
          return (
            <IconButton disabled sx={{ color: editicon, paddingY: 0.5 }}>
              <EditOutlinedIcon />
            </IconButton>
          )
        } else {
          return (
            <IconButton sx={{ color: editicon, paddingY: 0.5 }} onClick={() => rowSelect(params)}>
              <CustomeToolTip title="Edit">
                <EditOutlinedIcon />
              </CustomeToolTip>
            </IconButton>
          )
        }
      }
    },
    {
      headerName: 'shift require',
      minwidth: 80,
      cellRenderer: params => (
        <IconButton onClick={() => SheetRequire(params)} sx={{ color: editicon, paddingY: 0.5 }}>
          <CustomeToolTip title="Verify">
            <HighlightOffIcon />
          </CustomeToolTip>
        </IconButton>
      )
    }
  ])

  const SheetRequire = useCallback(
    params => {
      const data = params.api.getSelectedRows()
      const { sl_no, rmc_shifing_required } = data[0]
      setrmSlno(sl_no)
      setdataa(data)
      setsheet(1)
      setopen(true)
      setshift(rmc_shifing_required)
    },
    [setrmSlno]
  )

  return (
    <Fragment>
      <CusAgGridMast tableData={tabledata} columnDefs={column} height={600} rowHeight={500} />
      {sheet === 1 ? (
        <SheetRequiremodel
          open={open}
          setopen={setopen}
          rmSlno={rmSlno}
          rmNo={rmNo}
          dataa={dataa}
          count={count}
          setcount={setcount}
          shift={shift}
        />
      ) : null}
    </Fragment>
  )
}

export default memo(BedTrackingTable)
