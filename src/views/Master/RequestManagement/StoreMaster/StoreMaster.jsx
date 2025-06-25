import { Box, CssVarsProvider } from '@mui/joy'
import React, { memo, useCallback, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import CRFstoreView from 'src/views/CentralRequestManagement/CRFRequestMaster/Components/CRFstoreView'
import CRFsubStoreView from 'src/views/CentralRequestManagement/CRFRequestMaster/Components/CRFsubStoreView'
import CardMaster from 'src/views/Components/CardMaster'
import DepartmentSelect from 'src/views/CommonSelectCode/DepartmentSelect'
import DeptSecUnderDept from 'src/views/CommonSelectCode/DeptSecUnderDept'
import EmpNameDeptSecSelect from 'src/views/CommonSelectCode/EmpNameDeptSecSelect'
import StoreMasterTable from './StoreMasterTable'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { useNavigate } from 'react-router-dom'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const StoreMaster = () => {
  const [subStoreList, setSubStoreList] = useState([])
  // const [radiovalue, setRadioValue] = useState('');
  const [crsstore, setCrsList] = useState([])
  const [editRowData, setEditRowData] = useState({})
  const [dept, setDept] = useState(0)
  const [deptsec, setDeptsec] = useState(0)
  const [empname, setEmpname] = useState(0)
  const [count, setCount] = useState(0)
  const history = useNavigate()
  const [UpdateFlag, setUpdateFlag] = useState(0)
  const rowSelect = useCallback((params) => {
    // setValue(1)
    const data = params.api.getSelectedRows()
    const { store, sub_store, emid, department, dp_section } = data[0]
    const parsedStore = JSON.parse(store)
    const parsedSubStore = JSON.parse(sub_store)
    setEditRowData(data[0])
    setSubStoreList(parsedSubStore)
    setDept(department)
    setDeptsec(dp_section)
    setEmpname(emid)
    setCrsList(parsedStore)
    setUpdateFlag(1)
  }, [])
  const submitStore = useCallback(
    async (val) => {
      if (dept === 0) {
        warningNotify('Select Department')
      } else {
        const postData = {
          subStoreList: subStoreList,
          crsstore: crsstore,
          dept: dept,
          empId: empname,
          deptsec: deptsec,
        }
        if (UpdateFlag === 1) {
          const result = await axioslogin.post('/newCRFRegister/StoreMaster/update', postData)
          const { success } = result.data
          if (success === 1) {
            succesNotify('Data Updated Sucessfully')
            setCount(1)
          } else {
            warningNotify('Something Went Wrong')
          }
        } else {
          const result = await axioslogin.post('/newCRFRegister/StoreMaster', postData)
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
    [subStoreList, deptsec, empname, dept, crsstore, UpdateFlag],
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
        title="Store Right Master"
        submit={submitStore}
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
            <Box sx={{ mt: 1, overflow: 'auto', border: '1px solid lightgrey' }}>
              <CRFstoreView crsList={crsstore} setList={setCrsList} editRowData={editRowData} />
            </Box>
            <Box sx={{ mt: 1, overflow: 'auto', border: '1px solid lightgrey' }}>
              <CRFsubStoreView
                crsList={subStoreList}
                setList={setSubStoreList}
                editRowData={editRowData}
              />
            </Box>

            <Box sx={{ mt: 1.5 }}>
              {/* <CusCheckBox
                                label="Status"
                                color="primary"
                                size="md"
                                name="status"
                                variant="outlined"
                            value={status}
                            checked={status}
                            onCheked={updateModule}
                            /> */}
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: '100%', p: 1 }}>
          <StoreMasterTable
            count={count}
            setCount={setCount}
            rowSelect={rowSelect}
            setSubStoreList={setSubStoreList}
            setDept={setDept}
            setDeptsec={setDeptsec}
            setEmpname={setEmpname}
            setCrsList={setCrsList}
          />
        </Box>
      </CardMaster>
    </CssVarsProvider>
  )
}

export default memo(StoreMaster)
