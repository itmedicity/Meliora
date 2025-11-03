import { Box, Modal, ModalDialog, Table, IconButton, Tooltip } from '@mui/joy';
import React, { memo, useCallback } from 'react';
import TextComponent from 'src/views/Components/TextComponent';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { taskColor } from 'src/color/Color';
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import { axioslogin } from 'src/views/Axios/Axios';
import { useQueryClient } from '@tanstack/react-query';

const ViewItemsCategorized = ({ itemList, viewItemOpen, setviewItemFlag, setviewItemOpen, }) => {


    const queryClient = useQueryClient()
    const CloseModal = useCallback(() => {
        setviewItemFlag(0);
        setviewItemOpen(false);
    }, [setviewItemFlag, setviewItemOpen]);

    const groupedItems = itemList.reduce((acc, item) => {
        const category = item.cat_asset_name || item.cat_spare_name || item.item_name || item.category_name || 'Unknown';
        if (!acc[category]) acc[category] = [];
        acc[category].push(item);
        return acc;
    }, {});



    const handleDelete = useCallback((item) => {
        const { am_condem_detail_slno, item_slno } = item;
        const patchdata = {
            scrap_category: null,
            scrap_quality: null,
            scrap_yard: null,
            scrap_categorize: 0,
            am_condem_detail_slno,
            item_slno,
        };
        const InactiveItem = async (patchdata) => {
            try {
                const result = await axioslogin.patch('/condemMasters/RemoveItemFromCategorized', patchdata);
                const { message, success } = result.data;
                success === 2 ? succesNotify(message) : warningNotify(message);
                queryClient.invalidateQueries('getcondemdAssetCategoryWise')
                CloseModal()
            } catch (error) {
                warningNotify('Error while removing item from categorized list');
            }
        };
        const InactiveAddedItem = async (patchdata) => {
            try {
                const result = await axioslogin.patch('/condemMasters/RemoveItemsAddedFromCategorized', patchdata);
                const { message, success } = result.data;
                success === 2 ? succesNotify(message) : warningNotify(message);
                queryClient.invalidateQueries('getcondemdAssetCategoryWise')
                CloseModal()
            } catch (error) {
                warningNotify('Error while removing added item from categorized list');
            }
        };

        if (am_condem_detail_slno) {
            InactiveItem(patchdata);
        } else if (item_slno) {
            InactiveAddedItem(patchdata);
        } else {
            warningNotify('Invalid item selected');
        }
    }, [queryClient]);




    return (
        <Box>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={viewItemOpen}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, borderRadius: 10 }}
            >
                <ModalDialog
                    variant="outlined"
                    sx={{
                        width: '60vw',
                        p: 0,
                        overflow: 'auto',
                        borderRadius: 12,
                        boxShadow: 'lg',
                    }}
                >
                    <Box sx={{ border: 0.1, borderColor: '#E8E6E5', m: 1, minHeight: '50vh', borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1 }}>
                            <TextComponent
                                text="Categorized Item View"
                                sx={{ fontWeight: 600, color: taskColor.darkPurple, fontSize: 21 }}
                            />
                            <CancelIcon
                                sx={{
                                    width: 30,
                                    height: 30,
                                    color: taskColor.darkPurple,
                                    cursor: 'pointer',
                                    transition: '0.3s',
                                    '&:hover': { color: '#b71c1c', transform: 'rotate(90deg)' },
                                }}
                                onClick={CloseModal} />
                        </Box>
                        <Box sx={{ mt: 2, mx: 1, minHeight: '80vh' }}>
                            <Table
                                borderAxis="both"
                                stickyHeader
                                size="sm"
                                sx={{
                                    borderRadius: 0,
                                    '& thead th': {
                                        backgroundColor: '#f9fafb',
                                        fontWeight: 600,
                                        textAlign: 'center',
                                    },
                                    '& tbody td': {
                                        fontSize: 13,
                                    },
                                }}
                            >
                                <thead>
                                    <tr>
                                        <th style={{ width: 50 }}>#</th>
                                        <th style={{}}>Item Name</th>
                                        <th style={{ width: 100 }}>Count</th>
                                        <th style={{ width: 60 }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {Object.entries(groupedItems).length === 0 ? (
                                        <tr>
                                            <td colSpan={4} style={{ textAlign: 'center' }}>
                                                No items
                                            </td>
                                        </tr>
                                    ) : (
                                        Object.entries(groupedItems).map(([category, items]) => (
                                            <React.Fragment key={category}>
                                                <tr style={{ fontWeight: 600, background: '#f0f4f8' }}>
                                                    <td></td>
                                                    <td>{category}</td>
                                                    <td style={{ textAlign: 'center' }}>{items.length}</td>
                                                    <td></td>
                                                </tr>
                                                {items.map((item, index) => (
                                                    <tr style={{ minHeight: 50 }} key={`${item.slno}-${item.type}`}>
                                                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                        <td>{item.asset_item_name || item.spare_item_name || item.item_name}</td>
                                                        <td style={{ textAlign: 'center' }}>—</td>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <Tooltip title="Remove Item" variant="soft">
                                                                <IconButton
                                                                    size="sm"
                                                                    color="danger"
                                                                    variant="plain"
                                                                    onClick={() => handleDelete(item)}
                                                                    sx={{
                                                                        '&:hover': {
                                                                            backgroundColor: 'rgba(244, 67, 54, 0.1)',
                                                                            transform: 'scale(1.1)',
                                                                        },
                                                                    }}
                                                                >
                                                                    <DeleteOutlineIcon fontSize="small" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        ))
                                    )}
                                </tbody>
                            </Table>
                        </Box>
                    </Box>
                </ModalDialog>
            </Modal>
        </Box>
    );
};

export default memo(ViewItemsCategorized);
