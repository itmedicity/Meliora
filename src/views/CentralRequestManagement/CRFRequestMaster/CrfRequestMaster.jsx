import { Box, CssVarsProvider, Tab, tabClasses, TabList, TabPanel, Tabs } from '@mui/joy'
import React, { Fragment, memo, useCallback, useState } from 'react'

import { axioslogin } from 'src/views/Axios/Axios'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static'
import CrfRegistration from './Registration/CrfRegistration'
import CrfReqstTableView from './ViewCRFDetails/CrfReqstTableView'

const CrfRequestMaster = () => {
  const [editRowData, setEditRowData] = useState({})
  const [edit, setEdit] = useState(0)
  const [activeTab, setActiveTab] = useState(0)
  const [detailDataDis, setDetailDataDis] = useState([])
  const [imagearray, setImageArry] = useState([])
  const rowSelect = useCallback(val => {
    setEditRowData(val)
    const { req_slno } = val
    const InsertFun = async req_slno => {
      const result = await axioslogin.get(`/newCRFRegister/getDetailItemList/${req_slno}`)
      const { success, data } = result.data
      if (success === 1) {
        const datas = data?.map(val => {
          const obj = {
            item_slno: val.item_slno,
            item_desc: val.item_desc,
            item_brand: val.item_brand,
            item_qty: val.item_qnty,
            item_unit: val.item_unit,
            item_spec: val.item_specification,
            item_unitprice: val.item_unit_price,
            uomName: val.uom_name,
            approx_cost: val.aprox_cost,
            req_detl_slno: val.req_detl_slno
          }
          return obj
        })
        setDetailDataDis(datas)
      } else {
        setDetailDataDis([])
      }
    }
    InsertFun(req_slno)

    const getImage = async req_slno => {
      const result = await axioslogin.get(`/newCRFRegisterImages/crfRegimageGet/${req_slno}`)
      const { success, data } = result.data
      if (success === 1) {
        const fileNames = data
        const fileUrls = fileNames.map(fileName => {
          return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/${fileName}`
        })
        const savedFiles = fileUrls.map(val => {
          const parts = val.split('/')
          const fileNamePart = parts[parts.length - 1]
          const obj = {
            imageName: fileNamePart,
            url: val
          }
          return obj
        })
        setImageArry(savedFiles)
      }
    }
    getImage(req_slno)
    setEdit(1)
    setActiveTab(0)
  }, [])

  return (
    <Fragment>
      <Box sx={{ bgcolor: '#E3EFF9', width: '100%' }}>
        {/* <CssVarsProvider> */}
        <Tabs
          aria-label="tabs"
          value={activeTab}
          onChange={(event, newValue) => setActiveTab(newValue)}
          sx={{ bgcolor: 'var(--royal-purple-50)' }}
        >
          <TabList
            disableUnderline
            sx={{
              border: '1px solid lightblue',
              gap: 0.3,
              [`& .${tabClasses.root}[aria-selected="true"]`]: {
                boxShadow: 'sm',
                backgroundColor: 'var( --royal-purple-300)',
                color: 'white'
              }
            }}
          >
            <Tab
              disableIndicator
              sx={{
                borderTopLeftRadius: 50,
                ml: 0.5,
                height: 30,
                bgcolor: 'white',
                border: '1px solid #c5cae9',
                transition: 'transform 0.2s',
                width: 300,
                m: 0.2,
                '&:hover': {
                  transform: 'scale(1.01)',
                  bgcolor: 'white'
                }
              }}
            >
              Common Request Form (CRF)
            </Tab>
            <Tab
              disableIndicator
              sx={{
                borderTopLeftRadius: 50,
                height: 30,
                bgcolor: 'white',
                border: '1px solid #c5cae9',
                transition: 'transform 0.2s',
                width: 300,
                m: 0.2,
                '&:hover': {
                  transform: 'scale(1.01)',
                  bgcolor: 'white'
                }
              }}
            >
              View
            </Tab>
          </TabList>
          <TabPanel value={0} sx={{ p: 0 }}>
            <CrfRegistration
              editRowData={editRowData}
              setEditRowData={setEditRowData}
              edit={edit}
              setEdit={setEdit}
              detailDataDis={detailDataDis}
              setDetailDataDis={setDetailDataDis}
              imagearray={imagearray}
              setImageArry={setImageArry}
            />
          </TabPanel>
          <TabPanel value={1} sx={{ p: 0 }}>
            <CrfReqstTableView rowSelect={rowSelect} />
          </TabPanel>
        </Tabs>
        {/* </CssVarsProvider> */}
      </Box>
    </Fragment>
  )
}

export default memo(CrfRequestMaster)
