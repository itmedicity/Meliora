import React, { memo, useEffect, useState } from 'react';
import { Box } from '@mui/joy';
import { useFetchItemFiles } from '../../CommonData/UseQuery';
import DietTextComponent from '../../DietComponent/DietTextComponent';
import nofoodfound from '../../../../assets/images/Diet/nofood.jpg'

const FoodDetailShowCard = ({ selectedFood = {} }) => {

    const {
        item_id,
        item_name,
        description,
        category_name,
        group_name,
        price,
        discount
    } = selectedFood ?? {};

 
    const { data: ItemFiles = [] } = useFetchItemFiles(item_id);

    const [selectedImage, setSelectedImage] = useState("");

    // Set first image when files load
    useEffect(() => {
        if (!selectedFood?.item_id) return;

        if (ItemFiles?.length > 0) {
            setSelectedImage(ItemFiles[0].url);
        } else {
            setSelectedImage(nofoodfound); //  fallback
        }
    }, [ItemFiles, selectedFood?.item_id]);

    const stockLeft = 12;

    if (!selectedFood?.item_id) return null;

    return (
        <Box sx={{ width: '60%' }}>

            {/*  MAIN CARD */}
            <Box
                sx={{
                    display: 'flex',
                    gap: 3,
                    p: 2,
                    borderRadius: 10,
                    bgcolor: '#fff',
                    boxShadow: 'sm'
                }}
            >

                {/* LEFT IMAGE */}
                <Box sx={{ width: '30%' }}>
                    <Box
                        sx={{
                            height: 150,
                            borderRadius: 8,
                            overflow: 'hidden',
                            border: '1px solid #eee'
                        }}
                    >
                        {selectedImage && (
                            <img
                                src={selectedImage}
                                alt="food"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        )}
                    </Box>
                </Box>

                {/* RIGHT DETAILS */}
                <Box
                    sx={{
                        width: '70%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1
                    }}
                >

                    {/* Title */}
                    <DietTextComponent
                        value={item_name}
                        size={20}
                        weight={700}
                    />

                    {/* Category + Group */}
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <DietTextComponent
                            value={category_name}
                            size={13}
                            color="#555"
                        />
                        <DietTextComponent
                            value={group_name}
                            size={13}
                            color="#555"
                        />
                    </Box>

                    {/* Description */}
                    <DietTextComponent
                        value={description}
                        size={11}
                        color="#777"
                        sx={{
                            display: "block",
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                            overflowWrap: "anywhere"
                        }}
                    />

                    {/* Price */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                            <DietTextComponent
                                value={`₹ ${price ?? 0}`}
                                size={18}
                                weight={700}
                                color="#d32f2f"
                            />
                            {discount > 0 && (
                                <DietTextComponent
                                    value={`${discount}% OFF`}
                                    size={12}
                                    color="green"
                                />
                            )}
                        </Box>

                        <Box >
                            <DietTextComponent
                                value={`Stock Left: ${stockLeft}`}
                                size={13}
                                weight={600}
                                color={stockLeft > 5 ? "green" : "red"}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/*  THUMBNAILS BELOW (FIXED ISSUE) */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',   // prevents breaking
                    gap: 1,
                    mt: 1
                }}
            >
                {ItemFiles?.length > 0 && (
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 1,
                            mt: 1
                        }}
                    >
                        {ItemFiles.map(file => (
                            <img
                                key={file.name}
                                src={file.url}
                                alt={file.name}
                                onClick={() => setSelectedImage(file.url)}
                                style={{
                                    width: 55,
                                    height: 55,
                                    borderRadius: 6,
                                    cursor: 'pointer',
                                    objectFit: 'cover',
                                    border:
                                        selectedImage === file.url
                                            ? '2px solid #1976d2'
                                            : '1px solid #ccc'
                                }}
                            />
                        ))}
                    </Box>
                )}
            </Box>

        </Box>
    );
};

export default memo(FoodDetailShowCard);