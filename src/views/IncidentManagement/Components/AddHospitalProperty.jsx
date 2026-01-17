import React, { useState, useCallback } from 'react';
import {
    Box,
    Input,
    Select,
    Option,
    Tooltip,
    Typography,
    RadioGroup,
    Radio,
    FormLabel,
    Card,
} from '@mui/joy';
import { FaTools } from 'react-icons/fa';
import { MdMonitor, MdOutlinePrecisionManufacturing } from 'react-icons/md';
import { IoLocationOutline, IoArrowBackCircleOutline } from "react-icons/io5";
import { BiDetail } from 'react-icons/bi';
import CardHeader from './CardHeader';
import PatientFilter from './PatientFilter';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNotify } from 'src/views/Common/CommonCode';
import { useQuery } from '@tanstack/react-query';
import { getCustodianDept } from 'src/api/AssetApis';
import AddIcon from '@mui/icons-material/Add';
import DeleteSweepTwoToneIcon from '@mui/icons-material/DeleteSweepTwoTone';
import DriveFileRenameOutlineTwoToneIcon from '@mui/icons-material/DriveFileRenameOutlineTwoTone';
import ActionButton from '../ButtonComponent/ActionButton';


const AddHospitalProperty = ({ formData, setFormData, setPropertyDetail, goBack, hpdetail,
    // isEdit
}) => {
    const cleanedPropertyDetail = hpdetail?.filter(
        obj => !(Object.keys(obj).length === 1 && (obj.item_isAsset === true || obj.item_isAsset === null || obj.item_isAsset === false))
    ) || [];

    const [errors, setErrors] = useState({});
    const [isAsset, setIsAsset] = useState(null);
    const [assetid, setAssetId] = useState("");
    const [custodian, setCustodian] = useState("");
    const [editIndex, setEditIndex] = useState(null);

    const { item_isAsset } = formData;

    const { data: custodianArray = [] } = useQuery({
        queryKey: ['getCustdepInci'],
        queryFn: getCustodianDept,
        onSuccess: (data) => {
            if (data?.length > 0) {
                setCustodian(`${data[0]?.am_custdn_asset_no_first}/${data[0]?.am_custdn_asset_no_second}`);
            }
        }
    });

    const handleSelectChange = (field) => (e, newValue) => {
        setFormData((prev) => ({ ...prev, [field]: newValue }));
        setErrors((prev) => ({ ...prev, [field]: null }));
    };

    const HandleAssetSearch = useCallback(async () => {
        try {
            const result = await axioslogin.post('/incidentMaster/getassetdtl', {
                item_asset_no: custodian,
                item_asset_no_only: assetid
            });
            const { data, success } = result.data;
            if (success && data?.length > 0) {
                setErrors({});
                const asset = data[0];
                setFormData(prev => ({
                    ...prev,
                    item_slno: asset?.am_item_map_slno || '',
                    item_name: asset?.item_name || '',
                    deptname: asset?.deptname || '',
                    am_manufacture_no: asset?.am_manufacture_no || 'No Detail',
                    location: asset?.secname || '',
                    item_custodian_dept: asset?.am_custodian_name || asset?.am_custodian_slno || '',
                    item_isAsset: isAsset,
                    item_custodian_dept_slno: asset?.item_custodian_dept
                }));
            }
        } catch (error) {
            warningNotify(error);
        }
    }, [assetid, custodian, isAsset, setFormData]);

    const handleChange = useCallback((field) => (e) => {
        const value = e.target.value;
        setFormData(prev => ({ ...prev, [field]: value }));
        setErrors(prev => {
            if (!prev[field]) return prev;
            const updated = { ...prev };
            delete updated[field];
            return updated;
        });
    }, []);

    const validateForm = useCallback((data, isAsset) => {
        const errors = {};
        if (isAsset !== null) {
            if (!data?.am_custodian_slno && isAsset === false) {
                errors.am_custodian_slno = 'Select a department';
            }
            if (!data?.item_name?.trim()) errors.item_name = 'Item type is required';
            if (!data?.deptname?.trim()) errors.deptname = 'Department is required';
            if (!data?.am_manufacture_no?.trim()) errors.am_manufacture_no = 'Enter the Manufacture Number';
            if (!data?.location?.trim()) errors.location = 'Asset location is required';
        }
        return errors;
    }, []);

    const handleFormSubmit = useCallback(() => {
        if (hpdetail.length === 0) {
            warningNotify("Add at least one asset before saving.");
            return;
        }
        goBack(true);
    }, [hpdetail, goBack]);

    const handleAddAssetDetail = useCallback(() => {
        const errors = validateForm(formData, isAsset);
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
        setPropertyDetail(prev => [...prev, { ...formData, item_isAsset: isAsset }]);
        setFormData({ item_isAsset: isAsset });
        setAssetId("");
    }, [formData, isAsset, setFormData, setPropertyDetail]);

    const handleRemoveAssetItem = useCallback((inx) => {
        setPropertyDetail(prev => prev?.filter((_, index) => index !== inx));
    }, [setPropertyDetail]);

    const handleEditClick = (property, index) => {
        setEditIndex(index);
        setFormData(property);
    };

    const handleSave = () => {
        const errors = validateForm(formData, isAsset);
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
        setPropertyDetail(prev => {
            const updated = [...prev];
            updated[editIndex] = { ...formData, item_isAsset: isAsset };
            return updated;
        });
        setEditIndex(null);
        setFormData({});
    };

    const fields = [
        ...((item_isAsset === false || item_isAsset === undefined) && !isAsset
            ? [{
                label: 'Custodian Department',
                icon: <MdMonitor size={16} />,
                field: 'am_custodian_slno',
                type: 'select',
                options: custodianArray?.map(opt => ({
                    value: `${opt.am_custodian_slno}`,
                    label: `${opt.am_custodian_name}`
                })),
            }]
            : []
        ),
        { label: 'Item Name', icon: <FaTools size={16} />, field: 'item_name', type: 'input' },
        { label: 'Department', icon: <BiDetail size={16} />, field: 'deptname', type: 'input' },
        { label: 'Manufacture Serial No', icon: <MdOutlinePrecisionManufacturing size={16} />, field: 'am_manufacture_no', type: 'input' },
        { label: 'Location', icon: <IoLocationOutline size={18} />, field: 'location', type: 'input' },
    ];

    return (
        <Box display="flex" flexDirection="column" gap={2} sx={{ mt: 1, border: '1.5px solid #d8dde2ff', p: 2, borderRadius: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <CardHeader icon={MdMonitor} text="Add Property Details" size={26} />
                {hpdetail?.length > 0 && (
                    <Tooltip title="Go Back">
                        <span>
                            <IoArrowBackCircleOutline
                                size={23}
                                style={{ cursor: 'pointer' }}
                                onClick={() => goBack(true)}
                            />
                        </span>
                    </Tooltip>
                )}
            </Box>

            <Box>
                <FormLabel>Is this an Asset?</FormLabel>
                <RadioGroup
                    value={item_isAsset === true ? "yes" : item_isAsset === false ? "no" : isAsset === null ? "" : isAsset ? "yes" : "no"}
                    onChange={(e) => {
                        const newValue = e.target.value === 'yes';
                        setIsAsset(newValue);
                        setFormData({});
                        setErrors({});
                    }} sx={{ mt: 1 }}>
                    <Radio value="yes" label="Yes" />
                    <Radio value="no" label="No" />
                </RadioGroup>
            </Box>

            {(isAsset === true || item_isAsset === true) && (
                <Box display="flex" flexDirection="column" gap={0.5}>
                    <Typography level="body-sm" sx={{ fontWeight: 500, color: '#1e40af' }}>
                        Enter Asset Number
                    </Typography>
                    <PatientFilter
                        CustDepartment={custodianArray}
                        isStartExist={true}
                        onChange={setAssetId}
                        onClick={HandleAssetSearch}
                        value={assetid}
                        placeholder={"000000"}
                        setCustodian={setCustodian}
                        custodian={custodian}
                    />
                </Box>
            )}

            {fields.map(({ label, icon, field, type, options }) => (
                <Box key={field} display="flex" flexDirection="column" gap={0.5}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Tooltip title={label}><span>{icon}</span></Tooltip>
                        {type === 'select' ? (
                            <Select
                                value={formData[field] || ''}
                                onChange={handleSelectChange(field)}
                                placeholder={`Select ${label}`}
                                sx={{ flex: 1, fontSize: 14, boxShadow: 'none' }}
                                error={errors[field] ? true : undefined}
                            >
                                {options.map(opt => (
                                    <Option key={opt.value} value={opt.value}>{opt.label}</Option>
                                ))}
                            </Select>
                        ) : (
                            <Input
                                placeholder={`Enter ${label}`}
                                value={formData[field] || ''}
                                onChange={handleChange(field)}
                                error={errors[field] ? true : undefined}
                                sx={{ flex: 1, fontSize: 14, px: 1, boxShadow: 'none' }}
                            />
                        )}
                    </Box>
                    {errors[field] && (
                        <Typography level="body-xs" color="danger">
                            {errors[field]}
                        </Typography>
                    )}
                </Box>
            ))}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {editIndex !== null ? (
                    <ActionButton onClick={handleSave} text="Save Edit" />
                ) : (
                    <ActionButton
                        onClick={handleAddAssetDetail}
                        icon={<AddIcon sx={{ color: 'white', fontSize: 18 }} />}
                        tooltip="Add Asset Detail"
                    />
                )}
            </Box>

            <Box sx={{ mt: 2 }}>
                {hpdetail?.length > 0 && (
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography level="title-md">Asset Details Preview</Typography>
                            <ActionButton onClick={handleFormSubmit} text="Save" />
                        </Box>
                        {cleanedPropertyDetail?.map((detail, index) => (
                            <Card key={index} variant="outlined" sx={{ mt: 1, position: 'relative' }}>
                                <Box sx={{ position: 'absolute', right: 10, display: 'flex', gap: 1 }}>
                                    <Tooltip title="Edit Data">
                                        <DriveFileRenameOutlineTwoToneIcon
                                            onClick={() => handleEditClick(detail, index)}
                                            sx={{ color: 'var(--royal-purple-300)', cursor: 'pointer' }}
                                        />
                                    </Tooltip>
                                    <Tooltip title="Delete Detail">
                                        <DeleteSweepTwoToneIcon
                                            onClick={() => handleRemoveAssetItem(index)}
                                            sx={{ color: 'var(--royal-purple-300)', cursor: 'pointer' }}
                                        />
                                    </Tooltip>
                                </Box>
                                <Typography level="body-sm" sx={{ fontSize: 13 }}>
                                    <b>Asset Name:</b> {detail?.item_name || "N/A"}
                                </Typography>
                                <Typography level="body-sm" sx={{ fontSize: 13 }}>
                                    <b>Department Name:</b> {detail?.deptname || "N/A"}
                                </Typography>
                                <Typography level="body-sm" sx={{ fontSize: 13 }}>
                                    <b>Manufactural Slno:</b> {detail?.am_manufacture_no || "N/A"}
                                </Typography>
                                <Typography level="body-sm" sx={{ fontSize: 13 }}>
                                    <b>Location:</b> {detail?.location || "N/A"}
                                </Typography>
                                <Typography level="body-sm" sx={{ fontSize: 13 }}>
                                    <b>Is Asset:</b> {detail?.item_isAsset ? "Yes" : "No"}
                                </Typography>
                            </Card>
                        ))}
                    </>
                )}
            </Box>
        </Box>
    );
};

export default AddHospitalProperty;
