import React, { memo } from "react";
import {
    Modal,
    Box,
    Typography,
    Textarea,
    Checkbox,
    Avatar
} from "@mui/joy";
import CusIconButton from "../Components/CusIconButton";

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
    EdMdRights
}) => {

    const sortedComments = [...commentsArr].sort((a, b) => a.cmt_slno - b.cmt_slno);

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
                        xs: "95%",    // mobile
                        sm: "90%",    // tablet
                        md: "80%",    // laptop
                        lg: "70%",    // desktop
                        xl: "60%",    // large monitor
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
                {/* Header */}
                <Box
                    sx={{
                        mb: 1.5,
                        p: 1,
                        borderRadius: 3,
                        border: "1px solid #d0e2ff",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
                    }}
                >
                    <Typography level="title-md" mb={0.5}>
                        <strong>GRN No:</strong> {selectedRow?.grn_no || "--"}
                    </Typography>
                    <Typography level="title-md">
                        <strong>Item Name:</strong> {selectedRow?.item_name || "--"}
                    </Typography>
                </Box>

                {/* ED and MD view  */}
                {EdMdRights === true ?

                    <Box
                        sx={{
                            maxHeight: 260,
                            overflowY: "auto",
                            p: 2,
                            borderRadius: 2,
                            bgcolor: "#fafafa",
                            border: "1px solid #d0e2ff",      // subtle blue border
                            boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
                        }}
                    >
                        {sortedComments.length === 0 ? (
                            <Typography
                                sx={{ textAlign: "center", color: "#888", py: 3 }}
                            >
                                No comments yet. Be the first to add one!
                            </Typography>
                        ) : (
                            sortedComments.map((cmt) => (
                                <Box
                                    key={cmt.cmt_slno}
                                    sx={{
                                        display: "flex",
                                        gap: 1.5,
                                        mb: 2
                                    }}
                                >
                                    <Avatar
                                        size="sm"
                                        sx={{
                                            bgcolor:
                                                cmt.cmt_done_by === "Accounts"
                                                    ? "#1976d2"
                                                    : cmt.cmt_done_by === "Directors"
                                                        ? "#14ae69ff"
                                                        : "#a132cdff", // default / others
                                            fontSize: 12,
                                            color: "white"
                                        }}
                                    >
                                        {cmt.cmt_done_by?.[0]?.toUpperCase() || "U"}
                                    </Avatar>

                                    {/* Chat Bubble */}
                                    <Box
                                        sx={{
                                            bgcolor: "white",
                                            p: 1.5,
                                            borderRadius: 2,
                                            maxWidth: "85%",
                                            border: "1px solid #e8e8e8",
                                            boxShadow: "0px 2px 6px rgba(0,0,0,0.06)"
                                        }}
                                    >
                                        <Typography
                                            level="body-xs"
                                            sx={{
                                                fontWeight: "bold",
                                                mb: 0.5,
                                                color: "#444"
                                            }}
                                        >
                                            {cmt.cmt_done_by.charAt(0).toUpperCase() + cmt.cmt_done_by.slice(1).toLowerCase() || "Unknown"}
                                        </Typography>

                                        <Typography level="body-sm">
                                            {cmt.comment}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))
                        )}
                    </Box>

                    : null}


                {/* ACTION SECTION */}
                {checkResolved !== "Resolved" && (
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
                            <Typography level="title-sm" mb={1.5} sx={{ color: "#0a3d91" }}>
                                Select Any Action
                            </Typography>

                            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                                {allowedActionButtons.map((action) => (
                                    <Checkbox
                                        key={action.id}
                                        label={action.label}
                                        checked={selectedAction === action.value}
                                        onChange={() => setSelectedAction(action.value)}
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
                            onChange={(e) => setCommentText(e.target.value)}
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

                {/* RESOLVED SECTION */}
                {hasResolvedRight && (
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
                                setCheckResolved(e.target.checked ? "Resolved" : null)
                            }
                        />
                    </Box>
                )}

                {checkResolved === "Resolved" && (
                    <Box>
                        <Typography level="title-sm" mt={2} mb={1}>
                            Resolved Remark
                        </Typography>

                        <Textarea
                            minRows={3}
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
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

                {/* FOOTER BUTTONS */}
                <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end", mt: 2 }}>
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
