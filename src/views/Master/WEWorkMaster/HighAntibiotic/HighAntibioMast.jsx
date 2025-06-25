import { Box, Grid } from '@mui/material'
import React from 'react'
import { useMemo } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import HighAntibioMastTable from './HighAntibioMastTable'
import { useNavigate } from 'react-router-dom'

const HighAntibioMast = () => {
  const [value, setValue] = useState(0)
  const [count, setcount] = useState(0)
  const history = useNavigate()
  const [highRiskMed, sethighRiskMed] = useState({
    high_item_code: '',
    high_item_desc: '',
    high_item_alias: '',
    high_item_status: false,
  })
  const { high_item_code, high_item_desc, high_item_alias, high_item_status } = highRiskMed
  const gethighdesc = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      sethighRiskMed({ ...highRiskMed, [e.target.name]: value })
    },
    [highRiskMed],
  )

  const refreshWindow = useCallback(() => {
    const reset = {
      high_item_code: '',
      high_item_desc: '',
      high_item_alias: '',
      high_item_status: false,
    }
    sethighRiskMed(reset)
    setValue(0)
  }, [])

  const postdata = useMemo(() => {
    return {
      high_item_code: high_item_code,
      high_item_desc: high_item_desc,
      high_item_alias: high_item_alias,
      high_item_status: high_item_status === true ? 1 : 0,
    }
  }, [high_item_code, high_item_desc, high_item_alias, high_item_status])

  const patchdata = useMemo(() => {
    return {
      high_item_code: high_item_code,
      high_item_desc: high_item_desc,
      high_item_alias: high_item_alias,
      high_item_status: high_item_status === true ? 1 : 0,
    }
  }, [high_item_code, high_item_desc, high_item_alias, high_item_status])

  const formrset = useMemo(() => {
    return {
      high_item_code: '',
      high_item_desc: '',
      high_item_alias: '',
      high_item_status: false,
    }
  }, [])
  const rowSelect = useCallback((params) => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const { high_item_code, high_item_desc, high_item_alias, high_item_status } = data[0]
    const frmdata = {
      high_item_code: high_item_code,
      high_item_desc: high_item_desc,
      high_item_alias: high_item_alias,
      high_item_status: high_item_status === 'yes' ? true : false,
    }
    sethighRiskMed(frmdata)
  }, [])

  const submitanyibiotic = useCallback(
    (e) => {
      e.preventDefault()
      const insertfun = async (postdata) => {
        const result = await axioslogin.post('/highBioticMast/antibiotic', postdata)
        const { message, success } = result.data
        if (success === 1) {
          setcount(count + 1)
          succesNotify(message)
          sethighRiskMed(formrset)
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      const updatefun = async (patchdata) => {
        const result = await axioslogin.patch('/highBioticMast/updatehighbio', patchdata)
        const { message, success } = result.data
        if (success === 2) {
          succesNotify(message)
          setcount(count + 1)
          setValue(0)
          sethighRiskMed(formrset)
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      if (value === 0) {
        insertfun(postdata)
      } else {
        updatefun(patchdata)
      }
    },
    [postdata, patchdata, count, value, formrset],
  )

  const backToSettings = useCallback(() => {
    history(`/Home/Settings`)
  }, [history])

  return (
    <CardMaster
      title="High Antibiotic Master"
      submit={submitanyibiotic}
      close={backToSettings}
      refresh={refreshWindow}
    >
      <Box sx={{ p: 1 }}>
        <Grid container spacing={1}>
          <Grid item xl={4} lg={4}>
            <Grid container spacing={1}>
              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Item Code"
                  type="text"
                  size="sm"
                  name="high_item_code"
                  value={high_item_code}
                  onchange={gethighdesc}
                />
              </Grid>
              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Antibiotic Name"
                  type="text"
                  size="sm"
                  name="high_item_desc"
                  value={high_item_desc}
                  onchange={gethighdesc}
                />
              </Grid>
              <Grid item xl={12} lg={12}>
                <TextFieldCustom
                  placeholder="Short Name"
                  type="text"
                  size="sm"
                  name="high_item_alias"
                  value={high_item_alias}
                  onchange={gethighdesc}
                />
              </Grid>

              <Grid item xl={12} lg={12}>
                <CusCheckBox
                  label="Status"
                  color="primary"
                  size="md"
                  name="high_item_status"
                  variant="outlined"
                  value={high_item_status}
                  checked={high_item_status}
                  onCheked={gethighdesc}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={8} lg={8}>
            <HighAntibioMastTable count={count} rowSelect={rowSelect} />
          </Grid>
        </Grid>
      </Box>
    </CardMaster>
  )
}

export default HighAntibioMast
