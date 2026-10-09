## Previous Updates
### Common Report (Discharge TAT) — `/Home/CommonReport`
**Date:** September 17, 2026  
**Author / Tracked By:** Engineering Team  

---

This section details the updates and architectural enhancements made to the **Meliora** application on **September 17, 2026**, specifically within the **Common Report (Discharge TAT)** module.

---

## 1. New Filter Option: "Without Observation" (Admission Reason)
*Released: September 17, 2026*

### Overview
Added an option to filter out patients admitted under the **Observation** category. In hospital turnaround time (TAT) tracking, observation admissions often follow different clinical workflows compared to standard inpatient stays, which can skew overall discharge TAT metrics.

### Key Changes
- **Filter State**: Added `excludeObservation` boolean state (defaults to `false`).
- **Filtering Logic**:
  - Automatically filters records where `ADMISS_REASON` includes `"OBSERVATION"` or is `"OBS"` (case-insensitive).
  - Handles null, undefined, or alternative reasons gracefully without data loss.
- **UI Toggle Pill**:
  - Added a responsive **Without Observation** toggle button in the filter toolbar alongside *Without Oncology Day Care* and *Discharge Announced Only*.
  - Styled with Joy UI tokens, active blue borders, subtle background highlights, and hover animations.
  - Includes a descriptive tooltip: *"Exclude patients with Admission Reason as Observation"*.
  - Disabled when no table data is loaded.
- **Excel Export**:
  - Appends `_without_Observation` to the generated `.xlsx` filename when the filter is active.

---

## 2. Component Modularization of Common Report
*Released: September 17, 2026*

### Overview
Refactored the monolithic **[CommonReport.js](file:///d:/Meliora/Meliora/src/views/Report/CommonReport/CommonReport.js)** (~805 lines) into focused, single-responsibility components under `src/views/Report/CommonReport/` to improve code maintainability, reusability, and readability, while preserving **100%** of existing functionality and design.

### New Module Structure

```
src/views/Report/CommonReport/
├── CommonReportColumns.js    # Column definitions, widths, groups & Malayalam tooltips
├── CommonReportToolbar.jsx   # Date selectors, action buttons, toggle pills & search input
├── CommonReportTable.jsx     # Joy UI Table, sticky headers, group colors, tooltips & rows
└── CommonReport.js           # Main container: State, API calls, data filtering & Excel export
```

### Component Details

#### 1. [CommonReportColumns.js](file:///d:/Meliora/Meliora/src/views/Report/CommonReport/CommonReportColumns.js)
- **Extracted**: 40+ column configuration items with keys, alignment, widths, group classifications (`general`, `timestamp`, `tat`), and bilingual English & Malayalam descriptions.
- **Utility**: Exports `formatCellValue(val, isTat)` for table cell formatting and Excel data transformation.

#### 2. [CommonReportToolbar.jsx](file:///d:/Meliora/Meliora/src/views/Report/CommonReport/CommonReportToolbar.jsx)
- **Row 1**:
  - `From` and `To` date pickers with calendar icons and maximum date constraints.
  - `Search Report` button with loading state.
  - `Total Records` / `Showing X of Y` status chip.
  - `Export Excel` button with download icon.
- **Row 2**:
  - Department dropdown selector populated dynamically from fetched data.
  - **Without Oncology Day Care** toggle pill.
  - **Without Observation** toggle pill.
  - **Discharge Announced Only** toggle pill.
  - Real-time search bar with instant clear icon.

#### 3. [CommonReportTable.jsx](file:///d:/Meliora/Meliora/src/views/Report/CommonReport/CommonReportTable.jsx)
- **Loading State**: Circular progress indicator with user feedback.
- **Empty States**: Context-aware messages (*"No Data Available"* vs *"No matching records found"*).
- **Header Features**: Sticky header row with soft color-coding by group:
  - General info: `#f1f5f9` (Neutral grey)
  - Timestamps: `#e0f2fe` (Soft blue)
  - TAT intervals: `#ede9fe` (Soft purple)
  - Interactive tooltips with Malayalam and English explanations on header hover.
- **Row Styling**: Alternating row backgrounds, hover highlights, Cash/Credit badge chips for `BILL_TYPES`, and monospace formatting for TAT durations.

#### 4. [CommonReport.js](file:///d:/Meliora/Meliora/src/views/Report/CommonReport/CommonReport.js)
- Reduced from **805 lines** to **~220 lines**.
- Pure orchestrator responsible for:
  - State management (`dailyDateFrom`, `dailyDateTo`, `selectedDepartment`, `excludeOncology`, `excludeObservation`, `onlyWithDischargeAnnounced`, `searchTerm`, `loading`, `tableData`).
  - API communication (`axiosellider.post('/supplierList/CommonReport')`).
  - IP number / Admission number deduplication logic.
  - Memoized department extraction and multi-criteria client-side filtering.
  - Excel file generation with dynamic suffix naming via `xlsx`.
  - Seamless integration with the existing route (`/Home/CommonReport`).

---

## 3. Benefits & Impact

| Metric / Aspect | Before Refactoring | After Refactoring (Sept 17, 2026) |
|---|---|---|
| **CommonReport.js Size** | 805 lines (monolithic) | ~220 lines (clean orchestrator) |
| **Component Count** | 1 single large file | 4 modular files in `CommonReport/` |
| **Admission Filters** | Department, Oncology Day Care, Discharge Announced | + **Without Observation** filter |
| **Maintainability** | Difficult to locate UI vs logic | Separated into columns, toolbar, table, and container |
| **Functionality / UI Parity** | Baseline | 100% identical styling and behavior preserved |





# Meliora Project - Recent Updates & Changes

**Last Updated:** September 22, 2026  
**Author / Tracked By:** Engineering Team  

---

## Bed Status Report & Live Bed Statistics API
*Released: September 22, 2026*  
*Module: Bed Status Report — `/Home/BedStatusReport`*  
*Backend Route: `router.post('/BedStatus', checkToken, getBedStatusReport)`*  

### Overview
Implemented the **Bed Status Report** feature enabling real-time monitoring of hospital bed occupancy across nursing stations and hospital outlets. On clicking the **"Show Current Bed Status"** action button, the system triggers the backend API to query live inpatient bed distribution from the Oracle database and renders the statistics with KPI summary cards, filtering, and Excel export capabilities.

### 1. Backend Service & SQL Query (`His_Api_Clone`)
**File:** [supplier.service.js](file:///d:/HIS%20NEW/His_Api_Clone/api/SupplierDetails/supplier.service.js)  
**Controller:** `supplier.controller.js` (`getBedStatusReport`)  
**Router:** `supplier.router.js` (`router.post('/BedStatus', checkToken, getBedStatusReport)`)  
**Mounted Endpoint:** `/api/supplierList/BedStatus`  


### 2. Frontend Implementation (`Meliora`)
**Route:** `/Home/BedStatusReport` (registered in `routes.js`, menu item slno: 373 in `ReportsMenu.js`)  
**Components:**
- [BedStatusReport.jsx](file:///d:/Meliora/Meliora/src/views/Report/CommonReport/BedStatusReport.jsx): Main coordinator component handling state, queries, bed-count synchronization, and Excel export.
- [BedStatusToolbar.jsx](file:///d:/Meliora/Meliora/src/views/Report/CommonReport/BedStatusToolbar.jsx): Action controls, real-time fetch/refresh buttons with interactive 360° spin animations, outlet dropdown selector, search box, and export action.
- [BedStatusKpiCards.jsx](file:///d:/Meliora/Meliora/src/views/Report/CommonReport/BedStatusKpiCards.jsx): KPI summary count cards with customized CSS keyframe micro-animations for each count.
- [BedStatusTable.jsx](file:///d:/Meliora/Meliora/src/views/Report/CommonReport/BedStatusTable.jsx): Joy UI sticky header table with zebra styling, badge rendering, loading/empty states, and totals footer.

#### Key Features:
- **"Show Current Bed Status" & Animated Refresh Buttons**: Primary action button with spinner and a responsive Refresh button featuring smooth 180° hover transitions, continuous 360° cubic-bezier keyframe spin on click, and glowing active feedback.
- **KPI Summary Cards**: Real-time overview cards featuring customized, GPU-accelerated animated icons for each count:
  - **Stations**: Total count with a floating door icon (`MeetingRoomOutlinedIcon`, gentle vertical float).
  - **Total Beds**: Hospital-wide bed capacity with a pulsing blue bed icon (`HotelOutlinedIcon`, rhythmic scale pulse).
  - **Available Beds**: Ready beds with a heartbeat pulsing green checkmark (`CheckCircleOutlineIcon`, double-beat pulse).
  - **Occupied Beds**: Current occupancy with an amber bed sway animation (`HotelOutlinedIcon`, warm breathing sway).
  - **Admitted Patients**: Inpatient count with a gentle bounce purple people icon (`PeopleAltOutlinedIcon`, subtle tilt & bounce).
  - **Not Ready**: Pending beds with a caution wobble rose icon (`WarningAmberIcon`, attention wobble pulse).
- **Search & Outlet Filter**: Real-time text search across nursing station and outlet descriptions, plus an outlet dropdown selector.
- **Interactive Data Table**:
  - Sticky header Joy UI table with alternating zebra rows.
  - Columns: `Sl No`, `Nursing Station`, `Outlet / Location`, `Total Beds`, `Admitted Patients`, `Remaining Beds`, `Discharged`, `Available Beds`, `Not Ready`, and `Occupancy %`.
  - Color-coded badges for bed counts and occupancy rate tiers (<70% green, 70-90% amber, >90% danger).
  - Grand total footer row summarizing all quantitative columns.
- **Active Bed Stations Filtering**: Sourced bed counts strictly from `getallnursestation` (`getallNurseStationMaster`), completely disregarding any bed count returned by `/supplierList/BedStatus`. Stations without configured beds in `getallnursestation` (count = 0) are excluded from the report, KPI cards, filter options, and Excel export.
- **Excel Export**: Export filtered rows with formatted columns and totals row to `.xlsx`, featuring an interactive download bounce animation, tactile press feedback, and active `"Exporting..."` state.

---

## Bed Count Master (`Bedcountmaster`)
*Released: September 21, 2026*  
*Module: Master Settings — `/Home/Bedcountmaster`*  
*Component: [Bedcountmaster.jsx](file:///d:/Meliora/Meliora/src/views/Master/BedCountMaster/Bedcountmaster.jsx)*  
*Backend APIs: `/feedback/nursestationinsert`, `/feedback/updatenursestation`, `/feedback/getallnursestation`*  

### Overview
The **Bed Count Master** module provides hospital administration with a centralized interface to configure, update, and manage the total sanctioned bed capacity for every nursing station, mapped by hospital block and floor.

### Key Features:
- **Nursing Station Integration**: Fetches active nursing stations directly from the Ellider database (`getallNurseStation()`) into the `SelectNursingStation` dropdown.
- **Block & Floor Association**:
  - Checkbox selection for Hospital Block (`HB`) and Service Block (`SB`).
  - Cascading `SelectFloorMaster` dropdown dynamically filtered by the selected Block type.
- **Bed Capacity Management**: Numerical field to configure `total_beds` with mandatory field validation before submission.
- **Status Toggle**: Active / Inactive status checkbox for operational control.
- **Insert & Update Operations**:
  - Supports new entry creation via `axioslogin.post('/feedback/nursestationinsert')` with duplicate checks (`Item Already Exists`).
  - Supports inline editing and updating of existing mappings via `axioslogin.post('/feedback/updatenursestation')`.
- **AG-Grid Master Table**:
  - Rendered via `CusAgGridMast` with columns: `Sl No`, `Nurse Station`, `Floor Name`, `Total Beds`, `Status` (Active/Inactive), and `Action`.
  - Action column provides an Edit button (`EditButton`) to populate the form fields for instant record modification.

---