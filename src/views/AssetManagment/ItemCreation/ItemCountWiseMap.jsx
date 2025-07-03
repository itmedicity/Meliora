import React, { useEffect, memo } from 'react'
import { CssVarsProvider } from '@mui/joy/'
import Table from '@mui/joy/Table'
import { Paper } from '@mui/material'
import { axioslogin } from 'src/views/Axios/Axios'

const ItemCountWiseMap = ({
  getPostData,
  type,
  getPostDataSpare,
  rend,
  getItemcount,
  setDisArry,
  disArry,
}) => {
  useEffect(() => {
    const getData = async getPostData => {
      const result = await axioslogin.post(`/itemCreationDeptmap/getInsertData`, getPostData)
      const { success, data } = result.data
      if (success === 1) {
        const disdata = data?.map((val, index) => {
          const obj = {
            slno: index + 1,
            am_item_map_slno: val.am_item_map_slno,
            item_creation_slno: val.item_creation_slno,
            item_dept_slno: val.item_dept_slno,
            item_deptsec_slno: val.item_deptsec_slno,
            deptname: val.deptname,
            secname: val.secname,
            item_name: val.item_name,
            rm_room_name: val.rm_room_name,
            subroom_name: val.subroom_name,
            assetno: val.item_asset_no + '/' + val.item_asset_no_only.toString().padStart(6, '0'),
          }
          return obj
        })
        setDisArry(disdata)
      } else {
        setDisArry([])
      }
    }
    const getDataSpare = async getPostDataSpare => {
      const result = await axioslogin.post(
        `/itemCreationDeptmap/getInsertSpareData`,
        getPostDataSpare
      )
      const { success, data } = result.data
      if (success === 1) {
        const disdata = data.map((val, index) => {
          const obj = {
            slno: index + 1,
            am_spare_item_map_slno: val.am_spare_item_map_slno,
            spare_creation_slno: val.spare_creation_slno,
            spare_dept_slno: val.spare_dept_slno,
            spare_deptsec_slno: val.spare_deptsec_slno,
            deptname: val.deptname,
            secname: val.secname,
            item_name: val.item_name,
            assetno: val.spare_asset_no + '/' + val.spare_asset_no_only.toString().padStart(6, '0'),
          }
          return obj
        })
        setDisArry(disdata)
      } else {
        setDisArry([])
      }
    }
    if (getItemcount === 1) {
      if (type === 1) {
        getData(getPostData)
      } else {
        getDataSpare(getPostDataSpare)
      }
    }
  }, [getPostData, getPostDataSpare, rend, type, getItemcount, setDisArry])

  return (
    <Paper sx={{ height: 300, overflow: 'auto' }}>
      <CssVarsProvider>
        <Table stickyHeader size="sm" borderAxis="x" sx={{ minHeight: 10 }}>
          <thead>
            <tr>
              <th style={{ width: '1%', align: 'center' }}></th>
              <th style={{ width: '8%', align: 'center' }}>#</th>
              <th style={{ width: '20%', align: 'center' }}>Asset/Spare No</th>
              <th style={{ width: '25%', align: 'center' }}>Department</th>
              <th style={{ width: '25%', align: 'center' }}>Department Section</th>
              <th style={{ width: '60%', align: 'center' }}>Item Name</th>
            </tr>
          </thead>
          <tbody>
            {disArry &&
              disArry.map((val, index) => {
                return (
                  <tr
                    key={index}
                    // sx={{
                    //     '&:last-child td, &:last-child th': { border: 0 },
                    //     minHeight: 5
                    // }}
                  >
                    <td></td>
                    <td> {index + 1}</td>
                    <td> {val.assetno}</td>
                    <td> {val.deptname}</td>
                    <td> {val.secname}</td>
                    <td> {val.item_name}</td>
                  </tr>
                )
              })}
          </tbody>
        </Table>
      </CssVarsProvider>
    </Paper>
  )
}

export default memo(ItemCountWiseMap)
