import React, { useCallback, useState } from "react";
import {
    Box,
    // Tooltip
} from "@mui/joy";
// import { TbWorldSearch } from "react-icons/tb";
// import AddFoodButton from "./AddFoodButton";
// import FoodSpecialitySection from "./FoodSpecialitySection";
import { inputStyle } from "src/views/Diet/CommonData/Common";
import RoomPriceList from "./RoomPriceList";
import Field from "./Field";
import IngredientSection from "./IngredientSection";
import ImageUpload from "./ImageUpload";
import FoodNameSection from "./FoodNameSection";
import DietTextComponent from "src/views/Diet/DietComponent/DietTextComponent";
import LocalDiningRoundedIcon from '@mui/icons-material/LocalDiningRounded';
import DietButton from "src/views/Diet/DietComponent/DietButton";
import { errorNotify, succesNotify, warningNotify } from "src/views/Common/CommonCode";
import { axioslogin } from "src/views/Axios/Axios";
import { useSelector } from "react-redux";
import { UseIemFullDetail } from "src/views/Diet/CommonData/UseQuery";
import { transformRates } from "src/views/Diet/CommonData/CommonFun";
import { handleImageUpload } from "src/views/IncidentManagement/CommonComponent/CommonFun";

const FoodForm = ({
    setImage,
    formData,
    setFormData
}) => {

    const id = useSelector(state => state.LoginUserData.empid)
    const { refetch: fetchIemMasterDetail } = UseIemFullDetail();

    const [ingredients, setIngredients] = useState([]);
    const [rates, setRates] = useState({});
    const [loading, setLoading] = useState(false);

    console.log({
        formData
    });


    const resetAll = useCallback(() => {
        setIngredients([])
        setRates({})
        setFormData({
            name: "",
            description: "",
            diet_type: null,
            item_group_id: null,
            item_category_id: null,
            itemcode: "",
            itemalias: "",
            image: null,
            item_type_id: null
        })
    }, [setIngredients, useState, setFormData]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        let newValue = value;
        if (name === "item_alias" || name === "item_code") {
            newValue = value.toUpperCase().replace(/\s/g, "");
        }
        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }));
    }, [setFormData]);


    const handleUpload = useCallback((e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;
        const urls = files.map(file => URL.createObjectURL(file));
        setFormData(prev => ({
            ...prev,
            image: [...(prev.image || []), ...files]
        }));
        setImage(prev => [...prev, ...urls]);
    }, [setFormData, setImage]);


    // Item Master Detail Submission
    const handleSubmit = useCallback(async () => {

        const itemName = formData.name?.trim()?.toUpperCase();
        const itemAlias = formData.itemalias?.trim().toUpperCase();
        const itemCode = formData.itemcode?.trim().toUpperCase();

        if (!itemName) return warningNotify("Food name is required");
        if (!formData?.item_type_id) return warningNotify("Item Type is required");
        if (!formData?.item_group_id) return warningNotify("Item group is required");
        if (!formData?.item_category_id) return warningNotify("Food category is required");
        if (!itemAlias) return warningNotify("Item alias is required");
        if (itemAlias.length !== 4) return warningNotify("Item alias must be 4 characters");
        if (!itemCode) return warningNotify("Item code is required");
        if (!formData.description?.trim() === "") return warningNotify("Please Enter Description");
        if (itemCode.length !== 3) return warningNotify("Item code must be 3 characters");
        const uploadedFiles = formData.image || [];
        if (uploadedFiles.length > 5) return warningNotify("Maximum 5 files allowed");

        const cleanedIngredients = ingredients.filter(
            (item) => item.ingredient_item_id && item.quantity && item.unit_id
        );
        const transformedRates = transformRates(rates);

        try {
            setLoading(true);

            // ---------- STEP 1 INSERT ITEM ----------
            const payload = {
                item_name: itemName,
                description: formData.description,
                diet_type: formData.diet_type,
                item_group_id: formData.item_group_id,
                item_category_id: formData.item_category_id,
                item_alias: itemAlias.toUpperCase(),
                item_code: itemCode.toUpperCase(),
                item_type_id: formData.item_type_id,
                created_by: id,
                ingredients: cleanedIngredients,
                itemrate: transformedRates
            };
            const response = await axioslogin.post("/fooditemmast/insert", payload);
            const { success, message, item_id } = response.data;
            if (success !== 2) {
                return warningNotify(message);
            }
            console.log({
                item_id
            });

            // ---------- STEP 2 UPLOAD IMAGE ----------
            // FILE UPLOAD
            if (uploadedFiles.length > 0) {
                try {
                    const formPayload = new FormData();
                    formPayload.append("id", item_id);
                    for (const file of uploadedFiles) {
                        if (file.type.startsWith('image')) {
                            const compressedFile = await handleImageUpload(file);
                            formPayload.append('files', compressedFile, compressedFile.name);
                        } else {
                            formPayload.append('files', file, file.name);
                        }
                    }
                    const uploadRes = await axioslogin.post(
                        "/fooditemmast/uploadItemFiles",
                        formPayload, { headers: { "Content-Type": "multipart/form-data" } }
                    );
                    const uploadResult = uploadRes.data;

                    console.log({
                        uploadResult
                    });

                    if (uploadResult.success !== 1) {
                        warningNotify(`Item saved but image upload failed: ${uploadResult.message}`);
                    } else {
                        succesNotify("Item and files uploaded successfully");
                    }
                } catch (uploadErr) {
                    //  If upload API itself throws an error
                    warningNotify("File upload failed, updating file status...");
                    console.log(uploadErr);
                }
            } else {
                // No files
                succesNotify("Item saved successfully");
            }
            resetAll();
            fetchIemMasterDetail();
        } catch (error) {
            console.log({
                error
            });
            errorNotify("Error in Inserting Data");
        } finally {
            setLoading(false);
        }

    }, [formData, ingredients, resetAll, id, fetchIemMasterDetail, rates]);


    return (
        <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 1, boxShadow: "md", borderRadius: 5 }}>
            <DietTextComponent
                size={20}
                weight={800}
                value={'Food Information'}
            />
            {/* FOOD NAME */}
            <FoodNameSection
                formData={formData}
                setFormData={setFormData}
            />
            {/* DESCRIPTION */}
            <Field label="Description">
                <textarea
                    name="description"
                    rows={3}
                    value={formData.description?.toUpperCase()}
                    onChange={handleChange}
                    style={{ ...inputStyle, resize: "none", padding: 10 }}
                />
            </Field>

            {/* INGREDIENTS */}
            <Box>

                <DietTextComponent
                    size={20}
                    weight={600}
                    value={' Ingredient Detail'}
                />

                <IngredientSection
                    setIngredients={setIngredients}
                    ingredients={ingredients}
                />
            </Box>

            <DietTextComponent
                size={20}
                weight={600}
                value={'Hospital Rate Detail'}
            />

            <Box
                sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <RoomPriceList
                    prices={rates}
                    setPrices={setRates}
                />
            </Box>

            {/* <FoodSpecialitySection
                selectedDiets={selectedDiets}
                setSelectedDiets={setSelectedDiets}
            /> */}

            <ImageUpload handleUpload={handleUpload} />

            {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Tooltip title="Get Nutritional Detail" placement="top" variant="solid">
                    <Box component="span" sx={{ display: 'inline-flex', cursor: 'pointer' }}>
                        <TbWorldSearch
                            size={22}
                            onClick={searchFood}
                        />
                    </Box>
                </Tooltip>
            </Box> */}


            <DietButton
                disabled={loading}
                width={150}
                onClick={handleSubmit}
                name={'Add Item'}
                icon={LocalDiningRoundedIcon}
            />
            {/* <AddFoodButton onClick={handleSubmit} /> */}
        </Box>
    );
};

export default FoodForm;
