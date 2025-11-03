import { Box, Button, Input, Modal, ModalDialog, Table } from '@mui/joy'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import TextComponent from 'src/views/Components/TextComponent'
import CancelIcon from '@mui/icons-material/Cancel';
import ScrapLocation from '../../CondemnationSelectCode/ScrapLocation';
import SupplierSelectcondemn from '../../CondemnationSelectCode/SupplierSelectcondemn';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import QuantityUnitSelect from '../../CondemnationSelectCode/QuantityUnitSelect';
import { useSelector } from 'react-redux';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { taskColor } from 'src/color/Color';
import EventIcon from '@mui/icons-material/Event';
import { format } from 'date-fns';
import ContactNumberInput from 'src/views/Components/ContactNumberInput';

const EditsubmittedScrapForm = ({ seteditForm, setEditFormOpen, scrapDetails, setView, editFormOpen }) => {

    const { scrap_yard, form_submit_date, supplier_slno, recipient_contact_number, recipient_name, recipient_vehicle_no, scrap_condemn_Form_slno, total_rate, payment_mode,
        amount_collected, gate_pass_generated_date, gate_pass_request_no, level_review } = scrapDetails

    const queryClient = useQueryClient()
    const id = useSelector((state) => state.LoginUserData.empid);

    const closeEditModal = useCallback(() => {
        setEditFormOpen(false)
        seteditForm(0)
        setView(0)
    }, [seteditForm, setEditFormOpen])

    const [scrapLocation, setscrapLocation] = useState(
        Array.isArray(scrap_yard) ? scrap_yard : JSON.parse(scrap_yard || "[]")
    );

    const [supplierName, setsupplierName] = useState('')
    const [quantityName, setquantityName] = useState('')
    const [supplier, setSupplier] = useState(supplier_slno)
    const [expandedGroups, setExpandedGroups] = useState({});
    const [groupedItems, setGroupedItems] = useState([]);
    const [deletedItems, setdeletedItems] = useState([])

    const [formData, setFormData] = useState({
        vehicle_no: recipient_vehicle_no || '',
        recipientName: recipient_name || '',
        contact_no: recipient_contact_number || '',
        totalRate: total_rate || '',
        reviewRemarks: level_review,
        reviewState: '',
        paymentMode: payment_mode || '',
        amountCollected: amount_collected || '',
        gatePassGeneratedDate: gate_pass_generated_date || '',
        gatePassRequestNo: gate_pass_request_no || ''
    })

    const { recipientName, contact_no, vehicle_no, totalRate, } = formData

    const getCategoryQualityUnderscrapForm = async () => {
        const { data } = await axioslogin.get(
            `AssetCondemnation/getCategoryQualityUnderscrapForm/${scrap_condemn_Form_slno}`
        );
        if (data.success === 1) {
            return data.data;
        } else {
            return [];
        }
    };

    const { data: getCategoryQuality } = useQuery({
        queryKey: ['CategoryQualityUnderscrapForm', scrap_condemn_Form_slno],
        queryFn: getCategoryQualityUnderscrapForm,
        enabled: !!scrap_condemn_Form_slno,
    });

    const handleInputChange = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
    }, [formData])


    const handleGroupInputChange = (groupIdx, field, value) => {
        setGroupedItems(prev => {
            const updated = [...prev];
            const group = { ...updated[groupIdx] };

            group[field] = value;

            const unitRate = parseFloat(group.rate) || 0;
            const qty = parseFloat(group.unitPerCategoryQuality) || parseFloat(value) || 0;

            // Case 1: User changes unit → recalc scrap rate
            if (field === 'unitPerCategoryQuality') {
                group.RatePerCategoryQuality = (unitRate * qty).toFixed(2);
            }

            // Case 2: User changes rate (per unit) → update scrap rate (qty stays same)
            if (field === 'rate') {
                group.RatePerCategoryQuality = (parseFloat(value) * qty).toFixed(2);
            }

            // Case 3: User changes total scrap rate manually → just override
            if (field === 'RatePerCategoryQuality') {
                group.RatePerCategoryQuality = parseFloat(value) || 0;
            }

            updated[groupIdx] = group;
            return updated;
        });
    };

    const handleToggleExpand = (groupKey) => {
        setExpandedGroups(prev => ({
            ...prev,
            [groupKey]: !prev[groupKey]
        }));
    };

    const fetchCategorizedItems = async (getCategoryQuality, supplier) => {
        // Step 1: Fetch categorized items and added items in parallel
        const itemRequests = getCategoryQuality.map(({ quality_slno, category_slno, condem_form_slno }) => {
            const postData = { quality_slno, category_slno, condem_form_slno };
            return Promise.all([
                axioslogin.post('/AssetCondemnation/ViewCategorizedItemsUnderscrapForm', postData),
                axioslogin.post('/AssetCondemnation/ViewCategorizedAddedItemsUnderscrapForm', postData),
                axioslogin.post('/AssetCondemnation/getRateDetailsForCategoryQuality', postData)

            ]);
        });

        const itemResponses = await Promise.all(itemRequests);

        const rateMap = {};

        if (supplier !== 0) {
            const postDataWithSupplierArray = getCategoryQuality.map(({ quality_slno, category_slno }) => ({
                scrap_quality: quality_slno,
                scrap_category: category_slno,
                supplier
            }));
            const resRate = await axioslogin.post(
                '/AssetCondemnation/getSelectedSupplierRateDetails',
                postDataWithSupplierArray
            );

            if (resRate.data?.success === 2) {
                // Build a rateMap keyed by category-quality to store both price and unit
                resRate.data.data.forEach(({ category_slno, quality_slno, price, condem_quantity_name }) => {
                    const key = `${category_slno}-${quality_slno}`;
                    rateMap[key] = {
                        price: Number(price),
                        unit: condem_quantity_name ?? '',
                    };
                });
            }
        }

        const combinedGroups = itemResponses.map(([res1, res2, res3], idx) => {
            const { quality_slno, category_slno } = getCategoryQuality[idx];
            const data1 = res1.data?.success === 2 ? res1.data.data : [];
            const data2 = res2.data?.success === 2 ? res2.data.data : [];

            const rateInfoFromSupplier = rateMap[`${category_slno}-${quality_slno}`] || { price: 0, unit: '' };
            const rateDetailData = res3?.data?.success === 2 && res3.data.data.length > 0
                ? res3.data.data[0]
                : null;

            const QuantityPerCategoryQuality = rateDetailData?.quantity_slno ?? null;
            const RatePerCategoryQuality = rateDetailData?.scrap_rate ?? null;
            const unitPerCategoryQuality = rateDetailData?.units ?? '';
            const RateSlno = rateDetailData?.scrap_rate_slno ?? null;




            const allItems = [...data1, ...data2].map(item => ({
                ...item,
                dbRate: RatePerCategoryQuality,
                price: rateInfoFromSupplier.price,
                condem_quantity_name: rateInfoFromSupplier.unit,
                category_slno,
                quality_slno,
                QuantityPerCategoryQuality,
                RatePerCategoryQuality,
                unitPerCategoryQuality,
                RateSlno
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
            unitPerCategoryQuality: items[0]?.unitPerCategoryQuality || '',
            QuantityPerCategoryQuality: items[0]?.QuantityPerCategoryQuality ?? null,
            RatePerCategoryQuality: items[0]?.RatePerCategoryQuality ?? null,
            RateSlno: items[0]?.RateSlno ?? null,

        }));
        return formattedGroups;
    };



    const { data: formattedGroups = [] } = useQuery({
        queryKey: ['getCategorizedItems', getCategoryQuality, supplier],
        queryFn: () => fetchCategorizedItems(getCategoryQuality, supplier),
        enabled: !!getCategoryQuality
    });



    const handleDeleteItem = (groupIndex, itemIndex) => {
        setGroupedItems(prev => {
            const updated = [...prev];
            updated[groupIndex] = {
                ...updated[groupIndex],
                items: updated[groupIndex].items.filter((_, i) => i !== itemIndex)
            };
            const deletedItem = updated[groupIndex].items[itemIndex];
            setdeletedItems(prevDeleted => [...prevDeleted, deletedItem]);
            return updated;
        });
    };
    useEffect(() => {
        if (formattedGroups.length > 0) {
            setGroupedItems(prev => {


                return formattedGroups.map((newGroup, idx) => {
                    const oldGroup = prev[idx] || {};
                    const unitQty = parseFloat(oldGroup.unitPerCategoryQuality) || 0;

                    if (!supplier || supplier === 0) {
                        return {
                            ...newGroup,
                            unitPerCategoryQuality: unitQty || newGroup.unitPerCategoryQuality || 0,
                            RatePerCategoryQuality: newGroup.RatePerCategoryQuality,
                        };
                    }

                    const newRate = parseFloat(newGroup.rate) || 0;
                    return {
                        ...newGroup,
                        unitPerCategoryQuality: unitQty || newGroup.unitPerCategoryQuality || 0,
                        RatePerCategoryQuality: (newRate * (unitQty || 0)).toFixed(2),
                    };
                });
            });

        }


    }, [supplier, formattedGroups]);


    const editData = useMemo(() => {

        const rateDetails = groupedItems.map(group => ({
            scrap_rate_slno: group.RateSlno,
            category_slno: group.items[0]?.scrap_category,
            quality_slno: group.items[0]?.scrap_quality,
            units: group.unitPerCategoryQuality || 0,
            quantity_slno: group.QuantityPerCategoryQuality || null,
            scrap_rate: group.RatePerCategoryQuality || 0
        }));



        const deletedItemsData = deletedItems.map(item => ({
            item_slno: item.item_slno,
            am_condem_detail_slno: item.am_condem_detail_slno,
        }));

        return {
            scrap_condemn_Form_slno: scrap_condemn_Form_slno,
            scrap_condemn_Form_no: 'SCRAP',
            scrap_yard: scrapLocation,
            supplier_slno: supplier,
            recipient_name: recipientName,
            recipient_contact_number: contact_no,
            recipient_vehicle_no: vehicle_no,
            total_rate: totalRate,
            rateDetails,
            deletedItemsData,
            edit_user: id
        };
    }, [
        scrapLocation,
        supplier,
        recipientName,
        contact_no,
        vehicle_no,
        totalRate,
        groupedItems,
        deletedItems,
        scrap_condemn_Form_slno,
        id
    ]);

    const editForm = useCallback(async (e) => {
        e.preventDefault();
        try {
            const result = await axioslogin.patch('/AssetCondemnation/EditScrapForm', editData);
            const { success, message } = result.data;
            if (success === 1) {
                succesNotify(message)
                queryClient.invalidateQueries('getAllsubmittedScraps')
                closeEditModal();
            } else {
                warningNotify(message)
            }
        } catch (err) {
            errorNotify(err)
        }
    }, [editData, closeEditModal])

    useEffect(() => {
        if (groupedItems.length > 0) {
            const sum = groupedItems.reduce((acc, group) => {
                const rate = parseFloat(group.RatePerCategoryQuality) || 0;
                return acc + rate;
            }, 0);

            setFormData(prev => ({
                ...prev,
                totalRate: sum > 0 ? sum.toFixed(2) : (total_rate || prev.totalRate)
            }));

        } else {
            setFormData(prev => ({
                ...prev,
                totalRate: total_rate || prev.totalRate
            }));
        }
    }, [groupedItems, total_rate]);




    return (
        <Box>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={editFormOpen}
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
                            <CancelIcon sx={{ width: 30, height: 30, color: taskColor.darkPurple, cursor: 'pointer' }} onClick={closeEditModal} />
                        </Box>
                    </Box>
                    <Box sx={{ border: .1, borderColor: taskColor.lightgrey, m: 1, height: '90vh', overflow: 'auto', }}>
                        <Box sx={{ flex: 1, display: 'flex' }}>
                            <Box sx={{ mx: .5, my: 1, width: 220 }}>
                                <Box sx={{ display: 'flex', p: .5 }}>
                                    <EventIcon sx={{ p: .1, color: taskColor.darkPurple, }} />
                                    <TextComponent
                                        text={"Registerd Date"}
                                        sx={{ fontWeight: 600, color: taskColor.darkPurple, fontSize: 15 }}
                                    />
                                </Box>
                                <Box sx={{ pl: 1, pb: 1 }}>
                                    <Input
                                        type="text"
                                        value={
                                            form_submit_date
                                                ? format(new Date(form_submit_date), 'dd MMM yyyy, hh:mm a')
                                                : 'Invalid Date'
                                        }
                                        readOnly
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ mr: 1, my: 1, flex: 1.5 }}>
                                <Box sx={{ display: 'flex', p: .5 }}>
                                    <LocationOnIcon sx={{ p: .1, color: taskColor.darkPurple, }} />
                                    <TextComponent
                                        text={"Scrap Location"}
                                        sx={{ fontWeight: 600, color: taskColor.darkPurple, fontSize: 15 }}
                                    />
                                </Box>
                                <Box sx={{ pl: 1, pb: 1 }}>
                                    <ScrapLocation value={scrapLocation} setValue={setscrapLocation} />
                                </Box>
                            </Box>
                        </Box>

                        <Box sx={{ mx: 1.5, }}>
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
                                <Box sx={{ width: 200 }}>
                                    <TextComponent
                                        text={"Contact No."}
                                        sx={{ fontWeight: 600, pl: .8, fontSize: 13 }}
                                    />
                                    <ContactNumberInput
                                        value={contact_no}
                                        onChange={handleInputChange}
                                    />
                                </Box>
                                <Box sx={{ width: 200 }}>
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

                        <Box sx={{ mx: 1.5, my: 1.5 }}>
                            <Box sx={{ display: 'flex', p: .5 }}>
                                <LocalOfferIcon sx={{ p: .1, color: taskColor.darkPurple, }} />
                                <TextComponent
                                    text={"Item List & Rate Details"}
                                    sx={{ fontWeight: 600, color: taskColor.darkPurple, fontSize: 15 }}
                                />
                            </Box>
                            {groupedItems?.map((group, groupIdx) => {
                                return (
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
                                                value={group.QuantityPerCategoryQuality}
                                                setValue={(val) => handleGroupInputChange(groupIdx, 'QuantityPerCategoryQuality', val)}
                                                setquantityName={setquantityName}
                                                quantityName={quantityName}
                                            />

                                            <Input
                                                size="sm"
                                                type="text"
                                                name="RatePerCategoryQuality"
                                                sx={{ width: 200 }}
                                                placeholder="Scrap Rate"
                                                endDecorator="Rs."
                                                value={
                                                    group.RatePerCategoryQuality && group.RatePerCategoryQuality !== "0.00"
                                                        ? group.RatePerCategoryQuality
                                                        : group.items?.[0]?.RatePerCategoryQuality || ""
                                                }
                                                onChange={(e) =>
                                                    handleGroupInputChange(groupIdx, "RatePerCategoryQuality", e.target.value)
                                                }
                                            />
                                        </Box>
                                    </Box>
                                )
                            })}

                            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', my: 2, mr: 1 }}>
                                <Input
                                    name='totalRate'
                                    value={totalRate}
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
                            onClick={editForm}>
                            Submit
                        </Button>
                        <Button
                            sx={{ fontSize: 15 }}
                            variant='plain'
                            style={{ color: taskColor.darkPurple }}
                            onClick={closeEditModal}>
                            Cancel
                        </Button>
                    </Box>
                </ModalDialog>
            </Modal>
        </Box >
    )
}

export default EditsubmittedScrapForm