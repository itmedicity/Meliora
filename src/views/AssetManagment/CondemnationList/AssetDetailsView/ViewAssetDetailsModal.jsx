import { Modal, ModalDialog } from '@mui/joy';
import React, { useCallback } from 'react'

const ViewAssetDetailsModal = ({ ViewDetails, AssetOpenModal,
    setAssetOpenModal,
    setAssetModalFlag }) => {


    const CloseModal = useCallback(() => {
        setAssetModalFlag(0)
        setAssetOpenModal(true)
    }, [])

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={AssetOpenModal}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, borderRadius: 10 }}>
            <ModalDialog variant="outlined" sx={{ width: '95vw', p: 0, overflow: 'auto', height: '95vh' }}>
                {/* <Box sx={{ flex: 1, }}>
                    <Box sx={{
                        display: 'flex',
                        borderBottom: 1, borderColor: 'lightgrey'
                    }}>
                        <Box sx={{ color: 'grey', pt: 1, pl: 1.5, flex: 1 }}>Item Details</Box>
                        <Box sx={{ p: .2 }}>
                            <CusIconButton
                                size="sm"
                                variant="outlined"
                                color="primary"
                                onClick={CloseModal}
                            >
                                <CloseIcon fontSize="small" />
                            </CusIconButton>
                        </Box>
                    </Box>
                    <Box sx={{ flex: 1, border: 1, py: 1, borderColor: '#efefef', mx: .5, mt: .5, bgcolor: '#fbfcfe', display: 'flex', height: 130 }}>
                        <Box sx={{ flex: 1, }}>
                            <Box sx={{ flex: 1, display: 'flex', mt: .5 }}>
                                <TextComponent
                                    text={item_asset_no !== null ? "Asset Number" : "Spare Number"}
                                    sx={{ pl: 2, pt: .4, fontWeight: 600, fontSize: 14, width: 170 }}
                                />
                                <Chip sx={{ bgcolor: '#EBEFFB', fontWeight: 500, fontSize: 16 }}>
                                    {spareAssetNo}/{FormatedNo}
                                </Chip>
                            </Box>
                            <Box sx={{ flex: 1, display: 'flex', my: .5 }}>
                                <TextComponent
                                    text="Category"
                                    sx={{ pl: 2, fontWeight: 600, pt: .4, fontSize: 14, width: 170 }}
                                />
                                <Chip sx={{ bgcolor: '#EBEFFB', fontWeight: 500, fontSize: 14 }}>{cat_asset_name || cat_spare_name}</Chip>
                            </Box>
                            <Box sx={{ flex: 1, display: 'flex', my: .5 }}>
                                <TextComponent
                                    text="  Item Name"
                                    sx={{ pl: 2, fontWeight: 600, pt: .4, fontSize: 14, width: 170 }}
                                />
                                <Chip sx={{ bgcolor: '#EBEFFB', fontWeight: 500, fontSize: 14 }}>{item_asset_name || item_spare_name}</Chip>
                            </Box>
                            <Box sx={{ flex: 1, display: 'flex', my: .5 }}>
                                <TextComponent
                                    text="Custodian Details"
                                    sx={{ pl: 2, fontWeight: 600, pt: .4, fontSize: 14, width: 170 }}
                                />

                            </Box>
                        </Box>
                    </Box >
                    <Box>
                        <Tabs
                            size="sm"
                            sx={{
                                display: 'flex',
                                mx: 1.8,
                                bgcolor: 'white'
                            }}
                        >
                            <TabList
                                sx={{
                                    pt: .5,
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
                                <Box sx={{ flex: 1, display: 'flex', }}>
                                    <Tab value={0} disableIndicator sx={{ color: '#5D6268', fontWeight: 600, py: 0, px: .5 }}>
                                        <DriveFileRenameOutlineOutlinedIcon />Details&nbsp;&nbsp;
                                    </Tab>

                                    <Tab value={1} disableIndicator sx={{ color: '#5D6268', fontWeight: 600, py: 0, px: .5 }}>
                                        <ReceiptLongOutlinedIcon />Purchase Details&nbsp;&nbsp;
                                    </Tab>
                                    <Tab value={2} disableIndicator sx={{ color: '#5D6268', fontWeight: 600, py: 0, px: .5 }}>
                                        <DescriptionOutlinedIcon />Warrenty/Gaurantee&nbsp;&nbsp;
                                    </Tab>
                                    {item_asset_no !== null ?
                                        <Tab value={3} disableIndicator sx={{ color: '#5D6268', fontWeight: 600, py: 0, px: .5 }}>
                                            <TextSnippetOutlinedIcon />AMC/CMC Details&nbsp;&nbsp;
                                        </Tab> : null}
                                    {item_asset_no !== null ?
                                        <Tab value={4} disableIndicator sx={{ color: '#5D6268', fontWeight: 600, py: 0, px: .5 }}>
                                            <TimelapseIcon />&nbsp;PM Details&nbsp;&nbsp;
                                        </Tab> : null}
                                    {item_asset_no !== null ?
                                        <Tab value={5} disableIndicator sx={{ color: '#5D6268', fontWeight: 600, py: 0, px: .5 }}>
                                            <ArticleOutlinedIcon />&nbsp;Lease Details&nbsp;&nbsp;
                                        </Tab> : null}
                                </Box>
                            </TabList>
                            <TabPanel
                                value={0} sx={{
                                    p: 0,
                                    flexGrow: 1,
                                    overflowY: 'auto',
                                    maxHeight: 'calc(90vh - 230px)',

                                }}>
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        overflowY: 'auto',
                                        maxHeight: '100%',
                                        mt: .5
                                    }}>
                                    <DetailsTab AssetDetails={AssetDetails} />
                                </Box>
                            </TabPanel>
                            <TabPanel
                                value={1} sx={{
                                    p: 0,
                                    flexGrow: 1,
                                    overflowY: 'auto',
                                    maxHeight: 'calc(90vh - 230px)',

                                }}>
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        overflowY: 'auto',
                                        maxHeight: '100%',
                                        mt: .5
                                    }}>
                                    <PurchaseDetails AssetDetails={AssetDetails} />
                                </Box>
                            </TabPanel>
                            <TabPanel
                                value={2} sx={{
                                    p: 0,
                                    flexGrow: 1,
                                    overflowY: 'auto',
                                    maxHeight: 'calc(90vh - 230px)',

                                }}>
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        overflowY: 'auto',
                                        maxHeight: '100%',
                                        mt: .5
                                    }}>
                                    <WarrentyGaurenteeDetails AssetDetails={AssetDetails} />
                                </Box>
                            </TabPanel>
                            {item_asset_no !== null ?
                                <TabPanel
                                    value={3} sx={{
                                        p: 0,
                                        flexGrow: 1,
                                        overflowY: 'auto',
                                        maxHeight: 'calc(90vh - 230px)',

                                    }}>
                                    <Box
                                        sx={{
                                            flexGrow: 1,
                                            overflowY: 'auto',
                                            maxHeight: '100%',
                                            mt: .5
                                        }}>
                                        <AmcCmcDetails AssetDetails={AssetDetails} />
                                    </Box>
                                </TabPanel> : null}
                            {item_asset_no !== null ?
                                <TabPanel
                                    value={4} sx={{
                                        p: 0,
                                        flexGrow: 1,
                                        overflowY: 'auto',
                                        maxHeight: 'calc(90vh - 230px)',

                                    }}>
                                    <Box
                                        sx={{
                                            flexGrow: 1,
                                            overflowY: 'auto',
                                            maxHeight: '100%',
                                            mt: .5
                                        }}>
                                        <PmDetails AssetDetails={AssetDetails} />
                                    </Box>
                                </TabPanel>
                                : null}
                            {item_asset_no !== null ?
                                <TabPanel
                                    value={5} sx={{
                                        p: 0,
                                        flexGrow: 1,
                                        overflowY: 'auto',
                                        maxHeight: 'calc(90vh - 230px)',

                                    }}>
                                    <Box
                                        sx={{
                                            flexGrow: 1,
                                            overflowY: 'auto',
                                            maxHeight: '100%',
                                            mt: .5
                                        }}>
                                        <LeaseDetailsinCondem AssetDetails={AssetDetails} />
                                    </Box>
                                </TabPanel> : null}
                        </Tabs>
                    </Box>
                </Box> */}
            </ModalDialog>
        </Modal>
    )
}

export default ViewAssetDetailsModal