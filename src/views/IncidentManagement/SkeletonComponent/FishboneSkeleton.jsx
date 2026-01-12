import React from "react";
import { Box } from "@mui/joy";

export default function FishboneSkeleton() {
    const width = 1750;
    const height = 700;
    const spineY = height / 2;
    const startX = 250;
    const endX = width - 400;
    const boneLength = 100;
    const verticalOffset = 155;

    const pairedSlots = 3; // matches your 3 category pairs
    const spineLength = endX - startX;
    const pairSpacing = spineLength / (pairedSlots + 1);

    return (
        <Box sx={{ overflowX: "auto", p: 4 }}>
            <svg width={width} height={height}>
                {/* Main spine skeleton */}
                <line
                    x1={startX}
                    y1={spineY}
                    x2={endX}
                    y2={spineY}
                    stroke="#e0e0e0"
                    strokeWidth={6}
                    strokeDasharray="8 6"
                />

                {[...Array(pairedSlots)].map((_, index) => {
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
                                stroke="#ccc"
                                strokeWidth={3.5}
                                strokeDasharray="6 4"
                            />

                            {/* Bottom diagonal */}
                            <line
                                x1={bottomEndX}
                                y1={bottomY}
                                x2={x}
                                y2={spineY}
                                stroke="#ccc"
                                strokeWidth={3.5}
                                strokeDasharray="6 4"
                            />

                            {/* Category label placeholders */}
                            <rect
                                x={topEndX - 60}
                                y={topY - 25}
                                width="120"
                                height="20"
                                rx="4"
                                fill="#eaeaea"
                            />
                            <rect
                                x={bottomEndX - 60}
                                y={bottomY + 10}
                                width="120"
                                height="20"
                                rx="4"
                                fill="#eaeaea"
                            />

                            {/* Top cause placeholders */}
                            {[...Array(4)].map((__, i) => {
                                const baseX = topEndX - 10;
                                const startY = topY + 15 + i * 28;
                                const arrowLength = 60;
                                return (
                                    <g key={`top-placeholder-${i}`}>
                                        <line
                                            x1={baseX - arrowLength}
                                            y1={startY}
                                            x2={baseX}
                                            y2={startY}
                                            stroke="#ddd"
                                            strokeWidth={2.5}
                                        />
                                        <rect
                                            x={baseX - arrowLength - 120}
                                            y={startY - 10}
                                            width="100"
                                            height="18"
                                            rx="3"
                                            fill="#f0f0f0"
                                        />
                                    </g>
                                );
                            })}

                            {/* Bottom cause placeholders */}
                            {[...Array(3)].map((__, i) => {
                                const baseX = bottomEndX - 10;
                                const startY = bottomY - 15 - i * 28;
                                const arrowLength = 60;
                                return (
                                    <g key={`bottom-placeholder-${i}`}>
                                        <line
                                            x1={baseX - arrowLength}
                                            y1={startY}
                                            x2={baseX}
                                            y2={startY}
                                            stroke="#ddd"
                                            strokeWidth={2.5}
                                        />
                                        <rect
                                            x={baseX - arrowLength - 120}
                                            y={startY - 10}
                                            width="100"
                                            height="18"
                                            rx="3"
                                            fill="#f0f0f0"
                                        />
                                    </g>
                                );
                            })}
                        </g>
                    );
                })}

                {/* Final Effect Box placeholder */}
                <rect
                    x={endX + 40}
                    y={spineY - 100}
                    width={360}
                    height={180}
                    rx={14}
                    ry={14}
                    fill="#f9f9f9"
                    stroke="#e0e0e0"
                />
                <rect
                    x={endX + 90}
                    y={spineY - 30}
                    width={260}
                    height={40}
                    rx={6}
                    fill="#ebebeb"
                />
            </svg>
        </Box>
    );
}
