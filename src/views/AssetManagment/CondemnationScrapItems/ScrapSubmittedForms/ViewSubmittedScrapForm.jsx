import { Box, Button, Input, Modal, ModalDialog } from '@mui/joy'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import TextComponent from 'src/views/Components/TextComponent'
import CancelIcon from '@mui/icons-material/Cancel';
import { taskColor } from 'src/color/Color';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { format } from 'date-fns';
import { getscrapItemRateDetails } from 'src/api/AssetApis';
import { useQuery } from '@tanstack/react-query';


const ViewSubmittedScrapForm = ({ setView, viewOpen, scrapDetails }) => {
    const { form_submit_date, recipient_contact_number, yard_names, scrap_condemn_Form_slno, recipient_name, recipient_vehicle_no, total_rate,
        it_supplier_name, } = scrapDetails




    const [groupedItems, setGroupedItems] = useState([]);
    // const [expandedGroups, setExpandedGroups] = useState({});

    const postScrapFormNo = useMemo(() => {
        return {
            ScrapFormNo: scrap_condemn_Form_slno,
        }
    }, [scrap_condemn_Form_slno])

    const { data: scrapItemRateData } = useQuery({
        queryKey: ['getscrapItemRateData',],
        queryFn: () => getscrapItemRateDetails(postScrapFormNo),
        enabled: scrap_condemn_Form_slno !== undefined,
    })

    useEffect(() => {
        if (scrapItemRateData) {
            setGroupedItems(scrapItemRateData);
        }
    }, [scrapItemRateData]);

    const closeViewModal = useCallback(() => {
        setView(0)
    }, [setView])


    return (
        <Box>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={viewOpen}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, borderRadius: 10 }}
            >
                <ModalDialog variant="outlined" sx={{ width: '80vw', p: 0, overflow: 'auto' }}>
                    <Box sx={{ flex: 1, display: 'flex', ml: 1 }}>
                        <Box sx={{ flex: 1 }}>
                            <TextComponent
                                text={"View Scrap Materials"}
                                sx={{ fontWeight: 600, color: taskColor.darkPurple, pl: .8, pt: 1, fontSize: 18 }}
                            />
                        </Box>
                        <Box sx={{ pr: 1, pt: 1 }}>
                            <CancelIcon sx={{ width: 30, height: 30, color: taskColor.darkPurple, cursor: 'pointer' }}
                                onClick={closeViewModal} />
                        </Box>
                    </Box>
                    <Box sx={{ border: .1, borderColor: taskColor.lightgrey, m: 1, height: '90vh', overflow: 'auto' }}>
                        <Box sx={{ flex: 1, display: 'flex' }}>
                            <Box sx={{ mx: .5, my: 1, width: 220 }}>
                                <Box sx={{ display: 'flex', p: .5 }}>
                                    <EventIcon sx={{ p: .1, color: taskColor.darkPurple }} />
                                    <TextComponent
                                        text={"Registered Date"}
                                        sx={{ fontWeight: 600, color: taskColor.darkPurple, fontSize: 15 }}
                                    />
                                </Box>
                                <Box sx={{ pl: 1, pb: 1 }}>
                                    <Input
                                        type="text"
                                        value={form_submit_date
                                            ? format(new Date(form_submit_date), 'dd MMM yyyy, hh:mm a')
                                            : 'Invalid Date'}
                                        readOnly
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ mr: 1, my: 1, flex: 1.5 }}>
                                <Box sx={{ display: 'flex', p: .5 }}>
                                    <LocationOnIcon sx={{ p: .1, color: taskColor.darkPurple }} />
                                    <TextComponent
                                        text={"Scrap Location"}
                                        sx={{ fontWeight: 600, color: taskColor.darkPurple, fontSize: 15 }}
                                    />
                                </Box>
                                <Box sx={{ pl: 1, pb: 1 }}>
                                    <Input type="text" value={yard_names} readOnly />
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ mx: 1.5 }}>
                            <Box sx={{ display: 'flex', p: .5 }}>
                                <LocalShippingIcon sx={{ p: .1, color: taskColor.darkPurple }} />
                                <TextComponent
                                    text={"Vendor Details"}
                                    sx={{ fontWeight: 600, color: taskColor.darkPurple, fontSize: 15 }}
                                />
                            </Box>
                            <Box sx={{ flex: 1, px: .5 }}>
                                <TextComponent text={"Supplier"} sx={{ fontWeight: 600, pl: .8, fontSize: 13 }} />
                                <Input type="text" value={it_supplier_name} readOnly />
                            </Box>
                            <Box sx={{ flex: 1, display: 'flex', mx: .5, my: .5, gap: 1 }}>
                                <Box sx={{ flex: 1 }}>
                                    <TextComponent text={"Recipient Name"} sx={{ fontWeight: 600, pl: .8, fontSize: 13 }} />
                                    <Input type="text" value={recipient_name} readOnly />
                                </Box>
                                <Box sx={{ width: 200 }}>
                                    <TextComponent text={"Contact No."} sx={{ fontWeight: 600, pl: .8, fontSize: 13 }} />
                                    <Input type="text" value={recipient_contact_number} readOnly />
                                </Box>
                                <Box sx={{ width: 200 }}>
                                    <TextComponent text={"Vehicle No."} sx={{ fontWeight: 600, pl: .8, fontSize: 13 }} />
                                    <Input type="text" value={recipient_vehicle_no} readOnly />
                                </Box>
                            </Box>
                            <Box sx={{ mx: 1, my: 1.5 }}>
                                <Box sx={{ display: 'flex', p: .5 }}>
                                    <LocalOfferIcon sx={{ p: .1, color: taskColor.darkPurple, }} />
                                    <TextComponent
                                        text={"Item List & Rate Details"}
                                        sx={{ fontWeight: 600, color: taskColor.darkPurple, fontSize: 15 }}
                                    />
                                </Box>
                                {groupedItems?.map((val, index) => {
                                    return (
                                        <Box key={index} sx={{ m: 0.8, border: 1, p: 1, borderColor: taskColor.darkPurple }}>
                                            <TextComponent
                                                text={`${val.category_name} - ${val.quality_name}`}
                                                sx={{
                                                    fontWeight: 600, px: 0.8, py: .5, fontSize: 15,
                                                    color: '#2F5061',
                                                }}
                                            />

                                            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                                <TextComponent
                                                    text={`${val.units}-${val.condem_quantity_name}`}
                                                    sx={{
                                                        fontWeight: 600, px: 0.8, py: .5, fontSize: 15,

                                                    }}
                                                />
                                                <TextComponent
                                                    text={`${val.scrap_rate} Rs.`}
                                                    sx={{
                                                        fontWeight: 600, px: 0.8, py: .5, fontSize: 15,

                                                    }}
                                                />


                                            </Box>


                                        </Box>
                                        // <Box key={groupIdx} sx={{ m: 0.8, border: 1, borderColor: taskColor.purple, p: 1 }}>
                                        //     <Box sx={{
                                        //         flex: 1,
                                        //         p: 0.5,
                                        //         borderColor: '#dddee0',
                                        //         display: 'flex',
                                        //         justifyContent: 'space-between'
                                        //     }}>
                                        //         <TextComponent
                                        //             text={group.fullLabel}
                                        //             sx={{ fontWeight: 600, px: 0.8, py: .5, fontSize: 15, bgcolor: taskColor.lightpurple, color: '#2F5061' }}
                                        //         />
                                        //         <Input
                                        //             sx={{ width: 230 }}
                                        //             size="sm"
                                        //             type="text"
                                        //             startDecorator={"Unit Rate :"}
                                        //             endDecorator={`Rs/${group.unitquantity}`}
                                        //             name={`rate-${groupIdx}`}
                                        //             value={group.rate ? Number(group.rate).toFixed(2) : "0.00"}
                                        //             color="warning"
                                        //             variant="outlined"
                                        //             readOnly
                                        //         />
                                        //     </Box>
                                        //     <Table
                                        //         borderAxis='both'
                                        //         stickyHeader
                                        //         size="sm"
                                        //         sx={{ minWidth: 500 }}
                                        //     >
                                        //         <thead>
                                        //             <tr>
                                        //                 <th style={{ width: 50, textAlign: 'center' }}></th>
                                        //                 <th>Item Name</th>
                                        //                 <th>Scrap Yard</th>
                                        //             </tr>
                                        //         </thead>
                                        //         <tbody>
                                        //             {group.items.length === 0 ? (
                                        //                 <tr>
                                        //                     <td colSpan={3} style={{ textAlign: 'center' }}>No items</td>
                                        //                 </tr>
                                        //             ) : (
                                        //                 (expandedGroups[group.fullLabel] ? group.items : group.items.slice(0, 5)).map((item, itemIdx) => (
                                        //                     <tr key={itemIdx}>
                                        //                         <td style={{ textAlign: 'center' }}>{itemIdx + 1}</td>
                                        //                         <td>{item.asset_item_name || item.spare_item_name || item.item_name}</td>
                                        //                         <td>{item.yard_name}</td>
                                        //                     </tr>
                                        //                 ))
                                        //             )}
                                        //         </tbody>
                                        //     </Table>
                                        //     {group.items.length > 5 && (
                                        //         <Box sx={{ textAlign: 'right', mt: 0.5, fontSize: 14, fontWeight: 600, cursor: 'pointer' }} >
                                        //             <Button
                                        //                 size="sm"
                                        //                 variant="outlined"
                                        //                 onClick={() => handleToggleExpand(group.fullLabel)}
                                        //             >
                                        //                 {expandedGroups[group.fullLabel] ? 'Show Less' : 'Show More'}<UnfoldMoreIcon sx={{ p: .1 }} />
                                        //             </Button>
                                        //         </Box>
                                        //     )}
                                        //     <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', mt: 1, gap: 0.5 }}>
                                        //         <Input
                                        //             autoComplete='off'
                                        //             size='sm'
                                        //             type='text'
                                        //             name='unitPerCategoryQuality'
                                        //             sx={{ width: 100 }}
                                        //             placeholder='Total Unit'
                                        //             value={group.unitPerCategoryQuality}
                                        //             onChange={(e) => handleGroupInputChange(groupIdx, 'unitPerCategoryQuality', e.target.value)}
                                        //         />
                                        //         <QuantityUnitSelect
                                        //             value={group.QuantityPerCategoryQuality}
                                        //             setValue={(val) => handleGroupInputChange(groupIdx, 'QuantityPerCategoryQuality', val)}
                                        //             setquantityName={setquantityName}
                                        //             quantityName={quantityName}
                                        //         />

                                        //         <Input
                                        //             size="sm"
                                        //             type="text"
                                        //             name="RatePerCategoryQuality"
                                        //             sx={{ width: 200 }}
                                        //             placeholder="Scrap Rate"
                                        //             endDecorator="Rs."
                                        //             value={
                                        //                 group.RatePerCategoryQuality && group.RatePerCategoryQuality !== "0.00"
                                        //                     ? group.RatePerCategoryQuality
                                        //                     : group.items?.[0]?.RatePerCategoryQuality || ""
                                        //             }
                                        //             onChange={(e) =>
                                        //                 handleGroupInputChange(groupIdx, "RatePerCategoryQuality", e.target.value)
                                        //             }
                                        //         />
                                        //     </Box>
                                        // </Box>
                                    )
                                })}

                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', my: 2, mr: 1 }}>
                                    <Input
                                        name='total_rate'
                                        value={total_rate}
                                        type='number'
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
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', mx: 1, gap: .5, pb: 2 }}>
                        <Button sx={{ fontSize: 15 }} variant="plain" style={{ color: taskColor.darkPurple }}
                            onClick={closeViewModal}>
                            Close
                        </Button>
                    </Box>
                </ModalDialog>
            </Modal>
        </Box>
    )
}

export default ViewSubmittedScrapForm
