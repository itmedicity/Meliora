import React, { memo, useCallback, useState } from "react";
import {
    Box,
    Checkbox,
    // Tooltip
} from "@mui/joy";
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
import { useAllItemType, useAllOrderPartyType, UseIemFullDetail } from "src/views/Diet/CommonData/UseQuery";
import { transformRates } from "src/views/Diet/CommonData/CommonFun";
import { handleImageUpload } from "src/views/IncidentManagement/CommonComponent/CommonFun";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "src/NotFound/ErrorFallback";

const FoodForm = ({
    setImage,
    formData,
    setFormData,
    image
}) => {


    const id = useSelector(state => state.LoginUserData.empid)
    const { refetch: fetchIemMasterDetail } = UseIemFullDetail();

    const [ingredients, setIngredients] = useState([]);
    const [rates, setRates] = useState({});
    const [loading, setLoading] = useState(false);

    const {
        data: allItemType = []
    } = useAllItemType();

    const {
        data: allPartyType = [],
    } = useAllOrderPartyType();

    const totalPartyTypes = allPartyType?.length || 0;

    const selectedItemType = allItemType?.find(
        item => item?.item_type_id === formData?.item_type_id
    );

    const isFoodItem =
        selectedItemType?.item_type_name?.toLowerCase() === "food";


    const resetAll = useCallback(() => {
        setIngredients([])
        setRates({})
        setImage([])
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
    }, [setIngredients, setRates, setFormData, setImage]);

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
        setFormData(prev => ({
            ...prev,
            image: [
                ...(prev.image || []),
                ...files
            ]
        }));
        const previewImages = files.map(file => ({
            name: file.name,
            url: URL.createObjectURL(file),
            file,
            isNew: true
        }));


        setImage(prev => {
            return [
                ...(Array.isArray(prev) ? prev : []),
                ...previewImages
            ];

        });

    }, [
        setFormData,
        setImage
    ]);


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
        if (formData.description?.trim() === "") return warningNotify("Please Enter Description");
        if (itemCode.length !== 3) return warningNotify("Item code must be 3 characters");
        const uploadedFiles = image || [];
        if (uploadedFiles.length > 5) return warningNotify("Maximum 5 files allowed");

        const cleanedIngredients = ingredients.filter(
            (item) => item.ingredient_item_id && item.quantity && item.unit_id
        );

        if (isFoodItem && cleanedIngredients.length === 0) {
            return warningNotify("Please add at least one ingredient");
        };

        const transformedRates = transformRates(rates);


        // all hospitals must have entry
        if (transformedRates.length !== totalPartyTypes) {
            return warningNotify("Price is mandatory for all hospitals");
        }

        // every price must be > 0
        const hasInvalidRate = transformedRates.some(
            item => Number(item?.price) <= 0
        );

        if (hasInvalidRate) {
            return warningNotify("Price is mandatory for all hospitals");
        }

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
                is_active: formData.is_active,
                created_by: id,
                ingredients: cleanedIngredients,
                itemrate: transformedRates
            };
            const response = await axioslogin.post("/fooditemmast/insert", payload);
            const { success, message, item_id } = response.data;
            if (success !== 2) {
                return warningNotify(message);
            }
            // ---------- STEP 2 UPLOAD IMAGE ----------
            // FILE UPLOAD
            if (uploadedFiles.length > 0) {
                try {
                    const formPayload = new FormData();
                    formPayload.append("id", item_id);
                    for (const file of uploadedFiles) {
                        const actualFile = file.file || file;
                        if (actualFile?.type?.startsWith('image')) {
                            const compressedFile = await handleImageUpload(actualFile);
                            formPayload.append(
                                'files',
                                compressedFile,
                                compressedFile.name
                            );
                        } else {
                            formPayload.append(
                                'files',
                                actualFile,
                                actualFile.name
                            );
                        }
                    }
                    const uploadRes = await axioslogin.post(
                        "/fooditemmast/uploadItemFiles",
                        formPayload, { headers: { "Content-Type": "multipart/form-data" } }
                    );
                    const uploadResult = uploadRes.data;
                    if (uploadResult.success !== 1) {
                        warningNotify(`Item saved but image upload failed: ${uploadResult.message}`);
                    } else {
                        succesNotify("Item and files uploaded successfully");
                    }
                } catch (uploadErr) {
                    //  If upload API itself throws an error
                    warningNotify("File upload failed, updating file status...");
                }
            } else {
                // No files
                succesNotify("Item saved successfully");
            }
            resetAll();
            fetchIemMasterDetail();
        } catch (error) {
            errorNotify("Error in Inserting Data");
        } finally {
            setLoading(false);
        }

    }, [formData, image, ingredients, resetAll, id, fetchIemMasterDetail, rates]);



    const handleUpdate = useCallback(async () => {

        const itemName = formData.name?.trim()?.toUpperCase();
        const itemAlias = formData.itemalias?.trim()?.toUpperCase();
        const itemCode = formData.itemcode?.trim()?.toUpperCase();

        if (!formData?.item_id) {
            return warningNotify("Please select item to edit");
        }

        if (!itemName) return warningNotify("Food name is required");

        if (!formData?.item_type_id) {
            return warningNotify("Item Type is required");
        }

        if (!formData?.item_group_id) {
            return warningNotify("Item group is required");
        }

        if (!formData?.item_category_id) {
            return warningNotify("Food category is required");
        }

        if (!itemAlias) {
            return warningNotify("Item alias is required");
        }

        if (itemAlias.length !== 4) {
            return warningNotify("Item alias must be 4 characters");
        }

        if (!itemCode) {
            return warningNotify("Item code is required");
        }

        if (itemCode.length !== 3) {
            return warningNotify("Item code must be 3 characters");
        }

        if (formData.description?.trim() === "") {
            return warningNotify("Please Enter Description");
        }

        const uploadedFiles = image || [];

        if (uploadedFiles.length > 5) {
            return warningNotify("Maximum 5 files allowed");
        }

        const cleanedIngredients = ingredients.filter(
            (item) =>
                item.ingredient_item_id &&
                item.quantity &&
                item.unit_id
        );

        if (isFoodItem && cleanedIngredients.length === 0) {
            return warningNotify("Please add at least one ingredient");
        }

        const transformedRates = transformRates(rates);

        if (transformedRates.length !== totalPartyTypes) {
            return warningNotify("Price is mandatory for all hospitals");
        }

        const hasInvalidRate = transformedRates.some(
            item => Number(item?.price) <= 0
        );

        if (hasInvalidRate) {
            return warningNotify("Price is mandatory for all hospitals");
        }

        try {

            setLoading(true);

            /* ------------------------------------------ */
            /* UPDATE ITEM                               */
            /* ------------------------------------------ */

            const payload = {

                item_id: formData.item_id,
                item_name: itemName,
                description: formData.description,
                item_group_id: formData.item_group_id,
                item_category_id: formData.item_category_id,
                item_alias: itemAlias,
                item_code: itemCode,
                item_type_id: formData.item_type_id,
                created_by: id,
                is_active: formData.is_active,
                ingredients: cleanedIngredients,
                itemrate: transformedRates
            };
            const response = await axioslogin.patch(
                "/fooditemmast/update",
                payload
            );
            const { success, message } = response.data;

            if (success !== 2) {
                return warningNotify(message);
            }

            console.log({
                uploadedFiles
            });

            const newFiles = (uploadedFiles || []).filter(
                file => file?.isNew === true
            );

            console.log({
                newFiles
            });

            if (newFiles.length > 0) {
                try {
                    const formPayload = new FormData();
                    formPayload.append("id", formData.item_id);
                    for (const file of newFiles) {
                        const actualFile = file.file || file;
                        if (actualFile?.type?.startsWith("image")) {
                            const compressedFile = await handleImageUpload(actualFile);
                            formPayload.append("files", compressedFile, compressedFile.name);
                        } else {
                            formPayload.append("files", actualFile, actualFile.name);
                        }
                    }
                    const uploadRes = await axioslogin.post(
                        "/fooditemmast/uploadItemFiles",
                        formPayload,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
                        }
                    );
                    const uploadResult = uploadRes.data;
                    if (uploadResult.success !== 1) {
                        warningNotify(`Item updated but image upload failed`);
                    } else {
                        succesNotify("Item updated successfully");
                    }
                } catch (uploadErr) {
                    warningNotify("File upload failed after update");
                }
            } else {
                succesNotify("Item updated successfully");
            }
            resetAll();
            fetchIemMasterDetail();
        } catch (error) {
            errorNotify("Error in Updating Data");
        } finally {
            setLoading(false);
        }
    }, [
        formData,
        ingredients,
        rates,
        id,
        resetAll,
        fetchIemMasterDetail,
        image
    ]);

    return (
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
        >
            <Box sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                boxShadow: "md",
                borderRadius: 5
            }}>
                <DietTextComponent
                    size={20}
                    weight={800}
                    value={'Food Information'}
                />

                {/* FOOD NAME */}
                <FoodNameSection
                    formData={formData}
                    setFormData={setFormData}
                    setRates={setRates}
                    setIngredients={setIngredients}
                    setImage={setImage}
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

                {
                    isFoodItem &&
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
                }

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

                <ImageUpload handleUpload={handleUpload} />

                <Checkbox
                    label="Active"
                    checked={formData?.is_active === 1}
                    onChange={(e) =>
                        setFormData(prev => ({
                            ...prev,
                            is_active: e.target.checked ? 1 : 0
                        }))
                    }
                />

                <DietButton
                    disabled={loading}
                    width={150}
                    onClick={formData?.item_id ? handleUpdate : handleSubmit}
                    name={formData?.item_id ? 'Update Item' : 'Add Item'}
                    icon={LocalDiningRoundedIcon}
                />
                
            </Box>
        </ErrorBoundary>
    );
};

export default memo(FoodForm);
