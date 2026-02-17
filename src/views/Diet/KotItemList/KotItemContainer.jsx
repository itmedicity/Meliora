import { Box } from '@mui/joy'
import React, { useCallback, useMemo, useState } from 'react'
import KotItemHeader from './KotItemHeader'
import { DIET_ALT_COLORS, FoodDetail } from '../CommonData/Common'
import KotItemList from './KotItemList'
import DietFilterComponent from '../DietComponent/DietFilterComponent'
import KotFooterConfirm from './KotFooterConfirm'
import { useDietTimes } from '../CommonData/UseQuery'
import DietEmptyState from '../DietComponent/DietEmptyState'
import { PrintFoodPreparationPdf } from '../CommonData/CommonFun'

const KotItemContainer = () => {

    const [items, setItems] = useState(FoodDetail)
    const [confirmedItems, setConfirmedItems] = useState([])
    const [search, setSearch] = useState('')
    const [dietType, setDietType] = useState('')
    const [select, setSelect] = useState(false);

    // remove this when real data comes 
    const { data: DietTime = [] } = useDietTimes()

    const MatchType = DietTime?.find(v => v?.type_slno === Number(dietType));

    // Fiter data based on the Diet Type and Search keyword?
    const FinalFilterdData = useMemo(() => {
        return items.filter(item => {
            const matchType =
                !dietType ||
                item.Type?.toUpperCase() === MatchType?.type_desc?.toUpperCase()

            const matchSearch =
                !search ||
                item.Item_name?.toUpperCase().includes(search.toUpperCase())

            return matchType && matchSearch
        })
    }, [items, dietType, search, MatchType])


    //Confirm Items
    const handleConfirmItem = (item) => {
        setConfirmedItems(prev => {
            const exists = prev.some(
                i => Number(i.item_slno) === Number(item.item_slno)
            )
            if (exists) {
                return prev.filter(
                    i => Number(i.item_slno) !== Number(item.item_slno)
                )
            }
            return [...prev, item]
        })
    }


    const HanldeSelectAll = useCallback((checked) => {
        setSelect(checked);

        if (checked) {
            // move only filtered items to confirmed
            setConfirmedItems(prev => {
                const newItems = FinalFilterdData.filter(
                    item => !prev.some(p => p.item_slno === item.item_slno)
                );
                return [...prev, ...newItems];
            });
        } else {
            // move back only filtered confirmed items

            setConfirmedItems(prev =>
                prev.filter(
                    item => !FinalFilterdData.some(f => f.item_slno === item.item_slno)
                )
            );
        }
    }, [FinalFilterdData, confirmedItems]);



    const PrintToPdf = useCallback(() => {
        PrintFoodPreparationPdf(confirmedItems);
    }, [confirmedItems]);

    return (

        <Box
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column'
            }}>

            <KotItemHeader
                name={'DIET LIST'}
                goBackPath={''}
            />

            <DietFilterComponent
                setSearch={setSearch}
                setDietType={setDietType}
                search={search}
                dietType={dietType}
                select={select}
                HanldeSelectAll={HanldeSelectAll}
            />

            <Box sx={{
                width: '95%',
                minHeight: '55vh',
                maxHeight: '75vh',
                border: '1px solid #e9e5e56c',
                mt: 1,
                p: 1,
                bgcolor: '#f6f6f6d9',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                overflowY: 'scroll',
                gap: 0.2,

                /* Hide scrollbar */
                scrollbarWidth: 'none',          // Firefox
                msOverflowStyle: 'none',          // IE & Edge
                '&::-webkit-scrollbar': {
                    display: 'none',               // Chrome, Safari
                },
            }}>

                {
                    FinalFilterdData?.length === 0 ? (
                        <DietEmptyState
                            title="No food items found"
                            description="Try selecting a different diet type or search again"
                        />
                    ) : (
                        FinalFilterdData?.map((item, index) => {
                            const dietColor = DIET_ALT_COLORS[index % 2]
                            const MatchConFirmed = confirmedItems?.some(val => val.item_slno === item.item_slno)
                            return (
                                <KotItemList
                                    foundmatch={MatchConFirmed}
                                    key={item.item_slno}
                                    bgcolor={dietColor}
                                    FoodItemDetail={item}
                                    onConfirm={handleConfirmItem}
                                />
                            )
                        })
                    )
                }


                <KotFooterConfirm
                    pdf={PrintToPdf}
                    confirmedItems={confirmedItems}
                    onConfirm={() => {
                        setConfirmedItems([])
                    }}
                />
            </Box>


        </Box>
    )
}

export default KotItemContainer