import { Box, CircularProgress, Table } from '@mui/joy'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded'
import { getDeptScrapStore } from 'src/api/AssetApis'
import FileViews from '../../Files/FileViews'

const DeptScrapstoreMain = ({ empdept }) => {
  const postDept = useMemo(() => {
    return {
      empdept: empdept
    }
  }, [empdept])

  const { data: DeptScarpStore, isLoading: loadingPending } = useQuery({
    queryKey: ['getDeptScrapStore'],
    queryFn: () => getDeptScrapStore(postDept),
    enabled: empdept !== null
  })

  const DeptScarpStoreData = useMemo(() => DeptScarpStore ?? [], [DeptScarpStore])

  const [fileData, setfileData] = useState([])
  const [fileModalOpen, setfileModalOpen] = useState(false)
  const [fileOpenFlag, setfileOpenFlag] = useState(0)

  const FileView = useCallback(val => {
    setfileData(val)
    setfileModalOpen(true)
    setfileOpenFlag(1)
  }, [])

  return (
    <Box sx={{ m: 1 }}>
      {fileOpenFlag === 1 ? (
        <FileViews
          fileData={fileData}
          fileModalOpen={fileModalOpen}
          setfileOpenFlag={setfileOpenFlag}
          setfileModalOpen={setfileModalOpen}
        />
      ) : null}
      <Box sx={{ width: '100%', height: '74vh', }}>
        {loadingPending ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '74vh' }}>
            <CircularProgress size="lg" />
          </Box>
        ) : DeptScarpStoreData?.length === 0 ? (
          <Box
            sx={{
              fontSize: 26,
              fontWeight: 600,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '65vh',
              width: '100%',
              textAlign: 'center',
              color: 'lightgrey',
              borderRadius: 2
            }}
          >
            Empty List
          </Box>
        ) : (
          <Table stickyHeader size="sm" sx={{ borderRadius: 2 }} borderAxis="both">
            <thead>
              <tr>
                <th style={{ textAlign: 'center', width: 1 }}>Slno</th>
                <th style={{ textAlign: 'center', width: 3 }}>Attachment</th>

                <th style={{ textAlign: 'center', width: 15 }}>Item Number</th>
                <th style={{ textAlign: 'center', width: 20 }}>Category</th>
                <th style={{ textAlign: 'center', width: 30 }}>Item Name</th>
                <th style={{ textAlign: 'center', width: 50 }}>Remarks</th>
                <th style={{ textAlign: 'center', width: 15 }}>Form Number</th>
              </tr>
            </thead>
            <tbody>
              {DeptScarpStoreData?.map((val, index) => (
                <tr key={index}>
                  <td style={{ textAlign: 'center' }}>{index + 1}</td>
                  <td style={{ textAlign: 'center' }}>
                    {val.file_status === 1 ? (
                      <Box>
                        <FilePresentRoundedIcon
                          sx={{ color: '#004369', cursor: 'pointer' }}
                          onClick={() => FileView(val)}
                        />
                      </Box>
                    ) : (
                      <Box>
                        <FilePresentRoundedIcon sx={{ color: 'lightgrey', cursor: 'pointer' }} />
                      </Box>
                    )}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {val.spare_asset_no
                      ? `${val.spare_asset_no}/${val.spare_asset_no_only.toString().padStart(6, '0')}`
                      : `${val.item_asset_no}/${val.item_asset_no_only.toString().padStart(6, '0')}`}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {val.cat_asset_name !== null
                      ? val.cat_asset_name
                      : val.cat_spare_name !== null
                        ? val.cat_spare_name
                        : '-'}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {val.item_asset_name !== null
                      ? val.item_asset_name
                      : val.item_spare_name !== null
                        ? val.item_spare_name
                        : '-'}
                  </td>
                  <td style={{ textAlign: 'center' }}>{val.keep_in_srap_store_reason || '-'}</td>
                  <td style={{ textAlign: 'center' }}>
                    {val.condem_form_prefix}/{val.condem_form_no}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Box>
    </Box>
  )
}
export default memo(DeptScrapstoreMain)
