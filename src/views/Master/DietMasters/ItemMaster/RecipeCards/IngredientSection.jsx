import { Box, IconButton } from '@mui/joy'
import React, { memo, useCallback, useMemo, useState } from 'react'
import Field from './Field'
import IngredientList from './IngredientList'
import { RiEdit2Fill } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { inputStyle } from 'src/views/Diet/CommonData/Common';
import DietMeasurementSelect from 'src/views/CommonSelectCode/DietMeasurementSelect';
import { warningNotify } from 'src/views/Common/CommonCode';
import { UseIemFullDetail } from 'src/views/Diet/CommonData/UseQuery';
import FoodSuggestionItem from './FoodSuggestionItem';

const IngredientSection = ({
    setIngredients,
    ingredients,
}) => {

    const { data: ItemMasterFood = [] } = UseIemFullDetail();

    const [ingredientInput, setIngredientInput] = useState({
        id: "",
        name: "",
        value: "",
        unit: ""
    });

    const [ingredientEditIndex, setIngredientEditIndex] = useState(null);
    const [query, setQuery] = useState("");
    const [showSuggestion, setShowSuggestion] = useState(false);

    /*  Add / Update Ingredient  */
    const addOrUpdateIngredient = useCallback(() => {

        if (!query.trim()) {
            return warningNotify("Please enter ingredient");
        }

        // check if item exists in food list
        const matchedFood = ItemMasterFood?.find(
            item => item?.item_name?.toLowerCase().trim() === query.toLowerCase().trim()
        );

        if (!matchedFood) {
            return warningNotify("Ingredient must be an existing food item");
        }

        if (!ingredientInput.value || !ingredientInput.unit) {
            return warningNotify("Missing something");
        }

        const ingredientData = {
            ingredient_item_id: matchedFood?.item_id,
            ingredient_name: matchedFood?.item_name,
            quantity: ingredientInput.value,
            unit_id: ingredientInput.unit
        };

        const isDuplicate = ingredients?.some(
            (item, index) =>
                item?.ingredient_item_id === ingredientData?.ingredient_item_id &&
                index !== ingredientEditIndex
        );

        if (isDuplicate) {
            return warningNotify("This ingredient is already added");
        }

        setIngredients(prev => {
            if (ingredientEditIndex !== null) {
                return prev.map((item, i) =>
                    i === ingredientEditIndex ? ingredientData : item
                );
            }
            return [...prev, ingredientData];
        });

        setIngredientInput({ id: "", name: "", value: "", unit: "" });
        setIngredientEditIndex(null);
        setQuery("");

    }, [
        query,
        ingredientInput.value,
        ingredientInput.unit,
        ingredientEditIndex,
        ItemMasterFood,
        setIngredients
    ]);


    /*Edit Ingredient */
    const editIngredient = useCallback((index) => {
        const item = ingredients[index]
        setIngredientInput(item)
        setQuery(item?.name || "")
        setIngredientEditIndex(index)
    }, [ingredients]);


    /*  Remove Ingredient */
    const removeIngredient = useCallback((index) => {
        setIngredients(prev => prev.filter((_, i) => i !== index));

        if (ingredientEditIndex === index) {
            setIngredientEditIndex(null);
            setIngredientInput({ id: "", name: "", value: "", unit: "" });
            setQuery("");
        }

    }, [ingredientEditIndex, setIngredients]);


    /* Food Suggestions */
    const filteredSuggestions = useMemo(() => {
        if (!query.trim()) return []
        return ItemMasterFood
            ?.filter(item =>
                item?.item_name
                    ?.toLowerCase()
                    ?.includes(query.toLowerCase())
            )
            ?.slice(0, 8)
    }, [query, ItemMasterFood]);


    console.log({
        filteredSuggestions
    });


    /*  Select Ingredient */
    const selectIngredient = useCallback((item) => {
        setIngredientInput(prev => ({
            ...prev,
            id: item?.item_id,
            name: item?.item_name
        }))
        setQuery(item?.item_name)
        setShowSuggestion(false)
    }, []);

    return (
        <>

            <Box sx={{ display: "flex", gap: 1, alignItems: "center", mt: 1 }}>

                {/* Ingredient */}
                <Box sx={{ width: "80%", position: "relative" }}>

                    <Field label="Ingredient">

                        <input
                            value={query?.toUpperCase()}
                            onChange={(e) => {
                                setQuery(e.target.value)
                                setShowSuggestion(true)
                                setIngredientInput(prev => ({
                                    ...prev,
                                    id: "",
                                    name: e.target.value
                                }))
                            }}
                            style={inputStyle}
                        />

                    </Field>

                    {/* Suggestion List */}
                    {showSuggestion && filteredSuggestions?.length > 0 && (
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
                                onSelect={selectIngredient}
                            />
                        </Box>
                    )}
                </Box>

                {/* Measurement */}
                <Field label="Measurement">

                    <input
                        type="number"
                        value={ingredientInput.value}
                        onChange={(e) =>
                            setIngredientInput(prev => ({
                                ...prev,
                                value: e.target.value
                            }))
                        }
                        style={{ ...inputStyle, width: 60 }}
                    />

                </Field>

                {/* Unit */}
                <Box sx={{ width: '15%' }}>

                    <Field label="unit">

                        <DietMeasurementSelect
                            value={ingredientInput?.unit}
                            setValue={(val) =>
                                setIngredientInput(prev => ({
                                    ...prev,
                                    unit: val
                                }))
                            }
                        />

                    </Field>

                </Box>

                {/* Add Button */}
                <IconButton
                    variant="soft"
                    color={ingredientEditIndex !== null ? "warning" : "primary"}
                    onClick={addOrUpdateIngredient}
                >
                    {ingredientEditIndex !== null ? <RiEdit2Fill /> : <AiOutlinePlus />}
                </IconButton>

            </Box>


            {/* Ingredient List */}

            {ingredients?.length > 0 && (

                <Box sx={{ border: "1px solid #9822c326", p: 1, mt: 2 }}>

                    <IngredientList
                        ingredients={ingredients}
                        editIndex={ingredientEditIndex}
                        onEdit={editIngredient}
                        onRemove={removeIngredient}
                    />

                </Box>

            )}

        </>
    )
}

export default memo(IngredientSection)