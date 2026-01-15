import { Avatar, Box, Typography } from '@mui/joy'
import React, { memo } from 'react'
import { format } from 'date-fns'

const ChatSummary = ({ sortedComments }) => {
    return (
        <Box
            sx={{
                maxHeight: 260,
                overflowY: "auto",
                p: 2,
                borderRadius: 2,
                bgcolor: "#fafafa",
                border: "1px solid #d0e2ff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            }}
        >
            {sortedComments.length === 0 ? (
                <Typography sx={{ textAlign: "center", color: "#888", py: 3 }}>
                    No comments yet. Be the first to add one!
                </Typography>
            ) : (
                sortedComments.map((cmt) => (
                    <Box
                        key={cmt.cmt_slno}
                        sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 1.5,
                            mb: 2
                        }}
                    >
                        {/* Avatar */}
                        <Avatar
                            size="sm"
                            sx={{
                                mt: 0.5,
                                bgcolor:
                                    cmt.cmt_done_by === "Accounts"
                                        ? "#1976d2"
                                        : cmt.cmt_done_by === "Directors"
                                            ? "#14ae69ff"
                                            : "#a132cdff",
                                fontSize: 12,
                                color: "white"
                            }}
                        >
                            {cmt.cmt_done_by?.[0]?.toUpperCase() || "U"}
                        </Avatar>

                        {/* Chat Bubble */}
                        <Box
                            sx={{
                                position: "relative",
                                bgcolor: "white",
                                p: 1.5,
                                borderRadius: 2,
                                width: {
                                    xs: "100%",
                                    sm: 420
                                },
                                border: "1px solid #e8e8e8",
                                boxShadow: "0px 2px 6px rgba(0,0,0,0.06)",

                                /* Arrow pointing to avatar */
                                "&::before": {
                                    content: '""',
                                    position: "absolute",
                                    left: -8,
                                    top: 16,
                                    width: 0,
                                    height: 0,
                                    borderTop: "8px solid transparent",
                                    borderBottom: "8px solid transparent",
                                    borderRight: "8px solid white"
                                }
                            }}
                        >
                            {/* Header */}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mb: 0.5
                                }}
                            >
                                <Typography
                                    level="body-xs"
                                    sx={{ fontWeight: 600, color: "#333" }}
                                >
                                    {cmt.em_name || "Unknown"}
                                </Typography>

                                <Typography
                                    level="body-xs"
                                    sx={{ color: "#999" }}
                                >
                                    {cmt.cmt_date
                                        ? format(new Date(cmt.cmt_date), 'dd MMM yyyy, hh:mm a')
                                        : ""}
                                </Typography>
                            </Box>

                            {/* Comment */}
                            <Typography level="body-sm" sx={{ color: "#444" }}>
                                {cmt.comment}
                            </Typography>
                        </Box>
                    </Box>
                ))
            )}
        </Box>
    )
}

export default memo(ChatSummary)




// import { Avatar, Box, Typography } from '@mui/joy'
// import React, { memo } from 'react'

// const ChatSummary = ({ sortedComments }) => {
//     return (
//         <div>
//             <Box
//                 sx={{
//                     maxHeight: 260,
//                     overflowY: "auto",
//                     p: 2,
//                     borderRadius: 2,
//                     bgcolor: "#fafafa",
//                     border: "1px solid #d0e2ff",      // subtle blue border
//                     boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
//                 }}
//             >
//                 {sortedComments.length === 0 ? (
//                     <Typography
//                         sx={{ textAlign: "center", color: "#888", py: 3 }}
//                     >
//                         No comments yet. Be the first to add one!
//                     </Typography>
//                 ) : (
//                     sortedComments.map((cmt) => (
//                         <Box
//                             key={cmt.cmt_slno}
//                             sx={{
//                                 display: "flex",
//                                 gap: 1.5,
//                                 mb: 2
//                             }}
//                         >
//                             <Avatar
//                                 size="sm"
//                                 sx={{
//                                     bgcolor:
//                                         cmt.cmt_done_by === "Accounts"
//                                             ? "#1976d2"
//                                             : cmt.cmt_done_by === "Directors"
//                                                 ? "#14ae69ff"
//                                                 : "#a132cdff", // default / others
//                                     fontSize: 12,
//                                     color: "white"
//                                 }}
//                             >
//                                 {cmt.cmt_done_by?.[0]?.toUpperCase() || "U"}
//                             </Avatar>

//                             {/* Chat Bubble */}
//                             <Box
//                                 sx={{
//                                     bgcolor: "white",
//                                     p: 1.5,
//                                     borderRadius: 2,
//                                     maxWidth: "85%",
//                                     border: "1px solid #e8e8e8",
//                                     boxShadow: "0px 2px 6px rgba(0,0,0,0.06)"
//                                 }}
//                             >
//                                 <Typography
//                                     level="body-xs"
//                                     sx={{
//                                         fontWeight: "bold",
//                                         mb: 0.5,
//                                         color: "#444"
//                                     }}
//                                 >
//                                     {cmt.cmt_done_by.charAt(0).toUpperCase() + cmt.cmt_done_by.slice(1).toLowerCase() || "Unknown"}
//                                 </Typography>

//                                 <Typography level="body-sm">
//                                     {cmt.comment}
//                                 </Typography>
//                             </Box>
//                         </Box>
//                     ))
//                 )}
//             </Box>

//         </div>
//     )
// }

// export default memo(ChatSummary) sortedComments has em_name and cmt_date which are comment user name and Date. how to show these details within the chat with good design 