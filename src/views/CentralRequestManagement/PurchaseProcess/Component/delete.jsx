import axios from 'axios';
import { format } from 'date-fns';
import capitalizeWords from 'capitalize-words'; // Ensure this is imported
import TableVirtuoso from 'react-virtuoso'; // Ensure this is imported
import Tooltip from '@mui/material/Tooltip';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

// Fetch data with offset and limit
const fetchPendingPODetails = async (offset, limit) => {
    try {
        const result = await axios.get('/crfpurchase/getpendingpo', {
            params: {
                offset: offset,
                limit: limit
            }
        });
        const { success, data } = result.data;

        if (success === 2) {
            const poList = data
                .filter((po, index, self) =>
                    index === self.findIndex((val) => val.PO_NO === po.PO_NO))
                .map((po, ind) => ({
                    slno: ind + 1,
                    po_no: po.PO_NO,
                    po_date: format(new Date(po.POD_DATE), 'dd-MM-yyyy hh:mm:ss a'),
                    supplier_name: capitalizeWords(po.SUC_NAME),
                    storeName: capitalizeWords(po.STC_DESC),
                    po_delivery: capitalizeWords(po.POC_DELIVERY),
                    po_types: po.POC_TYPE === 'S' ? 'Stock Order' : 'Specific',
                    po_amount: po.PON_AMOUNT,
                    po_expiry: po.PO_EXPIRY ? format(new Date(po.PO_EXPIRY), 'dd-MM-yyyy') : 'Not Updated',
                    expected_delvery: po.EXPECTED_DATE ? format(new Date(po.EXPECTED_DATE), 'dd-MM-yyyy') : 'Not Updated',
                }));

            const poItems = data.map((val, index) => ({
                slno: index + 1,
                po_no: val.PO_NO,
                item_code: val.IT_CODE,
                item_name: val.ITC_DESC,
                item_qty: val.PDN_QTY !== null ? val.PDN_QTY : 0,
                item_rate: val.PDN_RATE !== null ? val.PDN_RATE.toFixed(2) : 0,
                item_mrp: val.PDN_ORIGINALMRP !== null ? val.PDN_ORIGINALMRP.toFixed(2) : 0,
                tax: val.TXC_DESC || 'Nil',
                tax_amount: val.PDN_TAXAMT !== null ? val.PDN_TAXAMT.toFixed(2) : 0
            }));

            const combinedData = poList.map(po => ({
                ...po,
                items: poItems.filter(item => item.po_no === po.po_no)
            }));

            setPendingPOList(combinedData);
            setOpen(false);
        } else if (success === 1) {
            // Handle empty results or other cases
        }
    } catch (error) {
        console.error('Error fetching PO details:', error);
    }
};

// Example usage
const offset = 0; // Replace with your logic to calculate offset
const limit = 10; // Replace with your desired limit
fetchPendingPODetails(offset, limit);
