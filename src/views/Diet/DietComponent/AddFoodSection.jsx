import React, { memo, useCallback, useMemo, useState } from "react";
import { Box } from "@mui/joy";
import DietInputLabel from "src/views/Master/DietMasters/DietComponent/DietInputLabel";
import ChooseDietMeasurementSelect from "src/views/CommonSelectCode/ChooseDietMeasurementSelect";
import FoodSuggestionItem from "src/views/Master/DietMasters/ItemMaster/RecipeCards/FoodSuggestionItem";
import DietButton from "../DietComponent/DietButton";
import { UseFoodDetail } from "../CommonData/UseQuery";

const AddFoodSection = ({
    tempFood,
    setTempFood,
    setItems,
    setOpenDetailCard
}) => {

    const { data: ExistFoodDetail = [] } = UseFoodDetail();

    const [query, setQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    //  Suggestions Filter
    const filteredSuggestions = useMemo(() => {
        if (!query.trim()) return [];
        return ExistFoodDetail
            ?.filter((item) =>
                item?.item_name?.toLowerCase().includes(query.toLowerCase())
            )
            ?.slice(0, 8);
    }, [query, ExistFoodDetail]);


    // Select Suggestion
    const handleSelectFood = useCallback((food) => {
        setTempFood((prev) => ({
            ...prev,
            item_id: food.item_id,
            item_name: food.item_name,
            itemtype: food.group_name,
        }));

        setQuery(food.item_name);
        setShowSuggestions(false);
    }, []);


    //  Add Food
    const handleAddFood = () => {

        if (!tempFood.item_name || !tempFood.qty) return;

        const selectedFood = ExistFoodDetail?.find(
            (f) => f.item_id === tempFood.item_id
        );

        const newItem = {
            item_name: tempFood.item_name,
            qty: Number(tempFood.qty),
            price: selectedFood?.rate_hosp || 0,
            nutritious_value: selectedFood?.nutritious_value || "",
            isNew: true
        };

        setItems((prev) => [...prev, newItem]);

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
    const handleFoodChange = useCallback((e) => {
        const value = e.target.value;
        setQuery(value);
        setShowSuggestions(Boolean(value?.trim()));
    }, []);


    return (
        <Box sx={{ width: "60%" }}>

            {/* Select Item */}
            <Box sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
                <DietInputLabel name={"Select Item"} />

                <Box sx={{ position: "relative" }}>
                    <input
                        value={query.toUpperCase()}
                        onChange={handleFoodChange}
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
