# Development Plan & Feature Implementation Log

## Date: 21-11-2026

### Feature: Common Report & Requisition Report — New Column: "TAT: Announce → Disch Bill" & Requisition Excel Export

#### Overview
Added the turnaround time (TAT) metric column, **`TAT_ANOUN_TODISBILL`** ("TAT: Announce → Disch Bill"), across both the **Discharge TAT Report** (`/Home/CommonReport`) and the **Discharge Requisition Report** (`/Home/RequisitionReport`). Enabled complete **Excel Download** in `RequisitionReport.jsx` with formatted values and dynamic filter-aware filenames.

#### Key Changes

1. **Backend Service (`supplier.service.js`)**
   - In `getCommonReport` and `getrequisitionCommonReport`, added and corrected `TAT_ANOUN_TODISBILL`:
     ```sql
     -- 8. TAT_ANOUN_TODISBILL
     CASE 
         WHEN DD.REQ_DATE IS NULL OR I.DMD_DATE IS NULL THEN NULL
         ELSE 
             CASE WHEN I.DMD_DATE < DD.REQ_DATE THEN '-' ELSE '' END ||
             CASE WHEN TRUNC(ABS(ROUND((I.DMD_DATE - DD.REQ_DATE) * 86400)) / 3600) < 10 THEN '0' ELSE '' END ||
             TRUNC(ABS(ROUND((I.DMD_DATE - DD.REQ_DATE) * 86400)) / 3600) || ':' ||
             LPAD(TRUNC(MOD(ABS(ROUND((I.DMD_DATE - DD.REQ_DATE) * 86400)), 3600) / 60), 2, '0') || ':' ||
             LPAD(MOD(ABS(ROUND((I.DMD_DATE - DD.REQ_DATE) * 86400)), 60), 2, '0')
     END AS "TAT_ANOUN_TODISBILL",
     ```

2. **Frontend Column Definition (`CommonReportColumns.js`)**
   - Added column:
     ```javascript
     { key: "TAT_ANOUN_TODISBILL", label: "TAT: Announce → Disch Bill", width: 180, align: "center", group: "tat", tooltipMl: "ഡിസ്ചാർജ് പ്രഖ്യാപനം മുതൽ ഡിസ്ചാർജ് ബിൽ തയ്യാറാക്കുന്നത് വരെയുള്ള സമയം" }
     ```

3. **Frontend Containers & Calculation Fallback (`CommonReport.js` & `RequisitionReport.jsx`)**
   - Added fallback calculation via `computeTatString(item.DIS_ANNOUNCED, item.BILL_DATE)`.
   - Included `row.TAT_ANOUN_TODISBILL` in real-time text search filters.
   - Enabled Excel Export in `RequisitionReport.jsx` (`onExportClick` with `xlsx`, `showExport={true}`).

4. **Excel Export**
   - Automatically included in exported Excel workbook with formatted column header and cell values.

---

## Date: 20-11-2026

### Feature: ICU Readmission Within 48 Hours Report with Doctor/Department Filters, Ward/Bed Columns & Excel Download

#### Overview
Implemented a dedicated **ICU Readmission Within 48 Hours Report** modeled after the modular architecture of `WaitingReport`. The report tracks inpatients transferred out of an Intensive Care Unit (ICU) and subsequently readmitted into an ICU within 48 hours—a critical NABH / JCI hospital quality indicator.

The report includes:
- API endpoint `router.post('/icureadmissionReport', checkToken, icureadmissionitingReport);`
- From Date & To Date range selector
- Department dropdown filter
- Doctor dropdown filter (dynamically scoped to selected department or across all doctors)
- Real-time multi-column keyword search (including Nurse Station & Bed No)
- KPI summary banner showing average readmission hours, patient count, and readmission breakdown (`≤ 24h` vs `24–48h`)
- Joy UI Table with sticky headers, color-coded badges, and bilingual tooltips (English & Malayalam)
- Full Excel download with all columns and bottom summary statistics row

#### Key Changes

1. **Backend Service (`supplier.service.js`)**
   - File: `d:\HIS NEW\His_Api_Clone\api\SupplierDetails\supplier.service.js`
   - Added `N.NSC_DESC` (Nurse Station / ICU Ward) and `B.BDC_NO` (Bed No) to query:
     ```sql
     LEFT JOIN NURSTATION N ON B.NS_CODE = N.NS_CODE
     ```
   - Bound dynamic `:FROM_DATE` and `:TO_DATE` parameters:
     ```sql
     AND RMD_RELESEDATE >= to_date(:FROM_DATE, 'dd/MM/yyyy hh24:mi:ss')
     AND RMD_RELESEDATE <= to_date(:TO_DATE, 'dd/MM/yyyy hh24:mi:ss')
     ```
   - Added unique key deduplication:
     ```javascript
     const key = row.IP_NO && row.ICU_RELEASE_TIME ? `${row.IP_NO}_${row.ICU_RELEASE_TIME}_${row.READMIT_TIME || ''}` : null;
     ```

2. **Frontend Architecture (`src/views/Report/CommonReport/`)**
   - `IcuReadmissionColumns.js`: 13 column definitions (including `NSC_DESC` - Nurse Station / ICU and `BDC_NO` - Bed No), bilingual tooltips, duration helpers, and statistics calculation logic.
   - `IcuReadmissionToolbar.jsx`: Date pickers, search button, Department & Doctor dropdowns, live search input (matching bed no & nurse station), Excel export, and KPI stats banner.
   - `IcuReadmissionTable.jsx`: Sticky header, column group color-coding, urgency badges (`≤ 24h` danger red, `24–48h` warning orange), and summary footer (`colSpan={11}`).
   - `IcuReadmission.jsx`: Container component managing state, API post request to `/supplierList/icureadmissionReport`, memoized filtering, and Excel export with all columns included.

3. **Routing & Navigation**
   - Route in `src/routes.js`: `{ path: 'IcuReadmissionReport', name: 'IcuReadmissionReport', element: <IcuReadmissionReport /> }`
   - Menu entry in `src/Menus/ReportsMenu.js`: `{ to: '/Home/IcuReadmissionReport', name: 'ICU Readmission Report', slno: 384 }`

---

## Date: 12-08-2026

### Feature: Medical Rep Certificate Re-upload Detection & Visual Highlighting in Weekly Booking Table

#### Overview
When a medical rep certificate file is rejected by the Purchase team and subsequently re-uploaded by the rep, the certificate record in `indent_certificates_details` has `filestatus = 0` and `message_sent_status = 1`. This update detects this condition and dynamically updates the Weekly Booking table with a distinct status badge ("Certificate Re-uploaded") and row background color highlighting.

#### Key Changes

1. **Backend Service (`indent.service.js`)**
   - File: `d:\Indedent Form\Meliora_api\Meliora_API\api\Indent_Module\indent.service.js`
   - Updated `getAppointmentsByDate` query to count certificate records where `filestatus = 0` and `message_sent_status = 1` for the token/medicine:
     ```sql
     (
         SELECT COUNT(*) 
         FROM indent_certificates_details icd 
         WHERE (icd.tokenid = tr.token_id OR icd.indent_medicine_slno = d.medicine_id)
           AND icd.filestatus = 0 
           AND icd.message_sent_status = 1
     ) AS reuploaded_cert_count
     ```

2. **Frontend UI Component (`Weekelybooking.jsx`)**
   - File: `d:\Indedent Form\Meliora\src\views\IndentModule\WeekelyBooking\Weekelybooking.jsx`
   - Updated appointments table mapping to check `isReuploaded = Number(apt.reuploaded_cert_count) > 0`.
   - Renders status badge `"Certificate Re-uploaded"` with CSS class `status-reuploaded`.
   - Applies row class `row-reuploaded` to highlight table rows.
   - Added `onSuccess` callback to `UploadIndentFormModal` to trigger table re-fetch on form submission.

3. **Frontend Styling (`Weekelybooking.css`)**
   - File: `d:\Indedent Form\Meliora\src\views\IndentModule\WeekelyBooking\Weekelybooking.css`
   - Added CSS rules for `.status-reuploaded` badge (soft indigo background, indigo text, border).
   - Added CSS rules for `.row-reuploaded` (soft lavender background tint `#f5f3ff` with an indigo `#6366f1` left accent border).
