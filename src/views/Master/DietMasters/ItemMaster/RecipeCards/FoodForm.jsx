// import React, { useState } from "react";
// import { Box, Typography, IconButton } from "@mui/joy";
// import { TbWorldSearch } from "react-icons/tb";
// import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
// import FoodSuggestionItem from "./FoodSuggestionItem";
// import AddFoodButton from "./AddFoodButton";
// import { Data, inputStyle } from "src/views/Diet/CommonData/Common";

// /* ---------- FIELD WRAPPER ---------- */
// const Field = ({ label, children }) => (
//     <Box sx={{ display: "flex", flexDirection: "column" }}>
//         <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#666", ml: 1 }}>
//             {label}
//         </Typography>
//         <Box sx={{ backgroundColor: "#f1f1f1", borderRadius: 8, px: 2, py: 1.2 }}>
//             {children}
//         </Box>
//     </Box>
// );

// const FoodForm = ({
//     setImage,
//     formData,
//     setFormData,
//     setFoodData,
//     setLoadingData,
//     ExistFoodDetail = [],
// }) => {

//     /* ---------- FOOD SEARCH ---------- */
//     const [query, setQuery] = useState("");
//     const [suggestions, setSuggestions] = useState([]);
//     const [showSuggestions, setShowSuggestions] = useState(false);

//     /* ---------- INGREDIENT STATE (CLEAN) ---------- */
//     const [ingredientInput, setIngredientInput] = useState({
//         name: "",
//         grams: "",
//     });
//     const [ingredients, setIngredients] = useState([]);

//     /* ---------- INGREDIENT FUNCTIONS ---------- */
//     const addIngredient = () => {
//         if (!ingredientInput.name || !ingredientInput.grams) return;

//         setIngredients(prev => [...prev, ingredientInput]);
//         setIngredientInput({ name: "", grams: "" });
//     };

//     const removeIngredient = (index) => {
//         setIngredients(prev => prev.filter((_, i) => i !== index));
//     };

//     /* ---------- FOOD NAME ---------- */
//     const handleFoodChange = (e) => {
//         const value = e.target.value;
//         setQuery(value);
//         setFormData(prev => ({ ...prev, name: value }));

//         if (!value.trim()) {
//             setSuggestions([]);
//             setShowSuggestions(false);
//             return;
//         }

//         const filtered = ExistFoodDetail
//             ?.filter(item =>
//                 item?.item_name?.toLowerCase().includes(value.toLowerCase())
//             )
//             .slice(0, 8);

//         setSuggestions(filtered);
//         setShowSuggestions(true);
//     };

//     const handleSelectFood = (food) => {
//         setFormData(prev => ({
//             ...prev,
//             name: food.item_name,
//             hospitalRate: food.rate_hosp ?? "",
//             canteenRate: food.rate ?? "",
//             type: food.group_name === "VEG" ? "veg" : "nonveg",
//         }));
//         setQuery(food.item_name);
//         setShowSuggestions(false);
//     };

//     /* ---------- COMMON CHANGE ---------- */
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     /* ---------- IMAGE ---------- */
//     const handleUpload = (e) => {
//         const file = e.target.files[0];
//         if (!file) return;
//         const url = URL.createObjectURL(file);
//         setFormData(prev => ({ ...prev, image: url }));
//         setImage(url);
//     };

//     /* ---------- MOCK SEARCH ---------- */
//     const searchFood = async () => {
//         try {
//             setLoadingData(true);
//             setTimeout(() => setFoodData(Data), 1500);
//         } finally {
//             setLoadingData(false);
//         }
//     };

//     /* ---------- SUBMIT ---------- */
//     const handleSubmit = () => {
//         const payload = {
//             ...formData,
//             ingredients,
//         };
//         console.log("FINAL PAYLOAD:", payload);
//     };

//     return (
//         <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 1, boxShadow: "md", borderRadius: 5 }}>

//             <Typography level="h4" fontWeight={700}>Food Information</Typography>

//             {/* FOOD NAME */}
//             <Box sx={{ display: "flex", gap: 1 }}>
//                 <Box sx={{ flex: 1 }}>
//                     <Field label="Food Name">
//                         <Box sx={{ position: "relative" }}>
//                             <input
//                                 value={query.toUpperCase()}
//                                 onChange={handleFoodChange}
//                                 onFocus={() => query && setShowSuggestions(true)}
//                                 onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
//                                 style={inputStyle}
//                             />
//                             {showSuggestions && (
//                                 <Box sx={{ position: "absolute", top: "110%", left: 0, right: 0, bgcolor: "#fff", borderRadius: 8, boxShadow: "md", zIndex: 20 }}>
//                                     {suggestions.map(food => (
//                                         <FoodSuggestionItem
//                                             key={food.item_slno}
//                                             food={food}
//                                             onSelect={handleSelectFood}
//                                         />
//                                     ))}
//                                 </Box>
//                             )}
//                         </Box>
//                     </Field>
//                 </Box>
//                 <TbWorldSearch size={22} style={{ cursor: "pointer" }} onClick={searchFood} />
//             </Box>

//             {/* DESCRIPTION */}
//             <Field label="Description">
//                 <textarea
//                     name="description"
//                     rows={3}
//                     value={formData.description?.toUpperCase()}
//                     onChange={handleChange}
//                     style={{ ...inputStyle, resize: "none" }}
//                 />
//             </Field>

//             {/* INGREDIENTS */}
//             <Box >
//                 <Typography fontWeight={600} mb={1}>Ingredients</Typography>

//                 <Box sx={{ display: "flex", gap: 1 }}>
//                     <Field label="Ingredient">
//                         <input
//                             value={ingredientInput.name?.toUpperCase()}
//                             onChange={(e) => setIngredientInput(prev => ({ ...prev, name: e.target.value }))}
//                             style={{ ...inputStyle, width: 350 }}
//                         />
//                     </Field>

//                     <Field label="Grams">
//                         <input
//                             type="number"
//                             value={ingredientInput.grams}
//                             onChange={(e) => setIngredientInput(prev => ({ ...prev, grams: e.target.value }))}
//                             style={{ ...inputStyle, width: 50 }}
//                         />
//                     </Field>

//                     <IconButton sx={{ alignSelf: "flex-end", mb: 0.5 }} onClick={addIngredient}>
//                         <AiOutlinePlus />
//                     </IconButton>
//                 </Box>

//                 {/* ADDED INGREDIENTS */}
//                 <Box mt={1}>
//                     {ingredients.map((ing, i) => (
//                         <Box key={i} sx={{ display: "flex", justifyContent: "space-between", bgcolor: "#f5f5f5", p: 1, borderRadius: 6, mb: 0.5 }}>
//                             <Typography fontSize={13}>• {ing.name} – {ing.grams}g</Typography>
//                             <IconButton size="sm" color="danger" onClick={() => removeIngredient(i)}>
//                                 <AiOutlineDelete />
//                             </IconButton>
//                         </Box>
//                     ))}
//                 </Box>
//             </Box>
//             {/* RATES */}
//             <Box
//                 sx={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                 }}>
//                 <Field label="Hospital Rate (₹)">
//                     <input
//                         name="hospitalRate"
//                         value={formData.hospitalRate}
//                         onChange={handleChange}
//                         style={inputStyle}
//                     />
//                 </Field>

//                 <Field label="Canteen Rate (₹)">
//                     <input
//                         name="canteenRate"
//                         value={formData.canteenRate}
//                         onChange={handleChange}
//                         style={inputStyle}
//                     />
//                 </Field>
//                 <Field label="Bystander Rate (₹)">
//                     <input
//                         name="bystanderRate"
//                         value={formData.bystanderRate}
//                         onChange={handleChange}
//                         style={inputStyle}
//                     />
//                 </Field>
//                 <Field label="Staff Rate (₹)">
//                     <input
//                         name="staffRate"
//                         value={formData.staffRate}
//                         onChange={handleChange}
//                         style={inputStyle}
//                     />
//                 </Field>
//                 <Field label="Special Rate (₹)">
//                     <input
//                         name="specialRate"
//                         value={formData.specialRate}
//                         onChange={handleChange}
//                         style={inputStyle}
//                     />
//                 </Field>
//             </Box>

//             {/* IMAGE */}
//             <Box component="label" sx={{ cursor: "pointer", border: "1px dashed #ccc", width: 150, textAlign: "center", p: 1 }}>
//                 <Typography fontSize={10} fontWeight={600}>Upload Image</Typography>
//                 <input hidden type="file" accept="image/*" onChange={handleUpload} />
//             </Box>

//             <AddFoodButton onClick={handleSubmit} />
//         </Box>
//     );
// };

// export default FoodForm;



import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/joy";
import { TbWorldSearch } from "react-icons/tb";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import FoodSuggestionItem from "./FoodSuggestionItem";
import AddFoodButton from "./AddFoodButton";
import { Data, inputStyle } from "src/views/Diet/CommonData/Common";
import { UseFoodTypeDetail, UseRoomTypeDetail } from "src/views/Diet/CommonData/UseQuery";

/* ---------- FIELD WRAPPER ---------- */
const Field = ({ label, children }) => (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#666", ml: 1 }}>
            {label}
        </Typography>
        <Box sx={{ backgroundColor: "#f1f1f1", borderRadius: 8, px: 2, py: 1.2 }}>
            {children}
        </Box>
    </Box>
);

const FoodForm = ({
    setImage,
    formData,
    setFormData,
    setFoodData,
    setLoadingData,
    ExistFoodDetail = [],
}) => {

    /* ---------- FOOD SEARCH ---------- */
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    /* ---------- INGREDIENT STATE ---------- */
    const [ingredientInput, setIngredientInput] = useState({
        name: "",
        grams: "",
    });
    const [ingredients, setIngredients] = useState([]);
    const [editIndex, setEditIndex] = useState(null); //  ADD / EDIT MODE

    const { data: foodItem } = UseFoodTypeDetail();
    const { data: RoomType } = UseRoomTypeDetail();

    console.log({
        foodItem,
        RoomType
    });


    /* ---------- INGREDIENT FUNCTIONS ---------- */
    const addOrUpdateIngredient = () => {
        if (!ingredientInput.name || !ingredientInput.grams) return;

        if (editIndex !== null) {
            // UPDATE
            setIngredients(prev =>
                prev.map((ing, i) =>
                    i === editIndex ? ingredientInput : ing
                )
            );
            setEditIndex(null);
        } else {
            // ADD
            setIngredients(prev => [...prev, ingredientInput]);
        }

        setIngredientInput({ name: "", grams: "" });
    };

    const editIngredient = (index) => {
        setIngredientInput(ingredients[index]);
        setEditIndex(index);
    };

    const removeIngredient = (index) => {
        setIngredients(prev => prev.filter((_, i) => i !== index));
        if (editIndex === index) {
            setEditIndex(null);
            setIngredientInput({ name: "", grams: "" });
        }
    };

    /* ---------- FOOD NAME ---------- */
    const handleFoodChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        setFormData(prev => ({ ...prev, name: value }));

        if (!value.trim()) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        const filtered = ExistFoodDetail
            ?.filter(item =>
                item?.item_name?.toLowerCase().includes(value.toLowerCase())
            )
            .slice(0, 8);

        setSuggestions(filtered);
        setShowSuggestions(true);
    };

    const handleSelectFood = (food) => {
        setFormData(prev => ({
            ...prev,
            name: food.item_name,
            hospitalRate: food.rate_hosp ?? "",
            canteenRate: food.rate ?? "",
            type: food.group_name === "VEG" ? "veg" : "nonveg",
        }));
        setQuery(food.item_name);
        setShowSuggestions(false);
    };

    /* ---------- COMMON CHANGE ---------- */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    /* ---------- IMAGE ---------- */
    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setFormData(prev => ({ ...prev, image: url }));
        setImage(url);
    };

    /* ---------- MOCK SEARCH ---------- */
    const searchFood = async () => {
        try {
            setLoadingData(true);
            setTimeout(() => setFoodData(Data), 1500);
        } finally {
            setLoadingData(false);
        }
    };

    /* ---------- SUBMIT ---------- */
    const handleSubmit = () => {
        const payload = {
            ...formData,
            ingredients,
        };
        console.log("FINAL PAYLOAD:", payload);
    };


    

    return (
        <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 1, boxShadow: "md", borderRadius: 5 }}>

            <Typography level="h4" fontWeight={700}>Food Information</Typography>

            {/* FOOD NAME */}
            <Box sx={{ display: "flex", gap: 1 }}>
                <Box sx={{ flex: 1 }}>
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
                                <Box sx={{ position: "absolute", top: "110%", left: 0, right: 0, bgcolor: "#fff", borderRadius: 8, boxShadow: "md", zIndex: 20 }}>
                                    {suggestions.map(food => (
                                        <FoodSuggestionItem
                                            key={food.item_slno}
                                            food={food}
                                            onSelect={handleSelectFood}
                                        />
                                    ))}
                                </Box>
                            )}
                        </Box>
                    </Field>
                </Box>
                <TbWorldSearch size={22} style={{ cursor: "pointer" }} onClick={searchFood} />
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
                <Typography fontWeight={600} mb={1}>Ingredients</Typography>

                <Box sx={{ display: "flex", gap: 1 }}>
                    <Field label="Ingredient">
                        <input
                            value={ingredientInput.name?.toUpperCase()}
                            onChange={(e) =>
                                setIngredientInput(prev => ({ ...prev, name: e.target.value }))
                            }
                            style={{ ...inputStyle, width: 350 }}
                        />
                    </Field>

                    <Field label="Grams">
                        <input
                            type="number"
                            value={ingredientInput.grams}
                            onChange={(e) =>
                                setIngredientInput(prev => ({ ...prev, grams: e.target.value }))
                            }
                            style={{ ...inputStyle, width: 60 }}
                        />
                    </Field>

                    <IconButton
                        sx={{ alignSelf: "flex-end", mb: 0.5 }}
                        color={editIndex !== null ? "warning" : "primary"}
                        onClick={addOrUpdateIngredient}
                    >
                        {editIndex !== null ? "Update" : <AiOutlinePlus />}
                    </IconButton>
                </Box>

                {/* ADDED INGREDIENTS */}
                <Box mt={1}>
                    {ingredients?.map((ing, i) => (
                        <Box
                            key={i}
                            onClick={() => editIngredient(i)}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                bgcolor: editIndex === i ? "#e3f2fd" : "#f5f5f5",
                                p: 1,
                                borderRadius: 6,
                                mb: 0.5,
                                cursor: "pointer"
                            }}
                        >
                            <Typography fontSize={13}>
                                • {ing?.name?.toUpperCase()} – {ing?.grams} g
                            </Typography>

                            <IconButton
                                size="sm"
                                color="danger"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeIngredient(i);
                                }}
                            >
                                <AiOutlineDelete />
                            </IconButton>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* RATES */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                <Field label="Hospital Rate (₹)">
                    <input name="hospitalRate" value={formData.hospitalRate} onChange={handleChange} style={inputStyle} />
                </Field>
                <Field label="Canteen Rate (₹)">
                    <input name="canteenRate" value={formData.canteenRate} onChange={handleChange} style={inputStyle} />
                </Field>
                <Field label="Bystander Rate (₹)">
                    <input name="bystanderRate" value={formData.bystanderRate} onChange={handleChange} style={inputStyle} />
                </Field>
                <Field label="Staff Rate (₹)">
                    <input name="staffRate" value={formData.staffRate} onChange={handleChange} style={inputStyle} />
                </Field>
                <Field label="Special Rate (₹)">
                    <input name="specialRate" value={formData.specialRate} onChange={handleChange} style={inputStyle} />
                </Field>
            </Box>

            {/* IMAGE */}
            <Box component="label" sx={{ cursor: "pointer", border: "1px dashed #ccc", width: 150, textAlign: "center", p: 1 }}>
                <Typography fontSize={10} fontWeight={600}>Upload Image</Typography>
                <input hidden type="file" accept="image/*" onChange={handleUpload} />
            </Box>

            <AddFoodButton onClick={handleSubmit} />
        </Box>
    );
};

export default FoodForm;
