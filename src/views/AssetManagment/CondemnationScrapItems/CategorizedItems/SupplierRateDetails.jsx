import { Box, CssVarsProvider, Table } from '@mui/joy'
import React from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useQuery } from '@tanstack/react-query';



const SupplierRateDetails = () => {


    const getsupplierRateDetails = async () => {
        const { data } = await axioslogin.get('condemMasters/SupplierRateView')
        if (data.success === 2) {
            return data.data
        } else {
            return []
        }
    }

    const { data: tableData = [], isLoading } = useQuery({
        queryKey: ['getSupplierRatecomparison'],
        queryFn: getsupplierRateDetails,
    });





    if (isLoading) {
        return <Box sx={{ p: 2, textAlign: 'center' }}>Loading...</Box>;
    }

    if (!tableData || tableData.length === 0) {
        return <Box sx={{ p: 2, textAlign: 'center' }}>No data available</Box>;
    }

    // Get unique suppliers
    const suppliers = Array.from(new Set(tableData.map(d => d.supplier_name)));


    // Group data: category → quality → unit → supplier
    const groupedData = {};
    tableData.forEach(item => {
        const { category_name, quality_name, condem_quantity_name, supplier_name, price } = item;

        if (!groupedData[category_name]) groupedData[category_name] = {};
        if (!groupedData[category_name][quality_name]) groupedData[category_name][quality_name] = {};
        if (!groupedData[category_name][quality_name][condem_quantity_name])
            groupedData[category_name][quality_name][condem_quantity_name] = {};
        groupedData[category_name][quality_name][condem_quantity_name][supplier_name] = price;
    });

    let serial = 1; // row number counter
    return (
        <Box>
            <CssVarsProvider>
                <Table size="sm" borderAxis="both" sx={{ px: 1 }}>
                    <thead style={{ backgroundColor: '#f0f0f0' }}>
                        <tr>
                            <th style={{ width: 50, textAlign: 'center' }}>#</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Category</th>
                            <th style={{ width: 'auto', textAlign: 'center' }}>Quality</th>
                            <th style={{ width: 60, textAlign: 'center' }}>Unit</th>
                            <th style={{ width: 100, textAlign: 'center' }}>Measurement</th>
                            {suppliers.map((supplier, idx) => (
                                <th key={idx} style={{ textAlign: 'center', }} > {supplier}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(groupedData).map(([category, qualities]) =>
                            Object.entries(qualities).map(([quality, units]) =>
                                Object.entries(units).map(([quantityUnit, priceMap]) => {
                                    // Get one matching row from tableData to extract `unit`
                                    const matchedRow = tableData.find(
                                        item =>
                                            item.category_name === category &&
                                            item.quality_name === quality &&
                                            item.condem_quantity_name === quantityUnit
                                    );
                                    const displayUnit = matchedRow?.unit ?? '';
                                    return (
                                        <tr key={`${category}-${quality}-${quantityUnit}`}>
                                            <td style={{ textAlign: 'center' }}>{serial++}</td>
                                            <td style={{ textAlign: 'center' }}>{category}</td>
                                            <td style={{ textAlign: 'center' }}>{quality}</td>
                                            <td style={{ textAlign: 'center' }}>{displayUnit}</td>
                                            <td style={{ textAlign: 'center' }}>{quantityUnit}</td>
                                            {suppliers.map((supplier, sIdx) => (
                                                <td key={sIdx} style={{ textAlign: 'center' }}>
                                                    {priceMap[supplier] !== undefined ? (
                                                        <>
                                                            <CurrencyRupeeIcon sx={{ fontSize: 14, verticalAlign: 'middle', mb: .3 }} />
                                                            {priceMap[supplier]}
                                                        </>
                                                    ) : (
                                                        '-'
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })
                            )
                        )}
                    </tbody>
                </Table>

            </CssVarsProvider>
        </Box>
    );
};

export default SupplierRateDetails;


