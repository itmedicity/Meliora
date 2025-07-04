import React, { Fragment, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import CustomToolTipForCRF from 'src/views/CentralRequestManagement/ComonComponent/Components/CustomToolTipForCRF'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Paper } from '@mui/material'
import { Box, CssVarsProvider, Table } from '@mui/joy'
const ApprovalMappingTable = ({ count, rowSelect }) => {
  const [tabledata, setTabledata] = useState([])
  useEffect(() => {
    const getData = async () => {
      const result = await axioslogin.get('/approvalMapping/view')
      const { success, data } = result.data
      if (success === 1) {
        setTabledata(data)
      } else {
        setTabledata([])
      }
    }
    getData()
  }, [count])
  return (
    <Fragment>
      {tabledata.length !== 0 ? (
        <Paper
          variant="outlined"
          sx={{
            overflow: 'auto',
            height: window.innerHeight - 420,
            flexWrap: 'wrap',
            '&::-webkit-scrollbar': { height: 8 }
          }}
        >
          <CssVarsProvider>
            <Table padding={'none'} stickyHeader borderAxis="both">
              <thead style={{ height: 4 }} size="small">
                <tr style={{ height: 4 }} size="small">
                  <th size="sm" style={{ width: 50, textAlign: 'center' }}></th>
                  <th size="sm" style={{ width: 100, textAlign: 'left' }}>
                    Sl.No
                  </th>
                  <th size="sm" style={{ width: 200, textAlign: 'left' }}>
                    Company Name
                  </th>
                  <th size="sm" style={{ width: 200, textAlign: 'left' }}>
                    Medical Director
                  </th>
                  <th size="sm" style={{ width: 350, textAlign: 'left' }}>
                    Executive Director
                  </th>
                  <th size="sm" style={{ width: 200, textAlign: 'left' }}>
                    Managing Director
                  </th>
                </tr>
              </thead>
              <tbody size="small" style={{ height: 4 }}>
                {tabledata?.map((val, index) => (
                  <tr key={index} style={{ height: 4 }} size="small">
                    <td>
                      <CustomToolTipForCRF title="Edit" placement="right">
                        <EditOutlinedIcon
                          sx={{
                            fontSize: 'lg',
                            color: '#3e2723',
                            height: 25,
                            width: 30,
                            borderRadius: 2,
                            boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                            '&:hover': {
                              transform: 'scale(1.1)'
                            }
                          }}
                          onClick={() => rowSelect(val)}
                        />
                      </CustomToolTipForCRF>
                    </td>
                    <td style={{ fontSize: 13 }}>{index + 1}</td>
                    <td style={{ fontSize: 13 }}>{val.company_name}</td>
                    <td style={{ fontSize: 13 }}>
                      {val.medical_director_approve === 1 ? `${val.MD_em_name} (${val.MD_em_no})` : 'Nil'}
                    </td>
                    <td style={{ fontSize: 13 }}>
                      {val.executive_director_approve === 1 ? `${val.ED_em_name} (${val.ED_em_no})` : 'Nil'}
                    </td>
                    <td style={{ fontSize: 13 }}>
                      {val.managing_director_approve === 1 ? `${val.MA_em_name} (${val.MA_em_no})` : 'Nil'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CssVarsProvider>
        </Paper>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: 25,
            opacity: 0.5,
            pt: 10,
            color: 'grey'
          }}
        ></Box>
      )}
    </Fragment>
  )
}

export default ApprovalMappingTable
