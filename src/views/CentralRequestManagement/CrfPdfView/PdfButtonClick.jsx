import { Box } from '@mui/material'
import React, { useCallback, memo, useState } from 'react'
import CusIconButton from 'src/views/Components/CusIconButton'
import { Typography } from '@mui/joy'
import FileOpenIcon from '@mui/icons-material/FileOpen'
import { CrfPdfWithDetails } from './CrfPdfWithDetail'
import { axioslogin } from 'src/views/Axios/Axios'
import ProfilePicDefault from 'src/assets/images/nosigature.jpg'
// import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static'
import { urlExist } from 'src/views/Constant/Constant'
import { CrfPdfWithOutDetails } from './CrfPdfWithOutDetails'

const PdfButtonClick = ({ val }) => {
  const [mdsign, setMdSign] = useState(ProfilePicDefault)
  const [edsign, setEdSign] = useState(ProfilePicDefault)

  const PdfDownloadFctn = useCallback(() => {
    const { req_slno, mdid, edid } = val

    const ItemDetailsGet = async req_slno => {
      const result = await axioslogin.get(`/newCRFRegister/getDetailItemList/${req_slno}`)
      return result.data
    }

    const ItemDetailsApproved = async req_slno => {
      const result = await axioslogin.get(`/CRFRegisterApproval/getFinalItemListApproval/${req_slno}`)
      return result.data
    }

    const getMDSign = async () => {
      if (mdid > 0) {
        const profilePic = JSON.stringify(`/signature/signature.jpg`)
        urlExist(profilePic, status => {
          if (status === true) {
            const picUrl = JSON.parse(profilePic)
            setMdSign(picUrl)
          } else {
            setMdSign(ProfilePicDefault)
          }
        })
      }
    }

    const getEDSign = async () => {
      if (edid > 0) {
        const profilePic = JSON.stringify(`/signature/signature.jpg`)
        urlExist(profilePic, status => {
          if (status === true) {
            const picUrl = JSON.parse(profilePic)
            setEdSign(picUrl)
          } else {
            setEdSign(ProfilePicDefault)
          }
        })
      }
    }

    getMDSign()
    getEDSign()

    ItemDetailsGet(req_slno).then(values => {
      const { success, data } = values
      if (success === 1) {
        ItemDetailsApproved(req_slno).then(value => {
          const { succes, dataa } = value
          if (succes === 1) {
            const datas = dataa.map((val, index) => {
              const obj = {
                slno: index + 1,
                req_detl_slno: val.req_detl_slno,
                req_slno: val.req_slno,
                aprox_cost: val.aprox_cost,
                item_status: val.item_status,
                approved_itemunit: val.approved_itemunit !== null ? val.approved_itemunit : 'Not Given',
                approve_item_desc: val.approve_item_desc !== null ? val.approve_item_desc : 'Not Given',
                approve_item_brand: val.approve_item_brand !== '' ? val.approve_item_brand : 'Not Given',
                approve_item_unit: val.approve_item_unit,
                item_qnty_approved: val.item_qnty_approved !== null ? val.item_qnty_approved : 'Not Given',
                approve_item_unit_price:
                  val.approve_item_unit_price !== null ? val.approve_item_unit_price : 'Not Given',
                approve_aprox_cost: val.approve_aprox_cost !== null ? val.approve_aprox_cost : 'Not Given',
                item_status_approved: val.item_status_approved,
                approve_item_status: val.approve_item_status,
                approve_item_delete_who: val.approve_item_delete_who,
                uom_name: val.uom_name,
                approve_item_specification:
                  val.approve_item_specification !== '' ? val.approve_item_specification : 'Not Given',
                old_item_slno: val.old_item_slno !== null ? val.old_item_slno : '',
                item_slno: val.item_slno
              }
              return obj
            })

            CrfPdfWithDetails(val, data, datas, mdsign, edsign)
          } else {
            const datas = []
            CrfPdfWithDetails(val, data, datas, mdsign, edsign)
          }
        })
      } else if (success === 0) {
        CrfPdfWithOutDetails(val, mdsign, edsign)
      } else {
        CrfPdfWithOutDetails(val, mdsign, edsign)
      }
    })
  }, [val, mdsign, edsign])

  return (
    <Box
      sx={{
        height: 40,
        backgroundColor: '#f0f3f5',
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        pt: 0.5,
        pb: 0.5
      }}
    >
      <Box sx={{ pl: 2 }}>
        <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={PdfDownloadFctn}>
          <Typography color="primary" sx={{ fontSize: 15, pl: 1 }}></Typography>
          <FileOpenIcon fontSize="small" />
          <Typography color="primary" sx={{ fontSize: 15, pl: 2, pr: 2 }}>
            View
          </Typography>
        </CusIconButton>
      </Box>
    </Box>
  )
}

export default memo(PdfButtonClick)
