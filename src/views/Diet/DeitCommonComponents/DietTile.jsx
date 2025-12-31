// import { Box, Typography } from "@mui/joy";
// import React from "react";


// const DietTile = ({ name, mrdNo, pt_no, image, onClick, bordercolor }) => {

//     return (
//         <Box
//             onClick={onClick}
//             sx={{
//                 width: 300,
//                 height: 80,
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

//             <Box sx={{ flex: 1, height: '100%', borderTopRightRadius: 8, borderTopLeftRadius: 8, display: 'flex', }}>
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
//         </Box >

//     );
// };

// export default DietTile;


import { Box, Typography } from "@mui/joy";
import React from "react";


const DietTile = ({ name, mrdNo, pt_no, image, onClick, bordercolor, roomName, status }) => {
    return (
        <Box
            onClick={onClick}
            sx={{
                width: "100%",
                maxWidth: "clamp(150px, 18vw, 190px)``",
                height: "clamp(70px, 9vw, 85px)",
                borderRadius: "clamp(5px, 1vw, 8px)",
                border: bordercolor,
                bgcolor: "#fff",
                overflow: "hidden",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",

                "&:hover": {
                    transform: "scale(1.08)",
                    zIndex: 2,
                },
            }}
        >
            <Box sx={{ flex: 1, height: "70%", display: "flex", borderTopLeftRadius: 6, borderTopRightRadius: 6 }}>
                <Box
                    sx={{
                        px: 1,
                        flex: 1,
                        py: 0.5,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        background: "#faf8ff",
                    }}
                >
                    <Typography sx={{ fontSize: "clamp(11px, 1.2vw, 14px)", fontWeight: 700 }}>
                        {roomName}
                    </Typography>

                    <Typography sx={{ fontSize: "clamp(10px, 1.1vw, 13px)" }}>
                        {name}
                    </Typography>
                </Box>
                <Box sx={{ height: "85%", width: 40, my: 0.3, mr: 0.3 }}>
                    <img
                        src={image}
                        alt="status-icon"
                        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 3 }}
                    />
                </Box>
            </Box>
            {status === "Planned" ?
                null :
                <Box
                    sx={{
                        flex: 1,
                        height: "30%",
                        fontSize: 8,
                        fontWeight: 700,
                        background: "lightgrey",
                        color: "black",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderBottomLeftRadius: 6,
                        borderBottomRightRadius: 6,
                    }}
                >
                    <Box
                        sx={{
                            px: 1.2,
                            borderRadius: 12,
                            fontSize: 11,
                            fontWeight: 700,
                            color: "black",
                            bgcolor: "rgba(255,255,255,0.85)",
                            boxShadow: "0px 1px 4px rgba(0,0,0,0.15)",
                        }}
                    >
                        {status}
                    </Box>
                </Box>}
        </Box>
    );
};

export default DietTile;

// <Box
//     onClick={onClick}
//     sx={{
//         width: "100%",
//         maxWidth: "clamp(160px, 20vw, 200px)",
//         height: "clamp(75px, 9vw, 90px)",

//         borderRadius: "clamp(6px, 1vw, 10px)",
//         border: `1px solid ${taskColor.darkPurple}`,
//         bgcolor: "#fff",
//         overflow: "hidden",

//         transition: "all 0.25s ease",

//         "&:hover": {
//             transform: "scale(1.08)",
//             zIndex: 2,
//         },
//     }}
// >
//     <Box sx={{ flex: 1, height: "100%", borderRadius: 6 }}>
//         <Box
//             sx={{
//                 height: "70%",
//                 px: 1,
//                 flex: 1,
//                 pt: 1,
//                 justifyContent: "center",
//                 background: "#faf8ff",
//             }}
//         >
//             <Typography sx={{ fontSize: "clamp(11px, 1.2vw, 14px)", fontWeight: 700 }}>
//                 {roomName}
//             </Typography>

//             <Typography sx={{ fontSize: "clamp(10px, 1.1vw, 13px)" }}>
//                 {name}
//             </Typography>
//         </Box>
//         <Box
//             sx={{
//                 height: "30%",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 background: "lightgrey",
//             }}
//         >
//             <Box
//                 sx={{
//                     px: 1.2,
//                     borderRadius: 12,
//                     fontSize: 11,
//                     fontWeight: 700,
//                     color: "black",
//                     bgcolor: "rgba(255,255,255,0.85)",
//                     boxShadow: "0px 1px 4px rgba(0,0,0,0.15)",
//                 }}
//             >
//                 {status}
//             </Box>
//         </Box>




//     </Box>
// </Box>




