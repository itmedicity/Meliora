// import { Box, Typography } from "@mui/joy";
// import React from "react";
// import { taskColor } from "src/color/Color";

// const CurrenttimeFeedTile = ({ name, mrdNo, pt_no, image, onClick, orderStatus, FeedingTime, deliveredTime, delayedByMinutes, FeedingName }) => {


//     // Map orderStatus to colors and labels
//     const orderColors = {
//         0: { bg: "#e5e7eb", text: "Pending Order", color: "#374151" },      // gray
//         1: { bg: "#dbeafe", text: "Ordered", color: "#1e3a8a" },              // blue
//         2: { bg: "#fef9c3", text: "Processing", color: "#854d0e" },           // yellow
//         3: { bg: "#ffedd5", text: "Order Picked", color: "#9a3412" },         // orange
//         4: { bg: "#d1fae5", text: "Diet Delivered", color: "#065f46" },       // green
//     };

//     const orderInfo = orderColors[orderStatus] || { bg: "#ffffff", text: "", color: "#111827" };

//     return (
//         <Box
//             onClick={onClick}
//             sx={{
//                 width: 300,
//                 height: 130,
//                 borderRadius: 8,
//                 boxShadow: "0px 3px 10px rgba(0,0,0,0.06)",
//                 border: `4px solid "${taskColor.darkPurple}"`,
//                 bgcolor: "#ffffff",
//                 cursor: onClick ? "pointer" : "default",
//                 transition: "0.2s",
//                 "&:hover": {
//                     boxShadow: "0px 4px 14px rgba(0,0,0,0.15)",
//                     transform: "translateY(-1px)",
//                 },
//             }}
//         >

//             <Box
//                 sx={{
//                     flex: 1,
//                     height: "20%",
//                     borderTopLeftRadius: 6,
//                     borderTopRightRadius: 6,
//                     fontSize: 13,
//                     fontWeight: 700,
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     background: taskColor.purple,
//                     color: "white",
//                     textAlign: "center",
//                 }}
//             >
//                 {FeedingName} {FeedingTime}
//             </Box>
//             <Box sx={{ flex: 1, height: "55%", display: "flex" }}>
//                 <Box sx={{ flex: 1, p: 1 }}>
//                     <Typography sx={{ fontWeight: 700, fontSize: 16, color: "#2a1a4a" }}>
//                         {name}
//                     </Typography>
//                     <Typography sx={{ fontSize: 10, color: "#555" }}><strong>{mrdNo}</strong></Typography>
//                     <Typography sx={{ fontSize: 12, color: "#555" }}><strong>{pt_no}</strong></Typography>
//                 </Box>
//                 <Box sx={{ height: "90%", width: 80, my: 0.5, mr: 0.5 }}>
//                     <img src={image} alt="status-icon" style={{ width: "95%", height: "95%", objectFit: "cover" }} />
//                 </Box>
//             </Box>
//             <Box
//                 sx={{
//                     flex: 1,
//                     height: "25%",
//                     borderBottomLeftRadius: 8,
//                     borderBottomRightRadius: 8,
//                     fontSize: 13,
//                     fontWeight: 700,
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     background: orderInfo.bg,
//                     color: orderInfo.color,
//                     textAlign: "center",
//                 }}
//             >
//                 {orderInfo.text}{" "}
//                 {delayedByMinutes > 0 && (
//                     <span style={{ color: "#8B0000", marginLeft: 4 }}>
//                         - Delayed by{" "}
//                         {delayedByMinutes >= 60
//                             ? `${Math.floor(delayedByMinutes / 60)}h ${delayedByMinutes % 60}m`
//                             : `${delayedByMinutes} min`}
//                     </span>
//                 )}
//                 {deliveredTime ? ` @ ${deliveredTime}` : ""}
//             </Box>

//         </Box>

//         // </Box>
//     );
// };

// export default CurrenttimeFeedTile;


// import { Box, Typography } from "@mui/joy";
// import React from "react";
// import { taskColor } from "src/color/Color";

// const CurrenttimeFeedTile = ({
//     roomName,
//     mrdNo,
//     pt_no,
//     image,
//     onClick,
//     orderStatus,
//     FeedingTime,
//     deliveredTime,
//     delayedByMinutes,
//     FeedingName,
//     name,
//     dietTypeName
// }) => {

//     const orderColors = {
//         0: { bg: "#e5e7eb", text: "Pending", color: "#374151" },
//         1: { bg: "#dbeafe", text: "Ordered", color: "#1e3a8a" },
//         2: { bg: "#fef9c3", text: "Processing", color: "#854d0e" },
//         3: { bg: "#ffedd5", text: "Picked", color: "#9a3412" },
//         4: { bg: "#d1fae5", text: "Delivered", color: "#065f46" },
//     };

//     const orderInfo = orderColors[orderStatus] || { bg: "#fff", text: "", color: "#111827" };

//     return (  
//         <Box
//             onClick={onClick}
//             sx={{
//                 width: "100%",
//                 maxWidth: "clamp(160px, 20vw, 200px)",
//                 height: "clamp(75px, 9vw, 90px)",

//                 borderRadius: "clamp(6px, 1vw, 10px)",
//                 border: `1px solid ${taskColor.darkPurple}`,
//                 bgcolor: "#fff",
//                 overflow: "hidden",

//                 transition: "all 0.25s ease",

//                 "&:hover": {
//                     transform: "scale(1.08)",
//                     zIndex: 2,
//                 },
//             }}
//         >

//             {/* Header */}
//             <Box
//                 sx={{
//                     height: "26%",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     fontSize: 12,
//                     fontWeight: 700,
//                     letterSpacing: 0.4,
//                     color: "white",
//                     // background: orderInfo.bg,
//                     // background: "#d7c4f1ff",
//                     background: `linear-gradient(135deg, ${taskColor.purple}, ${taskColor.darkPurple})`,
//                 }}
//             >
//                 {dietTypeName}- {FeedingName}
//             </Box>

//             {/* Body */}
//             <Box
//                 sx={{
//                     height: "48%",
//                     px: 1,
//                     py: 0.5,
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "center",
//                     background: "#faf8ff",
//                 }}
//             >
//                 <Typography sx={{ fontSize: "clamp(11px, 1.2vw, 14px)", fontWeight: 700 }}>
//                     {roomName}
//                 </Typography>

//                 <Typography sx={{ fontSize: "clamp(10px, 1.1vw, 13px)" }}>
//                     {name}
//                 </Typography>

//             </Box>

//             {/* Feeding Badge */}
//             <Box
//                 sx={{
//                     height: "26%",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     background: orderInfo.bg,
//                 }}
//             >
//                 <Box
//                     sx={{
//                         px: 1.2,
//                         borderRadius: 12,
//                         fontSize: 11,
//                         fontWeight: 700,
//                         color: orderInfo.color,
//                         bgcolor: "rgba(255,255,255,0.85)",
//                         boxShadow: "0px 1px 4px rgba(0,0,0,0.15)",
//                     }}
//                 >
//                     {orderInfo.text}
//                 </Box>
//             </Box>
//         </Box>

//     );
// };

// export default CurrenttimeFeedTile;


{/* {orderInfo.text}
                {delayedByMinutes > 0 && (
                    <span style={{ color: "#8B0000", marginLeft: 4 }}>
                        - {delayedByMinutes >= 60
                            ? `${Math.floor(delayedByMinutes / 60)}h ${delayedByMinutes % 60}m`
                            : `${delayedByMinutes}m`}
                    </span>
                )}
                    
                {deliveredTime ? ` @ ${deliveredTime}` : ""} */}
{/* <Box sx={{ height: "85%", width: 40, my: 0.3, mr: 0.3, }}>
                    <img
                        src={image}
                        alt="status-icon"
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 3,
                            objectFit: "cover",
                        }}
                    />
                </Box> */}
{/* {FeedingTime} */ }
{/* {FeedingName} */ }
{/* {FeedingTime} */ }


import { Box, Typography } from "@mui/joy";
import React from "react";
import { taskColor } from "src/color/Color";

const CurrenttimeFeedTile = ({
    roomName,
    mrdNo,
    pt_no,
    image,
    onClick,
    orderStatus,
    FeedingTime,
    deliveredTime,
    delayedByMinutes,
    FeedingName,
    name,
    dietTypeName,
}) => {
    const orderColors = {
        0: { bg: "#e5e7eb", text: "Pending", color: "#374151" },
        1: { bg: "#dbeafe", text: "Ordered", color: "#1e3a8a" },
        2: { bg: "#fef9c3", text: "Processing", color: "#854d0e" },
        3: { bg: "#ffedd5", text: "Picked", color: "#9a3412" },
        4: { bg: "#d1fae5", text: "Delivered", color: "#065f46" },
    };

    const orderInfo = orderColors[orderStatus] || {
        bg: "#fff",
        text: "",
        color: "#111827",
    };

    return (
        <Box
            onClick={onClick}
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: "10px",
                border: `1px solid ${taskColor.darkPurple}`,
                bgcolor: "#fff",
                overflow: "hidden",
                transition: "box-shadow 0.25s ease, transform 0.25s ease",
                "&:hover": {
                    boxShadow: "0px 6px 18px rgba(0,0,0,0.2)",
                    transform: "translateY(-2px)",
                },
            }}
        >

            <Box
                sx={{
                    flex: "0 0 auto",
                    py: 0.5,
                    px: 0.5,
                    textAlign: "center",
                    fontSize: "clamp(10px, 0.9vw, 12px)",
                    fontWeight: 700,
                    color: "white",
                    background: `linear-gradient(135deg, ${taskColor.purple}, ${taskColor.darkPurple})`,
                }}
            >
                {dietTypeName}  {FeedingName}
            </Box>
            <Box
                sx={{
                    flex: 1,
                    px: 1,
                    py: 0.5,
                    background: "#faf8ff",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    overflow: "hidden",
                }}
            >
                <Typography noWrap fontWeight={700}>
                    {roomName}
                </Typography>
                <Typography noWrap fontSize={13}>
                    {name}
                </Typography>
            </Box>
            <Box
                sx={{
                    flex: "0 0 auto",
                    py: 0.4,
                    display: "flex",
                    justifyContent: "center",
                    background: orderInfo.bg,
                }}
            >
                <Box
                    sx={{
                        px: 1.4,
                        py: 0.2,
                        borderRadius: 12,
                        fontSize: 12,
                        fontWeight: 700,
                        color: orderInfo.color,
                        bgcolor: "rgba(255,255,255,0.9)",
                    }}
                >
                    {orderInfo.text}
                </Box>
            </Box>
        </Box>

        // <Box
        //     onClick={onClick}
        //     sx={{
        //         width: "100%",
        //         height: "100%",
        //         minHeight: "clamp(90px, 10vw, 115px)",

        //         borderRadius: "clamp(6px, 1vw, 10px)",
        //         border: `1px solid ${taskColor.darkPurple}`,
        //         bgcolor: "#fff",
        //         overflow: "hidden",

        //         cursor: "pointer",
        //         transition: "box-shadow 0.25s ease, transform 0.25s ease",

        //         "&:hover": {
        //             boxShadow: "0px 6px 18px rgba(0,0,0,0.2)",
        //             transform: "translateY(-2px)", // SAFE
        //         },
        //     }}
        // >
        //     {/* HEADER */}
        //     <Box
        //         sx={{
        //             height: "28%",
        //             display: "flex",
        //             alignItems: "center",
        //             justifyContent: "center",
        //             px: 0.5,
        //             fontSize: "clamp(10px, 0.9vw, 12px)",
        //             fontWeight: 700,
        //             textAlign: "center",
        //             color: "white",
        //             background: `linear-gradient(135deg, ${taskColor.purple}, ${taskColor.darkPurple})`,
        //         }}
        //     >
        //         {dietTypeName} – {FeedingName}
        //     </Box>

        //     {/* BODY */}
        //     <Box
        //         sx={{
        //             height: "44%",
        //             px: 1,
        //             py: 0.5,
        //             display: "flex",
        //             flexDirection: "column",
        //             justifyContent: "center",
        //             background: "#faf8ff",
        //             overflow: "hidden",
        //         }}
        //     >
        //         <Typography
        //             noWrap
        //             sx={{ fontSize: "clamp(11px, 1vw, 14px)", fontWeight: 700 }}
        //         >
        //             {roomName}
        //         </Typography>

        //         <Typography
        //             noWrap
        //             sx={{ fontSize: "clamp(10px, 0.9vw, 13px)" }}
        //         >
        //             {name}
        //         </Typography>
        //     </Box>

        //     {/* FOOTER */}
        //     <Box
        //         sx={{
        //             height: "28%",
        //             display: "flex",
        //             alignItems: "center",
        //             justifyContent: "center",
        //             background: orderInfo.bg,
        //         }}
        //     >
        //         <Box
        //             sx={{
        //                 px: 1.5,
        //                 py: 0.3,
        //                 borderRadius: 12,
        //                 fontSize: "clamp(10px, 0.9vw, 12px)",
        //                 fontWeight: 700,
        //                 color: orderInfo.color,
        //                 bgcolor: "rgba(255,255,255,0.9)",
        //             }}
        //         >
        //             {orderInfo.text}
        //         </Box>
        //     </Box>
        // </Box>
    );
};

export default CurrenttimeFeedTile;
