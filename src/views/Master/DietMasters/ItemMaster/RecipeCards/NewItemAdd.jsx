import { Box, Divider } from '@mui/joy'
import React, { memo, useState } from 'react'
import TitleCard from './TitleCard';
import FoodForm from './FoodForm';
import FoodDetails from './FoodDetails';
import ImageCarouselPreview from './ImageCarouselPreview';


const NewItemAdd = () => {
    const [image, setImage] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        diet_type: null,
        item_group_id: null,
        item_category_id: null,
        itemcode: "",
        itemalias: "",
        image: [],
        item_type_id: null
    });

    return (
        <Box sx={{
            width: '100%',
            minHeight: 650,
            borderRadius: 5,
            border: '1px solid #9822c365',
            position: 'relative',
            p: 1
        }}>
            <TitleCard />
            <Divider sx={{ height: 2, bgcolor: 'var(--royal-purple-400)' }} />
            <Box className="body" sx={{ display: 'flex', height: '100%', py: 1, gap: 1 }}>
                <Box sx={{ width: '80%' }}>
                    <FoodForm
                        setImage={setImage}
                        formData={formData}
                        setFormData={setFormData}
                    />
                </Box>
                <Box sx={{
                    width: { md: '20%', lg: '20%', xl: '30%' },
                    height: '90%',
                    p: 2,
                    borderRadius: 5,
                    boxShadow: "md"
                }}>

                    <ImageCarouselPreview
                        images={image}
                        setImages={setImage}
                    />

                    <FoodDetails
                        Loading={false}
                        Data={{}}
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default memo(NewItemAdd)