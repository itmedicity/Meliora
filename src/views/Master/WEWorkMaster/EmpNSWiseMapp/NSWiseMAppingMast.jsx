import React from 'react'
import DepartmentSelect from 'src/views/CommonSelectCode/DepartmentSelect'
import CardMaster from 'src/views/Components/CardMaster'
import { Box, Grid } from '@mui/material'
import { useState } from 'react'
import DeptSecUnderDept from 'src/views/CommonSelectCode/DeptSecUnderDept'
import EmpNameDeptSecSelect from 'src/views/CommonSelectCode/EmpNameDeptSecSelect'
import BuildingSelect from 'src/views/CommonSelectCode/BuildingSelect'
import FloorSelect from 'src/views/CommonSelectCode/FloorSelect'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import Nurstationwisefloorselect from 'src/views/CommonSelectCode/Nurstationwisefloorselect'
import { useCallback } from 'react'
import { useMemo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import NSWiseMappingTable from './NSWiseMappingTable'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const NSWiseMAppingMast = () => {
  const [dept, setdept] = useState(0)
  const [sec, setsec] = useState(0)
  const [empname, setempname] = useState(0)
  const [building, setbuilding] = useState(0)
  const [floor, setfloor] = useState(0)
  const [nursfloor, setnursefloor] = useState([])
  const [value, setValue] = useState(0)
  const [count, setcount] = useState(0)
  const [empMap, setEmpMap] = useState({
    map_slno: '',
    map_status: false,
  })
  const history = useNavigate()
  const { map_slno, map_status } = empMap
  const updatemapEmp = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setEmpMap({ ...empMap, [e.target.name]: value })
    },
    [empMap],
  )

  const id = useSelector((state) => {
    return state.LoginUserData.empid
  })

  const reset = useMemo(() => {
    return {
      map_slno: '',
      map_status: false,
    }
  }, [])

  const postData = useMemo(() => {
    return {
      map_dept_slno: dept !== 0 ? dept : null,
      map_deptsec_slno: sec !== 0 ? sec : null,
      map_building: building !== 0 ? building : null,
      map_floor: floor !== 0 ? floor : null,
      map_nsurse_station: nursfloor !== [] ? nursfloor : null,
      map_status: map_status === true ? 1 : 0,
      map_emp_id: empname !== 0 ? empname : null,
      create_user: id,
    }
  }, [dept, sec, building, floor, nursfloor, map_status, empname, id])

  const patchdata = useMemo(() => {
    return {
      map_slno: map_slno,
      map_dept_slno: dept !== 0 ? dept : null,
      map_deptsec_slno: sec !== 0 ? sec : null,
      map_building: building !== 0 ? building : null,
      map_floor: floor !== 0 ? floor : null,
      map_nsurse_station: nursfloor !== [] ? nursfloor : null,
      map_status: map_status === true ? 1 : 0,
      map_emp_id: empname !== 0 ? empname : null,
      edit_user: id,
    }
  }, [dept, sec, building, floor, nursfloor, map_status, empname, id, map_slno])

  const rowSelect = useCallback((params) => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const {
      map_slno,
      map_dept_slno,
      map_deptsec_slno,
      map_emp_id,
      map_building,
      map_floor,
      map_status,
      map_nsurse_station,
    } = data[0]
    const frmdata = {
      map_slno: map_slno,
      map_status: map_status === 'yes' ? true : false,
    }
    const obj1 = JSON.parse(map_nsurse_station)
    setEmpMap(frmdata)
    setdept(map_dept_slno !== null ? map_dept_slno : 0)
    setsec(map_deptsec_slno !== null ? map_deptsec_slno : 0)
    setbuilding(map_building !== null ? map_building : 0)
    setfloor(map_floor !== null ? map_floor : 0)
    setnursefloor(obj1)
    setempname(map_emp_id !== null ? map_emp_id : 0)
  }, [])

  const Submitfunction = useCallback(
    (e) => {
      e.preventDefault()
      const insertfun = async (postData) => {
        const result = await axioslogin.post('/weEmpMap/insertWeEmp', postData)
        const { message, success } = result.data
        if (success === 1) {
          setcount(count + 1)
          succesNotify(message)
          setEmpMap(reset)
          setempname(0)
          setbuilding(0)
          setfloor(0)
          setdept(0)
          setsec(0)
          setnursefloor([])
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      const updatefun = async (patchdata) => {
        const result = await axioslogin.patch('/weEmpMap/update', patchdata)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          setcount(count + 1)
          setValue(0)
          setEmpMap(reset)
          setempname(0)
          setbuilding(0)
          setfloor(0)
          setdept(0)
          setsec(0)
          setnursefloor([])
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      if (value === 0 && nursfloor.length !== 0) {
        insertfun(postData)
      } else if (value === 1) {
        updatefun(patchdata)
      } else {
        infoNotify('Please select all details')
      }
    },
    [postData, patchdata, count, value, reset, nursfloor.length],
  )

  const refreshWindow = useCallback(() => {
    const formReset = {
      map_slno: '',
      map_status: false,
    }
    setEmpMap(formReset)
    setempname(0)
    setbuilding(0)
    setfloor(0)
    setdept(0)
    setsec(0)
    setnursefloor([])
  }, [])

  const backToSettings = useCallback(() => {
    history(`/Home/Settings`)
  }, [history])

  return (
    <CardMaster
      title="Nursing Station Mapping Master"
      submit={Submitfunction}
      refresh={refreshWindow}
      close={backToSettings}
    >
      <Box sx={{ p: 1 }}>
        <Grid container spacing={1}>
          <Grid item xl={3} lg={3}>
            <Grid container spacing={1}>
              <Grid item xl={12} lg={12}>
                <DepartmentSelect value={dept} setValue={setdept} />
              </Grid>
              <Grid item xl={12} lg={12}>
                <DeptSecUnderDept value={sec} setValue={setsec} dept={dept} />
              </Grid>
              <Grid item xl={12} lg={12}>
                <EmpNameDeptSecSelect value={empname} setValue={setempname} deptsec={sec} />
              </Grid>

              <Grid item xl={12} lg={12}>
                <BuildingSelect value={building} setValue={setbuilding} />
              </Grid>
              <Grid item xl={12} lg={12}>
                <FloorSelect value={floor} setValue={setfloor} />
              </Grid>
              <Grid item xl={12} lg={12}>
                <Nurstationwisefloorselect
                  value={nursfloor}
                  setValue={setnursefloor}
                  floor={floor}
                />
              </Grid>
              <Grid item xl={12} lg={12}>
                <CusCheckBox
                  label="Status"
                  color="primary"
                  size="md"
                  name="map_status"
                  value={map_status}
                  checked={map_status}
                  onCheked={updatemapEmp}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={9} lg={9}>
            <NSWiseMappingTable rowSelect={rowSelect} count={count} />
          </Grid>
        </Grid>
      </Box>
    </CardMaster>
  )
}

export default NSWiseMAppingMast
