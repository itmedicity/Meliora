import { Box, Chip, CssVarsProvider, Modal, Tab, tabClasses, TabList, TabPanel, Tabs, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel'
import { axioslogin } from 'src/views/Axios/Axios'
import { useSelector } from 'react-redux'
import { errorNotify, infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined'
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded'
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined'
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined'
import ComFileView from '../CmFileView/ComFileView'
import ServiceFileAttach from 'src/views/AssetManagment/ServiceListSpare/ServiceFileAttach'
import ServiceDocumentModal from 'src/views/AssetManagment/ServiceListSpare/ServiceDocumentModal'
import serviceFold from '../../../../src/assets/images/assetservice/serviceFold.png'
import ServiceAssetUpgrade from 'src/views/AssetManagment/ServiceListSpare/ServiceAssetUpgrade'
import TimelapseIcon from '@mui/icons-material/Timelapse'
import ServicePmTab from 'src/views/AssetManagment/ServiceListSpare/ServicePmTab'
import { getFilesFromZip } from 'src/api/FileViewsFn'

const AssetSpareModal = ({ openSpare, setOpenSpare, setassetSpareFlag, assetSparedetails, complaint_slno }) => {
  const {
    item_asset_no,
    item_name,
    am_item_map_slno,
    am_spare_item_map_slno,
    item_custodian_dept,
    category_name,
    item_asset_no_only,
    am_category_pm_days
  } = assetSparedetails

  const [spareDetails, setSpareDetails] = useState([])
  const [sparez, setSparez] = useState(0)
  const [spareName, setSpareName] = useState('')
  const [spareData, setSpareData] = useState([])
  const [alldetailsService, setAlldetailsService] = useState([])
  const [imageUrls, setImageUrls] = useState([])
  const [selectedImages, setSelectedImages] = useState([])
  const [fileDetails, setfileDetails] = useState([])
  const [deptServiceempList, setdeptServiceempList] = useState({})
  const [imageServiceUrls, setImageServiceUrls] = useState([])
  const [servicefileDetails, setServicefileDetails] = useState([])
  const [billdetailsView, setBilldetailsView] = useState([])
  const [amcCmcDocuments, setamcCmcDocuments] = useState([])
  const [leaseDocuments, setleaseDocuments] = useState([])
  const [assetabout, setassetabout] = useState([])
  const [count, setCount] = useState(0)

  const [imageStates, setImageStates] = useState({
    imageViewOpen: false,
    serviceImageViewOpen: false,
    image: 0,
    imageServiceFlag: 0
  })

  const [documentStates, setDocumentStates] = useState({
    documentOpenCheck: false,
    openDocuments: 0,
    am_bill_mastslno: 0,
    amccmc_slno: 0,
    am_lease_mast_slno: 0
  })

  const id = useSelector(state => {
    return state.LoginUserData.empid
  })

  const getData = useMemo(() => {
    return {
      am_item_map_slno: am_item_map_slno
    }
  }, [am_item_map_slno])

  useEffect(() => {
    const AboutAsset = async () => {
      try {
        const result = await axioslogin.post('/assetSpareDetails/getAssetAlllDetails', getData)
        const { success, data } = result.data
        const { am_bill_mastslno, amccmc_slno, am_lease_mast_slno } = data[0]
        if (success === 2) {
          setassetabout(data)
          setDocumentStates(prev => ({
            ...prev,
            am_bill_mastslno,
            amccmc_slno,
            am_lease_mast_slno
          }))
        } else {
          setassetabout({})
        }
      } catch (error) {
        warningNotify('Error fetching asset details:', error)
      }
    }
    AboutAsset()
  }, [getData])

  const Close = useCallback(() => {
    setassetSpareFlag(0)
    setOpenSpare(false)
  }, [setOpenSpare, setassetSpareFlag])

  useEffect(() => {
    const getAllSpare = async am_item_map_slno => {
      const result = await axioslogin.get(`/complaintreg/SpareDetailsUndercomplaint/${am_item_map_slno}`)
      const { success, data } = result.data
      if (success === 1) {
        setSpareDetails(data)
      } else {
        setSpareDetails([])
      }
    }
    getAllSpare(am_item_map_slno)
  }, [am_item_map_slno, count])

  const servicefunctn = useCallback(
    async val => {
      const { am_spare_item_map_slno, asset_spare_slno, spare_asset_no, spare_asset_no_only } = val

      const patchdata = {
        delete_user: id,
        asset_spare_slno: asset_spare_slno,
        am_spare_item_map_slno: am_spare_item_map_slno
      }
      const postSpareData = {
        cm_complaint_slno: complaint_slno,
        cm_spare_asset_no: spare_asset_no,
        cm_spare_asset_no_only: spare_asset_no_only,
        cm_spare_item_map_slno: am_spare_item_map_slno,
        create_user: id
      }
      const ServiceUpdate = async patchdata => {
        const result = await axioslogin.patch('/ItemMapDetails/spareService', patchdata)
        return result.data
      }
      const SpareComplaintInsert = async postSpareData => {
        const result = await axioslogin.post('/assetSpareDetails/CmSpareComplaintService', postSpareData)
        return result.data
      }
      try {
        const updateResponse = await ServiceUpdate(patchdata)
        const { success, message } = updateResponse
        if (success === 1) {
          succesNotify(message)
          setCount(count + 1)
          const insertResponse = await SpareComplaintInsert(postSpareData)
          const { success: insertSuccess, message: insertMessage } = insertResponse
          if (insertSuccess === 1) {
            succesNotify(insertMessage)
          } else {
            warningNotify(insertMessage)
          }
          setCount(count + 1)
        } else {
          warningNotify(message)
          setCount(count + 1)
        }
      } catch (error) {
        warningNotify('Something went wrong!')
      }
    },
    [id, setCount, count, complaint_slno]
  )

  const AddNewSpare = useCallback(() => {
    if (sparez === 0) {
      infoNotify('Please select Spare')
    } else {
      const isAlreadyAdded = spareData.some(item => item.am_spare_item_map_slno === sparez)
      if (isAlreadyAdded) {
        infoNotify('Spare already added')
        setSparez(0)
      } else {
        const newdata = {
          am_item_map_slno: am_item_map_slno,
          am_spare_item_map_slno: sparez,
          spare_status: 1,
          name: spareName,
          create_user: id
        }
        const datass = [...spareData, newdata]
        setSpareData(datass)
        setSparez(0)
      }
    }
  }, [am_item_map_slno, spareData, sparez, spareName, id])
  const handleDelete = indexToDelete => {
    setSpareData(prevArray => {
      const updatedArray = prevArray.filter((_, index) => index !== indexToDelete)
      return updatedArray
    })
  }
  const SparepostData =
    spareData &&
    spareData.map(val => {
      return {
        am_item_map_slno: val.am_item_map_slno,
        am_spare_item_map_slno: val.am_spare_item_map_slno,
        spare_status: 1,
        create_user: val.create_user
      }
    })

  const [sparecount, setsparecount] = useState(0)
  const AddNewSpareUnderAsset = useCallback(() => {
    const SparedetailInsert = async SparepostData => {
      const result = await axioslogin.post(`/ItemMapDetails/SpareDetailsInsert`, SparepostData)
      const { message, success } = result.data
      if (success === 1) {
        succesNotify('New Spare Added Under Asset')
        setsparecount(sparecount + 1)
        setCount(count + 1)
        setSpareData([])
      } else if (success === 0) {
        infoNotify(message)
      } else {
        infoNotify(message)
      }
    }
    SparedetailInsert(SparepostData)
  }, [SparepostData, count, sparecount])

  const searchData = useMemo(() => {
    return {
      service_item_slno: item_asset_no_only,
      service_asset_spare: item_asset_no
    }
  }, [item_asset_no_only, item_asset_no])

  useEffect(() => {
    const getServiceDetailsAll = async () => {
      const result = await axioslogin.post('/assetSpareDetails/getAllserviceDetails', searchData)
      const { success, data } = result.data
      if (success === 2) {
        if (data.length > 0) {
          setAlldetailsService(data)
        } else {
          setAlldetailsService([])
        }
      } else {
        setAlldetailsService([])
      }
    }
    getServiceDetailsAll()
  }, [searchData, count])


  const fileView = async (val) => {
    const { complaint_slno } = val;
    setImageStates(prev => ({
      ...prev,
      image: 1,
      imageViewOpen: true
    }));
    setfileDetails(val);
    const images = await getFilesFromZip('/complaintFileUpload/uploadFile/getComplaintFile', complaint_slno);
    setImageUrls(images);
  };


  const fileViewAssetService = async (val) => {
    const { am_service_details_slno } = val;
    setImageStates(prev => ({
      ...prev,
      imageServiceFlag: 1,
      serviceimageViewOpen: true
    }));
    setServicefileDetails(val);
    setSelectedImages(val)
    const images = await getFilesFromZip('/complaintFileUpload/uploadFile/getAssetServiceFile', am_service_details_slno);
    setImageServiceUrls(images);
  };




  useEffect(() => {
    if (alldetailsService.length !== 0) {
      const getServEmployees = async () => {
        const updatedServEmployees = {}
        for (let deptServiceemp of alldetailsService) {
          const searchDeptServiceData = {
            serviced_emp_detail_slno: deptServiceemp.serviced_emp_details_slno
          }
          try {
            const result = await axioslogin.post(`assetSpareDetails/getDeptServiceDetailsData`, searchDeptServiceData)
            const { success, data } = result.data
            if (success === 1) {
              updatedServEmployees[deptServiceemp.serviced_emp_details_slno] = data
            } else {
              updatedServEmployees[deptServiceemp.serviced_emp_details_slno] = []
            }
          } catch (error) {
            updatedServEmployees[deptServiceemp.serviced_emp_details_slno] = []
            errorNotify('Error fetching employee details:', error)
          }
        }
        setdeptServiceempList(updatedServEmployees)
      }
      getServEmployees()
    }
  }, [alldetailsService])

  const OpenDocument = useCallback(() => {
    if (billdetailsView.length !== 0) {
      setDocumentStates(prevState => ({
        ...prevState,
        openDocuments: 1,
        documentOpenCheck: true
      }))
    } else {
      infoNotify('No Bills Attached')
    }
  }, [billdetailsView])

  const OpenLeaseDocument = useCallback(() => {
    if (leaseDocuments.length !== 0) {
      setDocumentStates(prevState => ({
        ...prevState,
        openDocuments: 2,
        documentOpenCheck: true
      }))
    } else {
      infoNotify('No Documents Attached')
    }
  }, [leaseDocuments])

  const OpenAMCCMCDocument = useCallback(() => {
    if (amcCmcDocuments.length !== 0) {
      setDocumentStates(prevState => ({
        ...prevState,
        openDocuments: 3,
        documentOpenCheck: true
      }))
    } else {
      infoNotify('No Documents Attached')
    }
  }, [amcCmcDocuments])




  useEffect(() => {
    const { amccmc_slno } = documentStates;
    if (!amccmc_slno) return;
    let isMounted = true;
    const getAmcCmcDocuments = async () => {
      try {
        const images = await getFilesFromZip('/AssetFileUpload/AmcCmcImageView', amccmc_slno);
        if (isMounted) {
          setamcCmcDocuments(images);
        }
      } catch (error) {
        errorNotify('Error fetching AMC/CMC documents:', error);
      }
    };
    getAmcCmcDocuments();
    return () => {
      isMounted = false;
    };
  }, [documentStates.amccmc_slno]);

  useEffect(() => {
    const { am_lease_mast_slno } = documentStates;
    if (!am_lease_mast_slno) return;
    let isMounted = true;
    const getleaseDocuments = async () => {
      try {
        const images = await getFilesFromZip('/AssetFileUpload/LeaseMasterImageView', am_lease_mast_slno);
        if (isMounted) {
          setleaseDocuments(images);
        }
      } catch (error) {
        errorNotify('Error fetching AMC/CMC documents:', error);
      }
    };
    getleaseDocuments();
    return () => {
      isMounted = false;
    };
  }, [documentStates.am_lease_mast_slno]);

  useEffect(() => {
    const { am_bill_mastslno } = documentStates;
    if (!am_bill_mastslno) return;
    let isMounted = true;
    const getDocumentViewBill = async () => {
      try {
        const images = await getFilesFromZip('/AssetFileUpload/BillMasterImageView', am_bill_mastslno);
        if (isMounted) {
          setBilldetailsView(images);
        }
      } catch (error) {
        errorNotify('Error fetching  documents:', error);
      }
    };
    getDocumentViewBill();
    return () => {
      isMounted = false;
    };
  }, [documentStates.am_bill_mastslno]);




  return (
    <Box>
      {documentStates.openDocuments === 1 ? (
        <ServiceDocumentModal
          setopenDocuments={setDocumentStates}
          open={documentStates.documentOpenCheck}
          setdocumetOpenCheck={setDocumentStates}
          DocumentView={billdetailsView}
        />
      ) : documentStates.openDocuments === 2 ? (
        <ServiceDocumentModal
          setopenDocuments={setDocumentStates}
          open={documentStates.documentOpenCheck}
          setdocumetOpenCheck={setDocumentStates}
          DocumentView={leaseDocuments}
        />
      ) : documentStates.openDocuments === 3 ? (
        <ServiceDocumentModal
          setopenDocuments={setDocumentStates}
          open={documentStates.documentOpenCheck}
          setdocumetOpenCheck={setDocumentStates}
          DocumentView={amcCmcDocuments}
        />
      ) : null}

      {imageStates.image === 1 ? (
        <ComFileView
          imageUrls={imageUrls}
          imageViewOpen={imageStates.imageViewOpen}
          selectedImages={selectedImages}
          fileDetails={fileDetails}
          setimage={setImageStates}
          setimageViewOpen={setImageStates}
        />
      ) : null}

      {imageStates.imageServiceFlag === 1 ? (
        <ServiceFileAttach
          imageServiceUrls={imageServiceUrls}
          serviceimageViewOpen={imageStates.serviceImageViewOpen}
          servicefileDetails={servicefileDetails}
          setimageServiceFlag={setImageStates}
          setServiceimageViewOpen={setImageStates}
          item_name={item_name}
          category_name={category_name}
        />
      ) : null}

      <CssVarsProvider>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={openSpare}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pl: 1,
            borderRadius: 10
          }}
        >
          <Box
            sx={{
              width: '90vw',
              height: '98vh',
              bgcolor: 'background.body',
              borderRadius: 'md',
              boxShadow: 'lg',
              display: 'flex',
              flexDirection: 'column',
              py: 2,
              px: 2
            }}
          >
            <Box sx={{ flexShrink: 0 }}>
              <Box sx={{ flex: 1, display: 'flex', p: 1 }}>
                <Box sx={{ flex: 1, color: 'grey', fontWeight: 500, pl: 1.4, pt: 0.8 }}>Asset Detail View</Box>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                  <CancelIcon sx={{ color: 'grey', cursor: 'pointer', height: 30, width: 30 }} onClick={Close} />
                </Box>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  bgcolor: '#FBFCFE',
                  border: 1,
                  mx: 1.5,
                  borderRadius: 5,
                  py: 0.5,
                  borderColor: '#EFEFEF'
                }}
              >
                <Typography
                  sx={{
                    pl: 2,
                    fontWeight: 600,
                    fontSize: 18
                  }}
                >
                  Asset Details
                </Typography>
                <Box sx={{ flex: 1, display: 'flex', mt: 0.5 }}>
                  <Typography sx={{ flex: 0.4, pl: 2, pt: 0.4, fontWeight: 400, fontSize: 14 }}>
                    Asset Number
                  </Typography>
                  <Box sx={{ flex: 3 }}>
                    <Chip sx={{ bgcolor: '#EBEFFB', fontWeight: 500, fontSize: 15 }}>
                      {item_asset_no}/{item_asset_no_only.toString().padStart(6, '0')}
                    </Chip>
                  </Box>
                </Box>
                <Box sx={{ flex: 1, display: 'flex', mt: 0.5 }}>
                  <Typography sx={{ flex: 0.4, pl: 2, pt: 0.4, fontWeight: 400, fontSize: 14 }}>Category</Typography>
                  <Box sx={{ flex: 3 }}>
                    <Chip sx={{ bgcolor: '#EBEFFB', fontWeight: 500, fontSize: 15 }}>{category_name}</Chip>
                  </Box>
                </Box>

                <Box sx={{ flex: 1, display: 'flex', my: 0.5 }}>
                  <Typography sx={{ flex: 0.4, pl: 2, fontWeight: 400, pt: 0.4, fontSize: 14 }}>Asset Name</Typography>
                  <Box sx={{ flex: 3, fontWeight: 500 }}>
                    <Chip sx={{ bgcolor: '#EBEFFB' }}>{item_name}</Chip>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Tabs
                  size="sm"
                  sx={{
                    display: 'flex',
                    mx: 2,
                    bgcolor: 'white',
                    mt: 0.5
                  }}
                >
                  <TabList
                    sx={{
                      pt: 1,
                      justifyContent: 'center',
                      [`&& .${tabClasses.root}`]: {
                        flex: 'initial',
                        bgcolor: 'white',
                        '&:hover': {
                          bgcolor: 'white'
                        },
                        [`&.${tabClasses.selected}`]: {
                          color: 'primary.plainColor',
                          bgcolor: '#EBEFFB',
                          borderBottom: 1.5,
                          '&::after': {
                            height: 20,
                            borderTopLeftRadius: 3,
                            borderTopRightRadius: 3,
                            bgcolor: 'primary.500'
                          }
                        }
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', flex: 1, mb: 0 }}>
                      <Box sx={{ flex: 1, display: 'flex' }}>
                        <Tab value={0} disableIndicator sx={{ color: '#5D6268', fontWeight: 600, py: 0, px: 0.5 }}>
                          <UnarchiveOutlinedIcon />
                          Asset Upgrade&nbsp;&nbsp;
                        </Tab>
                        <Tab value={1} disableIndicator sx={{ color: '#5D6268', fontWeight: 600, py: 0, px: 0.5 }}>
                          <TimelapseIcon />
                          PM Details&nbsp;&nbsp;
                        </Tab>
                        <Tab value={2} disableIndicator sx={{ color: '#5D6268', fontWeight: 600, py: 0, px: 0.5 }}>
                          <LayersOutlinedIcon />
                          Breakdown Details&nbsp;&nbsp;
                        </Tab>
                        <Tab value={3} disableIndicator sx={{ color: '#5D6268', fontWeight: 600, py: 0, px: 0.5 }}>
                          <TextSnippetOutlinedIcon />
                          Documents&nbsp;&nbsp;
                        </Tab>
                      </Box>
                    </Box>
                  </TabList>

                  <TabPanel
                    value={0}
                    sx={{
                      p: 0,
                      flexGrow: 1,
                      overflowY: 'auto',
                      maxHeight: 'calc(90vh - 230px)'
                    }}
                  >
                    <Box
                      sx={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        maxHeight: '100%',
                        m: 0
                      }}
                    >
                      <Box>
                        <ServiceAssetUpgrade
                          spareDetails={spareDetails}
                          serviceSparee={servicefunctn}
                          item_asset_no_only={item_asset_no_only}
                          item_custodian_dept={item_custodian_dept}
                          am_item_map_slno={am_item_map_slno}
                          id={id}
                          sparez={sparez}
                          setSparez={setSparez}
                          setSpareName={setSpareName}
                          count={count}
                          handleDelete={handleDelete}
                          AddNewSpare={AddNewSpare}
                          spareData={spareData}
                          AddNewSpareUnderAsset={AddNewSpareUnderAsset}
                          setCount={setCount}
                          sparecount={sparecount}
                          setsparecount={setsparecount}
                        />
                      </Box>
                    </Box>
                  </TabPanel>
                  <TabPanel
                    value={1}
                    sx={{
                      p: 0,
                      flexGrow: 1,
                      overflowY: 'auto',
                      maxHeight: 'calc(90vh - 230px)'
                    }}
                  >
                    <Box
                      sx={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        maxHeight: '100%',
                        m: 0,
                        pt: 0.5
                      }}
                    >
                      <Box>
                        <ServicePmTab
                          am_item_map_slno={am_item_map_slno}
                          item_asset_no={item_asset_no}
                          am_spare_item_map_slno={am_spare_item_map_slno}
                          item_asset_no_only={item_asset_no_only}
                          am_category_pm_days={am_category_pm_days}
                        />
                      </Box>
                    </Box>
                  </TabPanel>
                  <TabPanel
                    value={2}
                    sx={{
                      p: 0,
                      flexGrow: 1,
                      overflowY: 'auto',
                      maxHeight: 'calc(90vh - 230px)'
                    }}
                  >
                    <Box
                      sx={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        maxHeight: '100%',
                        m: 0,
                        pt: 0.5
                      }}
                    >
                      {alldetailsService.length !== 0 ? (
                        <Box>
                          {alldetailsService?.map((val, index) => {
                            return (
                              <Box key={index} sx={{ ml: 0.5, mb: 2, border: 1, py: 2, mr: 1 }}>
                                <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ px: 1, borderRadius: 10 }}>{index + 1}.</Box>
                                  <Box sx={{ flex: 1 }}>
                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                      <Typography sx={{ flex: 1, fontSize: 15 }}>Ticket No.</Typography>
                                      <Typography
                                        sx={{
                                          flex: 4,
                                          fontWeight: 600,
                                          color: 'Black',
                                          fontSize: 13
                                        }}
                                      >
                                        : {val.complaint_slno !== null ? val.complaint_slno : 'Not Updated'}
                                      </Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                      <Typography sx={{ flex: 1, fontSize: 15 }}>Ticket type.</Typography>
                                      <Typography
                                        sx={{
                                          flex: 4,
                                          fontWeight: 600,
                                          color: 'Black',
                                          fontSize: 13
                                        }}
                                      >
                                        : {val.complaint_type_name !== null ? val.complaint_type_name : 'Not Updated'}
                                      </Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                      <Typography sx={{ flex: 1, fontSize: 15 }}>Ticket desc.</Typography>
                                      <Typography
                                        sx={{
                                          flex: 4,
                                          fontWeight: 600,
                                          color: 'Black',
                                          fontSize: 13
                                        }}
                                      >
                                        : {val.complaint_desc !== null ? val.complaint_desc : 'Not Updated'}
                                      </Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                      <Typography sx={{ flex: 1, fontSize: 15 }}>Section</Typography>
                                      <Typography
                                        sx={{
                                          flex: 4,
                                          fontWeight: 600,
                                          color: 'Black',
                                          fontSize: 13
                                        }}
                                      >
                                        : {val.sec_name !== null ? val.sec_name : 'Not Updated'}
                                      </Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                      <Typography sx={{ flex: 1, fontSize: 15 }}>Location</Typography>
                                      <Typography
                                        sx={{
                                          flex: 4,
                                          fontWeight: 600,
                                          color: 'Black',
                                          fontSize: 13
                                        }}
                                      >
                                        : {val.rm_room_name}
                                        {val.rm_roomtype_name || val.rm_insidebuildblock_name || val.rm_floor_name
                                          ? ` (${val.rm_roomtype_name ? val.rm_roomtype_name : ''}${val.rm_roomtype_name && val.rm_insidebuildblock_name ? ' - ' : ''
                                          }
                                                                ${val.rm_insidebuildblock_name
                                            ? val.rm_insidebuildblock_name
                                            : ''
                                          }${val.rm_insidebuildblock_name && val.rm_floor_name ? ' - ' : ''
                                          }
                                                                ${val.rm_floor_name ? val.rm_floor_name : ''})`
                                          : 'Not Updated'}
                                      </Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                      <Typography sx={{ flex: 1, fontSize: 15 }}>Registered Date</Typography>
                                      <Typography
                                        sx={{
                                          flex: 4,
                                          fontWeight: 600,
                                          color: 'Black',
                                          fontSize: 13
                                        }}
                                      >
                                        : {val.compalint_date !== null ? val.compalint_date : 'Not Updated'}
                                      </Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                      <Typography sx={{ flex: 1, fontSize: 15 }}>Assignees</Typography>
                                      <Box
                                        sx={{
                                          flex: 4,
                                          fontWeight: 600,
                                          color: 'Black',
                                          fontSize: 13
                                        }}
                                      >
                                        {val.assigned_employees
                                          ?.split(',')
                                          .filter(Boolean)
                                          .map((name, index) => (
                                            <Chip
                                              key={index}
                                              size="small"
                                              variant="outlined"
                                              sx={{
                                                bgcolor: '#D3C7A1',
                                                fontSize: 13,
                                                px: 0.8,
                                                marginRight: 0.1
                                              }}
                                            >
                                              {name.trim()}
                                            </Chip>
                                          ))}
                                      </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                      <Typography sx={{ flex: 1, fontSize: 15 }}>Ticket Attachments</Typography>
                                      <Box
                                        sx={{
                                          flex: 4,
                                          fontWeight: 600,
                                          color: 'Black',
                                          fontSize: 13,
                                          pt: 0.5
                                        }}
                                      >
                                        <Box
                                          onClick={() => fileView(val)}
                                          sx={{
                                            bgcolor: '#41729F',
                                            color: 'white',
                                            width: 85,
                                            pl: 1,
                                            borderRadius: 10,
                                            cursor: 'pointer'
                                          }}
                                        >
                                          <FilePresentRoundedIcon
                                            sx={{
                                              color: 'white',
                                              cursor: 'pointer',
                                              height: 20,
                                              width: 18,
                                              pb: 0.1
                                            }}
                                          />
                                          file view
                                        </Box>
                                      </Box>
                                    </Box>
                                    <Typography sx={{ fontWeight: 700, mt: 0.5 }}>
                                      Department serviced Details
                                    </Typography>
                                    <Box
                                      sx={{
                                        flex: 4,
                                        fontWeight: 600,
                                        color: 'Black',
                                        fontSize: 13,
                                        mr: 3
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          display: 'flex',
                                          pl: 0.5,
                                          flex: 1,
                                          mt: 0.5,
                                          bgcolor: '#EBEFFB'
                                        }}
                                      >
                                        <Box sx={{ flex: 0.3 }}>#</Box>
                                        <Box sx={{ flex: 1 }}>Attended by</Box>
                                        <Box sx={{ flex: 2 }}>Serviced Date</Box>
                                        <Box sx={{ flex: 3 }}>Issues Identified</Box>
                                        <Box sx={{ flex: 3 }}>Remarks</Box>
                                      </Box>
                                      {deptServiceempList[val.serviced_emp_details_slno]?.map((emp, index) => (
                                        <Box
                                          key={index}
                                          sx={{
                                            display: 'flex',
                                            pl: 0.5,
                                            flex: 1,
                                            mt: 0.5,
                                            borderBottom: 1,
                                            borderBottomColor: 'lightgrey'
                                          }}
                                        >
                                          <Box sx={{ flex: 0.3 }}>{index + 1}</Box>
                                          <Box sx={{ flex: 1 }}>{emp.em_name}</Box>
                                          <Box sx={{ flex: 2 }}>{emp.serviced_date}</Box>
                                          <Box sx={{ flex: 3 }}>{emp.service_issues_identified}</Box>
                                          <Box sx={{ flex: 3 }}>{emp.serviced_issue_remarks}</Box>
                                        </Box>
                                      ))}
                                    </Box>
                                    <Typography sx={{ fontWeight: 700, mt: 2 }}>Supplier serviced Details</Typography>
                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                      <Typography sx={{ flex: 1, fontSize: 15 }}>Serviced Date</Typography>
                                      <Typography
                                        sx={{
                                          flex: 4,
                                          fontWeight: 600,
                                          color: 'Black',
                                          fontSize: 13
                                        }}
                                      >
                                        : {val.suppl_serviced_date !== null ? val.suppl_serviced_date : 'Not Updated'}
                                      </Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                      <Typography sx={{ flex: 1, fontSize: 15 }}>Services Performed</Typography>
                                      <Typography
                                        sx={{
                                          flex: 4,
                                          fontWeight: 600,
                                          color: 'Black',
                                          fontSize: 13
                                        }}
                                      >
                                        :{' '}
                                        {val.suppl_serviced_remarks !== null
                                          ? val.suppl_serviced_remarks
                                          : 'Not Updated'}
                                      </Typography>
                                    </Box>

                                    <Typography sx={{ fontWeight: 700, mt: 2 }}>Restore Details</Typography>
                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                      <Typography sx={{ flex: 1, fontSize: 15 }}>Restore Date</Typography>
                                      <Typography
                                        sx={{
                                          flex: 4,
                                          fontWeight: 600,
                                          color: 'Black',
                                          fontSize: 13
                                        }}
                                      >
                                        : {val.add_to_store_date !== null ? val.add_to_store_date : 'Not Updated'}
                                      </Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                      <Typography sx={{ flex: 1, fontSize: 15 }}>Restored Employee</Typography>
                                      <Typography
                                        sx={{
                                          flex: 4,
                                          fontWeight: 600,
                                          color: 'Black',
                                          fontSize: 13
                                        }}
                                      >
                                        : {val.em_name !== null ? val.em_name : 'Not Updated'}
                                      </Typography>
                                    </Box>

                                    <Box
                                      onClick={() => fileViewAssetService(val)}
                                      sx={{
                                        bgcolor: '#41729F',
                                        color: 'white',
                                        width: 110,
                                        px: 1,
                                        borderRadius: 10,
                                        cursor: 'pointer',
                                        flex: 4,
                                        fontSize: 13,
                                        mt: 1,
                                        display: 'flex'
                                      }}
                                    >
                                      <FilePresentRoundedIcon
                                        sx={{
                                          color: 'white',
                                          cursor: 'pointer',
                                          height: 20,
                                          width: 18,
                                          pb: 0.1
                                        }}
                                      />
                                      Attachments
                                    </Box>
                                  </Box>
                                </Box>
                              </Box>
                            )
                          })}
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            my: 10,
                            fontWeight: 600,
                            color: 'lightgray',
                            fontSize: 20,
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'center'
                          }}
                        >
                          No Service Done Yet!
                        </Box>
                      )}
                    </Box>
                  </TabPanel>
                  <TabPanel
                    value={3}
                    sx={{
                      p: 0,
                      flexGrow: 1,
                      overflowY: 'auto',
                      maxHeight: 'calc(90vh - 230px)'
                    }}
                  >
                    <Box
                      sx={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        maxHeight: '100%',
                        m: 0,
                        pt: 2
                      }}
                    >
                      {assetabout &&
                        assetabout.length > 0 &&
                        assetabout.map((item, index) => (
                          <Box
                            key={index}
                            sx={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(2, 1fr)',
                              gap: 1
                            }}
                          >
                            <Box
                              sx={{
                                flex: 1,
                                border: 1,
                                borderRadius: 3,
                                borderColor: '#EBEFFB',
                                p: 1
                              }}
                            >
                              <Typography
                                sx={{
                                  flex: 1,
                                  fontWeight: 600,
                                  color: '#394060'
                                }}
                              >
                                Purchase Bills
                              </Typography>
                              <Box sx={{ display: 'flex', flex: 1, mt: 1 }}>
                                <Typography sx={{ width: 110 }}>Bill No.</Typography>
                                <Typography sx={{ flex: 1 }}>{item.am_bill_no || 'Not Updated'}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', flex: 1 }}>
                                <Typography sx={{ width: 110 }}>Bill Date</Typography>
                                <Typography sx={{ flex: 1 }}>{item.am_bill_date || 'Not Updated'}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', flex: 1 }}>
                                <Typography sx={{ width: 110 }}>Bill Amount</Typography>
                                <Typography sx={{ flex: 1 }}>{item.am_bill_amount || 'Not Updated'}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', flex: 1 }}>
                                <Typography sx={{ width: 110 }}>Supplier</Typography>
                                <Typography sx={{ flex: 1 }}>{item.bill_supplier_name || 'Not Updated'}</Typography>
                              </Box>
                              <Box
                                sx={{ flex: 1, height: 40, width: 40, m: 1, cursor: 'pointer' }}
                                onClick={OpenDocument}
                              >
                                <img
                                  src={serviceFold}
                                  alt={serviceFold}
                                  style={{ width: '100%', height: '100%' }}
                                  loading="lazy"
                                />
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                flex: 1,
                                border: 1,
                                borderRadius: 3,
                                borderColor: '#EBEFFB',
                                p: 1
                              }}
                            >
                              <Typography
                                sx={{
                                  flex: 1,
                                  fontWeight: 600,
                                  color: '#394060',
                                  pb: 1
                                }}
                              >
                                AMC/CMC Details
                              </Typography>
                              <Chip sx={{ border: 1, borderColor: '#05445E' }}>
                                {item.amc_status === 1 ? 'AMC' : item.cmc_status === 1 ? 'CMC' : 'not Updated'}
                              </Chip>
                              <Box sx={{ display: 'flex', flex: 1 }}>
                                <Typography sx={{ width: 110 }}>From Date</Typography>
                                <Typography sx={{ flex: 1 }}>{item.from_date || 'Not Updated'}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', flex: 1 }}>
                                <Typography sx={{ width: 110 }}>To Date</Typography>
                                <Typography sx={{ flex: 1 }}>{item.to_date || 'Not Updated'}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', flex: 1 }}>
                                <Typography sx={{ width: 110 }}>Supplier</Typography>
                                <Typography sx={{ flex: 1 }}>{item.amc_cmc_suppliername || 'Not Updated'}</Typography>
                              </Box>
                              <Box
                                sx={{ flex: 1, height: 40, width: 40, m: 1, cursor: 'pointer' }}
                                onClick={OpenAMCCMCDocument}
                              >
                                <img
                                  src={serviceFold}
                                  alt={serviceFold}
                                  style={{ width: '100%', height: '100%' }}
                                  loading="lazy"
                                />
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                flex: 1,
                                border: 1,
                                borderRadius: 3,
                                borderColor: '#EBEFFB',
                                p: 1
                              }}
                            >
                              <Typography
                                sx={{
                                  flex: 1,
                                  fontWeight: 600,
                                  color: '#394060'
                                }}
                              >
                                Lease Details
                              </Typography>
                              <Box sx={{ display: 'flex', flex: 1, mt: 1 }}>
                                <Typography sx={{ width: 110 }}>From Date</Typography>
                                <Typography sx={{ flex: 1 }}>{item.lease_fromdate || 'Not Updated'}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', flex: 1 }}>
                                <Typography sx={{ width: 110 }}>To Date</Typography>
                                <Typography sx={{ flex: 1 }}>{item.lease_todate || 'Not Updated'}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', flex: 1 }}>
                                <Typography sx={{ width: 110 }}>Lease Amount</Typography>
                                <Typography sx={{ flex: 1 }}>{item.lease_amount || 'Not Updated'}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', flex: 1 }}>
                                <Typography sx={{ width: 110 }}>Supplier</Typography>
                                <Typography sx={{ flex: 1 }}>{item.lease_suppliername || 'Not Updated'}</Typography>
                              </Box>
                              <Box
                                sx={{ flex: 1, height: 40, width: 40, m: 1, cursor: 'pointer' }}
                                onClick={OpenLeaseDocument}
                              >
                                <img
                                  src={serviceFold}
                                  alt={serviceFold}
                                  style={{ width: '100%', height: '100%' }}
                                  loading="lazy"
                                />
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                flex: 1,
                                border: 1,
                                borderRadius: 3,
                                borderColor: '#EBEFFB',
                                p: 1
                              }}
                            >
                              <Typography
                                sx={{
                                  flex: 1,
                                  fontWeight: 600,
                                  color: '#394060',
                                  pb: 1
                                }}
                              >
                                Warrenty/Guarantee Details
                              </Typography>
                              <Chip sx={{ border: 1, borderColor: '#05445E' }}>
                                {item.warrenty_status === 1
                                  ? 'Warrenty'
                                  : item.guarenty_status === 1
                                    ? 'Guarentee'
                                    : 'Not Updated'}
                              </Chip>
                              <Box sx={{ display: 'flex', flex: 1 }}>
                                <Typography sx={{ width: 110 }}>From Date</Typography>
                                <Typography sx={{ flex: 1 }}>{item.wargar_from_date || 'Not Updated'}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', flex: 1 }}>
                                <Typography sx={{ width: 110 }}>To Date</Typography>
                                <Typography sx={{ flex: 1 }}>{item.wargar_to_date || 'Not Updated'}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', flex: 1 }}>
                                <Typography sx={{ width: 110 }}>Toll Free No.</Typography>
                                <Typography sx={{ flex: 1 }}>{item.troll_free || 'Not Updated'}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', flex: 1 }}>
                                <Typography sx={{ width: 110 }}>Contact No. 1</Typography>
                                <Typography sx={{ flex: 1 }}>{item.ph_one || 'Not Updated'}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', flex: 1 }}>
                                <Typography sx={{ width: 110 }}>Contact No. 2</Typography>
                                <Typography sx={{ flex: 1 }}>{item.ph_two || 'Not Updated'}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', flex: 1 }}>
                                <Typography sx={{ width: 110 }}>Address</Typography>
                                <Typography sx={{ flex: 1 }}>{item.address || 'Not Updated'}</Typography>
                              </Box>
                            </Box>
                          </Box>
                        ))}
                    </Box>
                  </TabPanel>
                </Tabs>
              </Box>
            </Box>
          </Box>
        </Modal>
      </CssVarsProvider>
    </Box>
  )
}

export default memo(AssetSpareModal)
