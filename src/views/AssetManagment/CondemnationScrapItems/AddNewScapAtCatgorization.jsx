import { Box, Button, Modal, ModalDialog, Table, Typography } from '@mui/joy'
import React, { memo, useCallback, useMemo, useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import CusIconButton from 'src/views/Components/CusIconButton';
import SaveIcon from '@mui/icons-material/Save';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useSelector } from 'react-redux';
import { errorNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import { axioslogin } from 'src/views/Axios/Axios';


const AddNewScapAtCatgorization = ({ setaddMoreItemFlag, addmoreItemOpen, setaddmoreItemOpen, queryClient }) => {



    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })


    const CloseModal = useCallback(() => {
        setaddMoreItemFlag(0)
        setaddmoreItemOpen(false)
    }, [setaddMoreItemFlag, setaddmoreItemOpen])

    const [addedItems, setAddedItems] = useState([])
    const [editIndex, setEditIndex] = useState(0);
    const [addnewItems, setaddnewItems] = useState({
        itemName: '',
        Count: ''

    })
    const { itemName, Count } = addnewItems

    const OnchageData = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setaddnewItems({ ...addnewItems, [e.target.name]: value })
    }, [addnewItems])

    const RefreshItem = useCallback(() => {
        setaddnewItems({
            itemName: '',
            Count: ''
        })
    }, [])

    const AddItems = useCallback(() => {
        if (addnewItems.itemName && addnewItems.Count) {
            setAddedItems(prev => [...prev, addnewItems]);
            RefreshItem();
        }
    }, [addnewItems, RefreshItem]);

    const handleEdit = useCallback((index) => {
        setaddnewItems(addedItems[index]);
        setAddedItems(prev => prev.filter((_, i) => i !== index));
    }, [addedItems]);

    const handleDelete = useCallback((index) => {
        setAddedItems(prev => prev.filter((_, i) => i !== index));
        if (index === editIndex) {
            RefreshItem();
            setEditIndex(null);
        }
    }, [editIndex, RefreshItem]);

    const AddData = useMemo(() => {
        return addedItems.flatMap(item =>
            Array.from({ length: Number(item.Count) }, () => ({
                item_name: item.itemName,
                item_status: 1,
                create_user: id
            }))
        );
    }, [addedItems, id]);

    const SubmitData = useCallback(async (e) => {
        e.preventDefault();
        try {
            const result = await axioslogin.post('/AssetCondemnation/insertNewScrapUnderCondemnation', AddData);
            const { success, message } = result.data;
            if (success === 1) {
                succesNotify(message)
                queryClient.invalidateQueries('getAddedItemNotUnderCategorization')
                CloseModal();
            } else {
                warningNotify(message)
            }
        } catch (err) {
            errorNotify(err)
        }
    }, [AddData, CloseModal]);

    return (
        <Box>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={addmoreItemOpen}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, borderRadius: 10 }}>
                <ModalDialog
                    variant="outlined"
                    sx={{
                        width: 600,
                        minHeight: '30vh',
                        overflowY: 'auto',
                        p: 2,
                        bgcolor: 'background.body',
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2 }}>
                        <Typography level="h5" fontWeight="lg">Add New Items</Typography>
                        <CancelIcon sx={{ cursor: 'pointer', width: 26, height: 26 }} onClick={CloseModal} />
                    </Box>
                    <Box sx={{ mx: 2, mt: 2 }}>
                        <Typography sx={{
                            m: 0.3, fontWeight: 600, fontSize: 14,
                        }}>
                            Item Name
                        </Typography>
                        <TextFieldCustom
                            type="text"
                            size="sm"
                            name="itemName"
                            value={itemName}
                            onchange={OnchageData}
                        ></TextFieldCustom>
                        <Typography sx={{ ml: 0.3, fontWeight: 600, fontSize: 14, }}>
                            Count
                        </Typography>
                        <TextFieldCustom
                            type="number"
                            size="sm"
                            style={{ width: 150 }}
                            name="Count"
                            value={Count}
                            onchange={OnchageData}
                        ></TextFieldCustom>
                    </Box>
                    <Box sx={{ display: 'flex', ml: 2, gap: .5 }}>
                        <CusIconButton
                            size="sm"
                            variant="outlined"
                            color="primary"
                            onClick={AddItems}
                        >
                            <SaveIcon />
                        </CusIconButton>
                        <CusIconButton
                            size="sm"
                            variant="outlined"
                            color="primary"
                            onClick={RefreshItem}
                        >
                            <RefreshIcon />
                        </CusIconButton>

                    </Box>
                    {addedItems.length > 0 ? (
                        <Box sx={{ display: 'flex', mx: 2, mt: 1, borderRadius: 0, }}>
                            <Table
                                borderAxis="bothBetween"
                                stickyHeader
                                variant="outlined"
                                size="sm"
                            >
                                <thead>
                                    <tr>
                                        <th style={{ width: 50, textAlign: 'center' }}>Slno</th>
                                        <th style={{ width: 50, textAlign: 'center' }}>Edit</th>
                                        <th style={{ width: 'auto' }}>Item Name</th>
                                        <th style={{ width: 60, textAlign: 'center' }}>Count</th>
                                        <th style={{ width: 60, textAlign: 'center' }}>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {addedItems.map((val, index) => (
                                        <tr key={index}>
                                            <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <EditOutlinedIcon sx={{ cursor: 'pointer', color: '#1368b4' }} onClick={() => handleEdit(index)} />
                                            </td>
                                            <td>{val.itemName}</td>
                                            <td style={{ textAlign: 'center' }}>{val.Count}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <DeleteOutlinedIcon sx={{ cursor: 'pointer', color: '#634F40' }} onClick={() => handleDelete(index)} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Box>) : (
                        <Box sx={{ height: 50, }}>
                        </Box>)}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mr: 2 }}>
                        <Button variant="outlined" size='sm' onClick={SubmitData}>Add</Button>
                        <Button variant="outlined" size='sm' onClick={CloseModal}>Cancel</Button>
                    </Box>
                </ModalDialog>
            </Modal>
        </Box>
    )
}

export default memo(AddNewScapAtCatgorization)