import React, { Fragment, memo, useCallback, useState, useMemo } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Slide from '@mui/material/Slide'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
// import { ToastContainer } from 'react-toastify';
import { Box } from '@mui/material'
import { CssVarsProvider, Typography } from '@mui/joy'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { axioslogin } from 'src/views/Axios/Axios'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { useSelector, useDispatch } from 'react-redux'
import AssetModelSelWithoutName from 'src/views/CommonSelectCode/AssetModelSelWithoutName'
import { getSubmodel } from 'src/redux/actions/AmSubmodelList.action'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />
})

const SubModelModal = ({ open, handleClose }) => {
  const dispatch = useDispatch()
  const [model, setModel] = useState(0)
  // Get login user emp_id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })
  const [subModelModal, setSubmodelModal] = useState({
    submodel_name: '',
    submodel_status: false
  })
  const { submodel_name, submodel_status } = subModelModal

  const SubmodelUpdate = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setSubmodelModal({ ...subModelModal, [e.target.name]: value })
    },
    [subModelModal]
  )

  const reset = () => {
    const formdata = {
      submodel_name: '',
      submodel_status: false
    }
    setSubmodelModal(formdata)
  }

  const postdata = useMemo(() => {
    return {
      submodel_name: submodel_name,
      model_slno: model,
      submodel_status: submodel_status === true ? 1 : 0,
      create_user: id
    }
  }, [submodel_name, submodel_status, model, id])

  const submitSubmodel = useCallback(
    e => {
      e.preventDefault()
      const InsertSubmodel = async postdata => {
        const result = await axioslogin.post('/submodel/insert', postdata)
        const { message, success } = result.data
        if (success === 1) {
          dispatch(getSubmodel(model))
          succesNotify(message)
          reset()
          handleClose()
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }

      if (submodel_name !== '') {
        InsertSubmodel(postdata)
      } else {
        infoNotify('Please Enter SubModel')
      }
    },
    [postdata, handleClose, model, dispatch, submodel_name]
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
              Add Submodel
            </Box>
            <Box
              sx={{
                width: 500,
                height: 130,
                pl: 3,
                flexDirection: 'column'
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  height: '32%'
                }}
              >
                <Box sx={{ height: 50, width: '40%' }}>
                  <CssVarsProvider>
                    <Typography sx={{ fontSize: 15 }}>Submodel</Typography>
                  </CssVarsProvider>
                </Box>
                <Box sx={{ height: 50, width: '55%' }}>
                  <TextFieldCustom
                    placeholder="Submodel"
                    type="text"
                    size="sm"
                    name="submodel_name"
                    value={submodel_name}
                    onchange={SubmodelUpdate}
                  ></TextFieldCustom>
                </Box>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  height: '25%'
                }}
              >
                <Box sx={{ height: 50, width: '40%' }}>
                  <CssVarsProvider>
                    <Typography sx={{ fontSize: 15 }}>Model</Typography>
                  </CssVarsProvider>
                </Box>
                <Box sx={{ height: 50, width: '55%' }}>
                  <AssetModelSelWithoutName value={model} setValue={setModel} />
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
                    <Typography sx={{ fontSize: 15 }}>Submodel Status</Typography>
                  </CssVarsProvider>
                </Box>
                <CusCheckBox
                  color="primary"
                  size="md"
                  name="submodel_status"
                  value={submodel_status}
                  checked={submodel_status}
                  onCheked={SubmodelUpdate}
                ></CusCheckBox>
              </Box>
            </Box>
          </Box>

          <DialogActions>
            <Button color="secondary" onClick={submitSubmodel}>
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

export default memo(SubModelModal)
