import { Box, Chip, CssVarsProvider, Tab, tabClasses, TabList, TabPanel, Tabs } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import TextComponent from 'src/views/Components/TextComponent';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import SpecDetailsComp from './SpecDetailsComp';
import AssetUpgrade from './AssetUpgrade';
import ItemGRNandBill from './ItemGRNandBill';
import { axioslogin } from 'src/views/Axios/Axios';
import WarrentyGrauntyComp from './WarrentyGrauntyComp';
import AMCCMCDetailAdding from './AMCCMCDetailAdding';
import CusIconButton from 'src/views/Components/CusIconButton';
import CloseIcon from '@mui/icons-material/Close'
import TimelapseIcon from '@mui/icons-material/Timelapse';
import AmPMDetails from './AmPMDetails';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LeaseDetailsAdd from './LeaseDetailsAdd';


const ItemDetailEnterMain = ({ detailArry, setDetailflag, assetSpare, setRender, render, count, setCount, }) => {

    const { assetno, item_name, category_name, item_asset_no, am_custodian_name, deptname, secname, am_item_map_slno,
        am_spare_item_map_slno, item_custodian_dept
    } = detailArry

    const [exist, setExist] = useState(0)
    const [grndetailarry, setGrnDetailArry] = useState({})
    const [wargar, setWarGar] = useState(0)
    const [warGararry, setwarGarArry] = useState({})
    const [amcPm, setAmcPm] = useState(0)

    const BackToPage = useCallback(() => {
        setDetailflag(0)
    }, [setDetailflag])

    useEffect(() => {
        const checkinsertOrNotDetail = async (am_item_map_slno) => {
            const result = await axioslogin.get(`/ItemMapDetails/checkDetailInsertOrNot/${am_item_map_slno}`);
            const { success, data } = result.data
            if (success === 1) {
                setExist(1)
                setGrnDetailArry(data[0])
            }
            else {
                setExist(0)
                setGrnDetailArry([])
            }
        }
        const checkinsertOrNotWarGar = async (am_item_map_slno) => {
            const result = await axioslogin.get(`/ItemMapDetails/WarentGarantInsertOrNot/${am_item_map_slno}`);
            const { success, data } = result.data
            if (success === 1) {
                setWarGar(1)
                setwarGarArry(data[0])
            }
            else {
                setWarGar(0)
                setwarGarArry([])
            }
        }
        const checkinsertOrNotDetailSpare = async (am_spare_item_map_slno) => {
            const result = await axioslogin.get(`/ItemMapDetails/checkDetailInsertOrNotSpare/${am_spare_item_map_slno}`);
            const { success, data } = result.data
            if (success === 1) {
                setExist(1)
                setGrnDetailArry(data[0])
            }
            else {
                setExist(0)
                setGrnDetailArry([])
            }
        }

        const checkinsertOrNotWarGarSpare = async (am_spare_item_map_slno) => {
            const result = await axioslogin.get(`/ItemMapDetails/WarentGarantInsertOrNotSpare/${am_spare_item_map_slno}`);
            const { success, data } = result.data
            if (success === 1) {
                setWarGar(1)
                setwarGarArry(data[0])
            }
            else {
                setWarGar(0)
                setwarGarArry([])
            }
        }

        if (assetSpare === 1) {
            checkinsertOrNotDetail(am_item_map_slno)
            checkinsertOrNotWarGar(am_item_map_slno)

        }
        else {
            checkinsertOrNotDetailSpare(am_spare_item_map_slno)
            checkinsertOrNotWarGarSpare(am_spare_item_map_slno)
        }
    }, [am_item_map_slno, assetSpare, am_spare_item_map_slno, setGrnDetailArry, setwarGarArry, count
    ])


    return (
        <CssVarsProvider >
            <Box sx={{
                height: '100%',
                flex: 1,
                boxShadow: 3, border: 1, borderColor: 'lightgrey', borderRadius: 6,
                bgcolor: 'white',
            }}>
                <Box sx={{
                    display: 'flex',
                    borderBottom: 1, borderColor: 'lightgrey'
                }}>
                    <Box sx={{ color: 'grey', pt: 1, pl: 1.5, flex: 1 }}>Detail Entry</Box>
                    <Box sx={{ p: .2 }}>
                        <CusIconButton
                            size="sm"
                            variant="outlined"
                            color="primary"
                            onClick={BackToPage}
                        >
                            <CloseIcon fontSize="small" />
                        </CusIconButton>
                    </Box>


                </Box>
                <Box sx={{ flex: 1, border: 1, py: 1, borderColor: '#EFEFEF', m: .5, bgcolor: '#FBFCFE', display: 'flex' }}>
                    <Box sx={{ flex: 1, }}>
                        <Box sx={{ flex: 1, display: 'flex', mt: .5 }}>
                            <TextComponent
                                text={item_asset_no !== undefined ? "Asset Number" : "Spare Number"}
                                sx={{ pl: 2, pt: .4, fontWeight: 600, fontSize: 14, width: 170 }}
                            />
                            <Chip sx={{ bgcolor: '#EBEFFB', fontWeight: 500, fontSize: 16 }}>
                                {assetno}
                            </Chip>
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', my: .5 }}>
                            <TextComponent
                                text="Category"
                                sx={{ pl: 2, fontWeight: 600, pt: .4, fontSize: 14, width: 170 }}
                            />
                            <Chip sx={{ bgcolor: '#EBEFFB', fontWeight: 500, fontSize: 14 }}>{category_name}</Chip>
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', my: .5 }}>
                            <TextComponent
                                text="  Item Name"
                                sx={{ pl: 2, fontWeight: 600, pt: .4, fontSize: 14, width: 170 }}
                            />
                            <Chip sx={{ bgcolor: '#EBEFFB', fontWeight: 500, fontSize: 14 }}>{item_name}</Chip>
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', my: .5 }}>
                            <TextComponent
                                text="Primary Custodian"
                                sx={{ pl: 2, fontWeight: 600, pt: .4, fontSize: 14, width: 170 }}
                            />
                            <Chip sx={{ bgcolor: '#EBEFFB', fontWeight: 500, fontSize: 14 }}>{deptname}</Chip>&nbsp;
                            <Chip sx={{ bgcolor: '#EBEFFB', fontWeight: 500, fontSize: 14 }}>{secname}</Chip>
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', my: .5 }}>
                            <TextComponent
                                text="Secondary Custodian"
                                sx={{ pl: 2, fontWeight: 600, pt: .4, fontSize: 14, width: 170 }}
                            />
                            <Chip sx={{ bgcolor: '#EBEFFB', fontWeight: 500, fontSize: 14 }}>{am_custodian_name}</Chip>
                        </Box>
                    </Box>
                </Box >
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
                                <Tab value={0} disableIndicator variant="plain" sx={{ color: '#5D6268', fontWeight: 600, py: 0, px: .5 }}>
                                    <DriveFileRenameOutlineOutlinedIcon />Details&nbsp;&nbsp;
                                </Tab>
                                {assetSpare === 1 ?
                                    <Tab value={1} disableIndicator sx={{ color: '#5D6268', fontWeight: 600, py: 0, px: .5 }}>
                                        <UnarchiveOutlinedIcon />Asset Upgrade
                                    </Tab> :
                                    null}
                                <Tab value={2} disableIndicator sx={{ color: '#5D6268', fontWeight: 600, py: 0, px: .5 }}>
                                    <ReceiptLongOutlinedIcon />Purchase Details&nbsp;&nbsp;
                                </Tab>
                                <Tab value={3} disableIndicator sx={{ color: '#5D6268', fontWeight: 600, py: 0, px: .5 }}>
                                    <DescriptionOutlinedIcon />Warrenty/Gaurantee&nbsp;&nbsp;
                                </Tab>
                                {assetSpare === 1 ?
                                    <Tab value={4} disableIndicator sx={{ color: '#5D6268', fontWeight: 600, py: 0, px: .5 }}>
                                        <TextSnippetOutlinedIcon />AMC/CMC Details&nbsp;&nbsp;
                                    </Tab> : null}
                                {assetSpare === 1 ?
                                    <Tab value={5} disableIndicator sx={{ color: '#5D6268', fontWeight: 600, py: 0, px: .5 }}>
                                        <TimelapseIcon />&nbsp;PM Details&nbsp;&nbsp;
                                    </Tab> : null}
                                {assetSpare === 1 ?
                                    <Tab value={6} disableIndicator sx={{ color: '#5D6268', fontWeight: 600, py: 0, px: .5 }}>
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
                                <SpecDetailsComp detailArry={detailArry} assetSpare={assetSpare} />
                            </Box>
                        </TabPanel>
                        {assetSpare === 1 ?
                            <TabPanel
                                value={1} sx={{
                                    p: 0,
                                    flexGrow: 1,
                                    overflowY: 'auto',
                                    maxHeight: 'calc(90vh - 283px)',
                                }}>
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        overflowY: 'auto',
                                        maxHeight: '100%',
                                        mt: .5

                                    }}>
                                    <AssetUpgrade am_item_map_slno={am_item_map_slno} item_custodian_dept={item_custodian_dept} count={count} setCount={setCount} />
                                </Box>
                            </TabPanel>
                            : null}
                        <TabPanel
                            value={2} sx={{
                                p: 0,
                                flexGrow: 1,
                                overflowY: 'auto',
                                maxHeight: 'calc(90vh - 283px)',
                            }}>
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    overflowY: 'auto',
                                    maxHeight: '100%',
                                    mt: .5

                                }}>
                                <ItemGRNandBill grndetailarry={grndetailarry} detailArry={detailArry} exist={exist} setExist={setExist} assetSpare={assetSpare}
                                    count={count} setCount={setCount}
                                />
                            </Box>
                        </TabPanel>
                        <TabPanel
                            value={3} sx={{
                                p: 0,
                                flexGrow: 1,
                                overflowY: 'auto',
                                maxHeight: 'calc(90vh - 283px)',
                            }}>
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    overflowY: 'auto',
                                    maxHeight: '100%',
                                    mt: .5,

                                }}>
                                <WarrentyGrauntyComp detailArry={detailArry} warGararry={warGararry} grndetailarry={grndetailarry}
                                    wargar={wargar} setWarGar={setWarGar} assetSpare={assetSpare} />

                            </Box>
                        </TabPanel>
                        {assetSpare === 1 ?
                            <TabPanel
                                value={4} sx={{
                                    p: 0,
                                    flexGrow: 1,
                                    overflowY: 'auto',
                                    maxHeight: 'calc(90vh - 283px)',
                                }}>
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        overflowY: 'auto',
                                        maxHeight: '100%',
                                        mt: .5

                                    }}>
                                    <AMCCMCDetailAdding detailArry={detailArry} assetSpare={assetSpare}
                                        amcPm={amcPm} setAmcPm={setAmcPm} setRender={setRender} render={render} />
                                </Box>
                            </TabPanel> : null}
                        {assetSpare === 1 ?
                            <TabPanel
                                value={5} sx={{
                                    p: 0,
                                    flexGrow: 1,
                                    overflowY: 'auto',
                                    maxHeight: 'calc(90vh - 283px)',
                                }}>
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        overflowY: 'auto',
                                        maxHeight: '100%',
                                        mt: .5
                                    }}>
                                    <AmPMDetails detailArry={detailArry} assetSpare={assetSpare}
                                        amcPm={amcPm} setAmcPm={setAmcPm} setRender={setRender} render={render} />
                                </Box>
                            </TabPanel> : null}
                        {assetSpare === 1 ?
                            <TabPanel
                                value={6} sx={{
                                    p: 0,
                                    flexGrow: 1,
                                    overflowY: 'auto',
                                    maxHeight: 'calc(90vh - 283px)',
                                }}>
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        overflowY: 'auto',
                                        maxHeight: '100%',
                                        mt: .5
                                    }}>
                                    <LeaseDetailsAdd
                                        detailArry={detailArry}
                                        grndetailarry={grndetailarry}
                                    />
                                </Box>
                            </TabPanel> : null}
                    </Tabs>
                </Box>
            </Box >
        </CssVarsProvider >
    )
}

export default memo(ItemDetailEnterMain)
