import { Box, Checkbox, CssVarsProvider } from '@mui/joy'
import React, { memo, useCallback, useState } from 'react'
import DepartmentSelect from 'src/views/CommonSelectCode/DepartmentSelect'
import DeptSecUnderDept from 'src/views/CommonSelectCode/DeptSecUnderDept'
import EmpNameDeptSecSelect from 'src/views/CommonSelectCode/EmpNameDeptSecSelect'
import CardMaster from 'src/views/Components/CardMaster'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import DataCollectionTable from './DataCollectionTable'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
import { useNavigate } from 'react-router-dom'

const DataCollection = () => {
  const [dept, setDept] = useState(0)
  const [deptsec, setDeptsec] = useState(0)
  const [empname, setEmpname] = useState(0)
  const [View_Status, SetViewStatus] = useState(false)
  const history = useNavigate()
  const [UpdateFlag, setUpdateFlag] = useState(0)
  const [count, setCount] = useState(0)

  const rowSelect = useCallback(params => {
    // setValue(1)
    const data = params.api.getSelectedRows()
    const { empid, Depid, Depsec, status } = data[0]
    setDept(Depid)
    setDeptsec(Depsec)
    setEmpname(empid)
    setUpdateFlag(1)
    SetViewStatus(status ? true : false)
  }, [])

  // submit data
  const submitComapnyName = useCallback(
    async () => {
      if (dept === 0) {
        warningNotify('Select Department')
      } else {
        const postData = {
          dept: dept,
          empId: empname,
          deptsec: deptsec,
          View_Status: View_Status === true ? 1 : 0
        }
        if (UpdateFlag === 1) {
          const result = await axioslogin.post('/newCRFRegister/DataCollectionMaster/update', postData)
          const { success } = result.data
          if (success === 1) {
            succesNotify('Data Updated Sucessfully')
            setCount(1)
          } else {
            warningNotify('Something Went Wrong')
          }
        } else {
          const result = await axioslogin.post('/newCRFRegister/DataCollectionMaster', postData)
          const { success } = result.data
          if (success === 1) {
            succesNotify('Data Inserted Sucessfully')
            setCount(1)
          } else {
            warningNotify('Something Went Wrong')
          }
        }
      }
    },
    [View_Status, dept, empname, deptsec, UpdateFlag]
  )

  const refreshWindow = useCallback(() => {
    // setCategory([])
  }, [])
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  return (
    <CssVarsProvider>
      <CardMaster
        title="Data Collection Master  Kmc View"
        submit={submitComapnyName}
        close={backtoSetting}
        refresh={refreshWindow}
      >
        <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
          <Box sx={{ width: '50%', p: 1 }}>
            <Box sx={{}}>
              <DepartmentSelect value={dept} setValue={setDept} />
            </Box>
            <Box sx={{ mt: 1.5 }}>
              <DeptSecUnderDept value={deptsec} setValue={setDeptsec} dept={dept} />
            </Box>
            <Box sx={{ mt: 1.5 }}>
              <EmpNameDeptSecSelect value={empname} setValue={setEmpname} deptsec={deptsec} />
            </Box>
            <Box sx={{ mt: 1.5 }}>
              <Checkbox
                sx={{ color: '#145DA0', fontSize: 14, fontWeight: 'bold' }}
                variant="outlined"
                color="primary"
                size="md"
                label="View_Status"
                name="View_Status"
                // value={WorkOrder}
                checked={View_Status}
                onChange={e => SetViewStatus(e.target.checked)}
              // disabled={quotationCall || datacollFlag || poComplete || poadding}
              />
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: '100%', p: 1 }}>
          <DataCollectionTable
            rowSelect={rowSelect}
            count={count}
            setDept={setDept}
            setDeptsec={setDeptsec}
            setEmpname={setEmpname}
            setCount={setCount}
            SetViewStatus={SetViewStatus}
          />
        </Box>
      </CardMaster>
    </CssVarsProvider>
  )
}

export default memo(DataCollection)
