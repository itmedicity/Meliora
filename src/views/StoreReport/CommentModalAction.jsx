import React, { memo } from "react";
import {
    Modal,
    Box,
    Typography,
    Textarea,
    Checkbox,
} from "@mui/joy";
import CusIconButton from "../Components/CusIconButton";
import ChatSummary from "./StoreCommonCode/ChatSummary";

const CommentModalAction = ({
    open,
    onClose,
    commentText,
    setCommentText,
    onSave,
    selectedRow,
    setSelectedAction,
    selectedAction,
    setCheckResolved,
    checkResolved,
    allowedActionButtons,
    hasResolvedRight,
    commentsArr = [],
    empdept_id,
}) => {

    /* -------------------- SORT COMMENTS -------------------- */
    const sortedComments = [...commentsArr].sort(
        (a, b) => a.cmt_slno - b.cmt_slno
    );

    /* -------------------- STATUS LOGIC -------------------- */
    const {
        accounts_status,
        purchase_status,
        ed_md_status
    } = selectedRow || {};


    const isAccountsActive =
        empdept_id === 15 && accounts_status === 0;

    const isPurchaseActive =
        empdept_id === 26 && purchase_status === 0;

    const isEdMdActive =
        empdept_id === 30 && ed_md_status === 0;

    const shouldShowActionSection =
        (isAccountsActive || isPurchaseActive || isEdMdActive) &&
        checkResolved !== "Resolved";




    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "white",
                    p: 3,
                    borderRadius: 2,
                    width: {
                        xs: "95%",
                        sm: "90%",
                        md: "80%",
                        lg: "70%",
                        xl: "60%",
                    },
                    maxWidth: 1200,
                    maxHeight: {
                        xs: "65vh",
                        sm: "100vh",
                        md: "85vh",
                    },
                    overflow: "hidden",
                    boxShadow: "0px 8px 25px rgba(0,0,0,0.15)"
                }}
            >
                {/* ---------------- HEADER ---------------- */}
                <Box
                    sx={{
                        mb: 1.5,
                        p: 1,
                        borderRadius: 3,
                        border: "1px solid #d0e2ff",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
                    }}
                >
                    <Typography level="title-md">
                        <strong>GRN No:</strong> {selectedRow?.grn_no || "--"}
                    </Typography>
                    <Typography level="title-md">
                        <strong>Item Name:</strong> {selectedRow?.item_name || "--"}
                    </Typography>
                </Box>

                {/* ---------------- CHAT SUMMARY ---------------- */}
                <ChatSummary sortedComments={sortedComments} />

                {/* ---------------- ACTION + REMARK SECTION ---------------- */}
                {shouldShowActionSection && (
                    <Box>
                        <Box
                            sx={{
                                p: 2,
                                borderRadius: 2,
                                bgcolor: "#eef5ff",
                                border: "1px solid #d0e2ff",
                                mt: 1
                            }}
                        >
                            <Typography
                                level="title-sm"
                                mb={1.5}
                                sx={{ color: "#0a3d91" }}
                            >
                                Select Any Action
                            </Typography>

                            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                                {allowedActionButtons.map((action) => (
                                    <Checkbox
                                        key={action.id}
                                        label={action.label}
                                        checked={selectedAction === action.value}
                                        onChange={() =>
                                            setSelectedAction(action.value)
                                        }
                                    />
                                ))}
                            </Box>
                        </Box>

                        <Typography level="title-sm" mt={2} mb={1}>
                            Remark
                        </Typography>

                        <Textarea
                            minRows={3}
                            value={commentText}
                            onChange={(e) =>
                                setCommentText(e.target.value)
                            }
                            placeholder="Type your comment…"
                            sx={{
                                width: "100%",
                                mb: 2,
                                borderRadius: 2,
                                border: "1px solid #d0e2ff",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
                            }}
                        />
                    </Box>
                )}

                {/* ---------------- RESOLVED CHECKBOX ---------------- */}
                {hasResolvedRight &&
                    (
                        <Box
                            sx={{
                                p: 1,
                                borderRadius: 2,
                                bgcolor: "#eef5ff",
                                border: "1px solid #d0e2ff",
                                mt: 1
                            }}
                        >
                            <Typography level="title-sm" mb={1}>
                                If Resolved
                            </Typography>

                            <Checkbox
                                label="Resolved"
                                checked={checkResolved === "Resolved"}
                                onChange={(e) =>
                                    setCheckResolved(
                                        e.target.checked ? "Resolved" : null
                                    )
                                }
                            />
                        </Box>
                    )}

                {/* ---------------- RESOLVED REMARK ---------------- */}
                {checkResolved === "Resolved" && (
                    <Box>
                        <Typography level="title-sm" mt={2} mb={1}>
                            Resolved Remark
                        </Typography>

                        <Textarea
                            minRows={3}
                            value={commentText}
                            onChange={(e) =>
                                setCommentText(e.target.value)
                            }
                            placeholder="Type your comment…"
                            sx={{
                                width: "100%",
                                mb: 2,
                                borderRadius: 2,
                                border: "1px solid #d0e2ff",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
                            }}
                        />
                    </Box>
                )}

                {/* ---------------- FOOTER BUTTONS ---------------- */}
                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        justifyContent: "flex-end",
                        mt: 2
                    }}
                >
                    <CusIconButton
                        onClick={onSave}
                        style={{ width: "10%", bgcolor: "#926FB1" }}
                    >
                        Save
                    </CusIconButton>

                    <CusIconButton
                        onClick={onClose}
                        style={{ width: "10%", bgcolor: "#e393c6" }}
                    >
                        Cancel
                    </CusIconButton>
                </Box>
            </Box>
        </Modal>
    );
};

export default memo(CommentModalAction);

