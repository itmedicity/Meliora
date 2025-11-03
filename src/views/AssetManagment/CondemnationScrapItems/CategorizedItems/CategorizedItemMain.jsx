import { Box } from '@mui/system'
import React, { useCallback, useState } from 'react'
import SupplierRateDetails from './SupplierRateDetails'
import { Avatar } from '@mui/joy'
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { getcondemdAssetCategoryWiseDashboard } from 'src/api/AssetApis';
import { axioslogin } from 'src/views/Axios/Axios';
import ViewItemsCategorized from './ViewItemsCategorized';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import CheckIcon from '@mui/icons-material/Check';
import SubmitScrapCategorized from './SubmitScrapCategorized';
import { useQuery } from '@tanstack/react-query';
import { taskColor } from 'src/color/Color';

const CategorizedItemMain = ({ submitModalOpen, setSubmitModalOpen, submitModalFlag, setSubmitModalFlag }) => {

    const [itemList, setItemList] = useState([])
    const [viewItemFlag, setviewItemFlag] = useState(0)
    const [viewItemOpen, setviewItemOpen] = useState(false)
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([])

    const handleToggle = (id, val) => {
        setSelectedItems(prevItems => {
            const exists = prevItems.find(
                item =>
                    item.scrap_category === val.scrap_category &&
                    item.scrap_quality === val.scrap_quality
            );

            if (exists) {
                // remove from both states
                setSelectedCategories(prevCat =>
                    prevCat.filter(
                        cat =>
                            !(
                                cat.scrap_category === val.scrap_category &&
                                cat.scrap_quality === val.scrap_quality
                            )
                    )
                );
                return prevItems.filter(
                    item =>
                        !(
                            item.scrap_category === val.scrap_category &&
                            item.scrap_quality === val.scrap_quality
                        )
                );
            } else {
                // add to both states (but check duplicates for categories)
                setSelectedCategories(prevCat => {
                    const catExists = prevCat.find(
                        cat =>
                            cat.scrap_category === val.scrap_category &&
                            cat.scrap_quality === val.scrap_quality
                    );
                    if (catExists) return prevCat; // no duplicate
                    return [
                        ...prevCat,
                        { scrap_category: val.scrap_category, scrap_quality: val.scrap_quality }
                    ];
                });

                return [...prevItems, val];
            }
        });
    };

    const { data: CategoryWiseDashboard } = useQuery({
        queryKey: ['getcondemdAssetCategoryWise',],
        queryFn: () => getcondemdAssetCategoryWiseDashboard(),
    });

    const ViewCondemnedItems = useCallback((val) => {
        const { scrap_quality, scrap_category } = val
        const postData = {
            scrap_quality,
            scrap_category
        }

        const getItemsCategorized = async () => {
            try {
                const res1 = await axioslogin.post('/AssetCondemnation/ViewCategorizedItems', postData)
                const res2 = await axioslogin.post('/AssetCondemnation/ViewCategorizedAddedItems', postData)
                const data1 = res1.data?.success === 2 ? res1.data.data : []
                const data2 = res2.data?.success === 2 ? res2.data.data : []

                const combinedData = [...data1, ...data2]
                setItemList(combinedData)
            } catch (err) {
                setItemList([])
            }
        }
        getItemsCategorized()
        setviewItemFlag(1)
        setviewItemOpen(true)
    }, [])

    return (
        <Box>
            {viewItemFlag === 1 ?
                <ViewItemsCategorized itemList={itemList} viewItemOpen={viewItemOpen} setviewItemFlag={setviewItemFlag} setviewItemOpen={setviewItemOpen} />
                : null}

            {submitModalFlag === 1 ?
                <SubmitScrapCategorized
                    submitModalOpen={submitModalOpen}
                    setSubmitModalFlag={setSubmitModalFlag}
                    setSubmitModalOpen={setSubmitModalOpen}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                    setSelectedItems={setSelectedItems}
                />
                : null}

            {CategoryWiseDashboard?.length > 0 ?
                <Box sx={{ display: 'flex', flexWrap: 'wrap', p: 1, gap: .5 }}>
                    {CategoryWiseDashboard?.map((val, index) => {
                        const isSelected = selectedItems.some(item =>
                            item.scrap_category === val.scrap_category &&
                            item.scrap_quality === val.scrap_quality
                        );

                        return (
                            <Box
                                key={index}
                                sx={{
                                    width: 200,
                                    height: 110,
                                    border: 1,
                                    borderRadius: 10,
                                    borderColor: isSelected ? '#4caf50' : '#c1c8e4',
                                    background: 'linear-gradient(to bottom left, #543a72e3, #d683b3ff)',

                                }}
                            >

                                <Box sx={{ flex: 1, display: 'flex', p: .5, height: 30 }}>
                                    <Box sx={{ flex: 1, pl: 1, fontWeight: 600, fontSize: 14, color: 'white' }}>
                                        {val.category_name},
                                        <br></br>
                                        {val.quality_name}
                                    </Box>
                                    <Avatar
                                        variant={isSelected ? 'solid' : 'outlined'}
                                        size="sm"
                                        sx={{
                                            bgcolor: isSelected ? '#4caf50' : 'white',
                                            cursor: 'pointer',
                                            color: isSelected ? 'white' : 'black'
                                        }}
                                        onClick={() => handleToggle(index, val)}
                                    >
                                        {isSelected ? <CheckIcon /> : <ArrowOutwardIcon />}
                                    </Avatar>
                                </Box>
                                <Box sx={{ flex: 1, fontSize: 25, fontWeight: 600, pl: 1.5, pt: 1.5, color: 'white' }}>
                                    {val.total_count}
                                </Box>

                                <Box sx={{ flex: 1, height: 25, display: 'flex', pl: .5, cursor: 'pointer' }}>
                                    <PlayArrowOutlinedIcon sx={{ color: 'black' }} />
                                    <Box sx={{ fontWeight: 600, fontSize: 13, color: 'black', pt: .3 }} onClick={() => ViewCondemnedItems(val)}>
                                        <u>View Items</u>
                                    </Box>
                                </Box>

                            </Box>
                        )
                    })}
                </Box> :
                <Box sx={{
                    flexGrow: 1, border: 1, borderColor: taskColor.lightgrey, m: 1, height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center',
                    textAlign: 'center', fontSize: 30, fontWeight: 700, color: taskColor.lightgrey
                }}>
                    Empty List
                </Box>}
            <Box sx={{ flex: 1 }}>
                <SupplierRateDetails />
            </Box>
        </Box>
    )
}

export default CategorizedItemMain