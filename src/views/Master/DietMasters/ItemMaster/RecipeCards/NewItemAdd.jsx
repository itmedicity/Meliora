import {
    Box, Divider, Skeleton,
} from '@mui/joy'
import React, { useState } from 'react'
import TitleCard from './TitleCard';
import FoodForm from './FoodForm';
import FoodDetails from './FoodDetails';
import { UseFoodDetail } from 'src/views/Diet/CommonData/UseQuery';


const NewItemAdd = () => {
    const [image, setImage] = useState(null);
    const [loadingdata, setLoadingData] = useState(false);
    const [fooddata, setFoodData] = useState({})

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        type: "",
        serves: "",
        prepTime: "",
        cookTime: "",
        totalTime: "",
        hospitalRate: "",
        canteenRate: "",
        staffRate: "",
        bystanderRate: "",
        specialRate: "",
        image: null
    });

    const { data: FoodDetail } = UseFoodDetail()

    return (
        <Box sx={{
            width: '100%',
            minHeight: 650,
            borderRadius: 5,
            border: '1px solid #9822c365',
            position: 'relative',
            p: 1,

        }}>
            <TitleCard />
            <Divider sx={{ height: 2, bgcolor: 'var(--royal-purple-400)' }} />
            <Box className="body" sx={{ display: 'flex', height: '100%', py: 1, gap: 1 }}>
                <Box sx={{
                    width: '70%'
                }}>
                    <FoodForm
                        setImage={setImage}
                        formData={formData}
                        setFormData={setFormData}
                        setFoodData={setFoodData}
                        setLoadingData={setLoadingData}
                        ExistFoodDetail={FoodDetail || []}
                    />
                </Box>
                <Box sx={{
                    width: { md: '40%', lg: '40%', xl: '30%' },
                    height: '90%',
                    // border: '1px solid #9822c365',
                    p: 2,
                    borderRadius: 5,
                    boxShadow: "md"
                }}>
                    <Box
                        sx={{
                            width: "100%",
                            height: "40%",
                            borderRadius: 5,
                            overflow: "hidden",
                            boxShadow: 'md',
                            p: 0.5
                        }}
                    >
                        {image ? (
                            <img
                                src={image}
                                alt="Food image"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    display: "block",
                                }}
                            />
                        ) : (
                            <Skeleton
                                variant="rectangular"
                                width="100%"
                                height="100%"
                                sx={{ borderRadius: 5 }}
                            />
                        )}
                    </Box>

                    <FoodDetails
                        Loading={loadingdata}
                        Data={fooddata ?? {}}
                    />

                </Box>
            </Box>
        </Box>
    )
}

export default NewItemAdd