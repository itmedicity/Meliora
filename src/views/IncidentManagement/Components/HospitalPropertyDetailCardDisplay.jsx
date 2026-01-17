import React, { memo } from 'react';
import { Box, Card, Tooltip } from '@mui/joy';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { BiDetail, BiSolidUserDetail } from 'react-icons/bi';
import { IoBuild } from 'react-icons/io5';
import { FaTools } from 'react-icons/fa';
import DatasetLinkedIcon from '@mui/icons-material/DatasetLinked';
import CardHeader from './CardHeader';
import { CiEdit } from "react-icons/ci";
import IncidentTextComponent from './IncidentTextComponent';
import { useQuery } from '@tanstack/react-query';
import { getCustodianDept } from 'src/api/AssetApis';

const HospitalPropertyDetailCardDisplay = ({ propertyDetail, HandleHpEdit }) => {

    // Remove unwanted minimal objects
    const cleanedPropertyDetail = propertyDetail?.filter(
        obj => !(Object.keys(obj).length === 1 && (obj.item_isAsset === true || obj.item_isAsset === null || obj.item_isAsset === false))
    ) || [];

 
    // Get custodian department data
    const { data: custodianArray = [] } = useQuery({
        queryKey: ['getCustdepInci'],
        queryFn: getCustodianDept,
        staleTime: Infinity
    });

    return (
        <Box
            sx={{
                width: '100%',
                px: 2,
                py: 2,
                my: 2,
                border: '1.5px solid #ece6f1',
                bgcolor: '#fdfbff',
                borderRadius: 4,
                gap: 3,
                alignItems: 'flex-start',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                position: 'relative',
            }}
        >
            {/* Header with ONE edit icon */}
            <Box sx={{ flex: 1, position: 'relative', mb: 2 }}>
                <CardHeader icon={BiSolidUserDetail} text="Property Details" size={24} />
                <CiEdit
                    fontSize={26}
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        cursor: 'pointer',
                        zIndex: 10,
                        color: '#7c3aed'
                    }}
                    onClick={HandleHpEdit} // old functionality
                />
            </Box>

            {/* All property objects displayed */}
            {cleanedPropertyDetail?.map((property, idx) => {
                const { am_custodian_slno } = property;

                const custodian = custodianArray.find(
                    (item) => item?.am_custodian_slno === Number(am_custodian_slno)
                );
                const CustodianName = custodian?.am_custodian_name;

                const infoItems = [
                    {
                        label: 'Custodian Department',
                        value: CustodianName || property?.item_custodian_dept,
                        icon: <DatasetLinkedIcon size={16} />,
                    },
                    {
                        label: 'Item Name',
                        value: property?.item_name,
                        icon: <FaTools size={16} />,
                    },
                    {
                        label: 'Department',
                        value: property?.deptname,
                        icon: <BiDetail size={16} />,
                    },
                    {
                        label: 'Manufacture Serial No',
                        value: property?.am_manufacture_no,
                        icon: <MdOutlineAttachMoney size={16} />,
                    },
                    {
                        label: 'Location',
                        value: property?.location,
                        icon: <IoBuild size={16} />,
                    }
                ];

                return (
                    <Box key={idx}>
                        <IncidentTextComponent
                            text={`${idx + 1} Asset`}
                            color={'#343434'}
                            size={15}
                            weight={600}
                        />
                        <Card variant="outlined" sx={{ mt: 1, position: 'relative' }}>
                            {infoItems.map((item, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1.2,
                                        px: 1,
                                        borderRadius: 2,
                                        backgroundColor: '#fff',
                                        transition: 'background 0.2s',
                                        '&:hover': {
                                            backgroundColor: '#f3f4f6',
                                        },
                                    }}
                                >
                                    <Tooltip title={item.label}>
                                        <Box sx={{ color: '#5b5b5b' }}>{item.icon}</Box>
                                    </Tooltip>
                                    <IncidentTextComponent
                                        text={item.value || 'Not available'}
                                        color={'#343434'}
                                        size={13}
                                        weight={600}
                                    />
                                </Box>
                            ))}
                        </Card>
                    </Box>
                );
            })}
        </Box >
    );
};

export default memo(HospitalPropertyDetailCardDisplay);
