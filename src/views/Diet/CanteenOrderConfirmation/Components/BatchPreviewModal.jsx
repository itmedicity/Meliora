// BatchPreviewModal.jsx

import React, { useState } from "react";
import {
    Modal,
    ModalDialog,
    Box,
    Chip,
    // Textarea,
    Stack,
    Divider
} from "@mui/joy";

import FastfoodIcon from "@mui/icons-material/Fastfood";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Inventory2Icon from "@mui/icons-material/Inventory2";

import DietTextComponent from "../../DietComponent/DietTextComponent";
import DietButton from "../../DietComponent/DietButton";

import CloseIcon from "@mui/icons-material/Close";
import RecommendIcon from "@mui/icons-material/Recommend";

const BatchTypeCard = ({ type }) => {

    const [expanded, setExpanded] = useState(false);

    return (
        <Box
            sx={{
                border: "1px solid #ececec",
                borderRadius: 2,
                overflow: "hidden",
                bgcolor: "#fff",
                mb: 1.5
            }}
        >

            {/* TYPE HEADER */}
            <Box
                onClick={() => setExpanded(prev => !prev)}
                sx={{
                    px: 2,
                    py: 1.2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    bgcolor: expanded
                        ? "#f7f0ff"
                        : "#fcfcfc",
                    transition: "0.2s ease"
                }}
            >

                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                >
                    <FastfoodIcon
                        sx={{
                            color: "#7b2cbf",
                            fontSize: 20
                        }}
                    />

                    <DietTextComponent
                        value={type?.type_desc}
                        size={14}
                        weight={700}
                        color="#4a4a4a"
                    />
                </Stack>

                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                >
                    <Chip
                        size="sm"
                        variant="soft"
                        color="primary"
                    >
                        {type?.items?.length || 0} Items
                    </Chip>

                    {
                        expanded ? (
                            <KeyboardArrowUpIcon
                                sx={{
                                    color: "#7b2cbf"
                                }}
                            />
                        ) : (
                            <KeyboardArrowDownIcon
                                sx={{
                                    color: "#7b2cbf"
                                }}
                            />
                        )
                    }
                </Stack>
            </Box>

            {/* ITEMS */}
            <Box
                sx={{
                    maxHeight: expanded ? 400 : 0,
                    overflow: "hidden",
                    transition: "all 0.25s ease"
                }}
            >
                <Divider />

                <Box
                    sx={{
                        p: 1.5,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        bgcolor: "#fafafa"
                    }}
                >

                    {
                        type?.items?.map((item, idx) => (

                            <Box
                                key={idx}
                                sx={{
                                    px: 1.5,
                                    py: 1,
                                    borderRadius: 1.5,
                                    bgcolor: "#fff",
                                    border: "1px solid #f0f0f0",

                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}
                            >

                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                >
                                    <Inventory2Icon
                                        sx={{
                                            color: "#6a696b",
                                            fontSize: 12
                                        }}
                                    />

                                    <DietTextComponent
                                        value={item?.item_name}
                                        size={12}
                                        weight={600}
                                    />
                                </Stack>

                                <Chip
                                    size="sm"
                                    variant="soft"
                                    color="primary"
                                    sx={{
                                        fontWeight: 700
                                    }}
                                >
                                    Qty : {item?.required_qty}
                                </Chip>
                            </Box>
                        ))
                    }
                </Box>
            </Box>
        </Box>
    );
};

const BatchPreviewModal = ({
    open,
    onClose,
    organizedBatchData = [],
    batchRemark,
    setBatchRemark,
    onConfirm,
    loading
}) => {

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <ModalDialog
                sx={{
                    width: 550,
                    maxWidth: "95vw",
                    height: "55vh",
                    p: 0,
                    borderRadius: 3,
                    overflow: "hidden"
                }}
            >

                {/* HEADER */}
                <Box
                    sx={{
                        px: 2,
                        py: 1.5,
                        bgcolor: "#dfdae5",
                        color: "#fff",

                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderLeft: '2px solid #7b2cbf',
                        borderRight: '2px solid #7b2cbf'
                    }}
                >

                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                    >
                        <RestaurantMenuIcon sx={{
                            color: '#7b2cbf'
                        }} />

                        <DietTextComponent
                            value="Batch Preview"
                            size={17}
                            weight={700}
                            color="#222222"
                        />
                    </Stack>

                    <Chip
                        size="sm"
                        variant="soft"
                        color="neutral"
                    >
                        {organizedBatchData?.length || 0} Types
                    </Chip>
                </Box>

                {/* BODY */}
                <Box
                    sx={{
                        flex: 1,
                        overflow: "hidden",

                        display: "flex",
                        flexDirection: "column",
                        bgcolor: "#f7f7f7"
                    }}
                >

                    {/* SCROLL AREA */}
                    <Box
                        sx={{
                            flex: 1,
                            overflowY: "auto",
                            p: 2,

                            "&::-webkit-scrollbar": {
                                width: 5
                            },

                            "&::-webkit-scrollbar-thumb": {
                                background: "#d4d4d4",
                                borderRadius: 10
                            }
                        }}
                    >

                        {
                            organizedBatchData?.map((type, index) => (
                                <BatchTypeCard
                                    key={index}
                                    type={type}
                                />
                            ))
                        }
                    </Box>

                    {/* STICKY REMARK */}
                    <Box
                        sx={{
                            p: 2,
                            borderTop: "1px solid #ececec",
                            bgcolor: "#fff",
                            position: "sticky",
                            bottom: 0
                        }}
                    >

                        <DietTextComponent
                            value="Batch Preparation Remark"
                            size={13}
                            weight={700}
                            color="#7b2cbf"
                        />

                        <textarea
                            style={{
                                width: "100%",
                                height: 80,
                                marginTop: 8,
                                padding: 8,
                                resize: "none",
                                borderRadius: 4,
                                outline: "none",
                                // ...(error && { border: "1px solid red" })
                            }}
                            value={batchRemark}
                            placeholder="Enter remark..."
                            onChange={(e) =>
                                setBatchRemark(e.target.value)
                            }
                        />


                        {/* FOOTER */}
                        <Box
                            sx={{
                                mt: 2,
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: 1
                            }}
                        >

                            <DietButton
                                width={100}
                                name="Cancel"
                                icon={CloseIcon}
                                onClick={onClose}
                            />

                            <DietButton
                                width={170}
                                name="Confirm Batch"
                                loading={loading}
                                icon={RecommendIcon}
                                onClick={onConfirm}
                            />
                        </Box>
                    </Box>
                </Box>
            </ModalDialog>
        </Modal>
    );
};

export default BatchPreviewModal;