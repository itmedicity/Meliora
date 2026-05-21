import React, { memo } from "react";
import { Box, Typography } from "@mui/joy";
import DietTile from "./DietTile";
import DietTileWithLabel from "./DietTileWithLabel";

const DietView = ({
    title,
    titleColor,
    bgColor,
    borderLeftColor,
    status,
    statusColor,
    tileBorder,
    patients,
    getDietImage,
    onTileClick,
    activeButton
}) => {

    const parseTime = (timeStr) => {
        if (!timeStr) return null;
        const [time, modifier] = timeStr.split(" ");
        let [hours, minutes] = time.split(":").map(Number);
        if (modifier === "PM" && hours !== 12) hours += 12;
        if (modifier === "AM" && hours === 12) hours = 0;
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
    };

    return (
        <Box
            sx={{
                p: 1,
                bgcolor: bgColor,
                borderRadius: 2,
                mb: 1,
                height: "75vh",
                overflow: "auto",
            }}
        >
            {/* TITLE */}
            <Typography
                sx={{
                    mb: 1,
                    mt: 0.5,
                    fontSize: 16,
                    fontWeight: 600,
                    color: titleColor,
                    borderLeft: borderLeftColor,
                    pl: 1,
                }}
            >
                {title}
            </Typography>

            {/* PATIENT LIST */}
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 0.5,
                    mt: 1,
                    width: "100%",
                    overflow: 'hidden'
                }}
            >

                {patients.map((item, index) => {
                    if (activeButton === "notMarked" || activeButton === "notUnderDiet") {
                        return (
                            <Box
                                key={index}
                                sx={{
                                    flex: "0 0 calc(20% - 4px)",
                                    maxWidth: "calc(20% - 4px)",
                                }}
                            >
                                <DietTileWithLabel
                                    name={item.ptc_ptname}
                                    pt_no={item.pt_no}
                                    mrdNo={item.mrdNo}
                                    bordercolor={tileBorder}
                                    image={getDietImage(item)}
                                    onClick={() => onTileClick(item)}
                                    orderStatus={item.orderStatusId ?? 0}
                                    FeedingTime={item.name}
                                    deliveredTime={item.deliveredTime}
                                    roomName={item.room}
                                    activeButton={activeButton}
                                />
                            </Box>
                        );
                    }


                    if (activeButton === "orderStatus") {
                        return item.feedingDetails?.map((feed, idx) => (
                            <Box
                                key={`${item.pt_no}-${idx}`}
                                sx={{
                                    flex: "0 0 calc(20% - 4px)",
                                    maxWidth: "calc(20% - 4px)",
                                }}
                            >
                                <DietTileWithLabel
                                    name={item.ptc_ptname}
                                    pt_no={item.pt_no}
                                    mrdNo={item.mrdNo}
                                    bordercolor={tileBorder}
                                    image={getDietImage(item)}
                                    onClick={() => onTileClick(item)}
                                    orderStatus={feed.orderStatusId ?? 0}
                                    FeedingTime={feed.name}
                                    deliveredTime={feed.deliveredTime}
                                    roomName={item.room}
                                />
                            </Box>
                        ));
                    }
                    if (activeButton === "foodTime") {
                        return item.feedingDetails?.map((feed, idx) => (
                            <Box
                                key={`${item.pt_no}-${idx}`}
                                sx={{
                                    flex: "0 0 calc(20% - 4px)",
                                    maxWidth: "calc(20% - 4px)",
                                }}
                            >
                                <DietTileWithLabel
                                    key={`${index}-${idx}`}
                                    name={item.ptc_ptname}
                                    pt_no={item.pt_no}
                                    mrdNo={item.mrdNo}
                                    bordercolor={tileBorder}
                                    image={getDietImage(item)}
                                    onClick={() => onTileClick(item)}
                                    orderStatus={feed.orderStatusId ?? 0}
                                    FeedingTime={feed.name}
                                    deliveredTime={feed.deliveredTime}
                                    delayedByMinutes={feed.delayedByMinutes} // pass here
                                    roomName={item.room}
                                />
                            </Box>
                        ))
                    }

                    if (activeButton === "deliveredOnTime") {
                        return item.feedingDetails
                            ?.filter(feed => feed.deliveredStatus === "ONTIME")
                            .map((feed, idx) => (
                                <Box
                                    key={`${item.pt_no}-${idx}`}
                                    sx={{
                                        flex: "0 0 calc(20% - 4px)",
                                        maxWidth: "calc(20% - 4px)",
                                    }}
                                >
                                    <DietTileWithLabel
                                        key={`${index}-${idx}`}
                                        name={item.ptc_ptname}
                                        pt_no={item.pt_no}
                                        mrdNo={item.mrdNo}
                                        bordercolor={tileBorder}
                                        image={getDietImage(item)}
                                        onClick={() => onTileClick(item)}
                                        orderStatus={feed.orderStatusId ?? 0}
                                        FeedingTime={feed.name}
                                        deliveredTime={feed.deliveredTime}
                                        delayedByMinutes={feed.delayedByMinutes} // pass here
                                        roomName={item.room}
                                    />
                                </Box>
                            ));
                    }

                    if (activeButton === "deliveryDelayed") {
                        return item.feedingDetails
                            ?.filter(feed => {
                                const now = new Date();
                                const feedEndTime = parseTime(feed.to);
                                const deliveredTime = feed.deliveredTime ? parseTime(feed.deliveredTime) : null;
                                // delivered but late
                                if (deliveredTime && deliveredTime > feedEndTime && feed.deliveredStatus !== "ONTIME") {
                                    return true;
                                }
                                // not delivered yet but time passed
                                if (!deliveredTime && now > feedEndTime) {
                                    return true;
                                }
                                return false;
                            })
                            .map((feed, idx) => (
                                <Box
                                    key={`${item.pt_no}-${idx}`}
                                    sx={{
                                        flex: "0 0 calc(20% - 4px)",
                                        maxWidth: "calc(20% - 4px)",
                                    }}
                                >
                                    <DietTileWithLabel
                                        key={`${index}-${idx}`}
                                        name={item.ptc_ptname}
                                        pt_no={item.pt_no}
                                        mrdNo={item.mrdNo}
                                        bordercolor={tileBorder}
                                        image={getDietImage(item)}
                                        onClick={() => onTileClick(item)}
                                        orderStatus={feed.orderStatusId ?? 0}
                                        FeedingTime={feed.name}
                                        delayedByMinutes={feed.delayedByMinutes} // pass here
                                        deliveredTime={feed.deliveredTime}
                                        roomName={item.room}
                                    />
                                </Box>
                            ));
                    }
                    return (
                        <Box
                            key={`${item.pt_no}`}
                            sx={{
                                flex: "0 0 calc(20% - 4px)",
                                maxWidth: "calc(20% - 4px)",
                            }}
                        >
                            <DietTile
                                name={item.ptc_ptname}
                                pt_no={item.pt_no}
                                mrdNo={item.mrdNo}
                                status={status}
                                statusColor={statusColor}
                                bordercolor={tileBorder}
                                image={getDietImage(item)}
                                onClick={() => onTileClick(item)}
                                roomName={item.room}
                                orderStatus={item.orderStatusId ?? 0}
                            />
                        </Box>
                    );

                })
                }
            </Box>
        </Box>
    );
};

export default memo(DietView);

