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
import AssetGroupSelectWithoutName from 'src/views/CommonSelectCode/AssetGroupSelectWithoutName'
import { getAmSubGroupList } from 'src/redux/actions/AmSubGroupList.action'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />
})

const SubGroupModal = ({ open, handleClose }) => {
  const dispatch = useDispatch()
  const [group, setGroup] = useState(0)
  // Get login user emp_id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })
  const [subGroupModal, setsubGroupModal] = useState({
    sub_group_name: '',
    sub_group_status: false,
  })
  const { sub_group_name, sub_group_status } = subGroupModal

  const SubGroupUpdate = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setsubGroupModal({ ...subGroupModal, [e.target.name]: value })
    },
    [subGroupModal]
  )

  const reset = () => {
    const formdata = {
      sub_group_name: '',
      sub_group_status: false,
    }
    setsubGroupModal(formdata)
  }

  const postdata = useMemo(() => {
    return {
      sub_group_name: sub_group_name,
      group_slno: group,
      sub_group_status: sub_group_status === true ? 1 : 0,
      create_user: id,
    }
  }, [sub_group_name, sub_group_status, group, id])

  const submitGroup = useCallback(
    e => {
      e.preventDefault()
      const InsertGroup = async postdata => {
        const result = await axioslogin.post('/subgroup/insert', postdata)
        const { message, success } = result.data
        if (success === 1) {
          dispatch(getAmSubGroupList(group))
          succesNotify(message)
          reset()
          handleClose()
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }

      if (sub_group_name !== '') {
        InsertGroup(postdata)
      } else {
        infoNotify('Please Enter SubGroup')
      }
    },
    [postdata, handleClose, group, sub_group_name, dispatch]
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
        <DialogContent id="alert-dialog-slide-descriptiona">
          <Box
            sx={{ width: '100%', height: '90%', borderRadius: 1, border: '0.1px solid #454545' }}
          >
            <Box
              id="alert-dialog-slide-descriptiona"
              sx={{ fontWeight: 'bold', textAlign: 'center', height: '50px', pt: 1 }}
            >
              Add Subgroup
            </Box>
            <Box
              sx={{
                width: 500,
                height: 130,
                pl: 3,
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  height: '32%',
                }}
              >
                <Box sx={{ height: 50, width: '40%' }}>
                  <CssVarsProvider>
                    <Typography sx={{ fontSize: 15 }}>Subgroup</Typography>
                  </CssVarsProvider>
                </Box>
                <Box sx={{ height: 50, width: '55%' }}>
                  <TextFieldCustom
                    placeholder="Subgroup"
                    type="text"
                    size="sm"
                    name="sub_group_name"
                    value={sub_group_name}
                    onchange={SubGroupUpdate}
                  ></TextFieldCustom>
                </Box>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  height: '25%',
                }}
              >
                <Box sx={{ height: 50, width: '40%' }}>
                  <CssVarsProvider>
                    <Typography sx={{ fontSize: 15 }}>Group</Typography>
                  </CssVarsProvider>
                </Box>
                <Box sx={{ height: 50, width: '55%' }}>
                  <AssetGroupSelectWithoutName value={group} setValue={setGroup} />
                </Box>
              </Box>

              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Box sx={{ height: 50, width: '40%' }}>
                  <CssVarsProvider>
                    <Typography sx={{ fontSize: 15 }}>Subgroup Status</Typography>
                  </CssVarsProvider>
                </Box>
                <CusCheckBox
                  color="primary"
                  size="md"
                  name="sub_group_status"
                  value={sub_group_status}
                  checked={sub_group_status}
                  onCheked={SubGroupUpdate}
                ></CusCheckBox>
              </Box>
            </Box>
          </Box>
          <DialogActions>
            <Button color="secondary" onClick={submitGroup}>
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

export default memo(SubGroupModal)
