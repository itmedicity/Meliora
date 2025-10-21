import React, { useEffect, memo, useCallback, useState, Fragment } from 'react'
import ItemQrDisplayModel from './ItemQrDisplayModel'
import QrCode2Icon from '@mui/icons-material/QrCode2'
import DescriptionIcon from '@mui/icons-material/Description'
import { Box } from '@mui/material'
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain'
import { editicon } from 'src/color/Color'

const ItemListViewTable = ({ assetSpare, displayarry, AddDetails }) => {
  const [disArry, setDisArry] = useState([])






  useEffect(() => {
    if (!Array.isArray(displayarry) || displayarry.length === 0) {
      return
    }


    else if (displayarry.length !== 0) {
      if (assetSpare === 1) {
        const dataaa = displayarry?.map((val, index) => {
          const obj = {
            slno: index + 1,
            am_item_map_slno: val.am_item_map_slno,
            am_category_pm_days: val.am_category_pm_days,
            item_creation_slno: val.item_creation_slno,
            item_dept_slno: val.item_dept_slno,
            item_deptsec_slno: val.item_deptsec_slno,
            deptname: val.deptname,
            secname: val.secname,
            item_custodian_dept: val.item_custodian_dept,
            am_custodian_name: val.am_custodian_name,
            category_name: val.category_name,
            item_name: val.item_name,
            item_asset_no: val.item_asset_no,
            item_asset_no_only: val.item_asset_no_only,
            due_date: val.due_date,
            assetno: val.item_asset_no + '/' + val.item_asset_no_only.toString().padStart(6, '0'),
            am_manufacture_no: val.am_manufacture_no,
            serialno: val.am_manufacture_no !== null ? val.am_manufacture_no : 'Not Updated'
          }
          return obj
        })
        setDisArry(dataaa)
      } else {
        const dataaa = displayarry?.map((val, index) => {
          const obj = {
            slno: index + 1,
            am_spare_item_map_slno: val.am_spare_item_map_slno,
            spare_creation_slno: val.spare_creation_slno,
            spare_dept_slno: val.spare_dept_slno,
            spare_deptsec_slno: val.spare_deptsec_slno,
            deptname: val.deptname,
            secname: val.secname,
            category_name: val.category_name,
            spare_custodian_dept: val.spare_custodian_dept,
            am_custodian_name: val.am_custodian_name,
            item_name: val.item_name,
            spare_asset_no: val.spare_asset_no,
            spare_asset_no_only: val.spare_asset_no_only,
            due_date: val.due_date,
            assetno: val.spare_asset_no + '/' + val.spare_asset_no_only.toString().padStart(6, '0'),
            am_manufacture_no: val.am_manufacture_no,
            serialno: val.am_manufacture_no !== null ? val.am_manufacture_no : 'Not Updated'
          }
          return obj
        })
        setDisArry(dataaa)
      }

    }
  }, [displayarry, assetSpare])




  const [flag, setFlag] = useState(0)
  const [selectedData, setSelectedData] = useState([])
  const [open, setOpen] = useState(false)

  const modeldisplay = useCallback(params => {
    const data = params.api.getSelectedRows()
    setSelectedData(data[0])
    setFlag(1)
    setOpen(true)
  }, [])


  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  //column title setting
  const [column] = useState([
    { headerName: '#', field: 'slno', width: 110 },
    {
      headerName: 'Add Details',
      width: 90,
      cellRenderer: params => {
        return (
          <Box onClick={() => AddDetails(params)} sx={{ color: editicon, cursor: 'pointer' }}>
            <DescriptionIcon />
          </Box>
        )
      }
    },
    {
      headerName: 'QR Code',
      width: 90,
      cellRenderer: params => {
        return (
          <Box onClick={() => modeldisplay(params)} sx={{ color: editicon, cursor: 'pointer' }}>
            <QrCode2Icon />
          </Box>
        )
      }
    },
    {
      headerName: 'Department Section',
      field: 'secname',
      autoHeight: true,
      wrapText: true,
      width: 250,
      filter: 'true'
    },
    {
      headerName: 'Category',
      field: 'category_name',
      autoHeight: true,
      wrapText: true,
      width: 200,
      filter: 'true'
    },
    {
      headerName: 'Asset No',
      field: 'assetno',
      autoHeight: true,
      wrapText: true,
      width: 250,
      filter: 'true'
    },
    {
      headerName: 'Serial No',
      field: 'serialno',
      autoHeight: true,
      wrapText: true,
      width: 250,
      filter: 'true'
    },
    {
      headerName: 'Item Name',
      field: 'item_name',
      autoHeight: true,
      wrapText: true,
      width: 500,
      filter: 'true'
    }
  ])
  return (
    <Fragment>
      {flag === 1 ? <ItemQrDisplayModel open={open} handleClose={handleClose} selectedData={selectedData} /> : null}
      <Box>
        <CusAgGridForMain columnDefs={column} tableData={disArry} />
      </Box>
    </Fragment>
  )
}
export default memo(ItemListViewTable)
