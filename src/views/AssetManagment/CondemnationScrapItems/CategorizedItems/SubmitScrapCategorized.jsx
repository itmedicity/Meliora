import { Box, Button, Input, Modal, ModalDialog, Table } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import TextComponent from 'src/views/Components/TextComponent'
import CancelIcon from '@mui/icons-material/Cancel';
import QuantityUnitSelect from '../../CondemnationSelectCode/QuantityUnitSelect';
import SupplierSelectcondemn from '../../CondemnationSelectCode/SupplierSelectcondemn';
import { axioslogin } from 'src/views/Axios/Axios';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import ScrapLocation from '../../CondemnationSelectCode/ScrapLocation';
import { errorNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { taskColor } from 'src/color/Color';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ContactNumberInput from 'src/views/Components/ContactNumberInput';

const SubmitScrapCategorized = ({ submitModalOpen, setSubmitModalFlag, setSubmitModalOpen, selectedCategories, setSelectedCategories, setSelectedItems }) => {


    const queryClient = useQueryClient()
    const [supplierName, setsupplierName] = useState('')
    const [quantityName, setquantityName] = useState('')
    const [supplier, setSupplier] = useState(0)
    const [expandedGroups, setExpandedGroups] = useState({});
    const [groupedItems, setGroupedItems] = useState([]);
    const [scrapLocation, setScrapLocation] = useState([]);

    const [formData, setFormData] = useState({
        scrap_condemn_Form_no: '',
        recipient_name: '',
        contact_no: '',
        vehicle_no: '',
        total_rate: ''
    });

    const { recipient_name, contact_no, vehicle_no, total_rate } = formData

    const handleInputChange = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
    }, [formData])

    // const handleInputChange = useCallback((e) => {
    //     let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    //     const { name } = e.target;
    //     if (name === "contact_no") {
    //         value = value.replace(/\D/g, ""); // keep only digits
    //     }
    //     setFormData((prev) => ({
    //         ...prev,
    //         [name]: value,
    //     }));
    // }, []);


    const handleGroupInputChange = (groupIdx, field, value) => {
        setGroupedItems(prev => {
            const updated = [...prev];
            const group = { ...updated[groupIdx] };

            group[field] = value;

            // Auto-calc Scrap Rate when Total Unit changes
            if (field === 'unitPerCategoryQuality') {
                const unitRate = parseFloat(group.rate) || 0; // your unit rate
                const qty = parseFloat(value) || 0;

                group.RatePerCategoryQuality = (unitRate * qty).toFixed(2); // auto calc
            }

            updated[groupIdx] = group;
            return updated;
        });
    };


    const ClosesubmitModal = useCallback(() => {
        setSubmitModalFlag(0)
        setSubmitModalOpen(false)
        setSelectedCategories([])
        setSelectedItems([])
    }, [])

    const handleToggleExpand = (groupKey) => {
        setExpandedGroups(prev => ({
            ...prev,
            [groupKey]: !prev[groupKey]
        }));
    };

    const fetchCategorizedItems = async (selectedCategories, supplier) => {
        // Step 1: Fetch categorized items and added items in parallel
        const itemRequests = selectedCategories.map(({ scrap_quality, scrap_category }) => {
            const postData = { scrap_quality, scrap_category };
            return Promise.all([
                axioslogin.post('/AssetCondemnation/ViewCategorizedItems', postData),
                axioslogin.post('/AssetCondemnation/ViewCategorizedAddedItems', postData)
            ]);
        });

        const itemResponses = await Promise.all(itemRequests);

        // Step 2: Fetch supplier rates (if supplier is selected)
        const rateMap = {};

        if (supplier !== 0) {
            const postDataWithSupplierArray = selectedCategories.map(({ scrap_quality, scrap_category }) => ({
                scrap_quality,
                scrap_category,
                supplier
            }));

            const resRate = await axioslogin.post(
                '/AssetCondemnation/getSelectedSupplierRateDetails',
                postDataWithSupplierArray
            );

            if (resRate.data?.success === 2) {
                // Build a rateMap keyed by category-quality to store both price and unit
                resRate.data.data.forEach(({ category_slno, quality_slno, price, condem_quantity_name, quantity_unit_slno }) => {
                    const key = `${category_slno}-${quality_slno}`;
                    rateMap[key] = {
                        price: Number(price),
                        unit: condem_quantity_name ?? '',
                        unitQuantitySlNo: quantity_unit_slno ?? ''
                    };
                });
            }
        }

        // Step 3: Merge item results with rate info
        const combinedGroups = itemResponses.map(([res1, res2], idx) => {
            const { scrap_quality, scrap_category } = selectedCategories[idx];
            const data1 = res1.data?.success === 2 ? res1.data.data : [];
            const data2 = res2.data?.success === 2 ? res2.data.data : [];

            const key = `${scrap_category}-${scrap_quality}`;
            const rateInfo = rateMap[key] || { price: 0, unit: '' };

            const allItems = [...data1, ...data2].map(item => ({
                ...item,
                price: rateInfo.price,
                condem_quantity_name: rateInfo.unit,
                quantity_unit_slno: rateInfo.unitQuantitySlNo,
                scrap_category,
                scrap_quality

            }));

            return allItems;
        });

        const flatData = combinedGroups.flat();

        // Step 4: Group the merged data by category and quality name for UI display
        const grouped = flatData.reduce((acc, item) => {
            const category = item.category_name || 'Unknown';
            const quality = item.quality_name || '';
            const key = `${category} ${quality}`.trim();

            if (!acc[key]) acc[key] = [];
            acc[key].push(item);
            return acc;
        }, {});

        // Step 5: Format final groups
        const formattedGroups = Object.entries(grouped).map(([fullLabel, items]) => ({

            fullLabel,
            items,
            rate: items[0]?.price || 0,
            unitquantity: items[0]?.condem_quantity_name || '',
            unitQuantitySlno: items[0]?.quantity_unit_slno || '',
            unitPerCategoryQuality: '',
            RatePerCategoryQuality: null
        }));
        return formattedGroups;
    };




    const SubmitData = useMemo(() => {
        const rateDetails = groupedItems?.map(group => ({
            category_slno: group.items[0]?.scrap_category,
            quality_slno: group.items[0]?.scrap_quality,
            units: group.unitPerCategoryQuality || 0,
            quantity_slno: group.unitQuantitySlno || null,
            scrap_rate: group.RatePerCategoryQuality || 0
        }));

        const updateItems = groupedItems?.flatMap(group =>
            group.items.map(item => ({
                isAddedItem: !!item.item_slno,
                slno: item.item_slno || item.am_condem_detail_slno
            }))
        );

        return {
            scrap_condemn_Form_no: 'SCRAP',
            scrap_yard: scrapLocation,
            supplier_slno: supplier,
            recipient_name,
            contact_no,
            vehicle_no,
            total_rate,
            rateDetails,
            updateItems
        };
    }, [
        scrapLocation,
        supplier,
        recipient_name,
        contact_no,
        vehicle_no,
        total_rate,
        groupedItems
    ]);




    const submitForm = useCallback(async (e) => {
        e.preventDefault();
        try {
            const result = await axioslogin.post('/AssetCondemnation/submitScrapForm', SubmitData);
            const { success, message } = result.data;
            if (success === 1) {
                succesNotify(message)
                queryClient.invalidateQueries('getcondemdAssetCategoryWise')
                ClosesubmitModal();
            } else {
                warningNotify(message)
            }
        } catch (err) {
            errorNotify(err)
        }
    }, [SubmitData, ClosesubmitModal, queryClient])



    const { data: formattedGroups = [], } = useQuery({
        queryKey: ['getCategorizedItems', selectedCategories, supplier],
        queryFn: () => fetchCategorizedItems(selectedCategories, supplier),
    });



    useEffect(() => {
        setGroupedItems(formattedGroups);
    }, [formattedGroups]);


    const handleDeleteItem = (groupIndex, itemIndex) => {
        setGroupedItems(prev => {
            const updated = [...prev];
            updated[groupIndex] = {
                ...updated[groupIndex],
                items: updated[groupIndex].items.filter((_, i) => i !== itemIndex)
            };
            return updated;
        });
    };

    useEffect(() => {
        const sum = groupedItems.reduce((acc, group) => {
            const rate = parseFloat(group.RatePerCategoryQuality) || 0;
            return acc + rate;
        }, 0);

        setFormData(prev => ({
            ...prev,
            total_rate: sum.toFixed(2)
        }));
    }, [groupedItems]);


    return (
        <Box>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={submitModalOpen}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, borderRadius: 10 }}>
                <ModalDialog variant="outlined" sx={{ width: '80vw', p: 0, overflow: 'auto', }}>
                    <Box sx={{ flex: 1, display: 'flex', ml: 1, }}>
                        <Box sx={{ flex: 1 }}>
                            <TextComponent
                                text={"Submit Scrap Materials"}
                                sx={{ fontWeight: 600, color: taskColor.darkPurple, pl: .8, pt: 1, fontSize: 18 }}
                            />
                        </Box>
                        <Box sx={{ pr: 1, pt: 1, }}>
                            <CancelIcon sx={{ width: 30, height: 30, color: taskColor.darkPurple, cursor: 'pointer' }} onClick={ClosesubmitModal} />
                        </Box>
                    </Box>
                    <Box sx={{ border: .1, borderColor: taskColor.lightgrey, m: 1, height: '90vh', overflow: 'auto' }}>
                        <Box sx={{
                            mx: 1, my: 1
                        }}>
                            <Box sx={{ display: 'flex', p: .5 }}>
                                <LocationOnIcon sx={{ p: .1, color: taskColor.darkPurple, }} />
                                <TextComponent
                                    text={"Scrap Location"}
                                    sx={{ fontWeight: 600, color: taskColor.darkPurple, fontSize: 15 }}
                                />
                            </Box>
                            <Box sx={{ pl: 1, pb: 1 }}>
                                <TextComponent
                                    text={"Select Scrap Location"}
                                    sx={{ fontWeight: 600, pl: .8, fontSize: 13 }}
                                />
                                <ScrapLocation value={scrapLocation} setValue={setScrapLocation} />
                            </Box>
                        </Box>
                        <Box sx={{
                            mx: 1.5,
                        }}>
                            <Box sx={{ display: 'flex', p: .5 }}>
                                <LocalShippingIcon sx={{ p: .1, color: taskColor.darkPurple, }} />
                                <TextComponent
                                    text={"Vendor Details"}
                                    sx={{ fontWeight: 600, color: taskColor.darkPurple, fontSize: 15 }}
                                />
                            </Box>
                            <Box sx={{ flex: 1, px: .5 }}>
                                <TextComponent
                                    text={"Select Supplier"}
                                    sx={{ fontWeight: 600, pl: .8, fontSize: 13 }}
                                />
                                <SupplierSelectcondemn value={supplier} setValue={setSupplier} setsupplierName={setsupplierName} supplierName={supplierName} />
                            </Box>
                            <Box sx={{ flex: 1, display: 'flex', mx: .5, my: .5, gap: 1 }}>

                                <Box sx={{ flex: 1, }}>
                                    <TextComponent
                                        text={"Recipient Name"}
                                        sx={{ fontWeight: 600, pl: .8, fontSize: 13 }}
                                    />

                                    <Input
                                        type="text"
                                        name="recipient_name"
                                        autoComplete='off'
                                        value={recipient_name}
                                        onChange={(e) =>
                                            handleInputChange({
                                                target: {
                                                    name: e.target.name,
                                                    value: e.target.value.toUpperCase(),
                                                },
                                            })
                                        }
                                    />
                                </Box>
                                <Box sx={{ width: 250 }}>
                                    <TextComponent
                                        text={"Contact No."}
                                        sx={{ fontWeight: 600, pl: .8, fontSize: 13 }}
                                    />
                                    {/* <Input
                                        type='number'
                                        name="contact_no"
                                        value={contact_no}
                                        onChange={handleInputChange}
                                    /> */}
                                    <ContactNumberInput
                                        value={contact_no}
                                        onChange={handleInputChange}
                                    />

                                </Box>
                                <Box sx={{ width: 250 }}>
                                    <TextComponent
                                        text={"Vehiclie No."}
                                        sx={{ fontWeight: 600, pl: .8, fontSize: 13 }}
                                    />
                                    <Input
                                        type='text'
                                        name="vehicle_no"
                                        value={vehicle_no}
                                        onChange={handleInputChange}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{
                            // border: .1, borderColor: taskColor.lightgrey,
                            mx: 1.5, my: 1
                        }}>
                            <Box sx={{ display: 'flex', p: .5 }}>
                                <LocalOfferIcon sx={{ p: .1, color: taskColor.darkPurple, }} />
                                <TextComponent
                                    text={"Item List & Rate Details"}
                                    sx={{ fontWeight: 600, color: taskColor.darkPurple, fontSize: 15 }}
                                />
                            </Box>
                            {groupedItems?.map((group, groupIdx) => (
                                <Box key={groupIdx} sx={{ m: 0.8, border: 1, borderColor: taskColor.purple, p: 1 }}>
                                    <Box sx={{
                                        flex: 1,
                                        p: 0.5,
                                        borderColor: '#dddee0',
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }}>
                                        <TextComponent
                                            text={group.fullLabel}
                                            sx={{ fontWeight: 600, px: 0.8, py: .5, fontSize: 15, bgcolor: taskColor.lightpurple, color: '#2F5061' }}
                                        />

                                        <Input
                                            sx={{ width: 230 }}
                                            size="sm"
                                            type="text"
                                            startDecorator={"Unit Rate :"}
                                            endDecorator={`Rs/${group.unitquantity}`}
                                            name={`rate-${groupIdx}`}
                                            value={group.rate ? Number(group.rate).toFixed(2) : "0.00"}
                                            color="warning"
                                            variant="outlined"
                                            readOnly
                                        />

                                    </Box>

                                    <Table
                                        borderAxis='both'
                                        stickyHeader
                                        size="sm"
                                        sx={{ minWidth: 500 }}
                                    >
                                        <thead>
                                            <tr>
                                                <th style={{ width: 50, textAlign: 'center' }}></th>
                                                <th>Item Name</th>
                                                <th>Scrap Yard</th>
                                                <th style={{ width: 100, textAlign: 'center' }}>Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {group.items.length === 0 ? (
                                                <tr>
                                                    <td colSpan={3} style={{ textAlign: 'center' }}>No items</td>
                                                </tr>
                                            ) : (
                                                (expandedGroups[group.fullLabel] ? group.items : group.items.slice(0, 5)).map((item, itemIdx) => (
                                                    <tr key={itemIdx}>
                                                        <td style={{ textAlign: 'center' }}>{itemIdx + 1}</td>
                                                        <td>{item.asset_item_name || item.spare_item_name || item.item_name}</td>
                                                        <td>{item.yard_name}</td>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <DeleteOutlineIcon sx={{ cursor: 'pointer' }} color='warning+' onClick={() => handleDeleteItem(groupIdx, itemIdx)} />
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </Table>
                                    {group.items.length > 5 && (
                                        <Box sx={{ textAlign: 'right', mt: 0.5, fontSize: 14, fontWeight: 600, cursor: 'pointer' }} >
                                            <Button
                                                size="sm"
                                                variant="outlined"
                                                onClick={() => handleToggleExpand(group.fullLabel)}
                                            >
                                                {expandedGroups[group.fullLabel] ? 'Show Less' : 'Show More'}<UnfoldMoreIcon sx={{ p: .1 }} />
                                            </Button>
                                        </Box>
                                    )}
                                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', mt: 1, gap: 0.5 }}>
                                        <Input
                                            autoComplete='off'
                                            size='sm'
                                            type='text'
                                            name='unitPerCategoryQuality'
                                            sx={{ width: 100 }}
                                            placeholder='Total Unit'
                                            value={group.unitPerCategoryQuality}
                                            onChange={(e) => handleGroupInputChange(groupIdx, 'unitPerCategoryQuality', e.target.value)}
                                        />
                                        <QuantityUnitSelect
                                            value={group.unitQuantitySlno}
                                            setValue={(val) => handleGroupInputChange(groupIdx, 'QuantityPerCategoryQuality', val)}
                                            setquantityName={setquantityName}
                                            quantityName={quantityName}
                                        />
                                        <Input
                                            size='sm'
                                            type='text'
                                            name='RatePerCategoryQuality'
                                            sx={{ width: 200 }}
                                            placeholder='Scrap Rate'
                                            endDecorator={`Rs.`}
                                            value={group.RatePerCategoryQuality}
                                            onChange={(e) => handleGroupInputChange(groupIdx, 'RatePerCategoryQuality', e.target.value)}
                                        />
                                    </Box>
                                </Box>
                            ))}
                            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', my: 2, mr: 1 }}>
                                <Input
                                    name='total_rate'
                                    value={total_rate}
                                    type='number'
                                    onChange={handleInputChange}
                                    startDecorator={
                                        <Box sx={{ fontWeight: 'bold', color: '#6a1b9a' }}>Total Rate :</Box>
                                    }
                                    sx={{
                                        width: 300,
                                        fontSize: 14,
                                        fontWeight: 700,
                                        color: taskColor.darkPurple,
                                        border: `1.5px solid ${'#6a1b9a'}`,
                                        px: 1.5,
                                        py: .5,
                                        letterSpacing: "0.6px",
                                        transition: "0.3s ease",
                                        "& input": {
                                            textAlign: "right",
                                            fontWeight: 700,
                                            fontSize: "1rem",
                                            color: taskColor.darkPurple,
                                        }
                                    }}
                                    endDecorator={
                                        <Box sx={{ fontWeight: 'bold', color: '#6a1b9a', fontSize: "0.9rem" }}>
                                            Rs
                                        </Box>
                                    }
                                    autoComplete="off"
                                />
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', mx: 1, gap: .5, pb: 2 }}>
                        <Button
                            sx={{ fontSize: 15 }}
                            variant='plain'
                            style={{ color: taskColor.darkPurple }}
                            onClick={submitForm}>
                            Submit
                        </Button>
                        <Button
                            sx={{ fontSize: 15 }}
                            variant='plain'
                            style={{ color: taskColor.darkPurple }}
                            onClick={ClosesubmitModal}>
                            Cancel
                        </Button>
                    </Box>
                </ModalDialog>
            </Modal>
        </Box >
    )
}

export default memo(SubmitScrapCategorized)