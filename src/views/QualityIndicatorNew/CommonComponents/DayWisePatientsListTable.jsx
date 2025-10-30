import { Box, CssVarsProvider, Table, Tooltip } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'
import ModalDayWiseQIView from '../EndoscopyQIMarking/DayWiseReport/ModalDayWiseQIView'
import { format } from 'date-fns'
import IPDayWiseModalView from '../EndoscopyQIMarking/DayWiseReport/IPDayWiseModalView'

const DayWisePatientsListTable = ({ viewData, ipViewReport, qitype }) => {
  const [qiflag, setQiflag] = useState(0)
  const [modalopen, setModalOpen] = useState(false)
  const [rowSelect, setrowSelect] = useState([])
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    if (viewData.length !== 0) {
      const opdata = viewData?.map(val => {
        return {
          endoNo: val.qi_slno,
          ptno: val.ptno,
          ptname: val.ptname,
          ptsex: val.ptsex,
          ptage: val.ptage,
          ptmobile: val.ptmobile,
          doctor_name: val.doctor_name,
          endo_arrival_time: val.endo_arrival_time,
          type: 'OP'
        }
      })
      if (ipViewReport.length !== 0) {
        const ipdata = ipViewReport?.map(val => {
          return {
            endoNo: val.qi_endo_ip_slno,
            ptno: val.ptno,
            ptname: val.ptname,
            ptsex: val.ptsex,
            ptage: val.ptage,
            ptmobile: val.ptmobile,
            doctor_name: val.doctor_name,
            endo_arrival_time: val.endo_arrival_time,
            type: 'IP'
          }
        })
        const finalData = [...opdata, ...ipdata].sort(
          (a, b) => new Date(a.endo_arrival_time) - new Date(b.endo_arrival_time)
        )
        setTableData(finalData)
      } else {
        setTableData(opdata)
      }
    } else {
      if (ipViewReport.length !== 0) {
        const ipdata = ipViewReport?.map(val => {
          return {
            endoNo: val.qi_endo_ip_slno,
            ptno: val.ptno,
            ptname: val.ptname,
            ptsex: val.ptsex,
            ptage: val.ptage,
            ptmobile: val.ptmobile,
            doctor_name: val.doctor_name,
            endo_arrival_time: val.endo_arrival_time,
            type: 'IP'
          }
        })
        setTableData(ipdata)
      } else {
        setTableData([])
      }
    }
  }, [viewData, ipViewReport])

  const IndicatorsView = useCallback(
    val => {
      if (qitype === 1) {
        const { type, endoNo } = val
        if (type === 'OP') {
          const opView = viewData?.find(val => val.qi_slno === endoNo)
          setrowSelect(opView)
          setQiflag(1)
        } else {
          const ipView = ipViewReport?.find(val => val.qi_endo_ip_slno === endoNo)
          setrowSelect(ipView)
          setQiflag(2)
        }

        setModalOpen(true)
      } else {
      }
    },
    [qitype, viewData, ipViewReport]
  )
  const handleClose = useCallback(() => {
    setModalOpen(false)
    setQiflag(0)
  }, [setModalOpen])

  return (
    <Box>
      {qiflag === 1 ? (
        <ModalDayWiseQIView open={modalopen} handleClose={handleClose} rowSelect={rowSelect} />
      ) : qiflag === 2 ? (
        <IPDayWiseModalView open={modalopen} handleClose={handleClose} rowSelect={rowSelect} />
      ) : null}
      {tableData.length !== 0 ? (
        <Box variant="outlined" sx={{ overflow: 'auto', maxHeight: window.innerHeight - 290, padding: 'none' }}>
          <CssVarsProvider>
            <Table
              aria-label="table with sticky header"
              borderAxis="both"
              padding={'none'}
              stickyHeader
              size="sm"
              stickyFooter
              hoverRow
            >
              <thead style={{ alignItems: 'center' }}>
                <tr style={{ height: 0.5 }}>
                  <th size="sm" style={{ width: 50, fontWeight: 650, fontSize: 14, textAlign: 'center' }}>
                    &nbsp; Sl.No
                  </th>
                  <th size="sm" style={{ width: 50, fontWeight: 650, fontSize: 14 }}>
                    &nbsp;Type
                  </th>
                  <th size="sm" style={{ width: 75, fontWeight: 650, fontSize: 14 }}>
                    &nbsp;Patient ID
                  </th>
                  <th size="sm" style={{ width: 150, fontWeight: 650, fontSize: 14 }}>
                    &nbsp;Patient Name
                  </th>
                  <th size="sm" style={{ width: 100, fontWeight: 650, fontSize: 14 }}>
                    &nbsp;Age/Gender
                  </th>
                  <th size="sm" style={{ width: 80, fontWeight: 650, fontSize: 14 }}>
                    &nbsp;Contacts{' '}
                  </th>
                  <th size="sm" style={{ width: 170, fontWeight: 650, fontSize: 14 }}>
                    &nbsp;Doctor Name
                  </th>
                  <th size="sm" style={{ width: 150, fontWeight: 650, fontSize: 14 }}>
                    &nbsp;Arrival Time{' '}
                  </th>
                  <th size="sm" style={{ width: 80, fontWeight: 650, fontSize: 14, textAlign: 'center' }}>
                    &nbsp;View QI{' '}
                  </th>
                </tr>
              </thead>
              <tbody size="small">
                {tableData?.map((val, index) => {
                  return (
                    <tr key={index} size="small" style={{ maxHeight: 2, cursor: 'pointer' }}>
                      <td size="sm" style={{ fontSize: 12, height: 5, textAlign: 'center' }}>
                        {index + 1}
                      </td>
                      <td size="sm" style={{ fontSize: 12, height: 5 }}>
                        &nbsp;{val.type}
                      </td>
                      <td size="sm" style={{ fontSize: 12, height: 5 }}>
                        &nbsp;{val.ptno}
                      </td>
                      <td size="sm" style={{ fontSize: 12, height: 5 }}>
                        &nbsp;{val.ptname}
                      </td>
                      <td size="sm" style={{ fontSize: 12, height: 5 }}>
                        &nbsp;{val.ptage + ' / ' + val.ptsex}
                      </td>
                      <td size="sm" style={{ fontSize: 12, height: 5 }}>
                        &nbsp;{val.ptmobile}
                      </td>
                      <td size="sm" style={{ fontSize: 12, height: 5 }}>
                        &nbsp;{'Dr. ' + val.doctor_name}
                      </td>
                      <td size="sm" style={{ fontSize: 12, height: 5 }}>
                        &nbsp;{format(new Date(val.endo_arrival_time), 'dd-MM-yyyy hh:mm a')}
                      </td>
                      <td size="sm" style={{ textAlign: 'center', height: 5 }}>
                        <CssVarsProvider>
                          <Tooltip title="QI Details" placement="left">
                            <VisibilityTwoToneIcon
                              sx={{
                                color: '#667C30',
                                ':hover': {
                                  // color: '#667C30'
                                  color: '#384910'
                                }
                              }}
                              onClick={() => IndicatorsView(val)}
                            />
                          </Tooltip>
                        </CssVarsProvider>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </CssVarsProvider>
        </Box>
      ) : null}
    </Box>
  )
}

export default memo(DayWisePatientsListTable)
