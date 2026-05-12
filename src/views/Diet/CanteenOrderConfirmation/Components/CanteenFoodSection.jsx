import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box } from "@mui/joy";
import { infoNotify, warningNotify } from "src/views/Common/CommonCode";
import { useItemFullDetials } from "../../CommonData/UseQuery";
import DietInputLabel from "src/views/Master/DietMasters/DietComponent/DietInputLabel";
import DietButton from "../../DietComponent/DietButton";
import FoodSuggestionItem from "src/views/Master/DietMasters/ItemMaster/RecipeCards/FoodSuggestionItem";
import { safeParseJSON } from "../../CommonData/Common";

const CanteenFoodSection = ({
    tempFood,
    setTempFood,
    setItems,
    setOpenDetailCard,
    isOpen,
    memoOrder,
    setSelectedFood,
    selectedFood,
    type_slno,
    TypeName
}) => {

    const [query, setQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);


    const inputRef = useRef(null);
    const quantityRef = useRef(null);

    //  you can change this hook later for canteen-specific API
    const { data: ExistFoodDetail = [] } = useItemFullDetials(query.length > 0);

    const toNumber = (val, defaultValue = 0) => {
        const num = Number(val);
        return isNaN(num) ? defaultValue : num;
    };

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);


    useEffect(() => {
        if (selectedFood && Object.keys(selectedFood).length > 0) {
            quantityRef.current?.focus();
        }
    }, [selectedFood]);

    /* FILTER */
    const filteredSuggestions = useMemo(() => {
        if (!query.trim() || !Array.isArray(ExistFoodDetail)) return [];

        const lowerQuery = query.toLowerCase();

        return ExistFoodDetail
            .filter(item => {
                const name = item?.item_name?.toLowerCase() || "";
                const code = item?.item_code?.toLowerCase() || "";
                return (
                    name.includes(lowerQuery) ||
                    code.includes(lowerQuery)
                );
            })
            .slice(0, 8);

    }, [query, ExistFoodDetail]);

    /* SELECT ITEM */

    const handleSelectFood = useCallback((food) => {

        const parsed = safeParseJSON(food.price_details);
        const parsedPrices = Array.isArray(parsed) ? parsed : [];

        const match = parsedPrices.find(
            item => Number(item.party_type_id) === Number(memoOrder?.party_type_id)
        ) || parsedPrices[0] || {};

        const finalFood = {
            ...food,
            price: match.price ?? food.price ?? 0,
            gst_rate: match.gst_rate ?? food.gst_rate ?? 0,
            discount: match.discount ?? food.discount ?? 0
        };

        setSelectedFood(finalFood);

        setTempFood(prev => ({
            ...prev,
            item_id: finalFood.item_id,
            item_name: finalFood.item_name,
            itemtype: finalFood.group_name,
            description: finalFood.description,
            price: toNumber(finalFood.price),
            gst: toNumber(finalFood.gst_rate),
            type_slno: TypeName,
            qty: 1
        }));

        setQuery(finalFood.item_name);
        setShowSuggestions(false);

    }, [setTempFood, setSelectedFood, memoOrder]);


    /* ADD ITEM */


    const handleAddFood = () => {

        if (!tempFood.item_name || !tempFood.qty) return;
        if (!type_slno) return warningNotify("Please Select Meal Type!");

        const selectedFood = ExistFoodDetail?.find(
            f => f.item_id === tempFood.item_id
        );

        const parsed = safeParseJSON(selectedFood.price_details);
        const parsedPrices = Array.isArray(parsed) ? parsed : [];

        const match = parsedPrices.find(
            item => Number(item.party_type_id) === Number(memoOrder?.party_type_id)
        );

        if (!match) {
            infoNotify("Price not found for selected type");
            return;
        }

        setItems(prev => {

            const alreadyExists = prev.some(
                item => item?.item_id === tempFood?.item_id
            );

            if (alreadyExists) {
                infoNotify("Item Already Present");
                return prev;
            }

            const price = Number(match.price || 0);
            const gst = Number(match.gst_rate || 0);
            const qty = Number(tempFood.qty || 1);

            const gstAmount = (price * qty * gst) / 100;

            return [
                ...prev,
                {
                    item_id: selectedFood?.item_id,
                    item_name: tempFood.item_name,
                    qty,
                    price,
                    measure: tempFood?.measure || "",
                    description: selectedFood?.description || "",
                    gst_amount: gstAmount,
                    type_slno,
                    gst,
                    isNew: true
                }
            ];
        });
        // RESET
        setTempFood({
            item_id: null,
            item_name: "",
            qty: "",
            measure: "",
            itemtype: "",
            price: ""
        });

        setSelectedFood({});
        setQuery("");
    };

    return (
        <Box sx={{ width: "60%" }}>

            {/* ITEM INPUT */}
            <Box sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}>

                <DietInputLabel name={"Item"} />

                <Box sx={{ position: "relative" }}>

                    <input
                        ref={inputRef}
                        value={query}
                        onChange={(e) => {
                            const value = e.target.value.toUpperCase();
                            setQuery(value);
                            setShowSuggestions(Boolean(value.trim()));
                        }}
                        onKeyDown={(e) => {
                            if (!filteredSuggestions.length) return;

                            if (e.key === "ArrowDown") {
                                e.preventDefault();
                                setActiveIndex((prev) =>
                                    prev < filteredSuggestions.length - 1 ? prev + 1 : 0
                                );
                            }

                            if (e.key === "ArrowUp") {
                                e.preventDefault();
                                setActiveIndex((prev) =>
                                    prev > 0 ? prev - 1 : filteredSuggestions.length - 1
                                );
                            }

                            if (e.key === "Enter") {
                                e.preventDefault();

                                //  CASE 1: user navigated
                                if (activeIndex >= 0 && filteredSuggestions[activeIndex]) {
                                    handleSelectFood(filteredSuggestions[activeIndex]);
                                    return;
                                }
                                //  CASE 2: only one item → auto select
                                if (filteredSuggestions.length === 1) {
                                    handleSelectFood(filteredSuggestions[0]);
                                    return;
                                }
                                //  CASE 3: fallback (optional)
                                // pick first item if exists
                                if (filteredSuggestions.length > 0) {
                                    handleSelectFood(filteredSuggestions[0]);
                                }
                            }
                        }}
                        onFocus={() => query && setShowSuggestions(true)}
                        onBlur={() =>
                            setTimeout(() => setShowSuggestions(false), 150)
                        }
                        className="qty-input"
                        style={{ width: "250px" }}
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
                            }} >


                            <FoodSuggestionItem
                                suggestions={filteredSuggestions}
                                onSelect={handleSelectFood}
                                activeIndex={activeIndex}
                                personType={memoOrder?.party_type_id}
                            />
                        </Box>
                    )}
                </Box>
            </Box>



            {/* QUANTITY */}
            <Box sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
                <DietInputLabel name={"Quantity"} />

                <input
                    ref={quantityRef}
                    className="qty-input"
                    type="number"
                    min={1}
                    placeholder="Quantity"
                    value={tempFood.qty}
                    onChange={(e) => {
                        const value = Math.max(1, Number(e.target.value));

                        setTempFood((p) => ({
                            ...p,
                            qty: value,
                        }));
                    }}
                    onKeyDown={(e) => {

                        if (["-", "+", "e", "E", "0"].includes(e.key)) {
                            e.preventDefault();
                            return;
                        }

                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddFood();

                            setTimeout(() => {
                                inputRef.current?.focus();
                            }, 0);
                        }
                    }}
                    style={{ width: "250px" }}
                />
            </Box>

            {/* ACTION BUTTONS */}
            <Box sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
                <DietButton name="Add Food" onClick={handleAddFood} />
                <DietButton
                    name="Close"
                    onClick={() => {
                        setSelectedFood({})
                        setOpenDetailCard(false)
                        setTempFood((p) => ({
                            ...p,
                            qty: '',
                        }));
                    }}
                />
            </Box>

        </Box>
    );
};

export default memo(CanteenFoodSection);