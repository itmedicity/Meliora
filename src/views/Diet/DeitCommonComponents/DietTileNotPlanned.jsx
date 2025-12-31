
// import { Box, Typography } from "@mui/joy";
// import React from "react";

// const DietTileNotPlanned = ({ name, mrdNo, pt_no, status, image, onClick, bordercolor }) => {


//     return (
//         <Box
//             onClick={onClick}
//             sx={{
//                 width: 300,
//                 height: 100,
//                 borderRadius: 8,
//                 boxShadow: "0px 3px 10px rgba(0,0,0,0.06)",
//                 border: bordercolor,
//                 bgcolor: "#ffffff",
//                 cursor: onClick ? "pointer" : "default",
//                 transition: "0.2s",
//                 "&:hover": {
//                     boxShadow: "0px 4px 14px rgba(0,0,0,0.15)",
//                     transform: "translateY(-1px)",
//                 },


//             }}>

//             <Box sx={{ flex: 1, height: '70%', borderTopRightRadius: 8, borderTopLeftRadius: 8, display: 'flex', }}>
//                 <Box sx={{ flex: 1, p: 1 }}>
//                     <Typography sx={{ fontWeight: 700, fontSize: 16, color: "#2a1a4a" }}>
//                         {name}
//                     </Typography>
//                     <Typography sx={{ fontSize: 10, color: "#555" }}>
//                         <strong>{mrdNo}</strong>
//                     </Typography>
//                     <Typography sx={{ fontSize: 12, color: "#555" }}>
//                         <strong>{pt_no}</strong>
//                     </Typography>
//                 </Box>
//                 <Box sx={{ height: "90%", width: 80, my: .5, mr: .5, }}>
//                     <img src={image} alt="status-icon" style={{ width: "95%", height: "95%", objectFit: "cover" }} />
//                 </Box>
//             </Box>
//             {status === "Not Planned" ? (
//                 <Box
//                     sx={{
//                         flex: 1,
//                         height: "30%",
//                         borderBottomLeftRadius: 8,
//                         borderBottomRightRadius: 8,
//                         fontSize: 13,
//                         fontWeight: 700,
//                         background: "#eebfbfff",
//                         color: "darkred",
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                     }}
//                 >
//                     Not Planned
//                 </Box>
//             ) : null}
//         </Box >

//     );
// };

// export default DietTileNotPlanned;




// import { Box, Typography } from "@mui/joy";
// import React, { memo } from "react";

// const DietTileNotPlanned = ({ name, roomName, mrdNo, pt_no, status, image, onClick, bordercolor }) => {

//     console.log(roomName, "roomName");


//     return (
//         <Box
//             onClick={onClick}
//             sx={{
//                 width: "100%",
//                 maxWidth: "clamp(150px, 18vw, 190px)``",
//                 height: "clamp(70px, 9vw, 85px)",

//                 borderRadius: "clamp(5px, 1vw, 8px)",
//                 border: bordercolor,
//                 bgcolor: "#fff",
//                 overflow: "hidden",

//                 transition: "transform 0.25s ease, box-shadow 0.25s ease",

//                 "&:hover": {
//                     transform: "scale(1.08)",
//                     zIndex: 2,
//                 },
//             }}
//         >
//             <Box sx={{ flex: 1, height: "70%", display: "flex", borderTopLeftRadius: 6, borderTopRightRadius: 6 }}>
//                 <Box
//                     sx={{
//                         px: 1,
//                         flex: 1,
//                         py: 0.5,
//                         display: "flex",
//                         flexDirection: "column",
//                         justifyContent: "center",
//                         background: "#faf8ff",
//                     }}
//                 >
//                     <Typography sx={{ fontSize: "clamp(11px, 1.2vw, 14px)", fontWeight: 700 }}>
//                         {roomName}
//                     </Typography>

//                     <Typography sx={{ fontSize: "clamp(10px, 1.1vw, 13px)" }}>
//                         {name}
//                     </Typography>
//                 </Box>
//                 <Box sx={{ height: "85%", width: 40, my: 0.3, mr: 0.3 }}>
//                     <img
//                         src={image}
//                         alt="status-icon"
//                         style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 3 }}
//                     />
//                 </Box>
//             </Box>
//             {status === "Not Planned" && (
//                 <Box
//                     sx={{
//                         flex: 1,
//                         height: "30%",
//                         fontSize: 8,
//                         fontWeight: 700,
//                         background: "#eebfbfff",
//                         color: "darkred",
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         borderBottomLeftRadius: 6,
//                         borderBottomRightRadius: 6,
//                     }}
//                 >
//                     <Box
//                         sx={{
//                             px: 1.2,
//                             borderRadius: 12,
//                             fontSize: 11,
//                             fontWeight: 700,
//                             color: "darkred",
//                             bgcolor: "rgba(255,255,255,0.85)",
//                             boxShadow: "0px 1px 4px rgba(0,0,0,0.15)",
//                         }}
//                     >
//                         Not Planned
//                     </Box>
//                 </Box>
//             )}
//         </Box>
//     );
// };

// export default memo(DietTileNotPlanned);



import { Box, Typography } from "@mui/joy";
import React, { memo } from "react";

const DietTileNotPlanned = ({
    name,
    roomName,
    mrdNo,
    pt_no,
    status,
    image,
    onClick,
    bordercolor,
}) => {
    return (
        <Box
            onClick={onClick}
            sx={{
                width: "100%",            // Grid controls width
                height: "100%",
                minHeight: "clamp(80px, 10vw, 100px)",

                borderRadius: "clamp(6px, 1vw, 10px)",
                border: bordercolor,
                bgcolor: "#fff",
                overflow: "hidden",

                cursor: "pointer",
                transition: "box-shadow 0.25s ease, transform 0.25s ease",

                "&:hover": {
                    boxShadow: "0px 6px 18px rgba(0,0,0,0.18)",
                    transform: "translateY(-2px)", // SAFE hover
                },
            }}
        >
            {/* TOP */}
            <Box
                sx={{
                    height: "70%",
                    display: "flex",
                    alignItems: "center",
                    borderTopLeftRadius: "inherit",
                    borderTopRightRadius: "inherit",
                }}
            >
                <Box
                    sx={{
                        px: 1,
                        flex: 1,
                        py: 0.5,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        background: "#faf8ff",
                        overflow: "hidden",
                    }}
                >
                    <Typography
                        noWrap
                        sx={{ fontSize: "clamp(11px, 1vw, 14px)", fontWeight: 700 }}
                    >
                        {roomName}
                    </Typography>

                    <Typography
                        noWrap
                        sx={{ fontSize: "clamp(10px, 0.9vw, 13px)" }}
                    >
                        {name}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        width: "clamp(32px, 3vw, 40px)",
                        height: "70%",
                        mr: 0.5,
                    }}
                >
                    <img
                        src={image}
                        alt="status-icon"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                        }}
                    />
                </Box>
            </Box>

            {/* BOTTOM */}
            {status === "Not Planned" && (
                <Box
                    sx={{
                        height: "30%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "#eebfbf",
                    }}
                >
                    <Box
                        sx={{
                            px: 1.5,
                            py: 0.3,
                            borderRadius: 12,
                            fontSize: "clamp(10px, 0.9vw, 12px)",
                            fontWeight: 700,
                            color: "darkred",
                            bgcolor: "rgba(255,255,255,0.9)",
                        }}
                    >
                        Not Planned
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default memo(DietTileNotPlanned);
