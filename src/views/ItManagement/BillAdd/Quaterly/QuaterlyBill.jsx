import { Box, CssVarsProvider, Input, Tooltip, Chip } from '@mui/joy';
import React, { memo, useCallback, useEffect, useState } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Paper } from '@mui/material';
import UpdatePendingModal from '../UpdatePendingModal';
import { axioslogin } from 'src/views/Axios/Axios';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { infoNotify } from 'src/views/Common/CommonCode';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ItBillCategoryList from 'src/views/CommonSelectCode/ItBillCategoryList';
import { useDispatch } from 'react-redux';
import { getBillCategory } from 'src/redux/actions/ItBillCategoryList.action';
import { addMonths, eachMonthOfInterval, format } from 'date-fns';

const QuaterlyBill = ({ quaterlydata, billCount, setbillCount }) => {

    const [pendingModalOpen, setpendingModalOpen] = useState(false)
    const [pendingModalFlag, setpendingModalFlag] = useState(0)
    const [billData, setBillData] = useState([])
    const [filezUrls, setFilezUrls] = useState([]);
    const [searchBillNameFlag, setsearchBillNameFlag] = useState(0)
    const [alphbased, setAlphbased] = useState(0)
    const [alphbasedData, setAlphbasedData] = useState([])
    const [enterText, setEnterText] = useState('')
    const [searchBillCateFlag, setsearchBillCateFlag] = useState(0)
    const [billCategory, setBillCategory] = useState(0)
    const [billcate, setBillcate] = useState([])
    const [cateName, setcateName] = useState('')
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBillCategory())
    }, [dispatch])

    const UndatePending = useCallback((value) => {
        const { quaterly_slno } = value
        const getbillsFile = async () => {
            const result = await axioslogin.get(`/ItImageUpload/uploadFile/getQuaterlyBillImages/${quaterly_slno}`);
            const { success } = result.data;
            if (success === 1) {
                const data = result.data;
                const fileNames = data.data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/Bills/Quarterly/${quaterly_slno}/${fileName}`;
                });
                setFilezUrls(fileUrls);
            } else {
                setFilezUrls([])
            }
        }
        getbillsFile(quaterly_slno)
        setBillData(value)
        setpendingModalFlag(1)
        setpendingModalOpen(true)
    }, [])


    const { quaterly_slno } = billData
    const searchBillls = useCallback(() => {
        setsearchBillNameFlag(1)
        setsearchBillCateFlag(0)
    }, [])
    const OpenBillCate = useCallback(() => {
        setsearchBillNameFlag(0)
        setsearchBillCateFlag(1)

    }, [])

    const updateEnterText = useCallback((e) => {
        setEnterText(e.target.value)
    }, [])
    const SearchBillName = useCallback(() => {
        if (enterText.length < 3) {
            infoNotify('please enter minimum 3 character to search task name')
        } else {
            let newTableDataa = quaterlydata && quaterlydata.filter((val) => val.bill_name.toLowerCase().includes(enterText))
            setsearchBillNameFlag(1)
            setAlphbased(1)
            setAlphbasedData(newTableDataa)
        }
    }, [enterText, quaterlydata])

    useEffect(() => {
        if (alphbased === 1) {
            let newTableDataa = quaterlydata && quaterlydata.filter((val) => val.bill_name.toLowerCase().includes(enterText))
            setAlphbasedData(newTableDataa)

        }
    }, [quaterlydata, alphbased, enterText])

    const SearchBillCate = useCallback(() => {
        let newTableDataa = quaterlydata && quaterlydata.filter((val) => val.bill_category === billCategory)
        setAlphbased(2)
        setAlphbasedData(newTableDataa)
    }, [billCategory, quaterlydata])

    useEffect(() => {
        if (alphbased === 2) {
            let newTableDataa = quaterlydata && quaterlydata.filter((val) => val.bill_category === billCategory)
            setsearchBillCateFlag(1)
            setBillcate(newTableDataa)
        }
    }, [quaterlydata, alphbased, billCategory])

    const closeBillSearch = useCallback(() => {
        setsearchBillNameFlag(0)
        setsearchBillCateFlag(0)
        setAlphbased(0)
        setEnterText('')
        setBillCategory('')
        setcateName('')
    }, [])
    return (
        <Box>
            <CssVarsProvider>
                {pendingModalFlag === 1 ? <UpdatePendingModal pendingModalOpen={pendingModalOpen} billData={billData}
                    setpendingModalFlag={setpendingModalFlag} setpendingModalOpen={setpendingModalOpen} index_no={quaterly_slno}
                    billCount={billCount} setbillCount={setbillCount} filezUrls={filezUrls} cateName={cateName}
                /> : null}
            </CssVarsProvider>
            {quaterlydata.length !== 0 ?
                <Box sx={{ flex: 1, display: 'flex', bgcolor: '#868B8E', minHeight: 30, pt: .5 }}>
                    <Box sx={{ mx: 2.3, textAlign: 'center', fontWeight: 600, color: 'white' }}>#</Box>
                    <Box sx={{ flex: 1, textAlign: 'center', fontWeight: 600, color: 'white' }}></Box>
                    <Box sx={{ flex: 5, fontWeight: 600, color: 'white' }}>Bill Name<ManageSearchIcon sx={{ color: 'white', height: 20, width: 30, cursor: 'pointer' }}
                        onClick={searchBillls} />
                        {searchBillNameFlag === 1 ?
                            <Box sx={{ display: 'flex', p: .2 }}>
                                <Input
                                    size='xs'
                                    name="enterText"
                                    value={enterText}
                                    placeholder="    Type here to search bill Name ..."
                                    sx={{
                                        height: 29,
                                        borderRadius: 2,
                                        width: 350,
                                        pl: 1
                                    }}
                                    onChange={updateEnterText} />
                                <CssVarsProvider>
                                    <Tooltip title='search'>
                                        <Box sx={{
                                            pl: .5, bgcolor: '#647C90',
                                            cursor: 'pointer', borderRight: 1, borderTop: 1, borderBottom: 1, borderColor: '#B2C4CB',
                                            '&:hover': { bgcolor: '#36454F' },
                                        }}
                                            onClick={SearchBillName}
                                        >
                                            <SearchIcon sx={{ color: 'white', height: 20, }} />
                                        </Box>
                                    </Tooltip>
                                </CssVarsProvider>
                                <CssVarsProvider>
                                    <Tooltip title='close'>
                                        <Box sx={{
                                            px: .3, pt: .1, bgcolor: '#647C90',
                                            cursor: 'pointer', borderRight: 1, borderTop: 1, borderBottom: 1, borderColor: '#B2C4CB',
                                            '&:hover': { bgcolor: '#36454F' },
                                        }}
                                            onClick={closeBillSearch}
                                        >
                                            <HighlightOffIcon sx={{ color: 'white', height: 20, }} />
                                        </Box>
                                    </Tooltip>
                                </CssVarsProvider>
                            </Box> : null}</Box>
                    <Box sx={{ flex: 1, fontWeight: 600, color: 'white' }}>Category
                        <ManageSearchIcon sx={{ color: 'white', height: 20, width: 30, cursor: 'pointer' }}
                            onClick={OpenBillCate}
                        />
                        {searchBillCateFlag === 1 ?
                            <Box sx={{ display: 'flex', p: .2 }}>
                                <ItBillCategoryList billCategory={billCategory}
                                    setBillCategory={setBillCategory} setName={setcateName} />
                                <CssVarsProvider>
                                    <Tooltip title='search'>
                                        <Box sx={{
                                            pl: .5, bgcolor: '#647C90',
                                            cursor: 'pointer', borderRight: 1, borderTop: 1, borderBottom: 1, borderColor: '#B2C4CB',
                                            '&:hover': { bgcolor: '#36454F' },
                                        }}
                                            onClick={SearchBillCate}
                                        >
                                            <SearchIcon sx={{ color: 'white', height: 20, }} />
                                        </Box>
                                    </Tooltip>
                                </CssVarsProvider>
                                <CssVarsProvider>
                                    <Tooltip title='close'>
                                        <Box sx={{
                                            px: .3, pt: .1, bgcolor: '#647C90',
                                            cursor: 'pointer', borderRight: 1, borderTop: 1, borderBottom: 1, borderColor: '#B2C4CB',
                                            '&:hover': { bgcolor: '#36454F' },
                                        }}
                                            onClick={closeBillSearch}
                                        >
                                            <HighlightOffIcon sx={{ color: 'white', height: 20, }} />
                                        </Box>
                                    </Tooltip>
                                </CssVarsProvider>
                            </Box> : null}
                    </Box>
                    {/* <Box sx={{ flex: 1, fontWeight: 600, color: 'white' }}>Bill Type</Box> */}
                </Box> : null}
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ flex: 1 }}>
                    {alphbased === 1 ?
                        <Box sx={{ flex: 1, maxHeight: '55vh', overflow: 'auto' }}>
                            {alphbasedData && alphbasedData.map((val) => {
                                const monthnames = eachMonthOfInterval({ start: new Date(val.quaterly_bill_generate), end: (addMonths(new Date(val.quaterly_bill_generate), 2)) })
                                var monthview = format(new Date(monthnames[0]), 'MMM') + '-' + format(new Date(monthnames[2]), 'MMM yyyy')
                                return <Paper key={val.quaterly_slno}
                                    sx={{ minHeight: 33, maxHeight: 50, bgcolor: '#E4E5E8', borderRadius: 0, display: 'flex', mt: .5, color: 'black', }}>
                                    <Box sx={{
                                        p: .5, cursor: 'pointer', mx: 1
                                    }}>
                                        <Tooltip title="Add Now" placement="bottom">
                                            <AddBoxIcon sx={{ height: 20, color: '#56382D' }}
                                                onClick={() => UndatePending(val)}
                                            />
                                        </Tooltip>
                                    </Box>
                                    <Box sx={{ flex: 1, pt: .5, cursor: 'grab', pl: 1 }}>
                                        <Chip sx={{ bgcolor: '#F1C83A', fontSize: 14, fontWeight: 700, color: '#670305', }}>
                                            {monthview}
                                        </Chip>
                                    </Box>
                                    <Tooltip title="bill name" placement="bottom"><Box sx={{ flex: 5, pt: .5, cursor: 'grab' }}>
                                        {val.bill_name}
                                    </Box></Tooltip>
                                    <Tooltip title="bill Category" placement="bottom"><Box sx={{ flex: 1, pt: .5, cursor: 'grab' }}>
                                        {val.it_bill_category_name}
                                    </Box></Tooltip>
                                </Paper>
                            })
                            }
                        </Box> :
                        alphbased === 2 ?
                            <Box sx={{ flex: 1, maxHeight: '55vh', overflow: 'auto' }}>
                                {billcate && billcate.map((val) => {
                                    const monthnames = eachMonthOfInterval({
                                        start: new Date(val.quaterly_bill_generate),
                                        end: (addMonths(new Date(val.quaterly_bill_generate), 2))
                                    })
                                    var monthview = format(new Date(monthnames[0]), 'MMM') + '-' + format(new Date(monthnames[2]), 'MMM yyyy')
                                    return <Paper key={val.quaterly_slno}
                                        sx={{ minHeight: 33, maxHeight: 50, bgcolor: '#E4E5E8', borderRadius: 0, display: 'flex', mt: .5, color: 'black', }}>
                                        <Box sx={{
                                            p: .5, cursor: 'pointer', mx: 1
                                        }}>
                                            <Tooltip title="Add Now" placement="bottom">
                                                <AddBoxIcon sx={{ height: 20, color: '#56382D' }}
                                                    onClick={() => UndatePending(val)}
                                                />
                                            </Tooltip>
                                        </Box>
                                        <Box sx={{ flex: 1, pt: .5, cursor: 'grab', pl: 1 }}>
                                            <Chip sx={{ bgcolor: '#F1C83A', fontSize: 14, fontWeight: 700, color: '#670305', }}>
                                                {monthview}
                                            </Chip>
                                        </Box>
                                        <Tooltip title="bill name" placement="bottom"><Box sx={{ flex: 5, pt: .5, cursor: 'grab' }}>
                                            {val.bill_name}
                                        </Box></Tooltip>
                                        <Tooltip title="bill Category" placement="bottom"><Box sx={{ flex: 1, pt: .5, cursor: 'grab' }}>
                                            {val.it_bill_category_name}
                                        </Box></Tooltip>
                                    </Paper>
                                })
                                }
                            </Box> : <Box sx={{ flex: 1, maxHeight: '55vh', overflow: 'auto' }}>
                                {
                                    quaterlydata && quaterlydata.map((val) => {
                                        const monthnames = eachMonthOfInterval({ start: new Date(val.quaterly_bill_generate), end: (addMonths(new Date(val.quaterly_bill_generate), 2)) })
                                        var monthview = format(new Date(monthnames[0]), 'MMM') + '-' + format(new Date(monthnames[2]), 'MMM yyyy')

                                        return <Paper key={val.quaterly_slno}
                                            sx={{ minHeight: 33, maxHeight: 50, bgcolor: '#E4E5E8', borderRadius: 0, display: 'flex', mt: .5, color: 'black', }}>
                                            <Box sx={{
                                                p: .5, cursor: 'pointer', mx: 1
                                            }}>
                                                <Tooltip title="Add Now" placement="bottom">
                                                    <AddBoxIcon sx={{ height: 20, color: '#56382D' }}
                                                        onClick={() => UndatePending(val)}
                                                    />
                                                </Tooltip>
                                            </Box>
                                            <Box sx={{ flex: 1, pt: .5, cursor: 'grab', pl: 1 }}>
                                                <Chip sx={{ bgcolor: '#F1C83A', fontSize: 14, fontWeight: 700, color: '#670305', }}>
                                                    {monthview}
                                                </Chip>
                                            </Box>
                                            <Box sx={{ flex: 5, pt: .5, cursor: 'grab' }}>
                                                {val.bill_name}
                                            </Box>
                                            <Box sx={{ flex: 1, pt: .5, cursor: 'grab' }}>
                                                {val.it_bill_category_name}
                                            </Box>
                                            {/* <Tooltip title="bill type" placement="bottom"><Box sx={{ flex: 1, pt: .5, cursor: 'grab' }}>
                                                {val.it_bill_type_name}
                                            </Box></Tooltip> */}
                                        </Paper>
                                    })
                                }
                            </Box>}
                </Box >
            </Box>
        </Box>
    )
}

export default memo(QuaterlyBill)