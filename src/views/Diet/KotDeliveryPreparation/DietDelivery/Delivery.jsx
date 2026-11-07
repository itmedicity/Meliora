import React, { useState } from "react";
import DeliveryTableList from "./DeliveryTableList";
import { AnimatePresence } from 'framer-motion'
import { Box } from '@mui/joy'
import DietTextComponent from "../../DietComponent/DietTextComponent";
import PrintIcon from '@mui/icons-material/Print';
import DietButton from "../../DietComponent/DietButton";
import { infoNotify } from "src/views/Common/CommonCode";

const Delivery = ({ filteredPatients, setDeliveryPatient, setOpenModal, setPrintOrderIds,
    // printData, printOrderIds,setPrintData
}) => {
    const [selectedPrintItems, setSelectedPrintItems] = useState([]);
    const [printLabelData, setPrintLabelData] = useState(null);
    const [a4PrintData, setA4PrintData] = useState(null);

    const getPacketList = (row) => {
        let items = row?.items;

        // If items is JSON string, parse it
        if (typeof items === "string") {
            try {
                items = JSON.parse(items);
            } catch (error) {
                console.error("Invalid items JSON:", error);
                return [];
            }
        }

        if (!Array.isArray(items)) return [];

        const uniquePackets = new Map();

        items.forEach(item => {
            if (!item?.packet_uid) return;

            if (!uniquePackets.has(item.packet_uid)) {
                uniquePackets.set(item.packet_uid, {
                    packet_uid: item.packet_uid,
                    packet_no: item.packet_no,
                    packing_id: item.packing_id,
                    packet_count: item.packet_count,
                    packet_status: item.packet_status,
                    packing_status: item.packing_status,

                    // Patient / delivery details
                    order_id: row?.canteen_order_id,
                    admission_id: row?.fb_ip_no,
                    patient_no: row?.fb_pt_no,
                    patient_name: row?.fb_ptc_name,

                    // Bed details
                    bed_no: row?.bed_no,
                    bed_code: row?.fb_bd_code,

                    // Nursing station
                    nursing_station: row?.nursing_station,
                    nursing_station_code: row?.fb_ns_code,

                    // Other details
                    party_name: row?.party_name,
                    meal_type: row?.meal_type,
                    type_slno: row?.type_slno
                });
            }
        });

        return Array.from(uniquePackets.values());
    };


    const createPrintDetails = (rows = []) => {
        return rows.flatMap(row => {
            const packetList = getPacketList(row);

            return packetList.map(packet => ({
                barcodeNumber: packet.packet_uid,
                packetUid: packet.packet_uid,
                packetNo: packet.packet_no,
                packetCount: packet.packet_count,
                packingId: packet.packing_id,

                orderId: packet.order_id,
                admissionId: packet.admission_id,
                patientNo: packet.patient_no,
                patientName: packet.patient_name,

                bedNo: packet.bed_no,
                bedCode: packet.bed_code,

                nursingStation: packet.nursing_station,
                nursingStationCode: packet.nursing_station_code,

                partyName: packet.party_name,
                mealType: packet.meal_type,
                typeSlno: packet.type_slno,
            }));
        });
    };

    const handleBulkPrint = () => {
        if (!selectedPrintItems?.length) {
            return infoNotify("Please select at least one item to print!");
        }

        const barcodePrintDetails = selectedPrintItems.flatMap(row => {
            const packetList = getPacketList(row);

            return packetList.map(packet => ({
                barcodeNumber: packet.packet_uid,
                packetUid: packet.packet_uid,
                packetNo: packet.packet_no,
                packetCount: packet.packet_count,
                packingId: packet.packing_id,

                orderId: packet.order_id,
                admissionId: packet.admission_id,
                patientNo: packet.patient_no,
                patientName: packet.patient_name,

                bedNo: packet.bed_no,
                bedCode: packet.bed_code,

                nursingStation: packet.nursing_station,
                nursingStationCode: packet.nursing_station_code,

                partyName: packet.party_name,
                mealType: packet.meal_type,
                typeSlno: packet.type_slno
            }));
        });

        if (!barcodePrintDetails.length) {
            return infoNotify("No packed packets found!");
        }

        setPrintLabelData({
            orderId: null,
            printCount: barcodePrintDetails.length,
            barcodePrintDetails
        });
    };


    const handleBulkA4Print = () => {
        if (!selectedPrintItems?.length) {
            return infoNotify(
                "Please select at least one item to print!"
            );
        }

        const a4PrintDetails =
            createPrintDetails(selectedPrintItems);

        if (!a4PrintDetails.length) {
            return infoNotify(
                "No packed packets found!"
            );
        }

        setA4PrintData({
            orderId: null,
            printCount: a4PrintDetails.length,
            a4PrintDetails,
        });
    };
    return (
        <Box sx={{ mt: 1 }}>
            {filteredPatients?.length === 0 ?
                <Box
                    sx={{
                        p: 1,
                        borderRadius: 6,
                        bgcolor: '#fff3f3',
                        border: '1px dashed #ffb3b3',
                        fontSize: 13
                    }}> No patients found for this diet </Box> :
                <>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>

                        <DietTextComponent
                            size={15}
                            value={`Patients (${filteredPatients.length})`}
                            color="#5a2d82"
                        />
                        <Box
                            sx={{
                                display: "flex",
                                gap: 1,
                            }}
                        >
                            <DietButton
                                disabled={!selectedPrintItems?.length}
                                name="Bulk Print"
                                width={150}
                                icon={PrintIcon}
                                onClick={handleBulkPrint}
                            />

                            <DietButton
                                disabled={!selectedPrintItems?.length}
                                name="Bulk A4"
                                width={150}
                                icon={PrintIcon}
                                onClick={handleBulkA4Print}
                            />
                        </Box>

                    </Box>

                    <AnimatePresence>
                        <DeliveryTableList
                            setOpenModal={setOpenModal}
                            setDeliveryPatient={setDeliveryPatient}
                            data={filteredPatients}
                            // printData={printData}
                            // printOrderIds={printOrderIds}
                            // setPrintData={setPrintData}
                            setPrintOrderIds={setPrintOrderIds}
                            selectedPrintItems={selectedPrintItems}
                            setSelectedPrintItems={setSelectedPrintItems}
                            printLabelData={printLabelData}
                            setPrintLabelData={setPrintLabelData}
                            a4PrintData={a4PrintData}
                            setA4PrintData={setA4PrintData}
                        />
                    </AnimatePresence>
                </>
            }

        </Box>
    );
};

export default Delivery;
