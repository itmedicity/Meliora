import { Box, Grid } from '@mui/material'
import React, { useMemo, useState } from 'react'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import HallMastertabledetl from './HallMastertabledetl'
import _ from 'underscore'
import { useNavigate } from 'react-router-dom'

const Hallmaster = () => {
  const [count, setcount] = useState(0)
  const [value, setvalue] = useState(0)
  const history = useNavigate()

  const [hall, sethall] = useState({
    hall_slno: '',
    hall_name: '',
    hall_alias: '',
    hall_status: false,
  })

  const { hall_slno, hall_name, hall_alias, hall_status } = hall
  const updatehall = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      sethall({ ...hall, [e.target.name]: value })
    },
    [hall]
  )

  const refereshWindow = useCallback(() => {
    const reset = {
      hall_slno: '',
      hall_name: '',
      hall_alias: '',
      hall_status: false,
    }
    sethall(reset)
  }, [])

  const id = useSelector(state => state.LoginUserData.empid, _.isEqual)

  const formreset = useMemo(() => {
    return {
      hall_slno: '',
      hall_name: '',
      hall_alias: '',
      hall_status: false,
    }
  }, [])

  const postdata = useMemo(() => {
    return {
      hall_name: hall_name,
      hall_alias: hall_alias,
      hall_status: hall_status === true ? 1 : 0,
      create_emid: id,
    }
  }, [hall_name, hall_alias, hall_status, id])

  const patchdata = useMemo(() => {
    return {
      hall_slno: hall_slno,
      hall_name: hall_name,
      hall_alias: hall_alias,
      hall_status: hall_status === true ? 1 : 0,
      update_emid: id,
    }
  }, [hall_slno, hall_name, hall_alias, hall_status, id])

  const submit = useCallback(
    e => {
      e.preventDefault()
      const InsertData = async postdata => {
        const result = await axioslogin.post(`/hallmaster/inserthall`, postdata)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          sethall(formreset)
          setcount(count + 1)
        } else if (success === 2) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }

      const updateData = async patchdata => {
        const result = await axioslogin.patch('/hallmaster/updatehall', patchdata)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          setcount(count + 1)
          sethall(formreset)
        } else if (success === 2) {
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
    [value, postdata, count, patchdata, formreset]
  )

  const rowSelect = useCallback(params => {
    setvalue(1)
    const data = params.api.getSelectedRows()
    const { hall_slno, hall_name, hall_alias, hall_status } = data[0]
    const formdata = {
      hall_slno: hall_slno,
      hall_name: hall_name,
      hall_alias: hall_alias,
      hall_status: hall_status === 'yes' ? true : false,
    }
    sethall(formdata)
  }, [])

  const backToSettings = useCallback(() => {
    history(`/Home/Settings`)
  }, [history])

  return (
    <CardMaster title="Hall Master" submit={submit} close={backToSettings} refresh={refereshWindow}>
      <Box sx={{ p: 1 }}>
        <Grid container spacing={1}>
          <Grid item xl={4} lg={4}>
            <Grid container spacing={1}>
              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Hall name"
                  type="text"
                  size="sm"
                  name="hall_name"
                  value={hall_name}
                  onchange={updatehall}
                />
              </Grid>
              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Hall short name"
                  type="text"
                  size="sm"
                  name="hall_alias"
                  value={hall_alias}
                  onchange={updatehall}
                />
              </Grid>
              <Grid item xl={12} lg={12}>
                <CusCheckBox
                  label="Status"
                  color="primary"
                  size="md"
                  name="hall_status"
                  value={hall_status}
                  checked={hall_status}
                  onCheked={updatehall}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={8} lg={8}>
            <HallMastertabledetl count={count} rowSelect={rowSelect} />
          </Grid>
        </Grid>
      </Box>
    </CardMaster>
  )
}

export default Hallmaster
