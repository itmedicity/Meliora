import React, { memo } from "react";
import {
    Modal,
    Box,
    Typography,
    Textarea,
    Tabs,
    TabList,
    Tab,
    Avatar,
    Checkbox
} from "@mui/joy";
import CusIconButton from "../Components/CusIconButton";

const CommentModal = ({
    open,
    onClose,
    commentText,
    setCommentText,
    onSave,
    selectedRow,
    activeTab,
    setActiveTab,
    commentsArr = [],
    setSelectedAction,
    selectedAction,
    setCheckResolved,
    checkResolved
}) => {

    // Sort comments by slno
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
                    width: "75%",
                    boxShadow: "0px 8px 25px rgba(0,0,0,0.15)"
                }}
            >

                {/* Header */}
                <Box
                    sx={{
                        mb: 2,
                        p: 2,
                        borderRadius: 3,
                        border: "1px solid #d0e2ff",      // subtle blue border
                        boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
                    }}
                >
                    <Typography level="title-md" sx={{ mb: 1 }}>
                        <strong>GRN No:</strong> {selectedRow?.["grn_no"] || "--"}
                    </Typography>

                    <Typography level="title-md" sx={{}}>
                        <strong>Item Name:</strong> {selectedRow?.["item_name"] || "--"}
                    </Typography>
                </Box>

                {/* Chat Box */}
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

                {/* Tabs */}
                <Box sx={{
                    width: {
                        xs: "100%",
                        sm: "100%",
                        md: "40%",
                        lg: "40%",
                    },
                }}>
                    <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} sx={{ mt: 1.5 }}>
                        <TabList
                            sx={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "space-between",
                                borderRadius: 2,
                                overflow: "hidden",
                                bgcolor: "#eef5ff"
                            }}
                        >
                            <Tab value="Accounts" sx={{ flex: 1, textAlign: "center", width: "30%" }}>
                                ACCOUNTS
                            </Tab>
                            <Tab value="Purchase" sx={{ flex: 1, textAlign: "center", width: "30%" }}>
                                PURCHASE
                            </Tab>
                            <Tab value="Directors" sx={{ flex: 1, textAlign: "center", width: "30%" }}>
                                DIRECTORS
                            </Tab>
                        </TabList>
                    </Tabs>
                </Box>
                {

                    checkResolved !== "Resolved" ?

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

                                <Box sx={{ display: "flex", gap: 1 }}>
                                    {activeTab && (
                                        <>
                                            <Checkbox
                                                label="Hold Payment"
                                                checked={selectedAction === "Hold Payment"}
                                                onChange={() => setSelectedAction("Hold Payment")}
                                            />

                                            <Checkbox
                                                label="New Quot (Rec)"
                                                checked={selectedAction === "New Quot (Rec)"}
                                                onChange={() => setSelectedAction("New Quot (Rec)")}
                                            />

                                            <Checkbox
                                                label="Payment Proceed"
                                                checked={selectedAction === "Payment Proceed"}
                                                onChange={() => setSelectedAction("Payment Proceed")}
                                            />

                                            <Checkbox
                                                label="Hold Purchase"
                                                checked={selectedAction === "Hold Purchase"}
                                                onChange={() => setSelectedAction("Hold Purchase")}
                                            />
                                        </>
                                    )}
                                </Box>
                            </Box>

                            {/* New Comment Box */}

                            < Typography level="title-sm" mt={2} mb={1}>
                                Remark ({activeTab.charAt(0).toUpperCase() + activeTab.slice(1).toLowerCase()})
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
                                    border: "1px solid #d0e2ff",      // subtle blue border
                                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
                                }}
                            />
                        </Box>
                        : null}

                <Box>
                    <Box
                        sx={{
                            p: 0.5,
                            borderRadius: 2,
                            bgcolor: "#eef5ff",
                            border: "1px solid #d0e2ff",
                            mt: 1
                        }}
                    >
                        <Typography level="title-sm" mb={1.5} sx={{ color: "#0a3d91" }}>
                            If Resolved
                        </Typography>
                        <Checkbox
                            label="Resolved"
                            checked={checkResolved === "Resolved"}
                            onChange={(e) =>
                                setCheckResolved(e.target.checked ? "Resolved" : "")
                            }
                        />
                    </Box>
                    <Typography level="title-sm" mt={2} mb={1}>
                        Resolved Remark (
                        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).toLowerCase()}
                        )
                    </Typography>

                    <Textarea
                        minRows={3}
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Type your comment…"
                        disabled={checkResolved !== "Resolved"}
                        sx={{
                            width: "100%",
                            mb: 2,
                            borderRadius: 2,
                            border: "1px solid #d0e2ff",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                            opacity: checkResolved === "Resolved" ? 1 : 0.6
                        }}
                    />
                </Box>

                {/* Buttons */}
                <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end", }}>
                    <CusIconButton
                        onClick={onSave}
                        style={{ width: "10%", bgcolor: "#926FB1" }}
                    >
                        Save
                    </CusIconButton>
                    <CusIconButton
                        onClick={onClose}
                        style={{ width: "10%", bgcolor: "#e393c6", }}
                    >
                        Cancel
                    </CusIconButton>
                </Box>
            </Box>
        </Modal>
    );
};

export default memo(CommentModal);



