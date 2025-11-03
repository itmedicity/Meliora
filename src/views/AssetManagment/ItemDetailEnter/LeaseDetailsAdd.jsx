import { Box } from '@mui/joy'
import { format } from 'date-fns'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import CusIconButton from 'src/views/Components/CusIconButton'
import TextComponent from 'src/views/Components/TextComponent'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import { getLeaseDetailList } from 'src/api/AssetApis'
import { useQuery } from '@tanstack/react-query'
import LeaseAddMast from './LeaseAddMast'
import SupplierSelectMaster from './SupplierSelectMaster'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import CloseIcon from '@mui/icons-material/Close'
import LeaseAddingModal from './LeaseAddingModal'
import AddIcon from '@mui/icons-material/Add'
import { Virtuoso } from 'react-virtuoso'
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded'
import FileView from '../AssetFileView/FileView'
import LinkSharpIcon from '@mui/icons-material/LinkSharp'
import { getFilesFromZip } from 'src/api/FileViewsFn'

const LeaseDetailsAdd = ({ grndetailarry, detailArry }) => {
  const { am_item_map_slno } = detailArry
  const { am_item_map_detl_slno } = grndetailarry

  const id = useSelector(state => {
    return state.LoginUserData.empid
  })

  const [leaseLinkflag, setleaseLinkflag] = useState(0)
  const [supplier, setSupplier] = useState(0)
  const [billDate, setBillDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [SupplerModal, setSupplerModal] = useState(0)
  const [BillArray, setBillArray] = useState([])
  const [count, setCount] = useState(0)
  const [addLeaseFlag, setaddLeaseFlag] = useState(0)
  const [imageshowFlag, setImageShowFlag] = useState(0)
  const [imagearray, setImageArry] = useState([])
  const [imageshow, setImageShow] = useState(false)
  const [leaseAllDetails, setleaseAllDetails] = useState([])
  const [leaseDetail, setLeaseDetal] = useState({
    sup_name: '',
    lease_from: '',
    lease_to: '',
    lease_Amount: '',
    leaseImage: '',
    leaseSlno: ''
  })
  const { sup_name, lease_from, lease_to, lease_Amount, leaseImage, leaseSlno } = leaseDetail

  const updateBillDate = useCallback(e => {
    setBillDate(e.target.value)
  }, [])

  const searchdata = useMemo(() => {
    return {
      lease_suppler_slno: supplier,
      lease_fromdate: billDate
    }
  }, [billDate, supplier])

  const searchLease = useCallback(() => {
    const gettingData = async searchdata => {
      const result = await axioslogin.post('/ItemMapDetails/GetLeaseBySupplNDate', searchdata)
      const { success, data } = result.data
      if (success === 1) {
        setBillArray(data)
        setSupplerModal(1)
      } else {
        warningNotify('No Lease details added under selected conditions')
        setBillArray([])
        setSupplerModal(2)
      }
    }

    if (supplier === 0) {
      warningNotify('Please Select any supplier')
    } else {
      gettingData(searchdata)
    }
  }, [searchdata, supplier])

  const rowSelect = useCallback(value => {
    const { it_supplier_name, lease_fromdate, lease_todate, lease_amount, lease_image, am_lease_mastslno } = value
    const frmdataset = {
      sup_name: it_supplier_name,
      lease_from: lease_fromdate,
      lease_to: lease_todate,
      lease_Amount: lease_amount,
      leaseImage: lease_image,
      leaseSlno: am_lease_mastslno
    }
    setLeaseDetal(frmdataset)
    setaddLeaseFlag(1)
    setleaseLinkflag(0)
    setLeaseFlg(0)
  }, [])

  const [AddLeaseFlg, setLeaseFlg] = useState(0)

  const AddLeaseMaster = useCallback(() => {
    setLeaseFlg(1)
  }, [])



  const ViewLeaseImage = async () => {
    setImageShowFlag(1)
    setImageShow(true)
    const images = await getFilesFromZip('/AssetFileUpload/LeaseMasterImageView', leaseSlno);
    setImageArry(images);
  };


  const ViewLeaseDetailFile = useCallback(async (val) => {
    const { am_lease_mast_slno } = val;
    setImageShowFlag(1);
    setImageShow(true);
    try {
      const images = await getFilesFromZip('/AssetFileUpload/LeaseMasterImageView', am_lease_mast_slno);
      if (images && images.length > 0) {
        setImageArry(images);
      } else {
        setImageArry([]);
        warningNotify('No images attached for this lease.');
      }
    } catch (error) {
      errorNotify('Error fetching documents:', error);
      setImageArry([]);
    }
  }, []);




  const handleClose = useCallback(() => {
    setImageShowFlag(0)
    setImageShow(false)
  }, [])

  const LeasepatchData = useMemo(() => {
    return {
      am_lease_mast_slno: leaseSlno,
      edit_user: id,
      am_item_map_detl_slno: am_item_map_detl_slno,
      am_item_map_slno: am_item_map_slno
    }
  }, [am_item_map_detl_slno, id, leaseSlno, am_item_map_slno])

  const SaveLeaseDetails = useCallback(
    e => {
      e.preventDefault()
      const updateLeaseDetails = async LeasepatchData => {
        const result = await axioslogin.patch('/ItemMapDetails/AMLeaseDetailsUpdate', LeasepatchData)
        const { message, success } = result.data
        if (success === 2) {
          succesNotify(message)
          setBillArray([])
          setSupplerModal(0)
          setCount(count + 1)
          setaddLeaseFlag(0)
        } else {
          warningNotify(message)
        }
      }
      if (leaseSlno !== '') {
        updateLeaseDetails(LeasepatchData)
      } else {
        warningNotify('Please select Lease before save')
      }
    },
    [LeasepatchData, leaseSlno, count]
  )

  const linkLease = useCallback(() => {
    setleaseLinkflag(1)
  }, [])
  const CloseLease = useCallback(() => {
    setleaseLinkflag(0)
  }, [])
  const CloseLeaseFlag = useCallback(() => {
    setaddLeaseFlag(0)
  }, [])

  const { data: LeaseDetailListData } = useQuery({
    queryKey: ['getLeaseDetailList', count],
    enabled: am_item_map_slno !== undefined,
    queryFn: () => getLeaseDetailList(am_item_map_slno)
  })

  const LeaseDetailList = useMemo(() => LeaseDetailListData, [LeaseDetailListData])

  useEffect(() => {
    if (LeaseDetailList) {
      setleaseAllDetails(LeaseDetailList)
    } else {
      setleaseAllDetails([])
    }
  }, [LeaseDetailList])

  return (
    <Box>
      <Box sx={{ border: 1, borderColor: '#E0E1E3', py: 1, pl: 2 }}>
        <TextComponent
          text={'LEASE DETAILS'}
          sx={{
            flex: 1,
            fontWeight: 500,
            color: 'black',
            fontSize: 15
          }}
        />
        <Box
          sx={{
            display: 'flex',
            pt: 0.1,
            pl: 0.8,
            mt: 0.5,
            cursor: 'pointer',
            border: 1,
            width: 100,
            justifyContent: 'center',
            borderRadius: 4,
            borderColor: '#0B6BCB'
          }}
          onClick={linkLease}
        >
          <TextComponent
            text={'Add New '}
            sx={{
              fontSize: 14,
              color: '#0B6BCB',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3), -1px -1px 2px rgba(255, 255, 255, 0.7)',
              transform: 'translateZ(0)'
            }}
          />

          <AddIcon
            sx={{
              p: 0.2,
              color: '#0B6BCB'
            }}
          />
        </Box>

        {AddLeaseFlg === 1 ? <LeaseAddMast setLeaseFlg={setLeaseFlg} /> : null}
        {imageshowFlag === 1 ? <FileView open={imageshow} handleClose={handleClose} images={imagearray} /> : null}
        {leaseLinkflag === 1 ? (
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              mt: 1,
              mb: 2
            }}
          >
            <Box sx={{ width: 500 }}>
              <Box sx={{ display: 'flex', pt: 0.5 }}>
                <TextComponent
                  text={'Supplier'}
                  sx={{
                    fontWeight: 600,
                    color: '#727B8C',
                    pt: 1,
                    width: 120
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <SupplierSelectMaster supplier={supplier} setSupplier={setSupplier} />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', pt: 0.5 }}>
                <TextComponent
                  text={'Bill Date'}
                  sx={{
                    fontWeight: 600,
                    color: '#727B8C',
                    width: 120
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <TextFieldCustom
                    type="date"
                    size="sm"
                    name="billDate"
                    value={billDate}
                    onchange={updateBillDate}
                  ></TextFieldCustom>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', pt: 1 }}>
                <Box sx={{ width: 120 }}></Box>
                <Box sx={{ flex: 1, gap: 0.5, display: 'flex' }}>
                  <Box>
                    <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={searchLease}>
                      <SearchOutlinedIcon fontSize="small" />
                    </CusIconButton>
                  </Box>
                  <Box>
                    <CusIconButton
                      size="sm"
                      variant="outlined"
                      color="primary"
                      clickable="true"
                      onClick={AddLeaseMaster}
                    >
                      <LinkSharpIcon fontSize="small" />
                    </CusIconButton>
                  </Box>
                  <Box>
                    <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={CloseLease}>
                      <CloseIcon fontSize="small" />
                    </CusIconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ flex: 1, py: 0.5, px: 1 }}>
              {SupplerModal === 1 ? (
                <Box sx={{ flex: 1 }}>
                  <LeaseAddingModal BillArray={BillArray} rowSelect={rowSelect} />
                </Box>
              ) : SupplerModal === 2 ? (
                <Box
                  sx={{
                    border: 1,
                    borderColor: 'lightgrey',
                    height: 120,
                    overflow: 'auto',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Box>
                    <TextComponent
                      text={'No  Matched Leased Details'}
                      sx={{
                        flex: 1,
                        fontSize: 32,
                        fontWeight: 700,
                        color: 'lightgrey',
                        pt: 1
                      }}
                    />
                    <Box
                      sx={{
                        bgcolor: '#3D86D0',
                        width: 120,
                        textAlign: 'center',
                        margin: 'auto',
                        borderRadius: 4,
                        color: 'white',
                        fontWeight: 600,
                        cursor: 'pointer',
                        py: 0.3,
                        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3), -2px -2px 4px rgba(255, 255, 255, 0.6)', // Outward shadow effect
                        transform: 'translateZ(0)', // For smoother shadow rendering
                        transition: 'transform 0.2s ease', // Smooth transition on hover
                        '&:hover': {
                          boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.4), -3px -3px 6px rgba(255, 255, 255, 0.7)' // Increase shadow on hover
                        }
                      }}
                      onClick={AddLeaseMaster}
                    >
                      Add New Lease
                    </Box>
                  </Box>
                </Box>
              ) : null}
            </Box>
          </Box>
        ) : null}

        {addLeaseFlag === 1 ? (
          <Box sx={{ flex: 1, display: 'flex' }}>
            <Box sx={{ width: 500 }}>
              <Box sx={{ display: 'flex', pt: 0.5 }}>
                <TextComponent
                  text={'Supplier Name'}
                  sx={{
                    fontWeight: 600,
                    color: '#727B8C',
                    pt: 1,
                    width: 120
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <TextFieldCustom
                    type="text"
                    size="sm"
                    name="sup_name"
                    value={sup_name}
                    disabled={true}
                  ></TextFieldCustom>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', pt: 0.5 }}>
                <TextComponent
                  text={'From Date'}
                  sx={{
                    fontWeight: 600,
                    color: '#727B8C',
                    pt: 1,
                    width: 120
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <TextFieldCustom
                    type="date"
                    size="sm"
                    name="lease_from"
                    value={lease_from}
                    disabled={true}
                  ></TextFieldCustom>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', pt: 0.5 }}>
                <TextComponent
                  text={'To Date'}
                  sx={{
                    fontWeight: 600,
                    color: '#727B8C',
                    pt: 1,
                    width: 120
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <TextFieldCustom
                    type="date"
                    size="sm"
                    name="lease_to"
                    value={lease_to}
                    disabled={true}
                  ></TextFieldCustom>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', pt: 0.5 }}>
                <TextComponent
                  text={'Lease Amount'}
                  sx={{
                    fontWeight: 600,
                    color: '#727B8C',
                    pt: 1,
                    width: 120
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <TextFieldCustom
                    type="text"
                    size="sm"
                    name="lease_Amount"
                    value={lease_Amount}
                    disabled={true}
                  ></TextFieldCustom>
                </Box>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: 120 }}></Box>
                <Box sx={{ flex: 1, my: 0.5 }}>
                  {leaseImage === 1 ? (
                    <Box
                      sx={{
                        bgcolor: '#7AB75E',
                        width: 120,
                        textAlign: 'center',
                        // margin: 'auto',
                        borderRadius: 4,
                        color: 'white',
                        fontWeight: 600,
                        cursor: 'pointer',
                        py: 0.3,
                        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3), -2px -2px 4px rgba(255, 255, 255, 0.6)',
                        transform: 'translateZ(0)',
                        transition: 'transform 0.2s ease',
                        '&:hover': {
                          boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.4), -3px -3px 6px rgba(255, 255, 255, 0.7)'
                        }
                      }}
                      onClick={ViewLeaseImage}
                    >
                      Attached Bill
                    </Box>
                  ) : null}
                </Box>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: 120 }}></Box>
                <Box sx={{ flex: 1, display: 'flex', gap: 0.5 }}>
                  <Box>
                    <CusIconButton
                      size="sm"
                      variant="outlined"
                      color="primary"
                      clickable="true"
                      onClick={SaveLeaseDetails}
                    >
                      <LibraryAddIcon fontSize="small" />
                    </CusIconButton>
                  </Box>
                  <Box>
                    <CusIconButton
                      size="sm"
                      variant="outlined"
                      color="primary"
                      clickable="true"
                      onClick={CloseLeaseFlag}
                    >
                      <CloseIcon fontSize="small" />
                    </CusIconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1 }}></Box>
          </Box>
        ) : null}
      </Box>
      <Box sx={{ border: 1, borderColor: '#E0E1E3', py: 1, px: 2, mt: 0.5 }}>
        <TextComponent
          text={'LEASE DETAILS LIST'}
          sx={{
            flex: 1,
            fontWeight: 500,
            color: 'black',
            fontSize: 15
          }}
        />
        {leaseAllDetails.length === 0 ? (
          <Box
            sx={{
              height: 160,
              fontSize: 24,
              fontWeight: 600,
              color: 'lightgrey',
              textAlign: 'center',
              pt: 5
            }}
          >
            Empty Lease Details
          </Box>
        ) : (
          <Box sx={{ flex: 1, pr: 1, pt: 1 }}>
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                borderTop: 1,
                borderBottom: 1,
                borderColor: 'lightgrey',
                pl: 1,
                py: 0.5,
                gap: 0.5
              }}
            >
              <Box sx={{ flex: 0.1 }}>#</Box>
              <Box sx={{ flex: 0.3 }}>Attachments</Box>
              <Box sx={{ flex: 1 }}>Supplier</Box>
              <Box sx={{ flex: 0.4 }}>From Date</Box>
              <Box sx={{ flex: 0.4 }}>To Date</Box>
              <Box sx={{ flex: 0.4 }}>Amount</Box>
              <Box sx={{ flex: 0.3 }}>Status</Box>
            </Box>
            <Virtuoso
              style={{ height: '28vh' }}
              totalCount={leaseAllDetails?.length}
              itemContent={index => {
                const sortedList = [...leaseAllDetails].sort(
                  (a, b) => (b.status === 1 ? 1 : 0) - (a.status === 1 ? 1 : 0)
                )
                const val = sortedList[index]

                return (
                  <Box
                    key={index}
                    sx={{
                      flex: 1,
                      display: 'flex',
                      borderBottom: 1,
                      borderColor: 'lightgrey',
                      pl: 1,
                      py: 0.6
                    }}
                  >
                    <Box sx={{ flex: 0.1, fontWeight: 600 }}>{index + 1}</Box>
                    <Box sx={{ flex: 0.3, fontWeight: 600, display: 'flex' }}>
                      {val.lease_image === 1 ? (
                        <FilePresentRoundedIcon
                          sx={{ color: '#41729F', cursor: 'pointer' }}
                          onClick={() => ViewLeaseDetailFile(val)}
                        />
                      ) : (
                        <FilePresentRoundedIcon sx={{ color: 'grey', cursor: 'pointer' }} />
                      )}
                    </Box>
                    <Box sx={{ flex: 1, fontWeight: 600 }}>{val.it_supplier_name}</Box>
                    <Box sx={{ flex: 0.4, fontWeight: 600 }}>
                      {val.lease_fromdate ? format(new Date(val.lease_fromdate), 'dd MMM yyyy') : ''}
                    </Box>
                    <Box sx={{ flex: 0.4, fontWeight: 600 }}>
                      {val.lease_todate ? format(new Date(val.lease_todate), 'dd MMM yyyy') : ''}
                    </Box>
                    <Box sx={{ flex: 0.4, fontWeight: 600 }}>{val.lease_amount}</Box>
                    <Box
                      sx={{
                        flex: 0.3,
                        fontWeight: 600,
                        color: val.status === 1 ? 'darkgreen' : val.status === 0 ? '#523A28' : 'black'
                      }}
                    >
                      {val.status === 1
                        ? 'Active *'
                        : val.status === 2
                          ? 'Inactive'
                          : val.status === 0
                            ? 'Expired'
                            : 'NotUpdated'}
                    </Box>
                  </Box>
                )
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default memo(LeaseDetailsAdd)
