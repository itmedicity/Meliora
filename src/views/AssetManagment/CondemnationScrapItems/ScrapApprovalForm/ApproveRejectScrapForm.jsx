import { Box, Button, Checkbox, Input, Modal, ModalDialog, Table, Textarea } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import TextComponent from 'src/views/Components/TextComponent'
import CancelIcon from '@mui/icons-material/Cancel';
import QuantityUnitSelect from '../../CondemnationSelectCode/QuantityUnitSelect';
import { axioslogin } from 'src/views/Axios/Axios';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { format } from 'date-fns';
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { errorNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import ScrapPaymentModeSelect from './ScrapLevels/ScrapPaymentModeSelect';
import { useSelector } from 'react-redux';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { ScrapFormBillGeneration } from './ScrapFormPrint/ScrapFormBillGeneration';
import SupplierSelectcondemn from '../../CondemnationSelectCode/SupplierSelectcondemn';
import ScrapLocation from '../../CondemnationSelectCode/ScrapLocation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { taskColor } from 'src/color/Color';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import EventIcon from '@mui/icons-material/Event';
import ContactNumberInput from 'src/views/Components/ContactNumberInput';


const ApproveRejectScrapForm = ({ setFormFlag, formOpen, setFormOpen, scrapDetails, EmployeeScrapLevelForm, id, view, setView }) => {

    const { scrap_yard, form_submit_date, supplier_slno, recipient_contact_number, recipient_name, recipient_vehicle_no,
        scrap_condemn_Form_slno, total_rate, payment_mode, amount_collected, gate_pass_approved,
        gate_pass_generated_date, gate_pass_request_no, payment_acknowledge_date, gate_pass_ackowledge,
        payemnt_acknowledge_by, level_review_slno, level_review, level_review_state, it_supplier_name } = scrapDetails


    const formattedDateTime = new Date().toLocaleString('sv-SE').replace('T', ' ');

    const empname = useSelector((state) => state.LoginUserData.empname);
    const { level_name, level_no, bill_generation_payment, gate_pass_generation, gate_pass_approval } = EmployeeScrapLevelForm[0] || {};

    const CloseModal = useCallback(() => {
        setFormFlag(0)
        setFormOpen(false)
        setView(0)
    }, [])

    const getScrapApprovePanels = async () => {
        const { data } = await axioslogin.get(
            `AssetCondemnation/getScrapApprovePanels/${scrap_condemn_Form_slno}`
        );
        if (data.success === 1) {
            return data.data;
        } else {
            return [];
        }
    };

    const { data: allScrapApprovePanels } = useQuery({
        queryKey: ['ScrapApprovePanels', scrap_condemn_Form_slno],
        queryFn: getScrapApprovePanels,
        enabled: !!scrap_condemn_Form_slno,
    });

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

    const queryClient = useQueryClient()
    const [supplierName, setsupplierName] = useState('')
    const [quantityName, setquantityName] = useState('')
    const [supplier, setSupplier] = useState(supplier_slno)
    const [expandedGroups, setExpandedGroups] = useState({});
    const [groupedItems, setGroupedItems] = useState([]);
    const [scrapLocation, setscrapLocation] = useState(
        Array.isArray(scrap_yard) ? scrap_yard : JSON.parse(scrap_yard || "[]")
    );

    const [formData, setFormData] = useState({
        vehicle_no: recipient_vehicle_no || '',
        recipientName: recipient_name || '',
        contact_no: recipient_contact_number || '',
        totalRate: total_rate || '',
        reviewRemarks: level_review,
        reviewState: '',
        paymentMode: payment_mode || '',
        amountCollected: amount_collected || total_rate || '',
        gatePassGeneratedDate: gate_pass_generated_date || '',
        gatePassRequestNo: gate_pass_request_no || '1'
    })

    const { recipientName, contact_no, vehicle_no, totalRate, reviewRemarks, paymentMode, amountCollected, gatePassRequestNo } = formData

    const handleInputChange = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
    }, [formData])

    const handleGroupInputChange = (groupIdx, field, value) => {
        const updated = [...groupedItems];
        updated[groupIdx][field] = value;
        setGroupedItems(updated);
    };

    const handleToggleExpand = (groupKey) => {
        setExpandedGroups(prev => ({
            ...prev,
            [groupKey]: !prev[groupKey]
        }));
    };

    const fetchCategorizedItems = async (getCategoryQuality, supplier) => {
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
                        unit: condem_quantity_name ?? ''
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

            const allItems = [...data1, ...data2].map(item => ({
                ...item,
                price: rateInfoFromSupplier.price,
                condem_quantity_name: rateInfoFromSupplier.unit,
                category_slno,
                quality_slno,
                QuantityPerCategoryQuality,
                RatePerCategoryQuality,
                unitPerCategoryQuality
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
            RatePerCategoryQuality: items[0]?.RatePerCategoryQuality ?? null

        }));
        return formattedGroups;
    };


    const { data: formattedGroups = [] } = useQuery({
        queryKey: ['getCategorizedItems', getCategoryQuality, supplier],
        queryFn: () => fetchCategorizedItems(getCategoryQuality, supplier),
        enabled: !!getCategoryQuality
    });


    useEffect(() => {
        const isEqual = JSON.stringify(groupedItems) === JSON.stringify(formattedGroups);
        if (!isEqual) {
            setGroupedItems(formattedGroups);
        }
    }, [formattedGroups]);


    const handleReviewSubmit = useCallback(
        async (reviewState) => {
            if (reviewRemarks === null || '') {
                warningNotify('Please enter review remarks before submitting.');
                return;
            }
            const ReviewData = {
                level_no: level_no || null,
                scrap_condemn_Form_slno,
                scrap_yard: scrapLocation || null,
                supplier_slno: supplier || null,
                recipient_name: recipientName || null,
                recipient_contact_number: contact_no || null,
                recipient_vehicle_no: vehicle_no || null,
                total_rate: totalRate || null,
                level_review_state: reviewState || null,
                level_review: reviewRemarks || null,
                edit_user: id,
                payment_mode: paymentMode || null,
                payment_acknowledge: id || null,
                payment_acknowledge_date: bill_generation_payment === 1 ? formattedDateTime : null,
                amount_collected: amountCollected || null,
                gate_pass_generated_date: gate_pass_approval === 1 ? formattedDateTime : null,
                gate_pass_request_no: gatePassRequestNo || null,
                gate_pass_requested: gate_pass_generation === 1 ? 1 : 0,
                gate_pass_approved: gate_pass_approval === 1 ? 1 : 0,
                gate_pass_acknowledge: id || null,
                level_review_slno: level_review_slno,
            };
            try {
                const result = await axioslogin.patch('/AssetCondemnation/UpdateScrapForm', ReviewData);
                const { success, message } = result.data;
                if (success === 1) {
                    succesNotify(message);
                    CloseModal();
                    queryClient.invalidateQueries('getEmployeeScrapApprovalLevel')
                    queryClient.invalidateQueries('getEmployeeScrapApprovallvl')
                } else {
                    warningNotify(message);
                }
            } catch (err) {
                errorNotify(err);
            }
        },
        [
            level_no,
            scrap_condemn_Form_slno,
            scrapLocation,
            supplier,
            recipientName,
            contact_no,
            vehicle_no,
            totalRate,
            reviewRemarks,
            id,
            CloseModal,
            queryClient
        ]
    );

    const PrintBill = useCallback(() => {
        ScrapFormBillGeneration(scrapDetails, formattedGroups, groupedItems)
    }, [])



    return (
        <Box>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={formOpen}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, borderRadius: 10 }}>
                <ModalDialog variant="outlined" sx={{ width: '80vw', p: 0, overflow: 'auto', }}>
                    <Box sx={{ flex: 1, display: 'flex', ml: 1, }}>
                        <Box sx={{ flex: 1 }}>
                            <TextComponent
                                text={"Review Scrap Materials"}
                                sx={{ fontWeight: 600, color: taskColor.darkPurple, pl: .8, pt: 1.5, fontSize: 18 }}
                            />
                        </Box>
                        <Box sx={{ pr: 1, pt: 1, }}>
                            <CancelIcon sx={{ width: 30, height: 30, color: taskColor.darkPurple, cursor: 'pointer' }} onClick={CloseModal} />
                        </Box>
                    </Box>

                    <Box sx={{ border: .1, borderColor: taskColor.lightgrey, m: 1, height: '90vh', overflow: 'auto', }}>
                        <Box sx={{ flex: 1, display: 'flex' }}>
                            <Box sx={{ mx: .5, my: 1, pt: 1, width: 220 }}>
                                <Box sx={{ display: 'flex', pl: 1 }}>
                                    <EventIcon sx={{ p: .1, color: taskColor.darkPurple, }} />
                                    <TextComponent
                                        text={"Registerd Date"}
                                        sx={{ fontWeight: 600, color: taskColor.darkPurple, fontSize: 15, }}
                                    />
                                </Box>
                                <Box sx={{ pl: 1, }}>
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
                                {view === 1 ?
                                    <Input
                                        type="text"
                                        name='it_supplier_name'
                                        value={it_supplier_name}
                                        readOnly
                                    /> :
                                    <SupplierSelectcondemn value={supplier} setValue={setSupplier} setsupplierName={setsupplierName} supplierName={supplierName} />
                                }
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
                                    {/* <Input
                                        type='number'
                                        name="contact_no"
                                        value={contact_no}
                                        onChange={handleInputChange}
                                    /> */}
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

                        <Box sx={{
                            mx: 1.5, my: 1.5
                        }}>
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
                                                sx={{ width: 230, }}
                                                size='sm'
                                                type='number'
                                                startDecorator={"Unit Rate :"}
                                                endDecorator={`Rs/${group.unitquantity}`}
                                                name={`rate-${groupIdx}`}
                                                value={group.rate}
                                                color='warning'
                                                variant='outlined'
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
                                                size='sm'
                                                type='text'
                                                name='unitPerCategoryQuality'
                                                sx={{ width: 100 }}
                                                placeholder='Total Unit'
                                                value={group.unitPerCategoryQuality}
                                                onChange={(e) => handleGroupInputChange(groupIdx, 'unitPerCategoryQuality', e.target.value)}
                                            />
                                            <Box sx={{ width: 100 }}>
                                                <QuantityUnitSelect
                                                    value={group.QuantityPerCategoryQuality}
                                                    setValue={(val) => handleGroupInputChange(groupIdx, 'QuantityPerCategoryQuality', val)}
                                                    setquantityName={setquantityName}
                                                    quantityName={quantityName}
                                                />
                                            </Box>
                                            <Input
                                                size='sm'
                                                type='text'
                                                name='RatePerCategoryQuality'
                                                sx={{ width: 150 }}
                                                placeholder='Scrap Rate'
                                                endDecorator={`Rs.`}
                                                value={group.RatePerCategoryQuality}
                                                onChange={(e) => handleGroupInputChange(groupIdx, 'RatePerCategoryQuality', e.target.value)}
                                            />
                                        </Box>
                                    </Box>
                                )
                            }
                            )}
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

                        {allScrapApprovePanels?.length > 0 ?
                            <Box sx={{ border: .1, borderColor: '#E8E6E5', mx: 1.5, my: 1 }}>
                                <TextComponent
                                    text={"Approval Panels"}
                                    sx={{ fontWeight: 600, color: taskColor.darkPurple, px: 1, pt: 1.5, pb: 1, fontSize: 15 }}
                                />
                                <Table
                                    borderAxis='both'
                                    stickyHeader
                                    size="sm"
                                    sx={{ width: '99%', m: .8 }}
                                >
                                    <thead>
                                        <tr>
                                            <th style={{ width: 90, textAlign: 'center' }}>Level No.</th>
                                            <th>Level Name</th>
                                            <th>Level Review</th>
                                            <th>Employee</th>
                                            <th>Remarks</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allScrapApprovePanels?.map((val, itemIdx) => {
                                            const Review =
                                                val.level_review_state === "A"
                                                    ? "APPROVED"
                                                    : val.level_review_state === "R"
                                                        ? "REJECTED"
                                                        : "Pending";
                                            return (
                                                <tr key={itemIdx}>
                                                    <td style={{ textAlign: 'center' }}>{val.level_no}</td>
                                                    <td>{val.level_name} </td>
                                                    <td >{Review}</td>
                                                    <td>{val.em_name}</td>
                                                    <td>{val.level_review}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </Box> : null}

                        {amount_collected !== null && payment_mode !== null ?
                            <Box sx={{ border: .1, borderColor: '#E8E6E5', mx: 1.5, my: 1, pb: 1 }}>
                                <TextComponent
                                    text={"Payment Details"}
                                    sx={{ fontWeight: 600, color: taskColor.darkPurple, px: 1.5, pt: 1.5, pb: 1, fontSize: 15 }}
                                />
                                <Table
                                    borderAxis='both'
                                    stickyHeader
                                    size="sm"
                                    sx={{ width: '99%', mx: 0.8 }}
                                >
                                    <thead>
                                        <tr>
                                            <th style={{ textAlign: 'center' }}>Mode of Payment</th>
                                            <th style={{ textAlign: 'center' }}>Acknowledged by</th>
                                            <th style={{ textAlign: 'center' }}>Payment Date</th>
                                            <th style={{ textAlign: 'center' }}>Amount Collected</th>
                                            {/* <th style={{ textAlign: 'center', width: 160 }}>Action</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style={{ textAlign: 'center' }}>
                                                {payment_mode}
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                                {payemnt_acknowledge_by}
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                                {payment_acknowledge_date
                                                    ? format(new Date(payment_acknowledge_date), 'dd MMM yyyy, hh:mm a')
                                                    : ' '}
                                            </td>
                                            <td style={{ textAlign: 'center', fontSize: 14 }}>
                                                {new Intl.NumberFormat('en-IN').format(amount_collected)} Rs.
                                            </td>
                                            {/* <td style={{ textAlign: 'center', }}>
                                                <Button
                                                    color='primary'
                                                    size='sm'
                                                    onClick={PrintBill}
                                                    variant="outlined"
                                                    sx={{ width: 120, ml: 1, mt: .5 }}>
                                                    <LocalPrintshopIcon sx={{ mr: .5 }} />
                                                    Print
                                                </Button>
                                            </td> */}
                                        </tr>
                                    </tbody>
                                </Table>
                            </Box>
                            : null}
                        {gate_pass_request_no !== null && gate_pass_generated_date !== null ?
                            <Box sx={{ border: .1, borderColor: '#E8E6E5', mx: 1.5, my: 1, pb: 1 }}>
                                <TextComponent
                                    text={"Gate Pass Details"}
                                    sx={{ fontWeight: 600, color: taskColor.darkPurple, px: 1.5, pt: 1.5, pb: 1, fontSize: 15 }}
                                />
                                <Table
                                    borderAxis='both'
                                    stickyHeader
                                    size="sm"
                                    sx={{ width: '99%', mx: 0.8 }}
                                >
                                    <thead>
                                        <tr>
                                            <th style={{ textAlign: 'center' }}>Gate Pass Request No.</th>
                                            <th style={{ textAlign: 'center' }}>Acknowledged by</th>
                                            <th style={{ textAlign: 'center' }}>Acknowledged Date</th>
                                            <th style={{ textAlign: 'center' }}>Gate Pass Request</th>
                                            <th style={{ textAlign: 'center', width: 160 }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style={{ textAlign: 'center' }}>
                                                GP-{String(gate_pass_request_no).padStart(6, '0')}
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                                {gate_pass_ackowledge}
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                                {gate_pass_generated_date
                                                    ? format(new Date(gate_pass_generated_date), 'dd MMM yyyy, hh:mm a')
                                                    : ' '}
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                                {gate_pass_approved === 1 ? "Approved" : "Pending"}
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                                <Button
                                                    color='primary'
                                                    size='sm'
                                                    onClick={PrintBill}
                                                    variant="outlined"
                                                    sx={{ width: 120, ml: 1, mt: .5 }}>
                                                    <LocalPrintshopIcon sx={{ mr: .5 }} />
                                                    Print
                                                </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Box> : null}
                        {bill_generation_payment === 1 && view === 0 ?
                            <Box sx={{ border: .1, borderColor: '#E8E6E5', mx: 1.5, my: 1, pb: 1 }}>
                                <TextComponent
                                    text={"Payment & Bill Generation"}
                                    sx={{ fontWeight: 600, color: taskColor.darkPurple, px: 1, pt: 1.5, pb: 1, fontSize: 15 }}
                                />
                                <Box sx={{ flex: 1, pl: 1, display: 'flex', mt: 1 }}>
                                    <Box sx={{ width: 160 }}>
                                        <TextComponent
                                            text={"Mode of Payment"}
                                            sx={{ fontWeight: 600, pl: .5, fontSize: 15, pt: .5 }}
                                        />
                                    </Box>
                                    <Box sx={{ width: 180 }}>
                                        <ScrapPaymentModeSelect paymentMode={paymentMode} setPaymentMode={setFormData} />
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, pl: 1, display: 'flex', mt: .5 }}>
                                    <Box sx={{ width: 160 }}>
                                        <TextComponent
                                            text={"Acknowledged by"}
                                            sx={{ fontWeight: 600, pl: .5, fontSize: 15, pt: .5 }}
                                        />
                                    </Box>
                                    <Box sx={{ width: 180 }}>
                                        <Input size='sm' value={empname} name='empname ' />
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, pl: 1, display: 'flex', mt: .5 }}>
                                    <Box sx={{ width: 160 }}>
                                        <TextComponent
                                            text={"Amount Collected"}
                                            sx={{ fontWeight: 600, pl: .5, fontSize: 15, pt: .5 }}
                                        />
                                    </Box>
                                    <Box sx={{ width: 180 }}>
                                        <Input size='sm' startDecorator={'Rs.'}
                                            value={amountCollected}
                                            name='amountCollected'
                                            onChange={handleInputChange} />
                                    </Box>
                                </Box>
                            </Box>
                            : null}
                        {gate_pass_generation === 1 && view === 0 ?
                            <Box sx={{ border: .1, borderColor: '#E8E6E5', mx: 1.5, my: 1, pb: 1 }}>
                                <TextComponent
                                    text={"Gate Pass Request"}
                                    sx={{ fontWeight: 600, color: taskColor.darkPurple, px: 1, pt: 1.5, pb: 1, fontSize: 15 }}
                                />
                                <Box sx={{ flex: 1, pl: 1, display: 'flex', mt: .5 }}>
                                    <Box sx={{ width: 180 }}>
                                        <TextComponent
                                            text={"Gate Pass Request No."}
                                            sx={{ fontWeight: 600, pl: .5, fontSize: 15, pt: .5 }}
                                        />
                                    </Box>
                                    <Box sx={{ width: 200 }}>
                                        <Input
                                            size="sm"
                                            value={`GP-${String(gatePassRequestNo).padStart(6, '0')}`}
                                            name="gatePassRequestNo"
                                            readOnly
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, pl: 1, display: 'flex', mt: .5 }}>
                                    <Box sx={{ width: 180 }}>
                                        <TextComponent
                                            text={"Acknowledged by"}
                                            sx={{ fontWeight: 600, pl: .5, fontSize: 15, pt: .5 }}
                                        />
                                    </Box>
                                    <Box sx={{ width: 200 }}>
                                        <Input size='sm' value={empname} name='empname'
                                            readOnly />
                                    </Box>
                                </Box>
                            </Box> : null}
                        {view === 0 ?
                            <Box sx={{ m: 1, pt: 1, pl: 1 }}>
                                <Box sx={{ flex: 1, display: 'flex' }} >
                                    <Checkbox
                                        variant="soft"
                                        defaultChecked
                                        size="lg"
                                        readOnly
                                        sx={{

                                            '&.Mui-checked .MuiCheckbox-checkbox': {
                                                backgroundColor: taskColor.lightpurple,
                                                borderColor: taskColor.darkPurple,
                                            },
                                        }}
                                    />

                                    <TextComponent
                                        sx={{ color: taskColor.darkPurple, fontWeight: 500, pl: 1, fontSize: 14, pt: .3 }}
                                        text={`${level_name} APPROVAL`}
                                    />
                                </Box>
                                <Textarea
                                    sx={{ mt: 1 }}
                                    minRows={2}
                                    placeholder="Enter your remarks..."
                                    variant="outlined"
                                    value={reviewRemarks}
                                    name='reviewRemarks'
                                    onChange={handleInputChange}
                                />
                                <Box sx={{ flex: 1, display: 'flex', gap: 1, pt: 1, pb: 5 }} >
                                    {level_review_state === 'A' ?
                                        <Button
                                            size='sm'
                                            variant='solid'
                                            color="success"
                                            startDecorator={<ThumbUpIcon />}
                                            onClick={() => handleReviewSubmit('A')}
                                        >
                                            Approved
                                        </Button>
                                        :
                                        <Button
                                            size='sm'
                                            variant='outlined'
                                            color="success"
                                            startDecorator={<ThumbUpIcon />}
                                            onClick={() => handleReviewSubmit('A')}
                                        >
                                            Approve
                                        </Button>}
                                    {level_review_state === 'R' ?
                                        <Button
                                            size='sm'
                                            variant="solid"
                                            color="danger"
                                            startDecorator={<ThumbDownIcon />}
                                            onClick={() => handleReviewSubmit('R')}
                                        >
                                            Rejected
                                        </Button>
                                        : <Button
                                            size='sm'
                                            variant='outlined'
                                            color="danger"
                                            startDecorator={<ThumbDownIcon />}
                                            onClick={() => handleReviewSubmit('R')}
                                        >
                                            Reject
                                        </Button>
                                    }
                                </Box>
                            </Box>
                            : null}
                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', mx: 1, gap: .5, pb: 2 }}>
                            <Button
                                style={{ color: taskColor.darkPurple, fontSize: 15 }}
                                variant='plain'
                                onClick={CloseModal}
                            >Cancel</Button>
                        </Box>
                    </Box>
                </ModalDialog>
            </Modal>
        </Box >
    )
}

export default memo(ApproveRejectScrapForm)