import { Box, Modal, ModalDialog, Chip, Tab, tabClasses, TabList, TabPanel, Tabs } from '@mui/joy'
import React, { memo, useCallback } from 'react'
import CusIconButton from 'src/views/Components/CusIconButton'
import CloseIcon from '@mui/icons-material/Close'
import TextComponent from 'src/views/Components/TextComponent'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined'
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined'
import TimelapseIcon from '@mui/icons-material/Timelapse'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import DetailsTab from './DetailsTab'
import PurchaseDetails from './PurchaseDetails'
import WarrentyGaurenteeDetails from './WarrentyGaurenteeDetails'
import AmcCmcDetails from './AmcCmcDetails'
import PmDetails from '../../CondemnationApprovalMenu/AccountsMenu/PmDetails'
import LeaseDetailsinCondem from './LeaseDetailsinCondem'
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined'
import ServiceDetailsCondemnation from './ServiceDetailsCondemnation'

const AssetDetailsModal = ({
  AssetOpenModal,
  AssetDetails,
  setAssetOpenModal,
  setAssetModalFlag,
}) => {
  const {
    cat_asset_name,
    cat_spare_name,
    item_asset_name,
    item_asset_no,
    item_asset_no_only,
    item_spare_name,
    spare_asset_no,
    spare_asset_no_only,
    category_name,
    item_name,
  } = AssetDetails

  const spareAssetNo = spare_asset_no ?? item_asset_no ?? 'Not Found'
  const formatNumber = num => (num != null ? String(num).padStart(6, '0') : 'Not Found')
  const FormatedNo = formatNumber(spare_asset_no_only ?? item_asset_no_only)

  const CloseModal = useCallback(() => {
    setAssetModalFlag(0)
    setAssetOpenModal(true)
  }, [setAssetModalFlag, setAssetOpenModal])

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={AssetOpenModal}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pl: 1,
        borderRadius: 10,
      }}
    >
      <ModalDialog
        variant="outlined"
        sx={{ width: '95vw', p: 0, overflow: 'auto', height: '95vh' }}
      >
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              borderBottom: 1,
              borderColor: 'lightgrey',
            }}
          >
            <Box sx={{ color: 'grey', pt: 1, pl: 1.5, flex: 1 }}>Item Details</Box>
            <Box sx={{ p: 0.2 }}>
              <CusIconButton size="sm" variant="outlined" color="primary" onClick={CloseModal}>
                <CloseIcon fontSize="small" />
              </CusIconButton>
            </Box>
          </Box>
          <Box
            sx={{
              flex: 1,
              border: 1,
              py: 1,
              borderColor: '#efefef',
              mx: 0.5,
              mt: 0.5,
              bgcolor: '#fbfcfe',
              display: 'flex',
              height: 110,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Box sx={{ flex: 1, display: 'flex', mt: 0.5 }}>
                <TextComponent
                  text={item_asset_no !== null ? 'Asset Number' : 'Spare Number'}
                  sx={{ pl: 2, pt: 0.4, fontWeight: 600, fontSize: 14, width: 170 }}
                />
                <Chip sx={{ bgcolor: '#EBEFFB', fontWeight: 500, fontSize: 16 }}>
                  {spareAssetNo}/{FormatedNo}
                </Chip>
              </Box>
              <Box sx={{ flex: 1, display: 'flex', my: 0.5 }}>
                <TextComponent
                  text="Category"
                  sx={{ pl: 2, fontWeight: 600, pt: 0.4, fontSize: 14, width: 170 }}
                />
                <Chip sx={{ bgcolor: '#EBEFFB', fontWeight: 500, fontSize: 14 }}>
                  {cat_asset_name || cat_spare_name || category_name}
                </Chip>
              </Box>
              <Box sx={{ flex: 1, display: 'flex', my: 0.5 }}>
                <TextComponent
                  text="  Item Name"
                  sx={{ pl: 2, fontWeight: 600, pt: 0.4, fontSize: 14, width: 170 }}
                />
                <Chip sx={{ bgcolor: '#EBEFFB', fontWeight: 500, fontSize: 14 }}>
                  {item_asset_name || item_spare_name || item_name}
                </Chip>
              </Box>
            </Box>
          </Box>
          <Box>
            <Tabs
              size="sm"
              sx={{
                display: 'flex',
                mx: 1.8,
                bgcolor: 'white',
              }}
            >
              <TabList
                sx={{
                  pt: 0.5,
                  justifyContent: 'center',
                  [`&& .${tabClasses.root}`]: {
                    flex: 'initial',
                    bgcolor: 'white',
                    '&:hover': {
                      bgcolor: 'white',
                    },
                    [`&.${tabClasses.selected}`]: {
                      color: 'primary.plainColor',
                      bgcolor: '#EBEFFB',
                      borderBottom: 1.5,
                      '&::after': {
                        height: 20,
                        borderTopLeftRadius: 3,
                        borderTopRightRadius: 3,
                        bgcolor: 'primary.500',
                      },
                    },
                  },
                }}
              >
                <Box sx={{ flex: 1, display: 'flex' }}>
                  <Tab
                    value={0}
                    disableIndicator
                    sx={{ color: '#5D6268', fontWeight: 600, py: 0, px: 0.5 }}
                  >
                    <DriveFileRenameOutlineOutlinedIcon />
                    Details&nbsp;&nbsp;
                  </Tab>

                  <Tab
                    value={1}
                    disableIndicator
                    sx={{ color: '#5D6268', fontWeight: 600, py: 0, px: 0.5 }}
                  >
                    <ReceiptLongOutlinedIcon />
                    Purchase Details&nbsp;&nbsp;
                  </Tab>
                  <Tab
                    value={2}
                    disableIndicator
                    sx={{ color: '#5D6268', fontWeight: 600, py: 0, px: 0.5 }}
                  >
                    <DescriptionOutlinedIcon />
                    Warrenty/Gaurantee&nbsp;&nbsp;
                  </Tab>
                  {item_asset_no !== null ? (
                    <Tab
                      value={3}
                      disableIndicator
                      sx={{ color: '#5D6268', fontWeight: 600, py: 0, px: 0.5 }}
                    >
                      <TextSnippetOutlinedIcon />
                      AMC/CMC Details&nbsp;&nbsp;
                    </Tab>
                  ) : null}
                  {item_asset_no !== null ? (
                    <Tab
                      value={4}
                      disableIndicator
                      sx={{ color: '#5D6268', fontWeight: 600, py: 0, px: 0.5 }}
                    >
                      <TimelapseIcon />
                      &nbsp;PM Details&nbsp;&nbsp;
                    </Tab>
                  ) : null}
                  {item_asset_no !== null ? (
                    <Tab
                      value={5}
                      disableIndicator
                      sx={{ color: '#5D6268', fontWeight: 600, py: 0, px: 0.5 }}
                    >
                      <ArticleOutlinedIcon />
                      &nbsp;Lease Details&nbsp;&nbsp;
                    </Tab>
                  ) : null}
                  <Tab
                    value={6}
                    disableIndicator
                    sx={{ color: '#5D6268', fontWeight: 600, py: 0, px: 0.5 }}
                  >
                    <SettingsSuggestOutlinedIcon />
                    Service Details&nbsp;&nbsp;
                  </Tab>
                </Box>
              </TabList>
              <TabPanel
                value={0}
                sx={{
                  p: 0,
                  flexGrow: 1,
                  overflowY: 'auto',
                  maxHeight: 'calc(90vh - 230px)',
                }}
              >
                <Box
                  sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    maxHeight: '100%',
                    mt: 0.5,
                  }}
                >
                  <DetailsTab AssetDetails={AssetDetails} />
                </Box>
              </TabPanel>
              <TabPanel
                value={1}
                sx={{
                  p: 0,
                  flexGrow: 1,
                  overflowY: 'auto',
                  maxHeight: 'calc(90vh - 230px)',
                }}
              >
                <Box
                  sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    maxHeight: '100%',
                    mt: 0.5,
                  }}
                >
                  <PurchaseDetails AssetDetails={AssetDetails} />
                </Box>
              </TabPanel>
              <TabPanel
                value={2}
                sx={{
                  p: 0,
                  flexGrow: 1,
                  overflowY: 'auto',
                  maxHeight: 'calc(90vh - 230px)',
                }}
              >
                <Box
                  sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    maxHeight: '100%',
                    mt: 0.5,
                  }}
                >
                  <WarrentyGaurenteeDetails AssetDetails={AssetDetails} />
                </Box>
              </TabPanel>
              {item_asset_no !== null ? (
                <TabPanel
                  value={3}
                  sx={{
                    p: 0,
                    flexGrow: 1,
                    overflowY: 'auto',
                    maxHeight: 'calc(90vh - 230px)',
                  }}
                >
                  <Box
                    sx={{
                      flexGrow: 1,
                      overflowY: 'auto',
                      maxHeight: '100%',
                      mt: 0.5,
                    }}
                  >
                    <AmcCmcDetails AssetDetails={AssetDetails} />
                  </Box>
                </TabPanel>
              ) : null}
              {item_asset_no !== null ? (
                <TabPanel
                  value={4}
                  sx={{
                    p: 0,
                    flexGrow: 1,
                    overflowY: 'auto',
                    maxHeight: 'calc(90vh - 230px)',
                  }}
                >
                  <Box
                    sx={{
                      flexGrow: 1,
                      overflowY: 'auto',
                      maxHeight: '100%',
                      mt: 0.5,
                    }}
                  >
                    <PmDetails AssetDetails={AssetDetails} />
                  </Box>
                </TabPanel>
              ) : null}
              {item_asset_no !== null ? (
                <TabPanel
                  value={5}
                  sx={{
                    p: 0,
                    flexGrow: 1,
                    overflowY: 'auto',
                    maxHeight: 'calc(90vh - 230px)',
                  }}
                >
                  <Box
                    sx={{
                      flexGrow: 1,
                      overflowY: 'auto',
                      maxHeight: '100%',
                      mt: 0.5,
                    }}
                  >
                    <LeaseDetailsinCondem AssetDetails={AssetDetails} />
                  </Box>
                </TabPanel>
              ) : null}
              <TabPanel
                value={6}
                sx={{
                  p: 0,
                  flexGrow: 1,
                  overflowY: 'auto',
                  maxHeight: 'calc(90vh - 230px)',
                }}
              >
                <Box
                  sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    maxHeight: '100%',
                    mt: 0.5,
                  }}
                >
                  <ServiceDetailsCondemnation AssetDetails={AssetDetails} />
                </Box>
              </TabPanel>
            </Tabs>
          </Box>
        </Box>
      </ModalDialog>
    </Modal>
  )
}

export default memo(AssetDetailsModal)
