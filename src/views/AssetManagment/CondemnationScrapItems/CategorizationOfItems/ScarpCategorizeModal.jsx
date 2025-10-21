import { Box, Button, Modal, ModalDialog, Table } from '@mui/joy'
import React, { memo, useCallback, useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import TextComponent from 'src/views/Components/TextComponent';
import CategorySelect from '../../CondemnationSelectCode/CategorySelect';
import QualitySelect from '../../CondemnationSelectCode/QualitySelect';
import ScrapLocation from '../../CondemnationSelectCode/ScrapLocation';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNotify } from 'src/views/Common/CommonCode';
import { taskColor } from 'src/color/Color';

const ScarpCategorizeModal = ({ setCategorizeScarpFlag, CategorizeScarpOpen, setCategorizeScarpOpen, selectedItems, queryClient, setSelectedRows }) => {

    const CloseScrapCatgorize = useCallback(() => {
        setCategorizeScarpOpen(false)
        setCategorizeScarpFlag(0)
    }, [])

    const [category, setcategory] = useState(0)
    const [quality, setquality] = useState(0)
    const [scrapLocation, setscrapLocation] = useState([])
    const [categoryName, setcategoryName] = useState('')
    const [qualityName, setqualityName] = useState('')

    const groupedItems = selectedItems.reduce((acc, item) => {
        const category = item.cat_asset_name || item.cat_spare_name || item.item_name || 'Unknown';
        if (!acc[category]) acc[category] = [];
        acc[category].push(item);
        return acc;
    }, {});

    const UpdateScrapCategorize = async (data) => {
        try {
            const response = await axioslogin.patch('/AssetCondemnation/UpdateScrapCategorize', data);
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error };
        }
    };

    const UpdateItemScrapCategorize = async (data) => {
        try {
            const response = await axioslogin.patch('/AssetCondemnation/UpdateItemScrapCategorize', data);
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error };
        }
    };

    const Categorize = useCallback(async () => {
        if (!selectedItems || selectedItems.length === 0) {
            return;
        }
        let atLeastOneSuccess = false;

        for (const item of selectedItems) {
            const updateData = {
                scrap_category: category,
                scrap_quality: quality,
                scrap_yard: scrapLocation
            };

            if (item?.type === "ItemList" && (item.am_asset_item_slno || item.am_spare_item_slno)) {
                const { success } = await UpdateScrapCategorize({
                    ...updateData,
                    am_asset_item_slno: item.am_asset_item_slno || null,
                    am_spare_item_slno: item.am_spare_item_slno || null,
                });

                if (success) {
                    atLeastOneSuccess = true;
                }

            } else if (item?.type === "AddedItems" && item.item_slno) {
                const { success } = await UpdateItemScrapCategorize({
                    ...updateData,
                    item_slno: item.item_slno,
                });

                if (success) {
                    atLeastOneSuccess = true;
                }
            }
        }

        if (atLeastOneSuccess) {
            succesNotify("Items Categorized Successfully");
            CloseScrapCatgorize();
            queryClient.invalidateQueries('getScrapNotUnderCategorization');
            queryClient.invalidateQueries('getAddedItemNotUnderCategorization');
            setSelectedRows([])
        }
    }, [selectedItems, category, quality, scrapLocation]);



    return (
        <Box>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={CategorizeScarpOpen}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, borderRadius: 10 }}>
                <ModalDialog variant="outlined" sx={{ width: '80vw', p: 0, overflow: 'auto', }}>
                    <Box sx={{ border: .1, borderColor: taskColor.lightgrey, m: 1, minHeight: '50vh' }}>
                        <Box sx={{ flex: 1, display: 'flex', ml: 1, }}>
                            <Box sx={{ flex: 1 }}>
                                <TextComponent
                                    text={"Categorize Items"}
                                    sx={{ fontWeight: 600, color: taskColor.darkPurple, pl: .8, pt: 1, fontSize: 21 }}
                                />
                            </Box>
                            <Box sx={{ pr: 1, pt: 1, }}>
                                <CancelIcon sx={{ width: 30, height: 30, color: taskColor.darkPurple, cursor: 'pointer' }} onClick={CloseScrapCatgorize} />
                            </Box>
                        </Box>
                        <Box sx={{ mt: 3, mx: 1, minHeight: '30vh', }}>
                            <Table
                                borderAxis="both"
                                stickyHeader
                                size="sm"
                                sx={{ borderRadius: 0, minWidth: 500 }}
                            >
                                <thead>
                                    <tr>
                                        <th style={{ width: 50, textAlign: 'center' }}></th>
                                        <th>Item Name</th>
                                        <th style={{ width: 100, textAlign: 'center' }}>Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(groupedItems).length === 0 ? (
                                        <tr>
                                            <td colSpan={3} style={{ textAlign: 'center' }}>
                                                No items selected
                                            </td>
                                        </tr>
                                    ) : (
                                        Object.entries(groupedItems).map(([category, items]) => (
                                            <React.Fragment key={category}>
                                                <tr style={{ fontWeight: 600, background: '#f0f4f8' }}>
                                                    <td style={{ textAlign: 'center' }}>

                                                    </td>
                                                    <td>{category}</td>
                                                    <td style={{ textAlign: 'center' }}>{items.length}</td>
                                                </tr>
                                                {items.map((item, index) => (
                                                    <tr key={`${item.slno}-${item.type}`}>
                                                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                        <td colSpan={2}>{item.asset_item_name || item.spare_item_name || item.item_name}</td>
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        ))
                                    )}
                                </tbody>
                            </Table>
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', mx: 1, px: .5, gap: .5, my: 2 }}>
                            <Box sx={{ flex: 1, }}>
                                <TextComponent text={"Category"} sx={{ pl: .5, fontSize: 14, fontWeight: 500 }} />
                                <CategorySelect value={category} setValue={setcategory} setcategoryName={setcategoryName} categoryName={categoryName} />
                            </Box>
                            <Box sx={{ flex: 1, }}>
                                <TextComponent text={"Quality"} sx={{ pl: .5, fontSize: 14, fontWeight: 500 }} />
                                <QualitySelect value={quality} setValue={setquality} setqualityName={setqualityName} quality={quality} qualityName={qualityName} />
                            </Box>
                            <Box sx={{ flex: 1, }}>
                                <TextComponent text={"Scrap Location"} sx={{ pl: .5, fontSize: 14, fontWeight: 500 }} />
                                <ScrapLocation value={scrapLocation} setValue={setscrapLocation} />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', m: 1, gap: .5, pb: 1 }}>
                            <Button
                                variant='plain'
                                sx={{ color: taskColor.darkPurple }}
                                onClick={Categorize}
                            >
                                Categorize
                            </Button>
                            <Button
                                variant='plain'
                                sx={{ color: taskColor.darkPurple }}
                                onClick={CloseScrapCatgorize}
                            >Cancel</Button>
                        </Box>
                    </Box>
                </ModalDialog>
            </Modal>
        </Box>
    )
}

export default memo(ScarpCategorizeModal)
