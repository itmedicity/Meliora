import { Box, CssVarsProvider, Input } from '@mui/joy'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import CusIconButton from 'src/views/Components/CusIconButton'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import DownloadIcon from '@mui/icons-material/Download'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify } from 'src/views/Common/CommonCode'
import dayjs from 'dayjs'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'

import ReportDailyCensus from './ReportDailyCensus'
const DailyCensus = () => {
  const history = useNavigate()
  const [tableData, setTableData] = useState([])
  const [dailyDateFrom, setDailyDateFrom] = useState(moment(new Date()).format('YYYY-MM-DD'))
  const [dailyDateTo, setDailyDateTo] = useState(moment(new Date()).format('YYYY-MM-DD'))

  const backToSetting = useCallback(() => {
    history(`/Home/Reports`)
  }, [history])

  const [calculateTotal, setCalculateTotal] = useState({
    totYesterday: 0,
    totAdmission: 0,
    totDischarge: 0,
    totTransIn: 0,
    totTransOut: 0,
    totDeath: 0,
    totalcensus: 0,
    oraTotAdm: 0,
    oraTotDis: 0,
    oraTotDeath: 0,
    oraTotal: 0,
    oraYesttotal: 0,
    oraDamaTot: 0,
    oraLamaTot: 0,
  })
  const searchdata = useMemo(() => {
    return {
      census_datefrom: moment(new Date(dailyDateFrom)).format('YYYY-MM-DD'),
      census_dateto: moment(new Date(dailyDateTo)).format('YYYY-MM-DD'),
    }
  }, [dailyDateFrom, dailyDateTo])

  const SearchDetails = useCallback(
    (e) => {
      const GetCensusDetails = async (searchdata) => {
        const result = await axioslogin.post('/qidailycensus/viewReport', searchdata)
        return result.data
      }
      GetCensusDetails(searchdata).then((value) => {
        const { data, success, message } = value
        console.log(data)

        if (success === 1) {
          setTableData(data)
        } else {
          infoNotify(message)
          setTableData([])
        }
      })
      // })
    },
    [searchdata],
  )

  useEffect(() => {
    if (tableData.length !== 0) {
      const totyes = tableData
        ?.map((val) => val.yesterday_census)
        .reduce((prev, next) => Number(prev) + Number(next))
      const totad = tableData
        ?.map((val) => val.total_admission)
        .reduce((prev, next) => Number(prev) + Number(next))
      const totdis = tableData
        ?.map((val) => val.total_discharge)
        .reduce((prev, next) => Number(prev) + Number(next))
      const totin = tableData
        ?.map((val) => val.transfer_in)
        .reduce((prev, next) => Number(prev) + Number(next))
      const totout = tableData
        ?.map((val) => val.transfer_out)
        .reduce((prev, next) => Number(prev) + Number(next))
      const totdeath = tableData
        ?.map((val) => val.total_death)
        .reduce((prev, next) => Number(prev) + Number(next))
      const tot = tableData
        ?.map((val) => val.census_total)
        .reduce((prev, next) => Number(prev) + Number(next))
      const oraadm = tableData
        ?.map((val) => val.ora_admission)
        .reduce((prev, next) => Number(prev) + Number(next))
      const oradis = tableData
        ?.map((val) => val.ora_discharge)
        .reduce((prev, next) => Number(prev) + Number(next))
      const oradeath = tableData
        ?.map((val) => val.ora_death)
        .reduce((prev, next) => Number(prev) + Number(next))
      const oraTotalCount = tableData
        ?.map((val) => val.ora_census_total)
        .reduce((prev, next) => Number(prev) + Number(next))
      const oraYesterday = tableData
        ?.map((val) => val.ora_yesterday)
        .reduce((prev, next) => Number(prev) + Number(next))
      const damatot = tableData
        ?.map((val) => val.ora_dama)
        .reduce((prev, next) => Number(prev) + Number(next))
      const lamatot = tableData
        ?.map((val) => val.ora_lama)
        .reduce((prev, next) => Number(prev) + Number(next))
      const fromdata = {
        totYesterday: totyes,
        totAdmission: totad,
        totDischarge: totdis,
        totTransIn: totin,
        totTransOut: totout,
        totDeath: totdeath,
        totalcensus: tot,
        oraTotAdm: oraadm,
        oraTotDis: oradis,
        oraTotDeath: oradeath,
        oraTotal: oraTotalCount,
        oraYesttotal: oraYesterday,
        oraDamaTot: damatot,
        oraLamaTot: lamatot,
      }
      setCalculateTotal(fromdata)
    } else {
    }
  }, [tableData])

  const groupedMonthlyData = useMemo(() => {
    const group = {}
    tableData?.forEach((item) => {
      const dayKey = dayjs(item.census_date).format('YYYY-MM-DD')

      if (!group[dayKey]) {
        group[dayKey] = {
          rows: [],
          totals: {
            ora_admission: 0,
            ora_discharge: 0,
            ora_death: 0,
            ora_dama: 0,
            ora_lama: 0,
            ora_census_total: 0,
            census_total: 0,
            total_admission: 0,
            total_death: 0,
            total_discharge: 0,
            transfer_in: 0,
            transfer_out: 0,
            yesterday_census: 0,
          },
        }
      }

      group[dayKey].rows.push(item)

      // Update totals
      group[dayKey].totals.ora_admission += Number(item.ora_admission || 0)
      group[dayKey].totals.ora_discharge += Number(item.ora_discharge || 0)
      group[dayKey].totals.ora_death += Number(item.ora_death || 0)
      group[dayKey].totals.ora_dama += Number(item.ora_dama || 0)
      group[dayKey].totals.ora_lama += Number(item.ora_lama || 0)
      group[dayKey].totals.ora_census_total += Number(item.ora_census_total || 0)
      group[dayKey].totals.census_total += Number(item.census_total || 0)
      group[dayKey].totals.total_admission += Number(item.total_admission || 0)
      group[dayKey].totals.total_death += Number(item.total_death || 0)
      group[dayKey].totals.total_discharge += Number(item.total_discharge || 0)
      group[dayKey].totals.transfer_in += Number(item.transfer_in || 0)
      group[dayKey].totals.transfer_out += Number(item.transfer_out || 0)
      group[dayKey].totals.yesterday_census += Number(item.yesterday_census || 0)
    })

    return group
  }, [tableData])

  const exportToExcel = () => {
    const fileName = `Daily_census_Report`
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const fileExtension = '.xlsx'

    const flattenedData = []

    // Add column headers (manually since we're custom-building the rows)
    flattenedData.push([
      'Sl.No',
      'Nursing Station',
      'Date',
      'Yesterday Census',
      'Admissions',
      'Discharge',
      'Transfer In',
      'Transfer Out',
      'Death',
      'Total',
      'HIS Admissions',
      'HIS Discharge',
      'HIS Death',
      'HIS DAMA',
      'HIS LAMA',
      'HIS Current Status Total',
    ])

    let grandTotals = {
      ora_admission: 0,
      ora_discharge: 0,
      ora_death: 0,
      ora_dama: 0,
      ora_lama: 0,
      ora_census_total: 0,
      census_total: 0,
      total_admission: 0,
      total_death: 0,
      total_discharge: 0,
      transfer_in: 0,
      transfer_out: 0,
      yesterday_census: 0,
    }

    Object.entries(groupedMonthlyData).forEach(([date, { rows, totals }]) => {
      // Add date header row (like your grey header row)
      flattenedData.push([`${dayjs(date).format('D MMMM YYYY')}`])

      // Add all individual rows
      rows.forEach((row, index) => {
        flattenedData.push([
          index + 1,
          row.census_ns_name,
          row.census_date,
          row.yesterday_census,
          row.total_admission,
          row.total_discharge,
          row.transfer_in,
          row.transfer_out,
          row.total_death,
          row.census_total,
          row.ora_admission,
          row.ora_discharge,
          row.ora_death,
          row.ora_dama,
          row.ora_lama,
          row.ora_census_total,
        ])
      })

      // Add totals for the date
      flattenedData.push([
        '',
        'Total',
        '',
        totals.yesterday_census,
        totals.total_admission,
        totals.total_discharge,
        totals.transfer_in,
        totals.transfer_out,
        totals.total_death,
        totals.census_total,
        totals.ora_admission,
        totals.ora_discharge,
        totals.ora_death,
        totals.ora_dama,
        totals.ora_lama,
        totals.ora_census_total,
      ])

      // Update grand totals
      grandTotals.yesterday_census += totals.yesterday_census
      grandTotals.total_admission += totals.total_admission
      grandTotals.total_discharge += totals.total_discharge
      grandTotals.transfer_in += totals.transfer_in
      grandTotals.transfer_out += totals.transfer_out
      grandTotals.total_death += totals.total_death
      grandTotals.ora_admission += totals.ora_admission
      grandTotals.ora_discharge += totals.ora_discharge
      grandTotals.ora_death += totals.ora_death
      grandTotals.ora_dama += totals.ora_dama
      grandTotals.ora_lama += totals.ora_lama
      grandTotals.ora_census_total += totals.ora_census_total
    })

    // Add grand total footer (like <tfoot>)
    flattenedData.push([
      '',
      'Grand Total',
      '',
      grandTotals.yesterday_census,
      grandTotals.total_admission,
      grandTotals.total_discharge,
      grandTotals.transfer_in,
      grandTotals.transfer_out,
      grandTotals.total_death,
      grandTotals.ora_admission,
      grandTotals.ora_discharge,
      grandTotals.ora_death,
      grandTotals.ora_dama,
      grandTotals.ora_lama,
      grandTotals.ora_census_total,
    ])

    // Convert array of arrays to worksheet
    const ws = XLSX.utils.aoa_to_sheet(flattenedData)
    const wb = { Sheets: { 'Daily Census': ws }, SheetNames: ['Daily Census'] }
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], { type: fileType })
    FileSaver.saveAs(data, fileName + fileExtension)
  }

  return (
    <CardMasterClose title="DAILY CENSUS REPORT" close={backToSetting}>
      <Box sx={{ display: 'flex', mt: 1 }}>
        <Box sx={{ flex: 1 }}>
          <CssVarsProvider>
            <Input
              style={{ height: 40, borderRight: 'none', borderRadius: 0 }}
              slotProps={{
                input: {
                  max: moment(new Date()).format('YYYY-MM-DD'),
                },
              }}
              size="md"
              type="date"
              name="dailyDateFrom"
              value={dailyDateFrom}
              onChange={(e) => setDailyDateFrom(e.target.value)}
            />
          </CssVarsProvider>
        </Box>

        <Box sx={{ flex: 1 }}>
          <CssVarsProvider>
            <Input
              style={{ height: 40, borderRight: 'none', borderRadius: 0 }}
              slotProps={{
                input: {
                  max: moment(new Date()).format('YYYY-MM-DD'),
                },
              }}
              size="md"
              type="date"
              name="dailyDateTo"
              value={dailyDateTo}
              onChange={(e) => setDailyDateTo(e.target.value)}
            />
          </CssVarsProvider>
        </Box>

        <Box sx={{ flex: 1, ml: 1 }}>
          <CusIconButton size="sm" variant="outlined" clickable="true" onClick={SearchDetails}>
            <SearchOutlinedIcon fontSize="small" />
          </CusIconButton>

          <CusIconButton variant="outlined" size="sm" color="success" onClick={exportToExcel}>
            <DownloadIcon />
          </CusIconButton>
        </Box>
      </Box>
      <Box sx={{ mt: 1 }}>
        <ReportDailyCensus tableData={tableData} calculateTotal={calculateTotal} />
      </Box>
    </CardMasterClose>
  )
}

export default DailyCensus
