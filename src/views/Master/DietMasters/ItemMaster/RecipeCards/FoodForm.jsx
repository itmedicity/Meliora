import React, { useCallback, useMemo, useState } from "react";
import { Box, Typography, IconButton, Tooltip, Chip } from "@mui/joy";
import { TbWorldSearch } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import FoodSuggestionItem from "./FoodSuggestionItem";
import AddFoodButton from "./AddFoodButton";
import { Data, dietRestrictions, inputStyle } from "src/views/Diet/CommonData/Common";
import IngredientList from "./IngredientList";
import RoomPriceList from "./RoomPriceList";
import Field from "./Field";
import DietFoodTypeSelect from "src/views/CommonSelectCode/DietFoodTypeSelect";
import DietMeasurementSelect from "src/views/CommonSelectCode/DietMeasurementSelect";
import { warningNotify } from "src/views/Common/CommonCode";
import { RiEdit2Fill } from "react-icons/ri";

const FoodForm = ({
    setImage,
    formData,
    setFormData,
    setFoodData,
    setLoadingData,
    ExistFoodDetail = [],
}) => {

    const [query, setQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedDiets, setSelectedDiets] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [ingredientInput, setIngredientInput] = useState({ name: "", value: "", unit: "" });
    const [ingredientEditIndex, setIngredientEditIndex] = useState(null);


    const handleDietToggle = (dietCode) => {
        setSelectedDiets(prev =>
            prev.includes(dietCode)
                ? prev.filter(code => code !== dietCode)
                : [...prev, dietCode]
        );
    };

    const filteredSuggestions = useMemo(() => {
        if (!query.trim()) return [];
        return ExistFoodDetail
            ?.filter(item =>
                item?.item_name?.toLowerCase().includes(query.toLowerCase())
            )
            ?.slice(0, 8);
    }, [query, ExistFoodDetail]);


    const handleFoodChange = useCallback((e) => {
        const value = e.target.value;
        setQuery(value);
        setFormData(prev => ({ ...prev, name: value }));
        setShowSuggestions(Boolean(value?.trim()));
    }, [setFormData]);

    const handleSelectFood = useCallback((food) => {
        setFormData(prev => ({
            ...prev,
            name: food.item_name,
            hospitalRate: food.rate_hosp ?? "",
            canteenRate: food.rate ?? "",
            type: food.group_name === "VEG" ? "veg" : "nonveg",
        }));
        setQuery(food.item_name);
        setShowSuggestions(false);
    }, [setFormData]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, [setFormData]);


    const addOrUpdateIngredient = useCallback(() => {
        if (!ingredientInput.name || !ingredientInput.value || !ingredientInput.unit) {
            return warningNotify("Missing something");
        }

        setIngredients(prev => {
            if (ingredientEditIndex !== null) {
                return prev.map((item, i) =>
                    i === ingredientEditIndex ? ingredientInput : item
                );
            }
            return [...prev, ingredientInput];
        });

        setIngredientInput({ name: "", value: "", unit: "" });
        setIngredientEditIndex(null);
    }, [ingredientInput, ingredientEditIndex]);


    const editIngredient = useCallback((index) => {
        setIngredientInput(ingredients[index]);
        setIngredientEditIndex(index);
    }, [ingredients]);


    const removeIngredient = useCallback((index) => {
        setIngredients(prev => prev.filter((_, i) => i !== index));
        if (ingredientEditIndex === index) {
            setIngredientEditIndex(null);
            setIngredientInput({ name: "", value: "", unit: "" });
        }
    }, [ingredientEditIndex]);



    const handleUpload = useCallback((e) => {
        const file = e.target.files[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setFormData(prev => ({ ...prev, image: url }));
        setImage(url);
    }, [setFormData, setImage]);


    const searchFood = useCallback(async () => {
        try {
            setLoadingData(true);
            setTimeout(() => setFoodData(Data), 1500);
        } finally {
            setLoadingData(false);
        }
    }, [setFoodData, setLoadingData]);


    const handleSubmit = useCallback(() => {
        const payload = {
            ...formData,
            ingredients,
            // roomPrices,
        };
        console.log("FINAL PAYLOAD:", payload);
    }, [formData, ingredients]);


    return (
        <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 1, boxShadow: "md", borderRadius: 5 }}>

            <Typography level="h4" fontWeight={700}>Food Information</Typography>

            {/* FOOD NAME */}
            <Box sx={{ display: "flex", gap: 1 }}>
                <Box sx={{ flex: 1, width: '60%' }}>
                    <Field label="Food Name">
                        <Box sx={{ position: "relative" }}>
                            <input
                                value={query.toUpperCase()}
                                onChange={handleFoodChange}
                                onFocus={() => query && setShowSuggestions(true)}
                                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                                style={inputStyle}
                            />
                            {showSuggestions && (
                                <Box sx={{
                                    position: "absolute",
                                    top: "110%",
                                    left: 0,
                                    right: 0,
                                    bgcolor: "#fff",
                                    borderRadius: 8,
                                    boxShadow: "md",
                                    zIndex: 20
                                }}>
                                    <FoodSuggestionItem
                                        suggestions={filteredSuggestions}
                                        onSelect={handleSelectFood}
                                    />
                                </Box>
                            )}
                        </Box>
                    </Field>
                </Box>
                <Box sx={{ width: '40%', mt: 0 }}>
                    <Field label="Food Type">
                        <DietFoodTypeSelect
                            value={formData.foodType}
                            setValue={(val) =>
                                setFormData(prev => ({
                                    ...prev,
                                    foodType: val
                                }))
                            }
                        />
                    </Field>
                </Box>
            </Box>

            {/* DESCRIPTION */}
            <Field label="Description">
                <textarea
                    name="description"
                    rows={3}
                    value={formData.description?.toUpperCase()}
                    onChange={handleChange}
                    style={{ ...inputStyle, resize: "none" }}
                />
            </Field>



            {/* INGREDIENTS */}
            <Box>
                <Typography sx={{ mt: 2 }} fontWeight={600}>Ingredient Detail</Typography>
                <Box sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Box sx={{ width: '80%' }}>
                        <Field label="Ingredient">
                            <input
                                value={ingredientInput.name?.toUpperCase()}
                                onChange={(e) =>
                                    setIngredientInput(prev => ({ ...prev, name: e.target.value }))
                                }
                                style={{ ...inputStyle, mt: 1 }}
                            />
                        </Field>
                    </Box>

                    <Field label="Measurement">
                        <input
                            type="number"
                            value={ingredientInput?.value}
                            onChange={(e) =>
                                setIngredientInput(prev => ({ ...prev, value: e.target.value }))
                            }
                            style={{ ...inputStyle, width: 60 }}
                        />
                    </Field>

                    <Box sx={{ width: '15%' }}>
                        <Field label="unit">
                            <DietMeasurementSelect
                                value={ingredientInput?.unit}
                                setValue={(val) =>
                                    setIngredientInput(prev => ({ ...prev, unit: val }))
                                }
                            />
                        </Field>
                    </Box>


                    <IconButton
                        variant="soft"
                        sx={{ alignSelf: "flex-end", mb: 0.5 }}
                        color={ingredientEditIndex !== null ? "warning" : "primary"}
                        onClick={addOrUpdateIngredient}>
                        {ingredientEditIndex !== null ? <RiEdit2Fill /> : <AiOutlinePlus />}
                    </IconButton>
                </Box>

                {/* ADDED INGREDIENTS */}
                {
                    ingredients?.length > 0 &&
                    <Box sx={{ border: '1px solid #9822c326', p: 1, mt: 2 }}>
                        <IngredientList
                            ingredients={ingredients}
                            editIndex={ingredientEditIndex}
                            onEdit={editIngredient}
                            onRemove={removeIngredient}
                        />
                    </Box>
                }
            </Box>


            <Typography sx={{ mt: 2 }} fontWeight={600}>Hospital Rate Detail</Typography>

            <Box sx={{
                display: "flex",
                gap: 1,
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'red'
            }}>

            </Box>

            <RoomPriceList />

            <Typography sx={{ mt: 2 }} fontWeight={600}>Food Speciality</Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, border: '1px solid #9822c365', p: 1 }}>
                {dietRestrictions?.map((diet) => {
                    const selected = selectedDiets?.includes(diet.diet_code);
                    return (
                        <Chip
                            key={diet.diet_code}
                            variant={selected ? "solid" : "soft"}
                            onClick={() => handleDietToggle(diet.diet_code)}
                            sx={{
                                cursor: "pointer",
                                fontSize: 12,
                                px: 1.2,
                                py: 0.6,
                                borderRadius: 12,
                                textTransform: "uppercase",
                                opacity: diet.status === 0 ? 0.4 : 1,
                                pointerEvents: diet.status === 0 ? "none" : "auto",

                                "--Chip-bgColor": selected
                                    ? "var(--royal-purple-400)"
                                    : "transparent",

                                "--Chip-color": selected ? "#fff" : "#000",
                            }}
                        >
                            • {diet.description}
                        </Chip>

                    );
                })}
            </Box>

            {/* IMAGE */}
            <Box component="label" sx={{ cursor: "pointer", border: "1px dashed #ccc", width: 150, textAlign: "center", p: 1 }}>
                <Typography fontSize={10} fontWeight={600}>Upload Image</Typography>
                <input hidden type="file" accept="image/*" onChange={handleUpload} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Tooltip title="Get Nutritional Detail" placement="top" variant="solid">
                    <Box component="span" sx={{ display: 'inline-flex', cursor: 'pointer' }}>
                        <TbWorldSearch
                            size={22}
                            onClick={searchFood}
                        />
                    </Box>
                </Tooltip>

                <AddFoodButton onClick={handleSubmit} />
            </Box>

        </Box>
    );
};

export default FoodForm;
