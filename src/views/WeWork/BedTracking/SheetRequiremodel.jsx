import { Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material'
import { Box } from '@mui/system'
import React, { memo } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import { Fragment } from 'react'
// import { ToastContainer } from 'react-toastify'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import Button from '@mui/material/Button'
import { useMemo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'

const SheetRequiremodel = ({ open, setopen, rmSlno, count, setcount }) => {
  const [yes, setyes] = useState(false)
  const [no, setno] = useState(false)

  const getyes = useCallback(e => {
    if (e.target.checked === true) {
      setyes(true)
      setno(false)
    } else {
      setyes(false)
      setno(false)
    }
  }, [])
  const getno = useCallback(e => {
    if (e.target.checked === true) {
      setno(true)
      setyes(false)
    } else {
      setno(false)
      setyes(false)
    }
  }, [])

  const back = useCallback(() => {
    setopen(false)
  }, [setopen])

  const patchdata = useMemo(() => {
    return {
      rmc_shifing_required: yes === true ? 1 : no === true ? 2 : 0,
      sl_no: rmSlno
    }
  }, [yes, rmSlno, no])

  const submitt = useCallback(() => {
    const saveshift = async patchdata => {
      const result = await axioslogin.patch('/WeWork/shidtstatus', patchdata)
      const { message, success } = result.data
      if (success === 2) {
        setcount(count + 1)
        succesNotify(message)
        setyes(false)
        setno(false)
        // setValue(0)
        back()
      } else if (success === 1) {
        infoNotify(message)
      } else {
        infoNotify(message)
      }
    }
    saveshift(patchdata)
  }, [patchdata, count, back, setcount])

  return (
    <Fragment>
      {/* <ToastContainer /> */}
      <Dialog open={open}>
        <DialogContent
          id="alert-dialog-slide-descriptiona"
          sx={{
            width: '100%',
            height: '100%'
          }}
        >
          <DialogContentText id="alert-dialog-slide-descriptiona">sheet require</DialogContentText>
          <Box sx={{ width: 300, p: 1, display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ width: '50%' }}>
              <CusCheckBox
                variant="outlined"
                color="primary"
                size="md"
                name="yes"
                label="yes"
                value={yes}
                onCheked={getyes}
                checked={yes}
              />
            </Box>
            <Box sx={{ width: '50%' }}>
              <CusCheckBox
                variant="outlined"
                color="primary"
                size="md"
                name="no"
                label="No"
                value={no}
                onCheked={getno}
                checked={no}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={submitt}>
            save
          </Button>
          <Button color="secondary" onClick={back}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default memo(SheetRequiremodel)
