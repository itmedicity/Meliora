import { Box, Button, CssVarsProvider, Tab, TabList, TabPanel, Tabs, Tooltip } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { useCallback, useState } from 'react'
import CusIconButton from 'src/views/Components/CusIconButton'
import TextComponent from 'src/views/Components/TextComponent'
import CondemnedItemCategorization from './CategorizationOfItems/CondemnedItemCategorization'
import CloseIcon from '@mui/icons-material/Close'
import CategorizedItemMain from './CategorizedItems/CategorizedItemMain'
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import LocalOfferSharpIcon from '@mui/icons-material/LocalOfferSharp';
import SubmitedScrapMain from './ScrapSubmittedForms/SubmitedScrapMain'
import { useNavigate } from 'react-router-dom'
import { taskColor } from 'src/color/Color'

const ScrapItemMain = () => {

    const [addMoreItemFlag, setaddMoreItemFlag] = useState(0)
    const [addmoreItemOpen, setaddmoreItemOpen] = useState(false)
    const [CategorizeScarpFlag, setCategorizeScarpFlag] = useState(0)
    const [CategorizeScarpOpen, setCategorizeScarpOpen] = useState(false)
    const [submitModalOpen, setSubmitModalOpen] = useState(false)
    const [submitModalFlag, setSubmitModalFlag] = useState(0)
    const [tabValue, setTabValue] = useState(0)

    const history = useNavigate();
    const backtoSetting = useCallback(() => {
        history('/Home/Settings')
    }, [history])

    const OpenModal = useCallback(() => {
        setaddMoreItemFlag(1)
        setaddmoreItemOpen(true)
    }, [setaddMoreItemFlag, setaddmoreItemOpen])

    const CategorizeScrap = useCallback(() => {
        setCategorizeScarpFlag(1)
        setCategorizeScarpOpen(true)
    }, [setCategorizeScarpFlag, setCategorizeScarpOpen])

    const SubmitForm = useCallback(() => {
        setSubmitModalOpen(true)
        setSubmitModalFlag(1)
    }, [])


    return (
        <Paper sx={{ height: '90vh', overflow: 'auto', flexGrow: 1 }}>
            <CssVarsProvider>
                <Box sx={{ flex: 1, display: 'flex', borderBottom: 1, borderColor: '#D0D0D0' }}>
                    <TextComponent
                        sx={{
                            color: '#5A676C',
                            fontWeight: 600,
                            flex: 1,
                            m: 0.5,
                            pl: 1,
                            fontFamily: 'Arial',
                            fontSize: 14
                        }}
                        text={"Condemned Item Categorization & Form Submittion"} />
                    <Box>
                        <CusIconButton
                            size="sm"
                            variant="outlined"
                            color="primary"
                            onClick={backtoSetting}
                        >
                            <CloseIcon fontSize="small" />
                        </CusIconButton>
                    </Box>
                </Box>
                <Tabs
                    onChange={(event, newValue) => setTabValue(newValue)}
                    size="sm"
                    sx={{
                        display: 'flex',
                        bgcolor: 'white',
                    }}
                >
                    <TabList
                        sx={{
                            pt: 1,
                            justifyContent: 'center',
                            [`&& .MuiTabs-root`]: {
                                flex: 'initial',
                                bgcolor: 'white',
                                '&:hover': {
                                    bgcolor: 'white',
                                },
                                [`&.Mui-selected`]: {
                                    color: 'primary.plainColor',
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
                        <Box sx={{ flex: 1, display: 'flex', gap: 1, mb: 1, ml: 1 }}>
                            <Tab
                                label="Item Entries"
                                value={0}
                                disableIndicator
                                sx={{
                                    color: taskColor.darkPurple,
                                    fontWeight: 600,
                                    p: 0,
                                    border: 1,
                                    width: 190,
                                    borderColor: taskColor.lightpurple,
                                    transition: 'all 0.3s ease',
                                    '&.Mui-selected': {
                                        color: 'white',
                                        backgroundColor: taskColor.darkPurple,
                                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                                        transform: 'scale(1.02)',
                                    },
                                }}
                            >
                                Item Categorization
                            </Tab>
                            <Tab
                                label="Asset"
                                value={1}
                                disableIndicator
                                sx={{
                                    color: taskColor.darkPurple,
                                    fontWeight: 600,
                                    p: 0,
                                    border: 1,
                                    width: 190,
                                    borderColor: taskColor.lightpurple,
                                    transition: 'all 0.3s ease',
                                    '&.Mui-selected': {
                                        color: 'white',
                                        backgroundColor: taskColor.darkPurple,
                                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                                        transform: 'scale(1.02)',
                                    },
                                }}
                            >
                                Categorized
                            </Tab>
                            <Tab
                                label="Asset"
                                value={2}
                                disableIndicator
                                sx={{
                                    color: taskColor.darkPurple,
                                    fontWeight: 600,
                                    p: 0,
                                    border: 1,
                                    width: 190,
                                    borderColor: taskColor.lightpurple,
                                    transition: 'all 0.3s ease',
                                    '&.Mui-selected': {
                                        color: 'white',
                                        backgroundColor: taskColor.darkPurple,
                                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                                        transform: 'scale(1.02)',
                                    },
                                }}
                            >
                                Submitted Form
                            </Tab>
                        </Box>
                        {tabValue === 0 ?
                            <Box>
                                <Tooltip title={"Categorize the Items"} placement='top' variant='outlined'>
                                    <Button
                                        sx={{ color: taskColor.darkPurple }}
                                        variant="outlined"
                                        size='sm'
                                        onClick={CategorizeScrap}
                                    >
                                        <LocalOfferSharpIcon />
                                    </Button>
                                </Tooltip>
                                <Tooltip title={"Add More Items"} placement='top-start' variant='outlined'>
                                    <Button
                                        sx={{ color: taskColor.darkPurple, mx: .8 }}
                                        variant="outlined"
                                        size='sm'
                                        onClick={OpenModal}>
                                        <LibraryAddIcon />
                                    </Button>
                                </Tooltip>

                            </Box> : null}
                        {tabValue === 1 ?
                            <Box>
                                <Tooltip title={"Submit Form"} placement='top-start' color='success' variant='outlined'>
                                    <Button
                                        sx={{ color: taskColor.darkPurple, mx: .8 }}
                                        variant="outlined"
                                        size='sm'
                                        onClick={SubmitForm}
                                    >
                                        <BookmarksIcon />
                                    </Button>
                                </Tooltip>
                            </Box> : null}
                    </TabList>
                    <TabPanel value={0} sx={{ p: 0, flexGrow: 1, }}>
                        <Box sx={{ flexGrow: 1, }}>
                            <CondemnedItemCategorization
                                addMoreItemFlag={addMoreItemFlag} setaddMoreItemFlag={setaddMoreItemFlag}
                                addmoreItemOpen={addmoreItemOpen} setaddmoreItemOpen={setaddmoreItemOpen}
                                CategorizeScarpFlag={CategorizeScarpFlag} setCategorizeScarpFlag={setCategorizeScarpFlag}
                                CategorizeScarpOpen={CategorizeScarpOpen} setCategorizeScarpOpen={setCategorizeScarpOpen}
                            />
                        </Box>
                    </TabPanel>
                    <TabPanel value={1} sx={{ p: 0, flexGrow: 1, }}>
                        <Box sx={{ flexGrow: 1, }}>
                            <CategorizedItemMain submitModalOpen={submitModalOpen} setSubmitModalOpen={setSubmitModalOpen}
                                submitModalFlag={submitModalFlag} setSubmitModalFlag={setSubmitModalFlag}
                            />
                        </Box>
                    </TabPanel>
                    <TabPanel value={2} sx={{ p: 0, flexGrow: 1, }}>
                        <Box sx={{ flexGrow: 1, }}>
                            <SubmitedScrapMain />
                        </Box>
                    </TabPanel>
                </Tabs>

            </CssVarsProvider>

        </Paper >
    )
}

export default ScrapItemMain