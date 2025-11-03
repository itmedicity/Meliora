import { Box, Tab, tabClasses, TabList, TabPanel, Tabs } from '@mui/joy'
import React, { Fragment, memo, useCallback, useState } from 'react'
import JSZip from 'jszip';

import { axioslogin } from 'src/views/Axios/Axios'
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

    //   const getImage = async req_slno => {
    //     const result = await axioslogin.get(`/newCRFRegisterImages/crfRegimageGet/${req_slno}`, {
    //       responseType: 'blob'
    //     });

    //     const cdHeader = result.headers['content-disposition'];
    //     let fileName = 'image.jpg'; // fallback
    //     console.log(cdHeader);

    //     if (cdHeader) {
    //       const filenameRegex = /filename\*?=(?:UTF-8''|")?([^;"']+)(?:[";]|$)/i;
    //       const matches = filenameRegex.exec(cdHeader);
    //       if (matches && matches[1]) {
    //         fileName = matches[1];
    //       }
    //     }

    //     const url = URL.createObjectURL(result.data);
    //     console.log(url, "url");
    //     setImageArry([{ imageName: fileName, url }]);

    //   }
    //   getImage(req_slno)
    //   setEdit(1)
    //   setActiveTab(0)
    // }, [])
    const getImage = async req_slno => {
      try {
        const result = await axioslogin.get(`/newCRFRegisterImages/crfRegimageGet/${req_slno}`, {
          responseType: 'blob'
        });
        const contentType = result.headers['content-type'] || '';
        if (contentType?.includes('application/json')) {
          return;
        } else {
          const zip = await JSZip.loadAsync(result.data);
          // Extract image files (e.g., .jpg, .png)
          const imageEntries = Object.entries(zip.files).filter(
            ([filename]) => /\.(jpe?g|png|gif|pdf)$/i.test(filename)
          );
          // Convert each to a Blob URL
          // const imagePromises = imageEntries.map(async ([filename, fileObj]) => {
          //   const blob = await fileObj.async('blob');
          //   const url = URL.createObjectURL(blob);
          //   console.log(blob);

          //   return { imageName: filename, url, blob };
          // });
          // const images = await Promise.all(imagePromises);
          // setImageArry(images);
          const imagePromises = imageEntries.map(async ([filename, fileObj]) => {
            // Get the original blob (no type)
            const originalBlob = await fileObj.async('blob');

            // Determine MIME type based on filename extension (or any other logic)
            let mimeType = '';
            if (filename.endsWith('.pdf')) {
              mimeType = 'application/pdf';
            } else if (filename.endsWith('.png')) {
              mimeType = 'image/png';
            } else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
              mimeType = 'image/jpeg';
            } else {
              mimeType = 'application/octet-stream'; // fallback
            }

            // Recreate blob with correct type
            const blobWithType = new Blob([originalBlob], { type: mimeType });

            // Create URL from new blob
            const url = URL.createObjectURL(blobWithType);
            return { imageName: filename, url, blob: blobWithType };
          });

          const images = await Promise.all(imagePromises);
          setImageArry(images);
        }
      } catch (error) {
        setImageArry([]);
        console.error('Error fetching or processing images:', error);
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
