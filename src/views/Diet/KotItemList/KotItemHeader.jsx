import React, { memo } from 'react'
import { Box } from '@mui/joy'
import DietTextComponent from '../DietComponent/DietTextComponent';
import { MdFastfood, MdEmojiFoodBeverage } from "react-icons/md";
import { RiDrinks2Fill, RiDrinksFill } from "react-icons/ri";
import { GiFruitBowl } from "react-icons/gi";
import { FaBowlFood } from "react-icons/fa6";
import { IoFishSharp } from "react-icons/io5";
import { GiChickenOven } from "react-icons/gi";
import AnimatedFoodIcon from 'src/views/Master/DietMasters/ItemMaster/RecipeCards/AnimatedFoodIcon';
import DietButton from '../DietComponent/DietButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
const KotItemHeader = ({ name, goBackPath }) => {


    const navigate = useNavigate();

    // Handle Go Back Button
    const HandleGoPrev = () => {
        navigate(goBackPath)
    };

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                // flexDirection: 'column',
                height: 50,
                backgroundColor: 'var(--royal-purple-300)',
                borderTopRightRadius: 5,
                borderTopLeftRadius: 5,
                p: 1
            }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1
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