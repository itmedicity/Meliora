import { Box } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import Field from './Field'
import FoodSuggestionItem from './FoodSuggestionItem'
import DietFoodTypeSelect from 'src/views/CommonSelectCode/DietFoodTypeSelect'
import DietFoodSubTypeSelect from 'src/views/CommonSelectCode/DietFoodSubTypeSelect'
import { inputStyle } from 'src/views/Diet/CommonData/Common'
import { useFetchItemFiles, UseIemFullDetail } from 'src/views/Diet/CommonData/UseQuery'
import SelectItemType from 'src/views/CommonSelectCode/SelectItemType'

const FoodNameSection = ({
    formData,
    setFormData,
    setIngredients,
    setRates,
    setImage
}) => {

    const [query, setQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const { data: ExistFoodDetail = [] } = UseIemFullDetail();


    const { data: ItemFiles = [] } = useFetchItemFiles(formData?.item_id);

    console.log({
        ItemFiles
    });


    useEffect(() => {
        if (!Array.isArray(ItemFiles)) {
            return;
        }
        setImage(prev => {
            const existing = Array.isArray(prev)
                ? prev
                : [];
            /* keep newly added files */
            const localFiles = existing.filter(
                item => item?.isNew
            );

            /* backend files */
            const backendFiles = ItemFiles.map(item => ({
                ...item,
                isNew: false
            }));
            return [
                ...backendFiles,
                ...localFiles
            ];
        });

    }, [ItemFiles, setImage]);

    const filteredSuggestions = useMemo(() => {
        if (!query.trim()) return [];
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


    const handleFoodChange = useCallback((e) => {
        const value = e.target.value;
        setQuery(value);
        setFormData(prev => ({ ...prev, name: value }));
        setShowSuggestions(Boolean(value?.trim()));
    }, [setFormData]);


    // const handleSelectFood = useCallback((food) => {
    //     console.log({
    //         food
    //     });

    //     setFormData(prev => ({
    //         ...prev,
    //         name: food.item_name,
    //         type: food.item_type_id,
    //         description: food.description,
    //         item_group_id: food.item_group_id,
    //         item_category_id: food.item_category_id,
    //         itemcode: food.item_code,
    //         itemalias: food.item_alias,
    //         image: [],
    //         item_type_id: food.item_type_id
    //     }));
    //     setQuery(food.item_name);
    //     setShowSuggestions(false);
    // }, [setFormData]);

    const handleSelectFood = useCallback((food) => {

        console.log({ food });

        const parsedIngredients = food?.ingredients
            ? JSON.parse(food.ingredients)
            : [];

        const parsedRates = food?.item_prices
            ? JSON.parse(food.item_prices)
            : [];

        setFormData(prev => ({
            ...prev,
            item_id: food.item_id || "",
            name: food.item_name || "",
            type: food.item_type_id || 0,
            description: food.description || "",
            item_group_id: food.item_group_id || 0,
            item_category_id: food.item_category_id || 0,
            itemcode: food.item_code || "",
            itemalias: food.item_alias || "",
            image: [],
            item_type_id: food.item_type_id || 0
        }));

        /* INGREDIENTS ARRAY */
        setIngredients(
            parsedIngredients.map((item) => ({
                recipe_id: item.recipe_id,
                ingredient_item_id: item.ingredient_item_id,
                ingredient_name: item.ingredient_name,
                quantity: Number(item.quantity) || 0,
                unit_id: item.unit_id,
                unit_name: item.unit_name
            }))
        );

        /* RATES OBJECT */
        const formattedRates = parsedRates.reduce((acc, rate) => {

            acc[rate.party_type_id] = {
                price_id: rate.price_id,
                party_type_id: rate.party_type_id,
                party_name: rate.party_name,
                price: Number(rate.price) || 0,
                gst_rate: Number(rate.gst_rate) || 0,
                discount: Number(rate.discount) || 0,
                discount_rate: Number(rate.discount_rate) || 0
            };

            return acc;

        }, {});

        setRates(formattedRates);

        setQuery(food.item_name || "");
        setShowSuggestions(false);

    }, [
        setFormData,
        setIngredients,
        setRates
    ]);




    return (
        <Box sx={{ display: "flex", gap: 1 }}>
            <Box sx={{ width: "40%" }}>
                <Field label="Food Name">
                    <Box sx={{ position: "relative", width: '100%' }}>
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
            <Box sx={{ flex: 1 }}>
                <Field label="Item Type">
                    <SelectItemType
                        value={formData.item_type_id}
                        setValue={(val) =>
                            setFormData(prev => ({ ...prev, item_type_id: val }))
                        }
                    />
                </Field>
            </Box>

            <Box sx={{ flex: 1 }}>
                <Field label="Item Group">
                    <DietFoodTypeSelect
                        value={formData.item_group_id}
                        setValue={(val) =>
                            setFormData(prev => ({ ...prev, item_group_id: val }))
                        }
                    />
                </Field>
            </Box>




            <Box sx={{ flex: 1 }}>
                <Field label="Sub Type">
                    <DietFoodSubTypeSelect
                        parentId={formData.item_group_id || 0}
                        value={formData.item_category_id}
                        setValue={(val) =>
                            setFormData(prev => ({ ...prev, item_category_id: val }))
                        }
                    />
                </Field>
            </Box>

            <Box sx={{ flex: 1 }}>
                <Field label="Item Code">
                    <Box sx={{ position: "relative" }}>
                        <input
                            value={(formData?.itemcode || "").toUpperCase()}
                            onChange={(e) =>
                                setFormData(prev => ({ ...prev, itemcode: e.target.value }))
                            }
                            style={inputStyle}
                        />
                    </Box>
                </Field>
            </Box>

            <Box sx={{ flex: 1 }}>
                <Field label="Item Alias">
                    <Box sx={{ position: "relative" }}>
                        <input
                            value={(formData?.itemalias || "").toUpperCase()}
                            onChange={(e) =>
                                setFormData(prev => ({ ...prev, itemalias: e.target.value }))
                            }
                            style={inputStyle}
                        />
                    </Box>
                </Field>
            </Box>
        </Box>
    )
}

export default memo(FoodNameSection)


