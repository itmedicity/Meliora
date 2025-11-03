import React, { Fragment, memo, useCallback, useState, useMemo } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Slide from '@mui/material/Slide'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
// import { ToastContainer } from 'react-toastify';
import { Box } from '@mui/material'
import { Button, CssVarsProvider, Typography } from '@mui/joy'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { axioslogin } from 'src/views/Axios/Axios'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { useSelector, useDispatch } from 'react-redux'
import { getAmManufacture } from 'src/redux/actions/AmManufactureList.actions'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />
})

const Manufacture = ({ open, handleClose }) => {
  const dispatch = useDispatch()
  // Get login user emp_id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })
  const [manufactureModal, setManufactureModal] = useState({
    manufacture_name: '',
    manufacture_status: false
  })
  const { manufacture_name, manufacture_status } = manufactureModal

  const ManufactureUpdate = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setManufactureModal({ ...manufactureModal, [e.target.name]: value })
    },
    [manufactureModal]
  )

  const reset = () => {
    const formdata = {
      manufacture_name: '',
      manufacture_status: false
    }
    setManufactureModal(formdata)
  }

  const postdata = useMemo(() => {
    return {
      manufacture_name: manufacture_name,
      manufacture_status: manufacture_status === true ? 1 : 0,
      create_user: id
    }
  }, [manufacture_name, manufacture_status, id])

  const submitManufacture = useCallback(
    e => {
      e.preventDefault()
      const InsertManufacture = async postdata => {
        const result = await axioslogin.post('/manufacture/insert', postdata)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          reset()
          handleClose()
          dispatch(getAmManufacture())
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }

      if (manufacture_name !== '') {
        InsertManufacture(postdata)
      } else {
        infoNotify('Please Enter Manufacture')
      }
    },
    [postdata, handleClose, dispatch, manufacture_name]
  )

  return (
    <Fragment>
      {/* <ToastContainer /> */}
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-descriptiona"
      >
        <DialogContent
          id="alert-dialog-slide-descriptiona"
        //    sx={{ border: '5px solid #0E4C92' ,borderRadius:1}}
        >
          <Box sx={{ width: '100%', height: '90%', borderRadius: 1, border: '0.1px solid #454545' }}>
            <Box
              id="alert-dialog-slide-descriptiona"
              sx={{ fontWeight: 'bold', textAlign: 'center', height: '50px', pt: 1 }}
            >
              Add Manufacture
            </Box>
            <Box
              sx={{
                width: 500,
                height: 100,
                pl: 3,
                flexDirection: 'column'
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row'
                }}
              >
                <Box sx={{ height: 50, width: '40%' }}>
                  <CssVarsProvider>
                    <Typography sx={{ fontSize: 15 }}>Manufacture</Typography>
                  </CssVarsProvider>
                </Box>
                <Box sx={{ height: 50, width: '55%' }}>
                  <TextFieldCustom
                    placeholder="Manufacture"
                    type="text"
                    size="sm"
                    name="manufacture_name"
                    value={manufacture_name}
                    onchange={ManufactureUpdate}
                  ></TextFieldCustom>
                </Box>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row'
                }}
              >
                <Box sx={{ height: 50, width: '40%' }}>
                  <CssVarsProvider>
                    <Typography sx={{ fontSize: 15 }}>Manufacture Status</Typography>
                  </CssVarsProvider>
                </Box>
                <CusCheckBox
                  color="primary"
                  size="md"
                  name="manufacture_status"
                  value={manufacture_status}
                  checked={manufacture_status}
                  onCheked={ManufactureUpdate}
                ></CusCheckBox>
              </Box>
            </Box>
          </Box>
          <DialogActions>
            <Button color="secondary" onClick={submitManufacture}>
              Save
            </Button>
            <Button color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default memo(Manufacture)
