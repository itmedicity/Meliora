import React, { memo, useEffect, useState } from 'react'
import { Box, CssVarsProvider } from '@mui/joy'
import Table from '@mui/joy/Table'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import EditIcon from '@mui/icons-material/Edit'

const SupplierDetailTable = ({ rowSelect, count }) => {
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    const getAllSupplierDetails = async () => {
      const result = await axioslogin.get('/ItBillSuppDetails/view')
      const { success, data } = result.data
      if (data.length !== 0) {
        if (success === 2) {
          setTableData(data)
        } else {
          setTableData([])
          warningNotify('error occured')
        }
      } else {
        setTableData([])
      }
    }

    getAllSupplierDetails()
  }, [count])

  return (
    <Box sx={{ overflow: 'auto', maxHeight: 400 }}>
      <CssVarsProvider>
        <Table padding={'none'} stickyHeader borderAxis="both" sx={{ overflow: 'auto' }} hoverRow>
          <thead>
            <tr>
              <th rowSpan={2} style={{ width: 40, textAlign: 'center' }}>
                #
              </th>
              <th rowSpan={2} style={{ width: 40, textAlign: 'center' }}>
                #
              </th>
              <th colSpan={7} style={{ textAlign: 'center', width: 1200 }}>
                Supplier Details
              </th>
              <th colSpan={7} style={{ textAlign: 'center', width: 1200 }}>
                escalation Contact Details
              </th>
              <th colSpan={7} style={{ textAlign: 'center', width: 1200 }}>
                Service Contact Details
              </th>
              <th colSpan={7} style={{ textAlign: 'center', width: 1200 }}>
                Sales Contact Details
              </th>
              <th colSpan={7} style={{ textAlign: 'center', width: 1200 }}>
                Secondary Sales Contact Details
              </th>
            </tr>
            <tr style={{ width: 900 }}>
              <th style={{}}>Supplier Name</th>
              <th style={{ borderRightWidth: 0 }}>Phone No. 1</th>
              <th style={{ borderRightWidth: 0 }}>Phone No. 2</th>
              <th style={{ borderRightWidth: 0 }}>Mobile No. 1</th>
              <th style={{ borderRightWidth: 0 }}>Mobile No. 2</th>
              <th style={{ borderRightWidth: 0 }}>Email Id 1</th>
              <th style={{ borderRightWidth: 0 }}>Email Id @</th>
              <th>Supplier Name</th>
              <th style={{ borderRightWidth: 0 }}>Phone No. 1</th>
              <th style={{ borderRightWidth: 0 }}>Phone No. 2</th>
              <th style={{ borderRightWidth: 0 }}>Mobile No. 1</th>
              <th style={{ borderRightWidth: 0 }}>Mobile No. 2</th>
              <th style={{ borderRightWidth: 0 }}>Email Id 1</th>
              <th style={{ borderRightWidth: 0 }}>Email Id @</th>
              <th>Supplier Name</th>
              <th style={{ borderRightWidth: 0 }}>Phone No. 1</th>
              <th style={{ borderRightWidth: 0 }}>Phone No. 2</th>
              <th style={{ borderRightWidth: 0 }}>Mobile No. 1</th>
              <th style={{ borderRightWidth: 0 }}>Mobile No. 2</th>
              <th style={{ borderRightWidth: 0 }}>Email Id 1</th>
              <th style={{ borderRightWidth: 0 }}>Email Id @</th>
              <th>Supplier Name</th>
              <th style={{ borderRightWidth: 0 }}>Phone No. 1</th>
              <th style={{ borderRightWidth: 0 }}>Phone No. 2</th>
              <th style={{ borderRightWidth: 0 }}>Mobile No. 1</th>
              <th style={{ borderRightWidth: 0 }}>Mobile No. 2</th>
              <th style={{ borderRightWidth: 0 }}>Email Id 1</th>
              <th style={{ borderRightWidth: 0 }}>Email Id @</th>
              <th>Supplier Name</th>
              <th style={{ borderRightWidth: 0 }}>Phone No. 1</th>
              <th style={{ borderRightWidth: 0 }}>Phone No. 2</th>
              <th style={{ borderRightWidth: 0 }}>Mobile No. 1</th>
              <th style={{ borderRightWidth: 0 }}>Mobile No. 2</th>
              <th style={{ borderRightWidth: 0 }}>Email Id 1</th>
              <th style={{ borderRightWidth: 0 }}>Email Id @</th>
            </tr>
          </thead>
          {/* <Box sx={{ maxHeight: 400, }}> */}
          <tbody>
            {tableData?.map((val, index) => {
              return (
                <tr key={index}>
                  <td> {index + 1}</td>
                  <td>
                    {' '}
                    <EditIcon sx={{ cursor: 'pointer' }} onClick={() => rowSelect(val)} />
                  </td>
                  <td>{val.it_supplier_name}</td>
                  <td>{val.it_supplier_land_one}</td>
                  <td>{val.it_supplier_land_two}</td>
                  <td>{val.it_supplier_mob_one}</td>
                  <td>{val.it_supplier_mob_two}</td>
                  <td>{val.it_supplier_email_one}</td>
                  <td>{val.it_supplier_email_two}</td>
                  <td>{val.it_supplier_escl_name}</td>
                  <td>{val.it_supplier_escl_land_one}</td>
                  <td>{val.it_supplier_escl_land_two}</td>
                  <td>{val.it_supplier_escl_mob_one}</td>
                  <td>{val.it_supplier_escl_mob_two}</td>
                  <td>{val.it_supplier_escl_email_one}</td>
                  <td>{val.it_supplier_escl_email_two}</td>
                  <td>{val.it_supplier_servperson_name}</td>
                  <td>{val.it_supplier_servperson_land_one}</td>
                  <td>{val.it_supplier_servperson_land_two}</td>
                  <td>{val.it_supplier_servperson_mob_one}</td>
                  <td>{val.it_supplier_servperson_mob_two}</td>
                  <td>{val.it_supplier_servperson_email_one}</td>
                  <td>{val.it_supplier_servperson_email_two}</td>
                  <td>{val.it_supplier_saleperson_name}</td>
                  <td>{val.it_supplier_saleperson_land_one}</td>
                  <td>{val.it_supplier_saleperson_land_two}</td>
                  <td>{val.it_supplier_saleperson_mob_one}</td>
                  <td>{val.it_supplier_saleperson_mob_two}</td>
                  <td>{val.it_supplier_saleperson_email_one}</td>
                  <td>{val.it_supplier_saleperson_email_two}</td>
                  <td>{val.it_supplier_saleperson_second_name}</td>
                  <td>{val.it_supplier_saleperson_second_land_one}</td>
                  <td>{val.it_supplier_saleperson_second_land_two}</td>
                  <td>{val.it_supplier_saleperson_second_mob_one}</td>
                  <td>{val.it_supplier_saleperson_second_mob_two}</td>
                  <td>{val.it_supplier_saleperson_second_email_one}</td>
                  <td>{val.it_supplier_saleperson_second_email_two}</td>
                </tr>
              )
            })}
          </tbody>
          {/* </Box> */}
        </Table>
      </CssVarsProvider>
    </Box>
  )
}

export default memo(SupplierDetailTable)
