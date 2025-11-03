import { Box, Modal, ModalDialog, Textarea, Typography, Button } from '@mui/joy';
import React, { memo, useCallback, useMemo, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import TextComponent from 'src/views/Components/TextComponent';
import { taskColor } from 'src/color/Color';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';

const KeepInDeptScrapStoreModal = ({ setkeepinScarpModalOpen, setkeepinScarpModalFlag, keepinScarpModalOpen, detailsofItem, empId, keepinScarpModalFlag, setCheckedItems,
    currentIndex, setcurrentIndex, condemMastslno, queryClient }) => {

    const { item_asset_no, item_asset_no_only, spare_asset_no, spare_asset_no_only, item_name, am_condem_detail_slno, keep_in_srap_store_reason,
        am_item_map_slno, am_spare_item_map_slno, } = detailsofItem || {};



    const [reason, setReason] = useState(keep_in_srap_store_reason || '');




    const CloseScrapModal = useCallback(() => {
        setkeepinScarpModalOpen(false);
        setkeepinScarpModalFlag(0);
        setCheckedItems((prev) => {
            if (currentIndex !== null) {
                return { ...prev, [currentIndex]: false };
            }
            return prev;
        });
        setcurrentIndex(null);
    }, [currentIndex, setkeepinScarpModalOpen, setkeepinScarpModalFlag]);

    const CancelScrap = useCallback(() => {
        setkeepinScarpModalOpen(false);
        setkeepinScarpModalFlag(0);
        setCheckedItems((prev) => {
            if (currentIndex !== null) {
                return { ...prev, [currentIndex]: true };
            }
            return prev;
        });
        setcurrentIndex(null);
    }, [currentIndex, setkeepinScarpModalOpen, setkeepinScarpModalFlag]);


    const singleItemData = useMemo(() => ({
        keep_inscarp_status: 1,
        keep_in_srap_store_reason: reason,
        scarp_store_emp: empId,
        condem_mast_slno: condemMastslno,
        am_item_map_slno: am_item_map_slno !== undefined ? am_item_map_slno : null,
        am_spare_item_map_slno: am_spare_item_map_slno !== undefined ? am_spare_item_map_slno : null
    }), [am_condem_detail_slno, reason, empId, condemMastslno]);


    const handleAddReason = useCallback(() => {
        const scarpStoreUpdate = async () => {
            const result = await axioslogin.patch('/AssetCondemnation/updateScarpStoreData', singleItemData);
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message);
                queryClient.invalidateQueries('getCondemAddedDetails')
                setkeepinScarpModalOpen(false);
                setkeepinScarpModalFlag(0);
                setReason("");
            } else {
                infoNotify(message);
            }
        };
        scarpStoreUpdate();
    }, [singleItemData, CloseScrapModal, setkeepinScarpModalOpen, setkeepinScarpModalFlag, queryClient]);

    const removeItemData = useMemo(() => ({
        keep_inscarp_status: 0,
        keep_in_srap_store_reason: null,
        scarp_store_emp: empId,
        condem_mast_slno: condemMastslno,
        am_item_map_slno: am_item_map_slno !== undefined ? am_item_map_slno : null,
        am_spare_item_map_slno: am_spare_item_map_slno !== undefined ? am_spare_item_map_slno : null
    }), [am_condem_detail_slno, reason, empId, condemMastslno]);


    const RemoveFromScrapStore = useCallback(() => {
        const scarpStoreUpdate = async () => {
            const result = await axioslogin.patch('/AssetCondemnation/updateScarpStoreData', removeItemData);
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message);
                queryClient.invalidateQueries('getCondemAddedDetails')
                setkeepinScarpModalOpen(false);
                setkeepinScarpModalFlag(0);
                setReason("");
            } else {
                infoNotify(message);
            }
        };
        scarpStoreUpdate();
    }, [removeItemData, CloseScrapModal, setkeepinScarpModalOpen, setkeepinScarpModalFlag, queryClient])


    return (
        <Box>
            <Modal
                aria-labelledby="nested-modal-title"
                aria-describedby="nested-modal-desc"
                open={keepinScarpModalOpen}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1400,
                }} >
                <ModalDialog
                    variant="outlined"
                    sx={{ width: 500, p: 2, borderRadius: "md", bgcolor: "background.body", }}
                >
                    <Box sx={{ border: 1, borderColor: taskColor.lightpurple, p: 1, }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', pl: .5 }}>
                            <TextComponent
                                text={"Keep in Department Scrap Store"}
                                sx={{ fontWeight: 600, color: taskColor.darkPurple, fontSize: 15 }}
                            />
                            <CancelIcon
                                sx={{ width: 30, height: 30, color: taskColor.darkPurple, cursor: 'pointer' }}
                                onClick={CloseScrapModal}
                            />
                        </Box>
                        <Box sx={{ fontWeight: 500, fontSize: 14, pl: .5 }}>
                            {spare_asset_no
                                ? `${spare_asset_no}/${spare_asset_no_only.toString().padStart(6, '0')}`
                                : `${item_asset_no}/${item_asset_no_only.toString().padStart(6, '0')}`}
                        </Box>

                        <Box sx={{ fontWeight: 500, fontSize: 14, pl: .5 }}>
                            {item_name}
                        </Box>

                        {keepinScarpModalFlag === 1 ?
                            <Box>
                                <Typography sx={{ ml: .5, fontSize: 14, mt: 1 }}>
                                    Why do you want to keep this in the department scrap store?
                                    <span style={{ color: '#74112F', fontSize: 15 }}>*</span>
                                </Typography>
                                <Textarea
                                    minRows={3}
                                    placeholder="Enter reason..."
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                />
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
                                    <Button
                                        variant="outlined"
                                        color="neutral"
                                        onClick={handleAddReason}
                                    >
                                        Add
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="neutral"
                                        onClick={CloseScrapModal}
                                    >
                                        Close
                                    </Button>
                                </Box>
                            </Box>
                            : null}
                        {keepinScarpModalFlag === 2 ?
                            <Box>
                                <Typography sx={{ ml: .5, fontSize: 14, mt: 1 }}>
                                    Do you want to submit this for condemnation by removing it from the scrap store
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
                                    <Button
                                        variant="outlined"
                                        color="neutral"
                                        onClick={RemoveFromScrapStore}
                                    >
                                        Yes
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="neutral"
                                        onClick={CancelScrap}
                                    >
                                        Cancel
                                    </Button>
                                </Box>
                            </Box>
                            : null}
                    </Box>
                </ModalDialog>
            </Modal>
        </Box>
    );
};

export default memo(KeepInDeptScrapStoreModal);
