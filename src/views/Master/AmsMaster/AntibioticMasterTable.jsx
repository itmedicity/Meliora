import { Box, CssVarsProvider, Table } from '@mui/joy'
import React, { useCallback } from 'react'
import { useQuery } from 'react-query'
import { axioslogin } from 'src/views/Axios/Axios'
import DownloadIcon from '@mui/icons-material/Download'
import CusIconButton from 'src/views/Components/CusIconButton'
import * as XLSX from 'xlsx'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined'

const AntibioticMasterTable = ({ editMast }) => {
  const { data: antibioticTableData = [] } = useQuery(['getAllAntibioticList'], async () => {
    const response = await axioslogin.get('/amsAntibiotic/getAntibiotics')
    return response.data.data
  })

  const ExportToExcel = useCallback(() => {
    if (antibioticTableData.length > 0) {
      // Define the headers and corresponding keys
      const headers = [
        { label: 'Master Slno', key: 'ams_mast_slno' },
        { label: 'Item Code', key: 'item_code' },
        { label: 'Item Description', key: 'itc_desc' },
        { label: 'Manufacturer', key: 'manufacturer' },
        { label: 'Composition/Volume', key: 'composition_volume' },
        { label: 'Pregnancy Category', key: 'pregnancy_category' },
        { label: 'Dosage Form', key: 'dosage_form' },
        { label: 'VED Analysis', key: 'vital_essential' },
        { label: 'Storage Condition', key: 'storage_condition' },
        { label: 'Strip', key: 'strip' },
        { label: 'Item MRP', key: 'item_mrp' },
        { label: 'Restricted', key: 'restricted' },
        { label: 'Inactive', key: 'inactive' },
        { label: 'High Risk', key: 'high_risk' },
        { label: 'Antibiotic', key: 'antibiotic' },
        { label: 'Stopped Medicine', key: 'stopped_medicine' },
        { label: 'Status', key: 'status' },
      ]

      // Map the data to match the headers with conditional formatting
      const exportData = antibioticTableData.map(item => ({
        'Master Slno': item.ams_mast_slno,
        'Item Code': item.item_code,
        'Item Description': item.itc_desc,
        Manufacturer: item.manufacturer,
        'Composition/Volume': item.composition_volume,
        'Pregnancy Category': item.pregnancy_category,
        'Dosage Form': item.dosage_form,
        'VED Analysis': item.vital_essential,
        'Storage Condition': item.storage_condition,
        Strip: item.strip,
        'Item MRP': item.item_mrp,
        Restricted: item.restricted === 1 ? 'Yes' : 'No',
        Inactive: item.inactive === 1 ? 'Yes' : 'No',
        'High Risk': item.high_risk === 1 ? 'Yes' : 'No',
        Antibiotic: item.antibiotic === 1 ? 'Yes' : 'No',
        'Stopped Medicine': item.stopped_medicine === 1 ? 'Yes' : 'No',
        Status: item.status === 1 ? 'Active' : 'Inactive',
      }))

      // Create worksheet and workbook
      const worksheet = XLSX.utils.json_to_sheet(exportData, { header: headers.map(h => h.label) })
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Antibiotic List')

      // Write to file
      const date = new Date().toISOString().slice(0, 10) // YYYY-MM-DD
      XLSX.writeFile(workbook, `Antibiotic_List_${date}.xlsx`)

      succesNotify('Excel file downloaded successfully!')
    } else {
      warningNotify('No data to export')
    }
  }, [antibioticTableData])

  return (
    <CssVarsProvider>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', pb: 0.5 }}>
        <CusIconButton variant="outlined" size="sm" color="success">
          <DownloadIcon onClick={ExportToExcel} />
        </CusIconButton>
      </Box>
      {antibioticTableData.length > 0 ? (
        <Table stickyHeader borderAxis="both" size="sm" style={{ width: 3000 }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'center', width: 80 }}>Master Slno</th>
              <th style={{ textAlign: 'center', width: 60 }}>Edit</th>
              <th style={{ textAlign: 'center', width: 90 }}>Item Code</th>
              <th style={{ textAlign: 'center', width: 'auto' }}>Item Description</th>
              <th style={{ textAlign: 'center', width: 100 }}>VED Analysis</th>
              <th style={{ textAlign: 'center', width: 'auto' }}>Manufacturer</th>
              <th style={{ textAlign: 'center', width: 'auto' }}>Composition/Volume</th>
              <th style={{ textAlign: 'center', width: 'auto' }}>Dosage Form</th>
              <th style={{ textAlign: 'center', width: 150 }}>Pregnancy Category</th>
              <th style={{ textAlign: 'center', width: 'auto' }}>Storage Condition</th>
              <th style={{ textAlign: 'center', width: 80 }}>Strip</th>
              <th style={{ textAlign: 'center', width: 100 }}>Item Mrp</th>
              <th style={{ textAlign: 'center', width: 80 }}>Restricted</th>
              <th style={{ textAlign: 'center', width: 80 }}>Inactive</th>
              <th style={{ textAlign: 'center', width: 80 }}>High Risk</th>
              <th style={{ textAlign: 'center', width: 80 }}>Antibiotic</th>
              <th style={{ textAlign: 'center', width: 100 }}>Stopped Medicine</th>
              <th style={{ textAlign: 'center', width: 80 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {antibioticTableData.map((val, index) => (
              <tr key={index}>
                <td style={{ textAlign: 'center' }}>{val.ams_mast_slno}</td>
                <td style={{ textAlign: 'center' }}>
                  <ModeEditOutlinedIcon
                    sx={{ cursor: 'pointer', color: '#255a94' }}
                    onClick={() => editMast(val)}
                  />
                </td>
                <td style={{ textAlign: 'center' }}>{val.item_code}</td>
                <td style={{ textAlign: 'center' }}>{val.itc_desc}</td>
                <td style={{ textAlign: 'center' }}>{val.vital_essential}</td>
                <td style={{ textAlign: 'center' }}>{val.manufacturer}</td>
                <td style={{ textAlign: 'center' }}>{val.composition_volume}</td>
                <td style={{ textAlign: 'center' }}>{val.dosage_form}</td>
                <td style={{ textAlign: 'center' }}>{val.pregnancy_category}</td>
                <td style={{ textAlign: 'center' }}>{val.storage_condition}</td>
                <td style={{ textAlign: 'center' }}>{val.strip}</td>
                <td style={{ textAlign: 'center' }}>{val.item_mrp}</td>
                <td style={{ textAlign: 'center' }}>{val.restricted === 1 ? 'Yes' : 'No'}</td>
                <td style={{ textAlign: 'center' }}>{val.inactive === 1 ? 'Yes' : 'No'}</td>
                <td style={{ textAlign: 'center' }}>{val.high_risk === 1 ? 'Yes' : 'No'}</td>
                <td style={{ textAlign: 'center' }}>{val.antibiotic === 1 ? 'Yes' : 'No'}</td>
                <td style={{ textAlign: 'center' }}>{val.stopped_medicine === 1 ? 'Yes' : 'No'}</td>
                <td style={{ textAlign: 'center' }}>{val.status === 1 ? 'Active' : 'Inactive'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Box
          sx={{
            height: 300,
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            flex: 1,
            pt: 15,
            border: 1,
            borderColor: 'lightgrey',
          }}
        >
          No data available
        </Box>
      )}
    </CssVarsProvider>
  )
}

export default AntibioticMasterTable
