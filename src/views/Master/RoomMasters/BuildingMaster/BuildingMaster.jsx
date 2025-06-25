import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React, { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import BuildingTable from './BuildingTable'
import { axioslogin } from 'src/views/Axios/Axios'
const BuildingMaster = () => {
  const history = useNavigate()
  //state for table rendering
  const [count, setCount] = useState(0)
  //state for edit
  const [edit, setEdit] = useState(0)
  //intializing
  const [build, setBuild] = useState({
    build_name: '',
    build_alias: '',
    build_no: '',
    status: false,
    build_code: '',
    em_id: '',
  })
  //destructuring
  const { build_name, build_alias, build_no, status, build_code } = build
  const updateBuilding = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setBuild({ ...build, [e.target.name]: value })
    },
    [build],
  )
  //data for insert
  const postdata = useMemo(() => {
    return {
      build_name: build_name,
      build_alias: build_alias,
      build_no: build_no,
      status: status === true ? 1 : 0,
      em_id: 1,
    }
  }, [build_name, build_alias, build_no, status])
  //data set for edit
  const rowSelect = useCallback((params) => {
    setEdit(1)
    const data = params.api.getSelectedRows()
    const { build_name, build_alias, status, build_no, build_code } = data[0]
    const frmdata = {
      build_name: build_name,
      build_alias: build_alias,
      build_no: build_no,
      status: status === 'Yes' ? true : false,
      build_code: build_code,
    }
    setBuild(frmdata)
  }, [])
  //data for edit
  const patchdata = useMemo(() => {
    return {
      build_name: build_name,
      build_alias: build_alias,
      build_no: build_no,
      status: status === true ? 1 : 0,
      build_code: build_code,
    }
  }, [build_name, build_alias, build_no, status, build_code])
  const submitBuilding = useCallback(
    (e) => {
      e.preventDefault()
      const formreset = {
        build_name: '',
        build_alias: '',
        build_no: '',
        status: false,
        build_code: '',
      }
      /*** * insert function for use call back */
      const InsertFun = async (postdata) => {
        const result = await axioslogin.post('/building', postdata)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          setCount(count + 1)
          setBuild(formreset)
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      /***  * update function for use call back     */
      const updateFun = async (patchdata) => {
        const result = await axioslogin.patch('/building', patchdata)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          setCount(count + 1)
          setEdit(0)
          setBuild(formreset)
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      /*** edit=0 insert api call work else update call
       * edit initialy '0' when edit button click value changes to '1'
       */
      if (edit === 0) {
        InsertFun(postdata)
      } else {
        updateFun(patchdata)
      }
    },
    [edit, postdata, patchdata, count],
  )
  //close button function
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  //refresh func
  const refreshWindow = useCallback(() => {
    const formreset = {
      build_name: '',
      build_alias: '',
      build_no: '',
      status: false,
      build_code: '',
    }
    setBuild(formreset)
    setEdit(0)
  }, [setBuild])
  return (
    <CardMaster
      title="Building Master"
      close={backtoSetting}
      submit={submitBuilding}
      refresh={refreshWindow}
    >
      <Box sx={{ p: 1 }}>
        <Grid container spacing={1}>
          <Grid item xl={4} lg={4}>
            <Grid container spacing={1}>
              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Building Name"
                  type="text"
                  size="sm"
                  name="build_name"
                  value={build_name}
                  onchange={updateBuilding}
                />
              </Grid>
              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Build Alias"
                  type="text"
                  size="sm"
                  name="build_alias"
                  value={build_alias}
                  onchange={updateBuilding}
                />
              </Grid>
              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Build no"
                  type="text"
                  size="sm"
                  name="build_no"
                  value={build_no}
                  onchange={updateBuilding}
                />
              </Grid>
              <Grid item lg={2} xl={2}>
                <CusCheckBox
                  label="Status"
                  color="primary"
                  size="md"
                  name="status"
                  value={status}
                  checked={status}
                  onCheked={updateBuilding}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={8} xl={8}>
            <BuildingTable count={count} rowSelect={rowSelect} />
          </Grid>
        </Grid>
      </Box>
    </CardMaster>
  )
}
export default BuildingMaster
