// import React, { useMemo } from "react";
// import { Box } from "@mui/joy";
// import { Typography } from "@mui/material";
// import { processFishboneData } from "../CommonComponent/CommonFun";

// export default function FishboneAnalysis({
//     items,
//     apiData
// }) {

//     const width = 1750;
//     const height = 700;
//     const spineY = height / 2;
//     const startX = 250;
//     const endX = width - 400;
//     const boneLength = 100;
//     const verticalOffset = 155;



//     const pairedCauses = useMemo(() => processFishboneData(apiData), [apiData]);

//     const spineLength = endX - startX;
//     const pairSpacing = spineLength / (pairedCauses.length + 1);

//     return (
//         <Box sx={{ overflowX: "auto", p: 4 }}>
//             <svg width={width} height={height}>
//                 {/* Main spine */}
//                 <line
//                     x1={startX}
//                     y1={spineY}
//                     x2={endX}
//                     y2={spineY}
//                     stroke="#222"
//                     strokeWidth={6}
//                     markerEnd="url(#arrowhead)"
//                 />

//                 {/* Arrowheads */}
//                 <defs>
//                     <marker
//                         id="arrowhead"
//                         markerWidth="12"
//                         markerHeight="8"
//                         refX="12"
//                         refY="4"
//                         orient="auto"
//                     >
//                         <polygon points="0 0, 12 4, 0 8" fill="#222" />
//                     </marker>
//                     <marker
//                         id="arrowSmall"
//                         markerWidth="10"
//                         markerHeight="7"
//                         refX="10"
//                         refY="3.5"
//                         orient="auto"
//                     >
//                         <polygon points="0 0, 10 3.5, 0 7" fill="#444" />
//                     </marker>
//                 </defs>

//                 {/* Category pairs */}
//                 {pairedCauses.map((pair, index) => {
//                     const x = startX + (index + 1) * pairSpacing;
//                     const topY = spineY - verticalOffset;
//                     const bottomY = spineY + verticalOffset;
//                     const topEndX = x - boneLength;
//                     const bottomEndX = x - boneLength;

//                     return (
//                         <g key={index}>
//                             {/* Top diagonal */}
//                             <line
//                                 x1={topEndX}
//                                 y1={topY}
//                                 x2={x}
//                                 y2={spineY}
//                                 stroke="#444"
//                                 strokeWidth={3.5}
//                                 markerEnd="url(#arrowSmall)"
//                             />

//                             {/* Bottom diagonal */}
//                             <line
//                                 x1={bottomEndX}
//                                 y1={bottomY}
//                                 x2={x}
//                                 y2={spineY}
//                                 stroke="#444"
//                                 strokeWidth={3.5}
//                                 markerEnd="url(#arrowSmall)"
//                             />

//                             {/* Category labels */}
//                             <text
//                                 x={topEndX}
//                                 y={topY - 8}
//                                 textAnchor="middle"
//                                 fontSize="18"
//                                 fontWeight="bold"
//                                 fill="#000"
//                             >
//                                 {pair?.top?.category}
//                             </text>
//                             <text
//                                 x={bottomEndX}
//                                 y={bottomY + 30}
//                                 textAnchor="middle"
//                                 fontSize="18"
//                                 fontWeight="bold"
//                                 fill="#000"
//                             >
//                                 {pair?.bottom?.category}
//                             </text>

//                             {/* Top horizontal cause arrows (shorter now) */}
//                             {pair.top.causes.map((cause, i) => {
//                                 const baseX = topEndX - 10;
//                                 const startY = topY + 15 + i * 28;
//                                 const arrowLength = 60; // ⬅️ shorter arrow
//                                 return (
//                                     <g key={`top-cause-${i}`}>
//                                         <line
//                                             x1={baseX - arrowLength}
//                                             y1={startY}
//                                             x2={baseX}
//                                             y2={startY}
//                                             stroke="#666"
//                                             strokeWidth={2.5}
//                                             markerEnd="url(#arrowSmall)"
//                                         />
//                                         <text
//                                             x={baseX - arrowLength - 10}
//                                             y={startY + 5}
//                                             textAnchor="end"
//                                             fontSize="14"
//                                             fill="#333"
//                                         >
//                                             {cause}
//                                         </text>
//                                     </g>
//                                 );
//                             })}

//                             {/* Bottom horizontal cause arrows (shorter now) */}
//                             {pair.bottom.causes.map((cause, i) => {
//                                 const baseX = bottomEndX - 10;
//                                 const startY = bottomY - 15 - i * 28;
//                                 const arrowLength = 60; // ⬅️ shorter arrow
//                                 return (
//                                     <g key={`bottom-cause-${i}`}>
//                                         <line
//                                             x1={baseX - arrowLength}
//                                             y1={startY}
//                                             x2={baseX}
//                                             y2={startY}
//                                             stroke="#666"
//                                             strokeWidth={2.5}
//                                             markerEnd="url(#arrowSmall)"
//                                         />
//                                         <text
//                                             x={baseX - arrowLength - 10}
//                                             y={startY + 5}
//                                             textAnchor="end"
//                                             fontSize="14"
//                                             fill="#333"
//                                         >
//                                             {cause}
//                                         </text>
//                                     </g>
//                                 );
//                             })}
//                         </g>
//                     );
//                 })}

//                 {/* Final Effect Box */}
//                 <rect
//                     x={endX + 40}
//                     y={spineY - 100}
//                     width={360}
//                     height={180}
//                     rx={14}
//                     ry={14}
//                     fill="#fffbfbff"
//                     stroke="#aaa"
//                 />

//                 <foreignObject
//                     x={endX + 40}
//                     y={spineY - 100}
//                     width={360}
//                     height={180}
//                 >
//                     <div
//                         // xmlns="http://www.w3.org/1999/xhtml"
//                         style={{
//                             width: '100%',
//                             height: '100%',
//                             display: 'flex',
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             textAlign: 'center',
//                             padding: '10px',
//                             boxSizing: 'border-box',
//                         }}
//                     >
//                         <Typography
//                             sx={{
//                                 fontSize: 13,
//                                 fontWeight: 600,
//                                 color: '#000',
//                                 wordBreak: 'break-word',
//                             }}
//                         >
//                             {items?.inc_describtion}
//                         </Typography>
//                     </div>
//                 </foreignObject>

//             </svg>
//         </Box>
//     );
// }



import React, { useMemo } from "react";
import { Box } from "@mui/joy";
import { Typography } from "@mui/material";
import { processFishboneData } from "../CommonComponent/CommonFun";

export default function FishboneAnalysis({ items, apiData }) {
    const width = 1750;
    const height = 700;
    const spineY = height / 2;
    const startX = 250;
    const endX = width - 400;
    const boneLength = 100;
    const verticalOffset = 155;

    const pairedCauses = useMemo(() => processFishboneData(apiData), [apiData]);

    const spineLength = endX - startX;
    const pairSpacing = spineLength / (pairedCauses.length + 1);

    return (
        <Box sx={{ overflowX: "auto", p: 4 }}>
            <svg width={width} height={height}>
                {/* Main spine */}
                <line
                    x1={startX}
                    y1={spineY}
                    x2={endX}
                    y2={spineY}
                    stroke="#222"
                    strokeWidth={6}
                    markerEnd="url(#arrowhead)"
                />

                {/* Arrowheads */}
                <defs>
                    <marker
                        id="arrowhead"
                        markerWidth="12"
                        markerHeight="8"
                        refX="12"
                        refY="4"
                        orient="auto"
                    >
                        <polygon points="0 0, 12 4, 0 8" fill="#222" />
                    </marker>
                    <marker
                        id="arrowSmall"
                        markerWidth="10"
                        markerHeight="7"
                        refX="10"
                        refY="3.5"
                        orient="auto"
                    >
                        <polygon points="0 0, 10 3.5, 0 7" fill="#444" />
                    </marker>
                </defs>

                {/* Category pairs */}
                {pairedCauses.map((pair, index) => {
                    const x = startX + (index + 1) * pairSpacing;
                    const topY = spineY - verticalOffset;
                    const bottomY = spineY + verticalOffset;
                    const topEndX = x - boneLength;
                    const bottomEndX = x - boneLength;

                    return (
                        <g key={index}>
                            {/* Top diagonal */}
                            <line
                                x1={topEndX}
                                y1={topY}
                                x2={x}
                                y2={spineY}
                                stroke="#444"
                                strokeWidth={3.5}
                                markerEnd="url(#arrowSmall)"
                            />

                            {/* Bottom diagonal */}
                            <line
                                x1={bottomEndX}
                                y1={bottomY}
                                x2={x}
                                y2={spineY}
                                stroke="#444"
                                strokeWidth={3.5}
                                markerEnd="url(#arrowSmall)"
                            />

                            {/* Category labels */}
                            <text
                                x={topEndX}
                                y={topY - 8}
                                textAnchor="middle"
                                fontSize="18"
                                fontWeight="bold"
                                fill="#000"
                            >
                                {pair?.top?.category}
                            </text>
                            <text
                                x={bottomEndX}
                                y={bottomY + 30}
                                textAnchor="middle"
                                fontSize="18"
                                fontWeight="bold"
                                fill="#000"
                            >
                                {pair?.bottom?.category}
                            </text>

                            {/* --- TOP causes with wrapping --- */}
                            {pair.top.causes.map((cause, i) => {
                                const baseX = topEndX - 10;
                                const startY = topY + 15 + i * 40; // increased spacing
                                const arrowLength = 60;
                                const wrapWidth = 160;
                                const wrapHeight = 45;

                                return (
                                    <g key={`top-cause-${i}`}>
                                        <line
                                            x1={baseX - arrowLength}
                                            y1={startY}
                                            x2={baseX}
                                            y2={startY}
                                            stroke="#666"
                                            strokeWidth={2.5}
                                            markerEnd="url(#arrowSmall)"
                                        />
                                        <foreignObject
                                            x={baseX - arrowLength - wrapWidth - 10}
                                            y={startY - wrapHeight / 2}
                                            width={wrapWidth}
                                            height={wrapHeight}
                                        >
                                            <div
                                                style={{
                                                    fontSize: "13px",
                                                    color: "#333",
                                                    textAlign: "right",
                                                    wordWrap: "break-word",
                                                    whiteSpace: "normal",
                                                    overflow: "hidden",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "flex-end",
                                                    lineHeight: "1.2",
                                                }}
                                            >
                                                {cause}
                                            </div>
                                        </foreignObject>
                                    </g>
                                );
                            })}

                            {/* --- BOTTOM causes with wrapping --- */}
                            {pair.bottom.causes.map((cause, i) => {
                                const baseX = bottomEndX - 10;
                                const startY = bottomY - 15 - i * 40;
                                const arrowLength = 60;
                                const wrapWidth = 160;
                                const wrapHeight = 45;

                                return (
                                    <g key={`bottom-cause-${i}`}>
                                        <line
                                            x1={baseX - arrowLength}
                                            y1={startY}
                                            x2={baseX}
                                            y2={startY}
                                            stroke="#666"
                                            strokeWidth={2.5}
                                            markerEnd="url(#arrowSmall)"
                                        />
                                        <foreignObject
                                            x={baseX - arrowLength - wrapWidth - 10}
                                            y={startY - wrapHeight / 2}
                                            width={wrapWidth}
                                            height={wrapHeight}
                                        >
                                            <div

                                                style={{
                                                    fontSize: "13px",
                                                    color: "#333",
                                                    textAlign: "right",
                                                    wordWrap: "break-word",
                                                    whiteSpace: "normal",
                                                    overflow: "hidden",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "flex-end",
                                                    lineHeight: "1.2",
                                                }}
                                            >
                                                {cause}
                                            </div>
                                        </foreignObject>
                                    </g>
                                );
                            })}
                        </g>
                    );
                })}

                {/* Final Effect Box */}
                <rect
                    x={endX + 40}
                    y={spineY - 100}
                    width={360}
                    height={180}
                    rx={14}
                    ry={14}
                    fill="#fffbfbff"
                    stroke="#aaa"
                />

                <foreignObject
                    x={endX + 40}
                    y={spineY - 100}
                    width={360}
                    height={180}
                >
                    <div
                        // xmlns="http://www.w3.org/1999/xhtml"
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            padding: "10px",
                            boxSizing: "border-box",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 13,
                                fontWeight: 600,
                                color: "#000",
                                wordBreak: "break-word",
                            }}
                        >
                            {items?.inc_describtion}
                        </Typography>
                    </div>
                </foreignObject>
            </svg>
        </Box>
    );
}
