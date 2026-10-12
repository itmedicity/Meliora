import React, { memo, useCallback, useMemo, useState } from "react";
import { Box } from "@mui/joy";
import DietInputLabel from "src/views/Master/DietMasters/DietComponent/DietInputLabel";
import ChooseDietMeasurementSelect from "src/views/CommonSelectCode/ChooseDietMeasurementSelect";
import FoodSuggestionItem from "src/views/Master/DietMasters/ItemMaster/RecipeCards/FoodSuggestionItem";
import DietButton from "../DietComponent/DietButton";
import { useAllFoodAndBeverage } from "../CommonData/UseQuery";
import { infoNotify } from "src/views/Common/CommonCode";

const AddFoodSection = ({
    tempFood,
    setTempFood,
    setItems,
    setOpenDetailCard
}) => {

    const [query, setQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const { data: ExistFoodDetail = [] } = useAllFoodAndBeverage(query.length > 0);
    //  Suggestions Filter
    const filteredSuggestions = useMemo(() => {
        if (!query.trim() || !Array.isArray(ExistFoodDetail)) return [];
        const lowerQuery = query.toLowerCase();
        return ExistFoodDetail
            .filter((item) =>
                item?.item_name?.toLowerCase().includes(lowerQuery)
            )
            .slice(0, 8);
    }, [query, ExistFoodDetail]);


    // Select Suggestion
    const handleSelectFood = useCallback((food) => {
        setTempFood((prev) => ({
            ...prev,
            item_id: food.item_id,
            item_name: food.item_name,
            itemtype: food.group_name,
            description: food.description
        }));

        setQuery(food.item_name);
        setShowSuggestions(false);
    }, [setTempFood]);


    //  Add Food
    const handleAddFood = () => {
        if (!tempFood.item_name || !tempFood.qty) return;

        const selectedFood = ExistFoodDetail?.find(
            (f) => f.item_id === tempFood.item_id
        );

        // Setting the Vlaue ot the Current Items
        setItems((prev) => {
            const alreadyExists = prev.some(
                (item) => item?.item_id === tempFood?.item_id
            );

            if (alreadyExists) {
                infoNotify("Item Already Present")
                return prev;
            }
            return [
                ...prev,
                {
                    item_id: selectedFood?.item_id,
                    item_name: tempFood.item_name,
                    qty: Number(tempFood.qty),
                    price: selectedFood?.price || 0,
                    measure: tempFood?.measure || "",
                    description: selectedFood?.description || "",
                    isNew: true
                }
            ];
        });

        // Reset
        setTempFood({
            item_id: null,
            item_name: "",
            qty: "",
            measure: "",
            itemtype: "",
        });

        setQuery("");
    };

    // ? Input Change
    // const handleFoodChange = useCallback((e) => {
    //     const value = e.target.value;
    //     setQuery(value);
    //     setShowSuggestions(Boolean(value?.trim()));
    // }, []);


    return (
        <Box sx={{ width: "60%" }}>

            {/* Select Item */}
            <Box sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
                <DietInputLabel name={"Select Item"} />

                <Box sx={{ position: "relative" }}>
                    <input
                        // value={query.toUpperCase()}
                        // onChange={handleFoodChange}
                        value={query}
                        onChange={(e) => {
                            const value = e.target.value.toUpperCase();
                            setQuery(value);
                            setShowSuggestions(Boolean(value.trim()));
                        }}
                        onFocus={() => query && setShowSuggestions(true)}
                        onBlur={() =>
                            setTimeout(() => setShowSuggestions(false), 150)
                        }
                        className="qty-input"
                        style={{ width: "300px" }}
                    />

                    {showSuggestions && (
                        <Box
                            sx={{
                                position: "absolute",
                                top: "110%",
                                left: 0,
                                right: 0,
                                bgcolor: "#fff",
                                borderRadius: 8,
                                boxShadow: "md",
                                zIndex: 20,
                            }}
                        >
                            <FoodSuggestionItem
                                suggestions={filteredSuggestions}
                                onSelect={handleSelectFood}
                            />
                        </Box>
                    )}
                </Box>
            </Box>

            {/* Measurement */}
            <Box sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
                <DietInputLabel name={"Measurement"} />
                <ChooseDietMeasurementSelect
                    value={tempFood.measure}
                    setValue={(v) =>
                        setTempFood((p) => ({ ...p, measure: v }))
                    }
                />
            </Box>

            {/* Quantity */}
            <Box sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
                <DietInputLabel name={"Quantity"} />
                <input
                    className="qty-input"
                    type="number"
                    placeholder="Quantity"
                    value={tempFood.qty}
                    onChange={(e) =>
                        setTempFood((p) => ({
                            ...p,
                            qty: e.target.value,
                        }))
                    }
                />
            </Box>

            {/* Add Button */}
            <Box sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
                <DietButton name="Add Item" onClick={handleAddFood} />
                <DietButton name="close" onClick={() => setOpenDetailCard(false)} />
            </Box>
        </Box>
    );
};

export default memo(AddFoodSection);
