import React, { memo } from "react";
import { Box, Typography } from "@mui/joy";
import AnimatedFoodIcon from "./AnimatedFoodIcon";
import { MdFastfood, MdEmojiFoodBeverage } from "react-icons/md";
import { RiDrinks2Fill, RiDrinksFill } from "react-icons/ri";
import { GiFruitBowl } from "react-icons/gi";
import { FaBowlFood } from "react-icons/fa6";
import { IoFishSharp } from "react-icons/io5";
import { GiChickenOven } from "react-icons/gi";

const TitleCard = () => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                p: 1
            }}>
            <AnimatedFoodIcon
                icons={[
                    GiChickenOven,
                    IoFishSharp,
                    FaBowlFood,
                    MdFastfood,
                    MdEmojiFoodBeverage,
                    RiDrinks2Fill,
                    RiDrinksFill,
                    GiFruitBowl,
                ]}
                size={32}
                interval={4400}
            />
            <Typography
                sx={{
                    color: "black",
                    fontSize: 18,
                    fontWeight: 600,
                    fontFamily: "var(--roboto-font)",
                    mt: 2
                }}> RECIPE CARD</Typography>

        </Box>
    );
};

export default memo(TitleCard);
