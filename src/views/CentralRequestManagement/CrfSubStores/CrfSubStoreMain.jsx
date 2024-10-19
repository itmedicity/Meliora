import { Box, Paper, Radio, RadioGroup, FormControlLabel, Tabs, Tab, tabClasses } from '@mui/material';
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { getCrfPOStorAction } from 'src/redux/actions/CrmStoreProcess.action';
import ReceiveSubStoreView from './Components/ReceiveSubStoreView';
import { format } from 'date-fns';
import { CssVarsProvider, IconButton } from '@mui/joy';
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import CustomCloseIconCmp from '../ComonComponent/CustomCloseIconCmp';

const CrfSubStoreMain = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [storeList, setStoreList] = useState([]);
    const [subStoreList, setSubStoreList] = useState([]);
    const [selectedTab, setSelectedTab] = useState(0);
    // const [radiovalue, setRadioValue] = useState('');
    const [count, setCount] = useState(0)
    const [crsList, setCrsList] = useState([])
    // const [crsSlno, setCrsSlno] = useState('1')
    const [tableData, setTableData] = useState([])
    const [selectedRadio, setSelectedRadio] = useState(null);
    const [storeName, setStoreName] = useState('')
    const [allTableData, setAllTableData] = useState([])

    // const [selectedStore, setSelectedStore] = useState({
    //     main_store_slno: null,
    //     crm_store_master_slno: null,
    //     sub_store_name: '',
    // });

    const backtoHome = useCallback(() => {
        history.push('/Home/CrfNewDashBoard');
    }, [history]);

    const ClearSearch = useCallback(() => {
        setSelectedRadio(null)
        setTableData(allTableData)
    }, [allTableData])

    useEffect(() => {
        dispatch(getCrfPOStorAction())
    }, [dispatch, count])
    const storeData = useSelector((state) => state?.getCrfPOStorReducer?.CRFSubstore)

    useEffect(() => {
        const getCRSStore = async () => {
            const result = await axioslogin.get('/newCRFStore/getStores');
            const { success, data } = result.data;
            if (success === 1) {
                const crsStore = data
                    .filter((val, index, self) =>
                        index === self.findIndex((value) => value.main_store_slno === val.main_store_slno))
                    .map((val) => ({
                        main_store_slno: val.main_store_slno,
                        crs_store_code: val.crs_store_code,
                        main_store: val.main_store
                    }));
                setCrsList(crsStore);
                const subStore = data?.map((val) => ({
                    crm_store_master_slno: val.crm_store_master_slno,
                    sub_store_name: val.sub_store_name,
                    store_code: val.store_code,
                    main_store_slno: val.main_store_slno
                }));
                setSubStoreList(subStore);
            } else {
                setCrsList([]);
            }
        };
        getCRSStore();
    }, []);
    useEffect(() => {
        if (storeData.length !== 0) {
            const newData = storeData?.filter((value, index, self) =>
                index === self.findIndex((item) => item.req_slno === value.req_slno && item.supply_store === value.supply_store))
            const countSet = crsList?.map((val) => {
                const xx = newData?.filter((value) => value.supply_store === val.main_store_slno)
                return {
                    main_store_slno: val.main_store_slno,
                    crs_store_code: val.crs_store_code,
                    main_store: val.main_store,
                    sub_store_slno: val.sub_store_slno,
                    sub_store_name: val.sub_store_name,
                    count: xx.length
                }
            })
            setStoreList(countSet)
        }
    }, [crsList, storeData])
    const updateTabChange = useCallback((e, val) => {
        setSelectedTab(val);
        setSelectedRadio(null);
    }, []);

    const subStoreDetailsView = useCallback((slno) => {
        const xx = storeData?.filter((val) => val.supply_store === slno)
        const uniqueReqSlno = [...new Set(xx?.map(item => item.req_slno))];

        const mergedData = uniqueReqSlno?.map(reqSlno => {
            const filteredItems = xx?.filter(item => item.req_slno === reqSlno);
            const pos = filteredItems?.map(item => `${item.po_number}`);
            const poDate = filteredItems?.map(item => `${format(new Date(item.po_date), 'dd-MM-yyyy hh:mm:ss a')}`);
            // const grn_nos = filteredItems.flatMap(item => JSON?.parse(item.grn_no)).join(", ");
            const grn_nos = filteredItems.flatMap(item => JSON?.parse(item.grn_no));
            const po_detail_slno = filteredItems?.map(item => `${item.po_detail_slno}`);
            const po_details = filteredItems?.map((item) => {
                return {
                    po_detail_slno: item.po_detail_slno,
                    po_number: item.po_number,
                    po_date: item.po_date,
                    supplier_name: item.supplier_name,
                    expected_delivery: item.expected_delivery,
                    sub_store_slno: item.sub_store_slno,
                    sub_store_name: item.sub_store_name
                }
            })
            return {
                ...filteredItems[0],
                po_detail_slno,
                pos,
                poDate,
                grn_nos,
                po_details
            };
        });
        setTableData(mergedData)
        setAllTableData(mergedData)
    }, [storeData])

    useEffect(() => {
        if (selectedTab === 0) {
            const xx = storeData?.filter((val) => val.supply_store === 1)
            const uniqueReqSlno = [...new Set(xx?.map(item => item.req_slno))];

            const mergedData = uniqueReqSlno?.map(reqSlno => {
                const filteredItems = xx?.filter(item => item.req_slno === reqSlno);
                const pos = filteredItems?.map(item => `${item.po_number}`);
                const poDate = filteredItems?.map(item => `${format(new Date(item.po_date), 'dd-MM-yyyy hh:mm:ss a')}`);
                // const grn_nos = filteredItems.flatMap(item => JSON?.parse(item.grn_no)).join(", ");
                const grn_nos = filteredItems.flatMap(item => JSON?.parse(item.grn_no));

                const po_detail_slno = filteredItems?.map(item => `${item.po_detail_slno}`);
                const po_details = filteredItems?.map((item) => {
                    return {
                        po_detail_slno: item.po_detail_slno,
                        po_number: item.po_number,
                        po_date: item.po_date,
                        supplier_name: item.supplier_name,
                        expected_delivery: item.expected_delivery,
                        sub_store_slno: item.sub_store_slno,
                        sub_store_name: item.sub_store_name
                    }
                })
                return {
                    ...filteredItems[0],
                    po_detail_slno,
                    pos,
                    poDate,
                    grn_nos,
                    po_details
                };
            });
            setTableData(mergedData)
            setAllTableData(mergedData)
        }
    }, [storeData, selectedTab])

    const handleRadioButtonChange = useCallback((e) => {
        const selectedSlno = e.target.value;
        const selectedSubStore = subStoreList?.find(
            (subStore) => subStore.crm_store_master_slno.toString() === selectedSlno
        );
        if (selectedSubStore) {
            setSelectedRadio(selectedSlno)
            // setStoreName(selectedSubStore.sub_store_name)
            const newdata = allTableData?.filter((val) => val.sub_store_slno === parseInt(selectedSlno))
            setTableData(newdata)
        }
    }, [subStoreList, allTableData]);

    return (
        <Fragment>
            <Box sx={{ height: 38, backgroundColor: "#f0f3f5", display: 'flex', p: 0.5 }}>
                <Box sx={{ flex: 1, fontSize: 20, pl: 1, color: '#9e9e9e', fontFamily: 'Monospace', m: 0.5 }}>Store</Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', flex: 1, fontSize: 20, pr: 0.2 }}>
                    <CssVarsProvider>
                        <CustomCloseIconCmp
                            handleChange={backtoHome}
                        />
                    </CssVarsProvider>
                </Box>
            </Box>
            <Box>
                <Tabs
                    value={selectedTab}
                    onChange={updateTabChange}
                    aria-label="Bottom Navigation"
                    sx={(theme) => ({
                        mx: 'auto',
                        boxShadow: theme.shadows[1],
                        [`& .${tabClasses.root}`]: {
                            flex: 1,
                            transition: '0.3s',
                            fontWeight: theme.typography.fontWeightMedium,
                            fontSize: theme.typography.fontSize,
                            padding: theme.spacing(0.1, 1),
                            pt: 1.5,
                            minHeight: '30px',
                            [`&:not(.${tabClasses.selected}):not(:hover)`]: {
                                opacity: 1,
                            },
                        },
                    })}
                >
                    {storeList?.map((val, index) => (
                        <Tab
                            key={index}
                            style={{ fontWeight: 650, minHeight: '30px' }}
                            label={val.main_store}
                            icon={
                                <Box
                                    sx={{
                                        pl: 5,
                                        bgcolor: '#BFD7ED',
                                        borderRadius: '50%',
                                        minWidth: 25,
                                        minHeight: 25,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 0,
                                        ':hover': { bgcolor: '#C3CEDA' },
                                        cursor: 'pointer',
                                    }}
                                >
                                    {val.count}
                                </Box>
                            }
                            iconPosition="end"
                            onClick={() => subStoreDetailsView(val.main_store_slno)}
                        />
                    ))}
                </Tabs>

                {storeList?.map((store, index) => (
                    <Box
                        role="tabpanel"
                        hidden={selectedTab !== index}
                        id={`tabpanel-${index}`}
                        key={index}
                        sx={{ py: 0.5 }}
                    >
                        {selectedTab === index && (
                            <Paper elevation={2} sx={{ pl: 4, display: 'flex' }}>
                                <RadioGroup
                                    row
                                    value={selectedRadio}
                                    onChange={handleRadioButtonChange}
                                    sx={{ gap: 2 }}
                                >
                                    {subStoreList
                                        .filter(subStore => subStore.main_store_slno === store.main_store_slno)
                                        .map((subStore, subIndex) => (
                                            <FormControlLabel
                                                key={subIndex}
                                                value={subStore.crm_store_master_slno}
                                                control={<Radio />}
                                                label={subStore.sub_store_name}
                                                sx={{ mr: 2 }}
                                            />
                                        ))}
                                </RadioGroup>
                                <Box sx={{ my: 0.5 }}>
                                    <CssVarsProvider>
                                        <IconButton
                                            variant="plain"
                                            sx={{
                                                color: '#616161', bgcolor: 'white', width: 150,
                                                fontSize: 12, borderRadius: 5, height: '19px', lineHeight: '1',
                                                '&:hover': {
                                                    bgcolor: 'white', color: '#1565c0'
                                                },
                                            }}
                                            onClick={ClearSearch}
                                        >
                                            <FilterAltTwoToneIcon sx={{ fontWeight: 550, color: '#0d47a1', pr: 0.5, width: 30, height: 20 }} />
                                            Clear Filter
                                        </IconButton>
                                    </CssVarsProvider>
                                </Box>
                            </Paper>
                        )}
                        <ReceiveSubStoreView tableData={tableData} selectedRadio={selectedRadio} count={count}
                            setCount={setCount} storeName={storeName} setSelectedRadio={setSelectedRadio} setStoreName={setStoreName} />
                    </Box>
                ))}
            </Box>
        </Fragment >
    );
};

export default memo(CrfSubStoreMain);
