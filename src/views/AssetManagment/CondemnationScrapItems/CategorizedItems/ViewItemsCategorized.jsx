import { Box, Modal, ModalDialog, Table } from '@mui/joy';
import React, { useCallback } from 'react'
import TextComponent from 'src/views/Components/TextComponent';
import CancelIcon from '@mui/icons-material/Cancel';
import { taskColor } from 'src/color/Color';

const ViewItemsCategorized = ({ itemList, viewItemOpen, setviewItemFlag, setviewItemOpen }) => {

    const CloseModal = useCallback(() => {
        setviewItemFlag(0)
        setviewItemOpen(false)
    }, [setviewItemFlag, setviewItemOpen])

    const groupedItems = itemList.reduce((acc, item) => {
        const category = item.cat_asset_name || item.cat_spare_name || item.item_name || item.category_name || 'Unknown';
        if (!acc[category]) acc[category] = [];
        acc[category].push(item);
        return acc;
    }, {});


    return (
        <Box>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={viewItemOpen}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, borderRadius: 10 }}>
                <ModalDialog variant="outlined" sx={{ width: '50vw', p: 0, overflow: 'auto', }}>
                    <Box sx={{ border: .1, borderColor: '#E8E6E5', m: 1, minHeight: '50vh' }}>
                        <Box sx={{ flex: 1, display: 'flex', ml: 1, }}>
                            <Box sx={{ flex: 1 }}>
                                <TextComponent
                                    text={"Categorize Item View"}
                                    sx={{ fontWeight: 600, color: taskColor.darkPurple, pl: .8, pt: 1, fontSize: 21 }}
                                />
                            </Box>
                            <Box sx={{ pr: 1, pt: 1, }}>
                                <CancelIcon sx={{ width: 30, height: 30, color: taskColor.darkPurple, cursor: 'pointer' }} onClick={CloseModal} />
                            </Box>
                        </Box>
                        <Box sx={{ mt: 3, mx: 1, minHeight: '80vh', }}>
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
                                                No items
                                            </td>
                                        </tr>
                                    ) : (
                                        Object.entries(groupedItems).map(([category, items]) => (
                                            <React.Fragment key={category} >
                                                <tr style={{ fontWeight: 600, background: '#f0f4f8' }}>
                                                    <td style={{ textAlign: 'center' }}>
                                                    </td>
                                                    <td>{category}</td>
                                                    <td style={{ textAlign: 'center' }}>{items.length}</td>
                                                </tr>
                                                {
                                                    items.map((item, index) => (
                                                        <tr key={`${item.slno}-${item.type}`}>
                                                            <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                            <td colSpan={2}>{item.asset_item_name || item.spare_item_name || item.item_name}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </React.Fragment>
                                        ))
                                    )}
                                </tbody>
                            </Table>
                        </Box>
                    </Box>
                </ModalDialog>
            </Modal>
        </Box >
    )
}

export default ViewItemsCategorized