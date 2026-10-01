# Meliora Project - Recent Updates & Changes

**Date:** September 17, 2026  
**Module:** Common Report (Discharge TAT) — `/Home/CommonReport`  
**Author / Tracked By:** Engineering Team  

---

This document details the recent updates and architectural enhancements made to the **Meliora** application on **September 17, 2026**, specifically within the **Common Report (Discharge TAT)** module.

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
