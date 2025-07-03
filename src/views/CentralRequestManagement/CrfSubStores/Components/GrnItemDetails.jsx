import { Box, CssVarsProvider, Modal, ModalClose, ModalDialog, Table } from '@mui/joy'
import React, { Fragment, memo, useCallback, useState } from 'react'
import WysiwygTwoToneIcon from '@mui/icons-material/WysiwygTwoTone'
import CustomToolTipForCRF from '../../ComonComponent/Components/CustomToolTipForCRF'
const GrnViewModal = React.lazy(() => import('../../CrfStoreProcess/Component/GrnViewModal'))

const GrnItemDetails = ({ open, grnData, handleCloseInfo, grnItem }) => {
  const [grnState, setGrnState] = useState({
    itemName: '',
    modalopens: false,
    modFlags: 0,
    modalDatas: [],
  })
  const { itemName, modalopens, modFlags, modalDatas } = grnState
  const viewDetails = useCallback(
    (itemCode, itemName) => {
      const grnDetails = grnData
        .flat()
        .filter(grn => grn.IT_CODE === itemCode)
        .map((grn, index) => ({ slno: index + 1, ...grn }))

      setGrnState(prev => ({
        ...prev,
        itemName: itemName,
        modalopens: true,
        modFlags: 1,
        modalDatas: grnDetails,
      }))
    },
    [grnData]
  )

  const handleClose = useCallback(() => {
    setGrnState(prev => ({
      ...prev,
      modalopens: false,
      modFlags: 0,
      modalDatas: [],
    }))
  }, [])
  return (
    <Fragment>
      {modFlags === 1 ? (
        <GrnViewModal
          modalDatas={modalDatas}
          handleClose={handleClose}
          open={modalopens}
          itemName={itemName}
        />
      ) : null}
      <CssVarsProvider>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={handleCloseInfo}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <ModalDialog
            variant="outlined"
            sx={{
              py: 4,
              width: '50vw',
            }}
          >
            <ModalClose
              variant="outlined"
              sx={{
                top: 'calc(-1/4 * var(--IconButton-size))',
                right: 'calc(-1/4 * var(--IconButton-size))',
                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                borderRadius: '50%',
                bgcolor: 'background.body',
                color: '#bf360c',
                height: 25,
                width: 25,
              }}
            />
            <Box sx={{ ml: 1, fontWeight: 650, fontSize: 14 }}>Item Details</Box>
            <Box
              variant="outlined"
              sx={{ overflow: 'auto', maxHeight: window.innerHeight - 50, padding: 'none' }}
            >
              <CssVarsProvider>
                <Table
                  aria-label="table with sticky header"
                  borderAxis="both"
                  padding={'none'}
                  stickyHeader
                  size="sm"
                  stickyFooter
                  hoverRow
                >
                  <thead style={{ alignItems: 'center' }}>
                    <tr style={{ height: 0.5 }}>
                      <th
                        size="sm"
                        style={{
                          borderRadius: 0,
                          width: 60,
                          fontWeight: 650,
                          fontSize: 14,
                          textAlign: 'center',
                          backgroundColor: '#e3f2fd',
                        }}
                      >
                        &nbsp; Sl.No
                      </th>
                      <th
                        size="sm"
                        style={{
                          width: 80,
                          fontWeight: 650,
                          fontSize: 14,
                          backgroundColor: '#e3f2fd',
                        }}
                      >
                        &nbsp;Item Code
                      </th>
                      <th
                        size="sm"
                        style={{
                          width: 250,
                          fontWeight: 650,
                          fontSize: 14,
                          backgroundColor: '#e3f2fd',
                        }}
                      >
                        &nbsp;Item
                      </th>
                      <th
                        size="sm"
                        style={{
                          width: 80,
                          fontWeight: 650,
                          fontSize: 14,
                          backgroundColor: '#e3f2fd',
                        }}
                      >
                        &nbsp;Quantity
                      </th>
                      <th
                        size="sm"
                        style={{
                          width: 80,
                          fontWeight: 650,
                          fontSize: 14,
                          backgroundColor: '#e3f2fd',
                        }}
                      >
                        &nbsp;Grn Qnty
                      </th>
                      <th
                        size="sm"
                        style={{
                          borderRadius: 0,
                          width: 80,
                          fontWeight: 650,
                          fontSize: 14,
                          backgroundColor: '#e3f2fd',
                        }}
                      >
                        &nbsp;Grn Nos
                      </th>
                    </tr>
                  </thead>
                  <tbody size="small">
                    {grnItem?.map((val, index) => {
                      return (
                        <tr key={index} size="small" style={{ maxHeight: 2, cursor: 'pointer' }}>
                          <td size="sm" style={{ fontSize: 12, height: 5, textAlign: 'center' }}>
                            {index + 1}
                          </td>
                          <td size="sm" style={{ fontSize: 12, height: 5 }}>
                            &nbsp;{val.item_code}
                          </td>
                          <td size="sm" style={{ fontSize: 12, height: 5 }}>
                            &nbsp;{val.item_name}
                          </td>
                          <td size="sm" style={{ fontSize: 12, height: 5 }}>
                            &nbsp;{val.item_qty}
                          </td>
                          <td size="sm" style={{ fontSize: 12, height: 5 }}>
                            &nbsp;{val.grn_qnty}
                          </td>
                          <td size="sm" style={{ fontSize: 12, height: 5 }}>
                            <CssVarsProvider>
                              <CustomToolTipForCRF title="View Grn Details" placement="left">
                                <WysiwygTwoToneIcon
                                  sx={{
                                    mt: 0.6,
                                    // fontSize: 'md',
                                    color: '#0d47a1',
                                    height: 20,
                                    width: 20,
                                    borderRadius: 2,
                                    boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                      transform: 'scale(1.1)',
                                    },
                                  }}
                                  onClick={() => viewDetails(val.item_code, val.item_name)}
                                />
                              </CustomToolTipForCRF>
                            </CssVarsProvider>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </CssVarsProvider>
            </Box>
          </ModalDialog>
        </Modal>
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(GrnItemDetails)
