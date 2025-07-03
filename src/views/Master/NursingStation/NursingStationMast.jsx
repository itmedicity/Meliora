import { Box, Grid } from '@mui/material'
import React, { useMemo, useState, useCallback } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { useNavigate } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useSelector } from 'react-redux'
import NursingStationSelect from 'src/views/CommonSelectCode/NursingStationSelect'
import NursingStationMastTable from './NursingStationMastTable'
import BuildingSelect from 'src/views/CommonSelectCode/BuildingSelect'
import FloorSelect from 'src/views/CommonSelectCode/FloorSelect'
import SelectOraOutlet from 'src/views/CommonSelectCode/SelectOraOutlet'

const NursingStationMast = () => {
  const history = useNavigate()
  //intializing
  const [oranurse, setoranurse] = useState(0)
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const [building, setbuilding] = useState(0)
  const [floor, setfloor] = useState(0)
  const [outlet, setoutlet] = useState(0)
  const [nursstation, setNursStation] = useState({
    nurse_station: '',
    status: false,
    nurse_slno: '',
  })

  //destructuring
  const { nurse_station, status, nurse_slno } = nursstation
  const updateDiet = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setNursStation({ ...nursstation, [e.target.name]: value })
    },
    [nursstation]
  )

  // Get login user emp_id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })

  //Insert postdata
  const postdata = useMemo(() => {
    return {
      co_nurse_desc: nurse_station,
      co_ora_nurse: oranurse,
      co_status: status === true ? 1 : 0,
      em_id: id,
      ns_building: building,
      ns_floor: floor,
      ns_ora_outlet: outlet === 0 ? 'null' : outlet,
    }
  }, [nurse_station, oranurse, status, id, building, floor, outlet])

  //data set for edit
  const rowSelect = useCallback(params => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const {
      co_nurse_slno,
      co_nurse_desc,
      co_ora_nurse,
      co_status,
      ns_building,
      ns_floor,
      ns_ora_outlet,
    } = data[0]
    const frmdata = {
      nurse_station: co_nurse_desc,
      status: co_status === 1 ? true : false,
      nurse_slno: co_nurse_slno,
    }
    setNursStation(frmdata)
    setoranurse(co_ora_nurse)
    setbuilding(ns_building !== null ? ns_building : '')
    setfloor(ns_floor !== null ? ns_building : '')
    setoutlet(ns_ora_outlet !== null ? ns_ora_outlet : '')
  }, [])

  //update data
  const patchdata = useMemo(() => {
    return {
      co_nurse_desc: nurse_station,
      co_ora_nurse: oranurse,
      co_status: status === true ? 1 : 0,
      em_id: id,
      co_nurse_slno: nurse_slno,
      ns_building: building,
      ns_floor: floor,
      ns_ora_outlet: outlet,
    }
  }, [nurse_station, oranurse, status, id, nurse_slno, building, floor, outlet])

  //Submit function for insert and update
  const submitNursestation = useCallback(
    e => {
      e.preventDefault()
      const formReset = {
        nurse_station: '',
        status: false,
        nurse_slno: '',
      }

      /*** * insert function for use call back     */
      const InsertData = async postdata => {
        const result = await axioslogin.post(`/nursestation`, postdata)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          setCount(count + 1)
          setNursStation(formReset)
          setoranurse(0)
          setbuilding(0)
          setfloor(0)
          setoutlet(0)
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }

      /***  * update function for use call back     */
      const updateData = async patchdata => {
        const result = await axioslogin.patch('/nursestation', patchdata)

        const { message, success } = result.data
        if (success === 2) {
          succesNotify(message)
          setCount(count + 1)
          setValue(0)
          setNursStation(formReset)
          setoranurse(0)
          setbuilding(0)
          setfloor(0)
          setoutlet(0)
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }

      if (value === 0) {
        InsertData(postdata)
      } else {
        updateData(patchdata)
      }
    },
    [value, postdata, count, patchdata]
  )

  //Refresh function
  const refreshWindow = useCallback(() => {
    const formReset = {
      nurse_station: '',
      status: false,
    }
    setNursStation(formReset)
    setValue(0)
    setoranurse(0)
    setbuilding(0)
    setfloor(0)
    setoutlet(0)
  }, [setNursStation])

  const backToSettings = useCallback(() => {
    history(`/Home/Settings`)
  }, [history])

  return (
    <CardMaster
      title="Nursing Station Master"
      submit={submitNursestation}
      refresh={refreshWindow}
      close={backToSettings}
    >
      <Box sx={{ p: 1 }}>
        <Grid container spacing={1}>
          <Grid item xl={4} lg={4}>
            <Grid container spacing={1}>
              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Nurse Station"
                  type="text"
                  size="sm"
                  name="nurse_station"
                  value={nurse_station}
                  onchange={updateDiet}
                />
              </Grid>
              <Grid item xl={12} lg={12}>
                <NursingStationSelect value={oranurse} setValue={setoranurse} />
              </Grid>
              <Grid item xl={12} lg={12}>
                <BuildingSelect value={building} setValue={setbuilding} />
              </Grid>
              <Grid item xl={12} lg={12}>
                <FloorSelect value={floor} setValue={setfloor} />
              </Grid>
              <Grid item xl={12} lg={12}>
                <SelectOraOutlet value={outlet} setValue={setoutlet} />
              </Grid>
              <Grid item xl={12} lg={12}>
                <CusCheckBox
                  label="Status"
                  color="primary"
                  size="md"
                  name="status"
                  value={status}
                  checked={status}
                  onCheked={updateDiet}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={8} lg={8}>
            <NursingStationMastTable count={count} rowSelect={rowSelect} />
          </Grid>
        </Grid>
      </Box>
    </CardMaster>

    // <CardMaster title='Nursing station Master'
    //     close={backToSettings}>
    //     <Box sx={{ p: 1 }} elevation={5}>
    //         <Grid container spacing={1}>
    //             <Grid item xl={4} lg={4}>
    //                 <Grid container spacing={1}>
    //                     <Grid item xl={12} lg={12}>
    //                         <TextFieldCustom
    //                             placeholder="Description"
    //                             type="text"
    //                             size="sm"
    //                         />
    //                     </Grid>
    //                     <Grid item xl={12} lg={12}>
    //                         <TextFieldCustom
    //                             placeholder="Short Name"
    //                             type="text"
    //                             size="sm"
    //                         />
    //                     </Grid>
    //                 </Grid>
    //             </Grid>
    //             <Grid item xl={8} lg={8}>
    //                 <NursingStationMastTable />
    //             </Grid>
    //         </Grid>
    //     </Box>
    // </CardMaster>
  )
}
export default NursingStationMast
