import React, { memo } from "react";
import { Box, Typography } from "@mui/joy";
import AnimatedFoodIcon from "./AnimatedFoodIcon";
import { MdFastfood, MdEmojiFoodBeverage } from "react-icons/md";
import { RiDrinks2Fill, RiDrinksFill } from "react-icons/ri";
import { GiFruitBowl } from "react-icons/gi";
import { FaBowlFood } from "react-icons/fa6";
import { IoFishSharp } from "react-icons/io5";
import { GiChickenOven } from "react-icons/gi";
import DietButton from "src/views/Diet/DietComponent/DietButton";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';


const TitleCard = () => {
    const navigate = useNavigate()
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                p: 1,
                justifyContent: 'space-between'
            }}>
            <Box sx={{
                display: "flex",
                alignItems: "center",
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
                    }}> RECIPE CARD</Typography></Box>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                p: 1,
                justifyContent: 'space-between'
            }}>
                <DietButton
                    onClick={() => navigate('/Home/Settings')}
                    name={'Go Back'}
                    icon={ExitToAppIcon}
                />
                <DietButton
                    width={150}
                    onClick={() => navigate('/Home/viewitems')}
                    name={'View Items'}
                    icon={RemoveRedEyeIcon}
                />

            </Box>

        </Box>
    );
};

export default memo(TitleCard);
