import React, { memo } from 'react'
import { Box } from '@mui/joy'
import DietTextComponent from '../DietComponent/DietTextComponent';

import { MdFastfood, MdEmojiFoodBeverage } from "react-icons/md";
import { RiDrinks2Fill, RiDrinksFill } from "react-icons/ri";
import { GiFruitBowl, GiChickenOven } from "react-icons/gi";
import { FaBowlFood } from "react-icons/fa6";
import { IoFishSharp } from "react-icons/io5";



import AnimatedFoodIcon from 'src/views/Master/DietMasters/ItemMaster/RecipeCards/AnimatedFoodIcon';
import DietButton from '../DietComponent/DietButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';

const KotItemHeader = ({
    name,
    goBackPath,
    headerIcons
}) => {

    const navigate = useNavigate();

    // Default Food Icons
    const defaultIcons = [
        GiChickenOven,
        IoFishSharp,
        FaBowlFood,
        MdFastfood,
        MdEmojiFoodBeverage,
        RiDrinks2Fill,
        RiDrinksFill,
        GiFruitBowl,
    ];

    const HandleGoPrev = () => {
        if (goBackPath) {
            navigate(goBackPath);
        } else {
            navigate(-1); // fallback to previous page
        }

    };

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: 50,
                backgroundColor: 'var(--royal-purple-300)',
                borderTopRightRadius: 5,
                borderTopLeftRadius: 5,
                p: 1
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                }}
            >
                <AnimatedFoodIcon
                    icons={headerIcons || defaultIcons}
                    size={30}
                    interval={4400}
                    Iconcolor={'white'}
                />

                <DietTextComponent
                    size={20}
                    color={"white"}
                    value={name}
                    weight={800}
                />
            </Box>

            <DietButton
                width={120}
                onClick={HandleGoPrev}
                name={'Go Back'}
                icon={ExitToAppIcon}
            />
        </Box>
    )
}

export default memo(KotItemHeader)