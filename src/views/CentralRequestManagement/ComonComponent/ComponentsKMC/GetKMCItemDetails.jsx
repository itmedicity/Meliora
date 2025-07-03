import { format } from 'date-fns'
import { axioskmc } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'

export const GetKMCItemDetails = async (
  req_slno,
  setReqItems,
  setApproveTableData,
  setPoDetails
) => {
  const capitalizeWords = str =>
    str
      ? str
          .toLowerCase()
          .trim()
          .replace(/\s+/g, ' ')
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      : ''
  const getItemDetails = async req_slno => {
    try {
      const result = await axioskmc.get(`/newCRFRegister/getDetailItemList/${req_slno}`)
      const { success, data } = result.data
      if (success === 1) {
        setReqItems(data)
      } else {
        setReqItems([])
      }
    } catch (error) {
      warningNotify('Error to fetch Data:', error)
      setReqItems([])
    }
  }
  const getApproItemDetails = async req_slno => {
    try {
      const result = await axioskmc.get(`/CRFRegisterApproval/getItemListApproval/${req_slno}`)
      const { success, data } = result.data
      if (success === 1) {
        setApproveTableData(data)
      } else {
        setApproveTableData([])
      }
    } catch (error) {
      warningNotify('Error to fetch Data:', error)
      setApproveTableData([])
    }
  }
  const getPODetails = async req_slno => {
    try {
      const result = await axioskmc.get(`/newCRFPurchase/getPoDetails/${req_slno}`)
      const { success, data } = result.data
      if (success === 1) {
        const poLIst = data
          .filter(
            (po, index, self) =>
              index ===
              self.findIndex(val => val.po_number === po.po_number && val.req_slno === po.req_slno)
          )
          .map(po => ({
            po_detail_slno: po.po_detail_slno,
            req_slno: po.req_slno,
            po_number: po.po_number,
            po_date: format(new Date(po.po_date), 'dd-MM-yyyy hh:mm:ss a'),
            expected_delivery: po.expected_delivery
              ? format(new Date(po.expected_delivery), 'dd-MM-yyyy')
              : 'Not Updated',
            supply_store: po.supply_store,
            main_store_slno: po.main_store_slno,
            storeName: capitalizeWords(po.main_store),
            substoreName: capitalizeWords(po.sub_store_name),
            store_code: po.store_code,
            store_recieve: po.store_recieve,
            supplier_name: capitalizeWords(po.supplier_name),
            po_type: po.po_type === 'S' ? 'Stock Order' : 'Specific',
            po_delivery: po.po_delivery,
            po_amount: po.po_amount,
            po_to_supplier: po.po_to_supplier,
            approval_level: po.approval_level,
            po_expiry: po.po_expiry ? format(new Date(po.po_expiry), 'dd-MM-yyyy') : 'Not Updated',
          }))
        const poItems = data?.map(val => {
          const obj = {
            po_detail_slno: val.po_detail_slno,
            po_number: val.po_number,
            item_code: val.item_code,
            item_name: val.item_name,
            item_qty: val.item_qty !== null ? val.item_qty : 0,
            item_rate: val.item_rate !== null ? val.item_rate : 0,
            item_mrp: val.item_mrp !== null ? val.item_mrp : 0,
            tax: val.tax !== null ? val.tax : 'Nil',
            tax_amount: val.tax_amount !== null ? val.tax_amount : 0,
            net_amount: val.net_amount !== 0 ? val.net_amount : 0,
          }
          return obj
        })
        const combinedData = poLIst?.map(po => {
          const details = poItems?.filter(
            item => item.po_number === po.po_number && item.po_detail_slno === po.po_detail_slno
          )
          return {
            ...po,
            items: details,
          }
        })
        setPoDetails(combinedData)
      } else {
        setPoDetails([])
      }
    } catch (error) {
      warningNotify('Error to fetch Data:', error)
      setPoDetails([])
    }
  }
  getItemDetails(req_slno)
  getApproItemDetails(req_slno)
  getPODetails(req_slno)
}
