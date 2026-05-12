
import React, { useState } from "react";
import KotItemList from "./KotItemList";
import { Box, Chip, Stack, Tooltip } from "@mui/joy";
import TableViewIcon from "@mui/icons-material/TableView";
import PersonIcon from "@mui/icons-material/Person";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import NotesIcon from "@mui/icons-material/Notes";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { DIET_ALT_COLORS } from "../CommonData/Common";
import DietTextComponent from "../DietComponent/DietTextComponent";
import VerifiedIcon from '@mui/icons-material/Verified';
import { errorNotify, succesNotify, warningNotify } from "src/views/Common/CommonCode";
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { axioslogin } from "src/views/Axios/Axios";
import { useSelector } from "react-redux";
import CancelIcon from '@mui/icons-material/Cancel';


const KotBatchCard = ({
    batch,
    selected,
    onSelectBatch,
    refetch
}) => {

    const id = useSelector(state => {
        return state.LoginUserData.empid
    })

    const [loading, setLoading] = useState(false);

    const [expanded, setExpanded] =
        useState(false);

    // COLORS
    const textColor = selected ? "#fff" : "#222";
    const iconColor = selected ? "#fff" : "#8d4ab7";
    const secondaryColor =
        selected ? "#f3d9ff" : "#666";

    // DOUBLE CLICK
    const handleOnClick = () => {
        // EXPAND / COLLAPSE
        setExpanded(prev => !prev);
    };


    // DOUBLE CLICK
    const handleDoubleClick = () => {
        // SELECT BATCH
        onSelectBatch(batch.batch_id);
    };

    const statusConfig = {
        COMPLETED: {
            color: "success",
            icon: (
                <CheckCircleIcon
                    sx={{
                        color: selected
                            ? "#fff"
                            : "#2e7d32",
                    }}
                    fontSize="small"
                />
            ),
            label: "COMPLETED",
            bordercolor: '#2e7d32'
        },

        SENT_TO_KITCHEN: {
            color: "primary",
            icon: (
                <FastfoodIcon
                    sx={{
                        color: selected
                            ? "#fff"
                            : "#1976d2",
                    }}
                    fontSize="small"
                />
            ),
            label: "SENT TO KITCHEN",
            bordercolor: '#1976d2'
        },

        PENDING: {
            color: "warning",
            icon: (
                <HourglassEmptyIcon
                    sx={{
                        color: selected
                            ? "#fff"
                            : "#ed6c02",
                    }}
                    fontSize="small"
                />
            ),
            label: "PENDING",
            bordercolor: '#ed6c02'
        },

        CANCELLED: {
            color: "danger",
            icon: (
                <CancelIcon
                    sx={{
                        color: selected
                            ? "#fff"
                            : "#d30909",
                    }}
                    fontSize="small"
                />
            ),
            label: "CANCELLED",
            bordercolor: '#d30909'
        }
    };

    const currentStatus =
        statusConfig[
        batch?.kitchen_status?.toUpperCase()
        ] || statusConfig.PENDING;


    const HandleCompleteList = async () => {
        setLoading(true)
        if (!batch.batch_id) return warningNotify("Batch is Needed!");
        try {
            const payload = {
                batch_id: batch.batch_id,
                kitchen_status: "COMPLETED"
            }
            const response = await axioslogin.patch('/productionbatch/update/batch-complete', payload);
            const { success, message } = response?.data ?? {};
            if (success === 0) return errorNotify(message || "Error in Updating Kot Batch!")
            succesNotify(message || "Successfully Updated Batch!")
            refetch()
        } catch (error) {
            console.error(error)
            errorNotify("Error in Updating Kot Batch")
        } finally {
            setLoading(false)
        }
    };

    const handleCancelBatch = async () => {
        setLoading(true)
        if (!batch.batch_id) return warningNotify("Batch is Needed!");
        try {
            const payload = {
                batch_id: batch.batch_id,
                kitchen_status: "CANCELLED",
                cancelled_by: id
            }
            const response = await axioslogin.patch('/productionbatch/batch/cancel', payload);
            const { success, message } = response?.data ?? {};
            if (success === 0) return errorNotify(message || "Error in Cancelling Kot Batch!")
            succesNotify(message || "Batch Cancelled!!")
            refetch()
        } catch (error) {
            console.error(error)
            errorNotify("Error in Cancelling Kot Batch")
        } finally {
            setLoading(false)
        }
    };


    return (
        <Box
            sx={{
                width: "100%",
                mb: 1.5,
                borderRadius: 2,

                // SELECTED BG
                bgcolor: selected
                    ? "#bf8cde"
                    : "#ffffff",

                boxShadow: selected
                    ? "0 4px 20px rgba(141,74,183,0.35)"
                    : "sm",

                overflow: "hidden",

                borderLeft: `6px solid ${currentStatus.bordercolor}`,

                transition: "all 0.25s ease",

                "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: selected
                        ? "0 6px 25px rgba(141,74,183,0.45)"
                        : "lg",
                },
            }}
        >
            {/* HEADER */}
            <Box
                sx={{
                    px: 2,
                    py: 1.2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    userSelect: "none",

                    background: selected
                        ? "linear-gradient(to right, #8d4ab7, #6f2c91)"
                        : "linear-gradient(to right, #f8f5ff, #ffffff)",
                }}
            >
                {/* LEFT SECTION */}
                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    divider={
                        <Box
                            sx={{
                                width: "1px",
                                height: 20,
                                bgcolor: selected
                                    ? "#ffffff40"
                                    : "#e0e0e0",
                            }}
                        />
                    }
                >
                    {/* BATCH */}
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                    >
                        <TableViewIcon
                            fontSize="small"
                            sx={{
                                color: iconColor,
                            }}
                        />

                        <DietTextComponent
                            value={`BATCH #${batch.batch_id}`}
                            size={15}
                            weight={700}
                            color={textColor}
                        />
                    </Stack>

                    {/* MEAL */}
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                    >
                        <FastfoodIcon
                            fontSize="small"
                            sx={{
                                color: iconColor,
                            }}
                        />

                        <DietTextComponent
                            value={batch.meal_type}
                            size={15}
                            weight={700}
                            color={textColor}
                        />
                    </Stack>

                    {/* STAFF */}
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                    >
                        <PersonIcon
                            fontSize="small"
                            sx={{
                                color: secondaryColor,
                            }}
                        />

                        <DietTextComponent
                            value={
                                batch.prepared_by_name ||
                                "Not Assigned"
                            }
                            size={14}
                            weight={600}
                            color={textColor}
                        />
                    </Stack>

                    {/* DATE */}
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                    >
                        <ScheduleIcon
                            fontSize="small"
                            sx={{
                                color: secondaryColor,
                            }}
                        />

                        <DietTextComponent
                            value={
                                batch.production_date
                            }
                            size={14}
                            weight={600}
                            color={textColor}
                        />
                    </Stack>

                    {/* ITEM COUNT */}
                    <Chip
                        size="sm"
                        variant="soft"
                        sx={{
                            bgcolor: selected
                                ? "#ffffff25"
                                : "#f3e8ff",

                            color: selected
                                ? "#fff"
                                : "#7b2cbf",

                            fontWeight: 700,
                        }}
                    >
                        {batch?.items?.length || 0} Items
                    </Chip>
                </Stack>

                {/* RIGHT SIDE */}
                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                >
                    <Chip
                        size="sm"
                        variant={selected ? "solid" : "soft"}
                        color={currentStatus.color}
                        startDecorator={currentStatus.icon}
                        sx={{
                            fontWeight: 700,

                            ...(selected && {
                                bgcolor: "#ffffff20",
                                color: "#fff",
                                border: "1px solid #ffffff30"
                            })
                        }}
                    >
                        {currentStatus.label}
                    </Chip>

                    {/* EXPAND ICON */}
                    <Box
                        onClick={handleOnClick}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 28,
                            height: 28,
                            borderRadius: "50%",

                            bgcolor: selected
                                ? "#ffffff25"
                                : "#f3e8ff",

                            transition: "0.2s",
                        }}
                    >
                        {expanded ? (
                            <KeyboardArrowUpIcon
                                sx={{
                                    color: selected
                                        ? "#fff"
                                        : "#8d4ab7",
                                }}
                            />
                        ) : (
                            <KeyboardArrowDownIcon
                                sx={{
                                    color: selected
                                        ? "#fff"
                                        : "#8d4ab7",
                                }}
                            />
                        )}
                    </Box>
                    {
                        batch.kitchen_status === "PENDING" &&

                        <>
                            <Tooltip
                                title="sent to Kitchen"
                                placement="right"
                            >
                                <Box
                                    onClick={handleDoubleClick}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: 28,
                                        height: 28,
                                        borderRadius: "50%",

                                        bgcolor: selected
                                            ? "#ffffff25"
                                            : "#f3e8ff",

                                        transition: "0.2s",
                                    }}
                                >
                                    <ThumbUpAltIcon
                                        sx={{
                                            color: selected
                                                ? "#fff"
                                                : "#8d4ab7",
                                        }}
                                    />
                                </Box>
                            </Tooltip>

                            <Tooltip
                                title="Cancel Batch"
                                placement="right"
                            >
                                <Box
                                    onClick={!loading ? handleCancelBatch : undefined} s
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: 28,
                                        height: 28,
                                        borderRadius: "50%",

                                        bgcolor: selected
                                            ? "#ffffff25"
                                            : "#f3e8ff",

                                        transition: "0.2s",
                                    }}
                                >
                                    <DisabledByDefaultIcon
                                        sx={{
                                            color: selected
                                                ? "#fff"
                                                : "#8d4ab7",
                                        }}
                                    />
                                </Box>
                            </Tooltip>
                        </>
                    }


                    {
                        batch.kitchen_status === "SENT_TO_KITCHEN" &&

                        <Tooltip
                            title="Completed Batch"
                            placement="right"
                        >
                            <Box
                                onClick={!loading ? HandleCompleteList : undefined}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: 28,
                                    height: 28,
                                    borderRadius: "50%",

                                    bgcolor: selected
                                        ? "#ffffff25"
                                        : "#f3e8ff",

                                    transition: "0.2s",
                                }}
                            >
                                <VerifiedIcon
                                    sx={{
                                        color: selected
                                            ? "#fff"
                                            : "#8d4ab7",
                                    }}
                                />
                            </Box>
                        </Tooltip>
                    }
                </Stack>
            </Box>

            {/* REMARK */}
            {!!batch?.remark && (
                <Box
                    sx={{
                        px: 2,
                        py: 1,

                        borderTop: selected
                            ? "1px solid #ffffff25"
                            : "1px solid #f0f0f0",

                        bgcolor: selected
                            ? "#7d3aa8"
                            : "#fcfcfc",
                    }}
                >
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="flex-start"
                    >
                        <NotesIcon
                            fontSize="small"
                            sx={{
                                color: selected
                                    ? "#fff"
                                    : "#8d4ab7",

                                mt: "2px",
                            }}
                        />

                        <Box>
                            <DietTextComponent
                                value="Remark"
                                size={13}
                                weight={700}
                                color={
                                    selected
                                        ? "#fff"
                                        : "#8d4ab7"
                                }
                            />

                            <DietTextComponent
                                value={
                                    batch.remark
                                }
                                size={13}
                                weight={500}
                                color={
                                    selected
                                        ? "#f3e8ff"
                                        : "#555"
                                }
                            />
                        </Box>
                    </Stack>
                </Box>
            )}

            {
                batch.kitchen_status === "CANCELLED" &&
                <Box
                    sx={{
                        px: 2,
                        py: 1,

                        borderTop: selected
                            ? "1px solid #ffffff25"
                            : "1px solid #f0f0f0",

                        bgcolor: selected
                            ? "#7d3aa8"
                            : "#fcfcfc",
                    }}
                >
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="flex-start"
                    >
                        <NotesIcon
                            fontSize="small"
                            sx={{
                                color: selected
                                    ? "#fff"
                                    : "#eb2a2a",

                                mt: "2px",
                            }}
                        />

                        <Box>
                            <DietTextComponent
                                value="Cancelled"
                                size={13}
                                weight={700}
                                color={
                                    selected
                                        ? "#fff"
                                        : "#eb2a2a"
                                }
                            />

                            <DietTextComponent
                                value={
                                    batch.Cancelled_by_name
                                }
                                size={13}
                                weight={500}
                                color={
                                    selected
                                        ? "#f3e8ff"
                                        : "#555"
                                }
                            />
                        </Box>
                    </Stack>
                </Box>
            }



            {/* ITEMS */}
            <Box
                sx={{
                    maxHeight: expanded
                        ? "1000px"
                        : "0px",

                    overflow: "hidden",

                    transition:
                        "all 0.35s ease",
                }}
            >
                {batch?.items?.map(
                    (item, index) => (
                        <KotItemList
                            key={
                                item?.item_id ||
                                index
                            }
                            FoodItemDetail={{
                                ...item,
                                meal_type:
                                    batch.meal_type,
                                production_date:
                                    batch.production_date,
                                kitchen_item_status:
                                    item.status,
                            }}
                            bgcolor={
                                DIET_ALT_COLORS[
                                index %
                                DIET_ALT_COLORS.length
                                ]
                            }
                        />
                    )
                )}
            </Box>
        </Box>
    );
};

export default KotBatchCard;