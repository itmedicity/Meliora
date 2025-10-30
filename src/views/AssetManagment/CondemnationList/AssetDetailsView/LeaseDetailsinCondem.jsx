import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import { getLeaseDetailList } from 'src/api/AssetApis';
import FileView from '../../AssetFileView/FileView';
import TextComponent from 'src/views/Components/TextComponent';
import { Box, Table } from '@mui/joy';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { getFilesFromZip } from 'src/api/FileViewsFn';

const LeaseDetailsinCondem = ({ AssetDetails }) => {

  const { am_item_map_slno } = AssetDetails
  const [leaseAllDetails, setleaseAllDetails] = useState([])
  const [imageshowFlag, setImageShowFlag] = useState(0)
  const [imagearray, setImageArry] = useState([])
  const [imageshow, setImageShow] = useState(false)

  const { data: LeaseDetailListData = [] } = useQuery({
    queryKey: ['getLeaseDetailListz'],
    enabled: am_item_map_slno !== undefined,
    queryFn: () => getLeaseDetailList(am_item_map_slno),
  });

  const LeaseDetailList = useMemo(() => LeaseDetailListData, [LeaseDetailListData])

  useEffect(() => {
    if (LeaseDetailList) {
      setleaseAllDetails(LeaseDetailList);
    } else {
      setleaseAllDetails([]);
    }
  }, [LeaseDetailList]);

  const ViewLeaseDetailFile = async (val) => {
    const { am_lease_mast_slno } = val;
    setImageShowFlag(1)
    setImageShow(true)
    const images = await getFilesFromZip('/AssetFileUpload/LeaseMasterImageView', am_lease_mast_slno);
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
        text={"LEASE DETAILS LIST"}
        sx={{
          flex: 1,
          fontWeight: 500,
          color: 'black',
          fontSize: 15,
        }}
      />
      {leaseAllDetails.length === 0 ?
        <Box sx={{ height: 80, fontSize: 24, fontWeight: 600, color: 'lightgrey', textAlign: 'center', pt: 2, border: 1, borderColor: '#d3d6dc', mt: .5, mr: 1 }}>
          Empty Lease Details
        </Box>
        :
        <Box sx={{ mr: 1 }}>
          <Table
            variant="outlined" size='sm'
            stickyHeader

            sx={{
              minWidth: 1000,
              height: '100%',
              borderRadius: 0,
              mt: .5,
            }}
          >
            <thead>
              <tr>
                <th style={{ width: 50, textAlign: 'center' }}>#</th>
                <th style={{ width: 80 }}>Attachments</th>
                <th>Supplier</th>
                <th style={{ width: 140 }}>From Date</th>
                <th style={{ width: 140 }}>To Date</th>
                <th style={{ width: 100 }}>Amount</th>
                <th style={{ width: 100 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {[...leaseAllDetails]
                .sort((a, b) => (b.status === 1 ? 1 : 0) - (a.status === 1 ? 1 : 0))
                .map((val, index) => (
                  <tr key={index}>
                    <td style={{ fontWeight: 600, textAlign: 'center' }}>{index + 1}</td>
                    <td>
                      {val.image_upload === 1 ? (
                        <FilePresentRoundedIcon
                          sx={{ color: '#41729F', cursor: 'pointer' }}
                          onClick={() => ViewLeaseDetailFile(val)}
                        />
                      ) : (
                        <FilePresentRoundedIcon sx={{ color: 'grey' }} />
                      )}
                    </td>

                    <td style={{ fontWeight: 600 }}>{val.it_supplier_name}</td>
                    <td style={{ fontWeight: 600 }}>
                      {val.lease_fromdate ? format(new Date(val.lease_fromdate), 'dd MMM yyyy') : ''}
                    </td>
                    <td style={{ fontWeight: 600 }}>
                      {val.lease_todate ? format(new Date(val.lease_todate), 'dd MMM yyyy') : ''}
                    </td>
                    <td style={{ fontWeight: 600 }}>
                      {val.lease_amount}
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
        </Box>
      }
    </Box>
  )
}

export default memo(LeaseDetailsinCondem)