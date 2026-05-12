import { Box } from '@mui/joy'
import React, { memo, useCallback, useMemo, useState } from 'react'
import Field from './Field'
import FoodSuggestionItem from './FoodSuggestionItem'
import DietFoodTypeSelect from 'src/views/CommonSelectCode/DietFoodTypeSelect'
import DietFoodSubTypeSelect from 'src/views/CommonSelectCode/DietFoodSubTypeSelect'
import { inputStyle } from 'src/views/Diet/CommonData/Common'
import { UseIemFullDetail } from 'src/views/Diet/CommonData/UseQuery'
import SelectItemType from 'src/views/CommonSelectCode/SelectItemType'

const FoodNameSection = ({
    formData,
    setFormData
}) => {

    const [query, setQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const { data: ExistFoodDetail = [] } = UseIemFullDetail();

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

    const handleSelectFood = useCallback((food) => {
        setFormData(prev => ({
            ...prev,
            name: food.item_name,
            type: food.group_name === "VEG" ? "veg" : "nonveg",
        }));
        setQuery(food.item_name);
        setShowSuggestions(false);
    }, [setFormData]);


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


