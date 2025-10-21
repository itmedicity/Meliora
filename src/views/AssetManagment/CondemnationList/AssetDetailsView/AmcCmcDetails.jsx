import { Box, Table } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import TextComponent from 'src/views/Components/TextComponent'
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import FileView from '../../AssetFileView/FileView'
import { format } from 'date-fns'
import { getFilesFromZip } from 'src/api/FileViewsFn';


const AmcCmcDetails = ({ AssetDetails }) => {

  const { am_item_map_slno } = AssetDetails
  const [amccmcDetailList, setamccmcDetailList] = useState([])
  const [imagearray, setImageArry] = useState([])
  const [imageshow, setImageShow] = useState(false)
  const [imageshowFlag, setImageShowFlag] = useState(0)

  useEffect(() => {
    const getServiceList = async (am_item_map_slno) => {
      const result = await axioslogin.get(`/ItemMapDetails/AmcCmcDetailList/${am_item_map_slno}`)
      const { success, data } = result.data
      if (success === 1) {
        setamccmcDetailList(data)
      }
      else {
        setamccmcDetailList([])
      }
    }
    if (am_item_map_slno !== null || am_item_map_slno !== undefined) {
      getServiceList(am_item_map_slno)
    } else {
      setamccmcDetailList([])
    }
  }, [am_item_map_slno])


  const ViewAmcCmcAttachments = async (val) => {
    const { amccmc_slno } = val;
    setImageShowFlag(1)
    setImageShow(true)
    setImageArry(val);
    const images = await getFilesFromZip('/AssetFileUpload/AmcCmcImageView', amccmc_slno);
    setImageArry(images);
  };

  const handleClose = useCallback(() => {
    setImageShowFlag(0)
    setImageShow(false)
  }, [])

  return (
    <Box sx={{ mb: 1.5 }}>
      {imageshowFlag === 1 ? <FileView open={imageshow} handleClose={handleClose}
        images={imagearray} /> : null}
      <TextComponent
        text={"AMC/CMC DETAILS LIST"}
        sx={{
          flex: 1,
          fontWeight: 500,
          color: 'black',
          fontSize: 15,
        }}
      />

      <Box sx={{ flex: 1, pr: 1, pt: .5 }}>
        {amccmcDetailList.length === 0 ?
          <Box sx={{ height: 80, fontSize: 24, fontWeight: 600, color: 'lightgrey', textAlign: 'center', pt: 2, border: 1, borderColor: '#d3d6dc' }}>
            Empty AMC/CMC Details
          </Box>
          :
          <>
            <Table
              variant="outlined" size='sm'
              stickyHeader

              sx={{
                minWidth: 1000,
                height: '100%',
                borderRadius: 0
              }}
            >
              <thead>
                <tr>
                  <th style={{ width: 50, textAlign: 'center' }}>#</th>
                  <th style={{ width: 80 }}>Files</th>
                  <th style={{ width: 100 }}>AMC/CMC</th>
                  <th>Supplier</th>
                  <th style={{ width: 120 }}>From Date</th>
                  <th style={{ width: 120 }}>To Date</th>
                  <th style={{ width: 100 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {[...amccmcDetailList]
                  .sort((a, b) => (b.status === 1 ? 1 : 0) - (a.status === 1 ? 1 : 0))
                  .map((val, index) => (
                    <tr key={index}>
                      <td style={{ fontWeight: 600, textAlign: 'center' }}>{index + 1}</td>
                      <td>
                        {val.image_upload === 1 ? (
                          <FilePresentRoundedIcon
                            sx={{ color: '#41729F', cursor: 'pointer' }}
                            onClick={() => ViewAmcCmcAttachments(val)}
                          />
                        ) : (
                          <FilePresentRoundedIcon sx={{ color: 'grey' }} />
                        )}
                      </td>
                      <td style={{ fontWeight: 600 }}>
                        {val.master_amc_status === 1
                          ? 'AMC'
                          : val.master_cmc_status === 1
                            ? 'CMC'
                            : 'Not Updated'}
                      </td>
                      <td style={{ fontWeight: 600 }}>{val.it_supplier_name}</td>
                      <td style={{ fontWeight: 600 }}>
                        {val.from_date ? format(new Date(val.from_date), 'dd MMM yyyy') : ''}
                      </td>
                      <td style={{ fontWeight: 600 }}>
                        {val.to_date ? format(new Date(val.to_date), 'dd MMM yyyy') : ''}
                      </td>
                      <td
                        style={{
                          fontWeight: 600,
                          color:
                            val.status === 1
                              ? 'darkgreen'
                              : val.status === 0
                                ? '#523A28'
                                : 'black',
                        }}
                      >
                        {val.status === 1
                          ? 'Active *'
                          : val.status === 2
                            ? 'Inactive'
                            : val.status === 0
                              ? 'Expired'
                              : 'NotUpdated'}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </>}
      </Box>
    </Box>
  )
}

export default memo(AmcCmcDetails)