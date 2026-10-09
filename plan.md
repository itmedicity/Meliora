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




# Meliora Project - Recent Updates & Changes

**Date:** September 2026  
**Module:** Diet Management  
**Author / Tracked By:** Rohith krishna R  

---

This document details the **Diet Management Module** of the **Meliora** application, covering the complete hospital diet and food-service workflow from **diet master configuration, patient diet planning and dietician consultation to diet processing, KOT preparation, food delivery, canteen operations, billing, collection closing and petty cash management**.

The module is organized into multiple functional areas and reusable components to support the complete operational lifecycle of patient food and canteen services.

---

## 4. Diet Management Module

### Overview

The Diet Management Module manages the complete hospital diet-service workflow.

The module handles:

- Diet and food master configuration.
- Patient diet planning and modification.
- Dietician assignment and consultation.
- Patient food ordering.
- Extra food orders.
- Diet processing.
- KOT generation and kitchen processing.
- Food packet preparation.
- Patient food delivery.
- Canteen order confirmation.
- Direct canteen orders.
- Patient, bystander, staff and doctor food orders.
- Patient and bystander billing.
- Discharge billing.
- Thermal bill printing.
- Barcode generation and printing.
- Collection and cash closing.
- Daily canteen closing.
- Petty cash allocation and management.

The overall workflow is:

```text
Diet Masters
      ?
Patient Diet Planning
      ?
Dietician Consultation
      ?
Diet Order
      ?
Diet Processing
      ?
KOT Generation
      ?
Kitchen Preparation
      ?
Packet Preparation
      ?
Food Delivery
      ?
Billing / POS
      ?
Collection
      ?
Daily Closing
```

---

## 4.1 Diet Master Configuration

### Overview

The **Diet Masters** section contains the master configuration required for the Diet Management Module.

These masters provide the base information used throughout patient diet planning, food ordering, kitchen processing, delivery and billing.

### Module Structure

```text
DietMasters/

+-- BillingCategoryMaster/
+-- CanteenHighlight/
+-- CanteenHighLightMapping/
+-- Diet/
+-- DietAllergencyMaster/
+-- DietComponent/
+-- DietDelivaryMaster/
+-- DietDetail/
+-- DietIssueSchedule/
+-- DietMenuSetting/
+-- DietRoomMaster/
+-- DietRoomTypeGroupingMaster/
+-- DietSpecialityMaster/
+-- DietStyle/
+-- DietTemplate/
+-- DietType/
+-- ItemAlias/
+-- ItemCategoryMaster/
+-- ItemGroup/
+-- ItemMaster/
+-- ItemType/
+-- OrderPartyType/
+-- PatientDietMaster/
+-- RateList/
+-- TimeSlamb/
+-- UnitMaster/
```

### Component Details

#### 1. Billing Category Master

**Files:**

```text
BillingCategoryMaster.jsx
BillingCategoryTable.jsx
```

- Maintains billing categories used by Diet and Canteen operations.
- Allows users to create and maintain billing category records.
- Displays configured categories in a table.
- Provides category information for billing-related workflows.

#### 2. Canteen Highlight Master

**Files:**

```text
CanteenHighlight.jsx
HighlightMasterTable.jsx
```

- Maintains highlight definitions used in Canteen operations.
- Allows users to configure visual indicators for food items and orders.
- Displays configured highlights in a table.
- Provides reusable highlight information for Canteen screens.

#### 3. Canteen Highlight Mapping

**Files:**

```text
HighlightMappingMaster.jsx
HighlightMappingTable.jsx
```

- Maps configured highlights to applicable food items.
- Maintains food-item-to-highlight relationships.
- Provides mapped highlight information to Canteen screens.

#### 4. Diet Master

**Files:**

```text
DietMaster.jsx
DietMasterTable.jsx
```

- Maintains the primary diet definitions used throughout the application.
- Allows creation and maintenance of available diets.
- Provides diet information for patient planning and processing.

#### 5. Diet Allergy Master

**Files:**

```text
DietAllergencyMaster.jsx
DietAllergencyMasterTable.jsx
```

- Maintains diet allergy and restriction information.
- Supports allergy-related food restrictions.
- Provides allergy information during patient diet planning.

#### 6. Diet Component

**Files:**

```text
DietAddFoodForm.jsx
DietDayRow.jsx
DietDetailExpand.jsx
DietFoodItemRow.jsx
DietFoodRow.jsx
DietFoodTable.jsx
DietInputLabel.jsx
DietMasterHeader.jsx
DietMealPriceTable.jsx
DietMealSection.jsx
DietTable.jsx
DietWeekTable.jsx
```

- Provides reusable UI components for displaying and editing diet information.
- Provides food item rows and food-level data entry.
- Provides day-wise and week-wise diet structures.
- Provides meal sections and meal-level information.
- Displays meal pricing information.
- Provides expandable diet details.
- Provides common labels, headers and table structures used by Diet master screens.
- Supports structured display of diet, food and meal information.

#### 7. Diet Delivery Time Master

**Files:**

```text
DietDeliveryTimeMaster.jsx
DietDeliveryTimeMasterTable.jsx
```

- Maintains diet delivery-time configuration.
- Defines applicable meal/service delivery periods.
- Supports preparation and delivery scheduling.

#### 8. Diet Detail Master

**Files:**

```text
DietDetailMast.jsx
DietdetlTable.jsx
```

- Maintains detailed diet-related configuration.
- Provides additional information associated with configured diets.
- Supports patient diet planning and processing.

#### 9. Diet Issue Schedule

**Files:**

```text
DietIssueScheduleMast.jsx
DietIssueScheduleMastTable.jsx
```

- Maintains the schedule used for issuing diet and food items.
- Supports meal-wise issue timing.
- Provides scheduling information for diet processing.

#### 10. Diet Menu Setting

**Files:**

```text
DietMenuSettCmp.jsx
DietMenuSetting.jsx
DietMenuSettingTable.jsx
```

- Maintains menu configuration for the Diet operation.
- Associates food items with applicable diets and meals.
- Provides menu information used during food planning and processing.

#### 11. Diet Room Master

**Files:**

```text
DietRoomMaster.jsx
DietRoomMasterTable.jsx
```

- Maintains room-related Diet configuration.
- Supports room-based patient diet and delivery operations.

#### 12. Diet Room Type Grouping Master

**Files:**

```text
DietRoomTypeGroupingMaster.jsx
DietDayFoodList.jsx
TempFoodPreview.jsx
```

- Groups rooms according to room type.
- Supports room-type-specific food configuration.
- Displays food configured for particular room groups.
- Provides preview functionality for room-based food configuration.

#### 13. Diet Speciality Master

**Files:**

```text
DietSpecialityMaster.jsx
DietSpecialityMasterTable.jsx
```

- Maintains diet speciality configuration.
- Supports speciality-specific diet planning and food selection.
- Provides speciality information for diet configuration.

#### 14. Diet Template

**Files:**

```text
DietTemplate.jsx
DietTemplateTable.jsx
```

- Maintains reusable diet templates.
- Provides predefined diet and food combinations.
- Allows frequently used diet configurations to be reused during patient planning.

#### 15. Diet Type Master

**Files:**

```text
DietTypeMast.jsx
DietTypeMastTable.jsx
```

- Maintains diet type and classification information.
- Supports grouping and categorization of available diets.

#### 16. Item Alias Master

**Files:**

```text
ItemAliasMaster.jsx
ItemAliasMasterTable.jsx
```

- Maintains alternate names for food items.
- Supports item searching using different names or aliases.
- Helps standardize food item identification.

#### 17. Item Category Master

**Files:**

```text
ItemCategoryMaster.jsx
ItemCategoryMasterTable.jsx
```

- Maintains food item categories.
- Groups items into logical categories.
- Supports item organization and menu management.

#### 18. Item Group Master

**Files:**

```text
ItemGroupMast.jsx
ItemGroupTable.jsx
```

- Maintains logical food item groups.
- Supports organization of food items for menu and kitchen operations.

#### 19. Item Master

**Files:**

```text
ItemMaster.jsx
ItemMasterTable.jsx
```

- Provides the central food-item master.
- Maintains food item details.
- Supports category, group, type and unit configuration.
- Provides food items to Diet, Canteen, KOT and billing workflows.

#### 20. Item Master Recipe Cards

**Directory:**

```text
ItemMaster/RecipeCards/
```

**Files:**

```text
AddFoodButton.jsx
AnimatedFoodIcon.jsx
Field.jsx
FoodDetails.jsx
FoodForm.jsx
FoodNameSection.jsx
FoodSpecialitySection.jsx
FoodSuggestionItem.jsx
ImageCarouselPreview.jsx
ImageUpload.jsx
IngredientList.jsx
IngredientSection.jsx
NewItemAdd.jsx
RoomPriceList.jsx
TitleCard.jsx
ViewItemDetail.jsx
```

- Provides detailed food and recipe management.
- Allows food items to be created with recipe information.
- Maintains food name and food details.
- Maintains ingredients and ingredient quantities.
- Supports food speciality information.
- Supports food image upload and preview.
- Provides food suggestions during item selection.
- Maintains room-specific pricing information.
- Provides detailed food item viewing and editing.
- Provides reusable fields, title sections and food form components.

#### 21. Item Type Master

**Files:**

```text
ItemTypeMaster.jsx
ItemTypeMasterTable.jsx
```

- Maintains item type classification.
- Supports item-level categorization used by food and ordering workflows.

#### 22. Order Party Type Master

**Files:**

```text
OrderPartyType.jsx
OrderPartyTypeTable.jsx
```

- Maintains the different parties for whom food orders can be created.
- Supports patient, bystander, staff, doctor and other applicable order categories.
- Provides party type information to ordering and billing workflows.

#### 23. Patient Diet Master

**Files:**

```text
PatientDietMaster.jsx
PatientDietMasterTable.jsx
```

- Maintains patient-specific diet configuration.
- Supports patient diet management and related master information.

#### 24. Rate List Master

**Files:**

```text
RateListMast.jsx
RateListMastTable.jsx
```

- Maintains food and diet rate configuration.
- Provides pricing information used during billing.

#### 25. Time Slab Master

**Files:**

```text
TimeSlampMast.jsx
TimeSlampMastTable.jsx
```

- Maintains time-slot configuration.
- Supports meal and operational time-based processing.

#### 26. Unit Master

**Files:**

```text
UnitMaster.jsx
UnitMasterTable.jsx
```

- Maintains measurement units used by food items.
- Supports quantity and item configuration.

---

## 4.2 Diet Core Operations

### Overview

The main `Diet/` section contains the operational screens used for patient diet planning, diet ordering, order search and delivery marking.

### Module Structure

```text
Diet/

+-- DietDeliveryMark.jsx
+-- DietOrderList.jsx
+-- DietOrderSearch.jsx
+-- DietPlan.jsx
+-- DietProcess.jsx
+-- DietProcessModel.jsx
+-- DietprocessTable.jsx
+-- RoomSelectDelivery.jsx
```

### Component Details

#### 1. Diet Plan

**File:**

```text
DietPlan.jsx
```

- Provides the patient diet planning workflow.
- Allows the user to review and maintain a patient's diet.
- Provides the operational interface for creating or modifying diet plans.

#### 2. Diet Process

**File:**

```text
DietProcess.jsx
```

- Provides access to diet processing operations.
- Coordinates the processing of configured patient diet requirements.

#### 3. Diet Process Model

**File:**

```text
DietProcessModel.jsx
```

- Provides model/dialog-level functionality associated with Diet processing.
- Supports processing-related user interactions.

#### 4. Diet Process Table

**File:**

```text
DietprocessTable.jsx
```

- Displays diet processing information in a structured table.
- Provides visibility into the diet items/orders being processed.

#### 5. Diet Order List

**File:**

```text
DietOrderList.jsx
```

- Displays patient diet orders.
- Provides visibility into existing food orders.
- Supports reviewing order information before subsequent processing.

#### 6. Diet Order Search

**File:**

```text
DietOrderSearch.jsx
```

- Provides search functionality for Diet orders.
- Helps users locate patient/order information without navigating through the complete order list.

#### 7. Diet Delivery Mark

**File:**

```text
DietDeliveryMark.jsx
```

- Provides delivery marking functionality.
- Allows operational users to update food delivery information after the food reaches the patient.

#### 8. Room Select Delivery

**File:**

```text
RoomSelectDelivery.jsx
```

- Provides room-based delivery selection.
- Helps delivery operations identify the applicable room/patient for food delivery.

---

## 4.3 Inpatient Diet Management

### Overview

The Inpatient Diet Management area provides the primary workflow for managing diets assigned to admitted patients.

### Module Structure

```text
DietInpatientList/

+-- DietInpatientMainPage.jsx
+-- DietInpatientComponents/
|   +-- DietPlanCurrentTable.jsx
|   +-- DietPlanFooter.jsx
|   +-- DietPlanHeader.jsx
|   +-- InpatientDietTab.jsx
|   +-- NewDietPlanSection.jsx
|   +-- PatientCard.jsx
|   +-- Component/
|       +-- DietRoomServiceError.jsx
|       +-- DietRoomServiceLoading.jsx
|       +-- NoPatientFound.jsx
|       +-- NsStationError.jsx
|
+-- InpateintFilter/
    +-- InpatientFilter.jsx
    +-- SelectPatientDiet.jsx
```

### Component Details

#### 1. Diet Inpatient Main Page

**File:**

```text
DietInpatientMainPage.jsx
```

- Provides the main inpatient diet management screen.
- Displays eligible inpatient patients.
- Provides patient selection.
- Provides access to current and new diet plans.
- Coordinates the inpatient diet workflow.

#### 2. Patient Card

**File:**

```text
PatientCard.jsx
```

- Displays patient identification and admission information.
- Provides a compact patient-level view for selection and diet management.

#### 3. Diet Plan Header

**File:**

```text
DietPlanHeader.jsx
```

- Displays the header information associated with the selected patient's diet plan.
- Provides context for the current diet planning operation.

#### 4. Diet Plan Current Table

**File:**

```text
DietPlanCurrentTable.jsx
```

- Displays the patient's current diet plan.
- Provides a structured view of active diet information.

#### 5. New Diet Plan Section

**File:**

```text
NewDietPlanSection.jsx
```

- Provides the interface for creating a new patient diet plan.
- Allows the required diet and food information to be configured.

#### 6. Diet Plan Footer

**File:**

```text
DietPlanFooter.jsx
```

- Provides action controls and summary information for the diet plan.
- Supports completion of the diet planning operation.

#### 7. Inpatient Diet Tab

**File:**

```text
InpatientDietTab.jsx
```

- Provides tab-based organization of inpatient diet information.
- Separates relevant diet views while maintaining the patient context.

#### 8. Inpatient Filter

**File:**

```text
InpatientFilter.jsx
```

- Provides filtering functionality for inpatient diet records.
- Helps users locate the required patient efficiently.

#### 9. Select Patient Diet

**File:**

```text
SelectPatientDiet.jsx
```

- Provides patient selection specifically for diet management.
- Connects selected patient information with the diet planning workflow.

#### 10. Loading / Error / Empty Components

**Files:**

```text
DietRoomServiceError.jsx
DietRoomServiceLoading.jsx
NoPatientFound.jsx
NsStationError.jsx
```

- Provide dedicated loading states.
- Display room-service-related errors.
- Display nursing-station errors.
- Provide a clear empty state when no patient is available.

---

## 4.4 Dietician Management

### Overview

The Dietician module manages the workflow for assigning patients to dieticians and performing dietary consultation.

### Module Structure

```text
DieticianPage/

+-- AssingDietician.jsx
+-- ConsultationRequired.jsx
+-- DietConsultationTab.jsx
+-- Component/
    +-- DietConsultationCard.jsx
    +-- DietConsultationDetails.jsx
    +-- TemplateFoodDetails.jsx
```

### Component Details

#### 1. Assign Dietician

**File:**

```text
AssingDietician.jsx
```

- Provides patient-to-dietician assignment.
- Allows the diet team to identify the appropriate patients requiring consultation.

#### 2. Consultation Required

**File:**

```text
ConsultationRequired.jsx
```

- Displays patients requiring dietician consultation.
- Provides the starting point for the consultation workflow.

#### 3. Diet Consultation Tab

**File:**

```text
DietConsultationTab.jsx
```

- Provides the main dietician consultation interface.
- Displays consultation-related patient information.
- Supports diet recommendation and food planning.

#### 4. Diet Consultation Card

**File:**

```text
DietConsultationCard.jsx
```

- Displays patient consultation information in a compact card format.
- Provides quick access to consultation details.

#### 5. Diet Consultation Details

**File:**

```text
DietConsultationDetails.jsx
```

- Displays detailed dietician consultation information.
- Provides the detailed context required while planning the patient's diet.

#### 6. Template Food Details

**File:**

```text
TemplateFoodDetails.jsx
```

- Displays food information associated with selected diet templates.
- Supports template-based food selection during consultation.

---

## 4.5 Diet Ordering

### Overview

The Diet Ordering section converts the configured patient diet into actual food orders.

### Module Structure

```text
DietOrder/

+-- DietOderTaking.jsx
+-- DietOrderItems.jsx
```

### Component Details

#### 1. Diet Order Taking

**File:**

```text
DietOderTaking.jsx
```

- Provides the food order-taking interface.
- Allows users to select applicable food items.
- Supports meal-wise ordering.
- Provides the order creation workflow.

#### 2. Diet Order Items

**File:**

```text
DietOrderItems.jsx
```

- Displays selected order items.
- Provides item-level quantity and order information.
- Supports review of the order before processing.

---

## 4.6 Extra Diet Orders

### Overview

The Extra Diet Order module handles food requirements that are outside the standard planned patient diet.

### Module Structure

```text
DietExtraOrder/

+-- ExtraDietTypeSelect.jsx
+-- ExtraOrder.jsx
+-- ExtraOrderTable.jsx
+-- ExtraOrderView.jsx
+-- ExtraRoomMeliSelect.jsx
```

### Component Details

#### 1. Extra Order

**File:**

```text
ExtraOrder.jsx
```

- Provides the workflow for creating additional food orders.
- Allows food requirements to be added outside the regular diet plan.

#### 2. Extra Order Table

**File:**

```text
ExtraOrderTable.jsx
```

- Displays created extra orders.
- Provides visibility into additional food requests.

#### 3. Extra Order View

**File:**

```text
ExtraOrderView.jsx
```

- Displays detailed information about an extra food order.
- Provides the user with a complete view before processing.

#### 4. Extra Diet Type Select

**File:**

```text
ExtraDietTypeSelect.jsx
```

- Provides selection of the applicable diet type for an extra order.
- Helps classify additional food requirements.

#### 5. Extra Room / Meliora Select

**File:**

```text
ExtraRoomMeliSelect.jsx
```

- Provides room/patient-related selection for extra food orders.
- Associates additional orders with the correct service location.

---

## 4.7 Diet Processing

### Overview

The Diet Processing module converts patient diet requirements and orders into operational food preparation requirements.

### Module Structure

```text
DietProcessing/

+-- DIetNameProcessing.jsx
+-- DietNewOrderList.jsx
+-- DietPatientInfoCard.jsx
+-- DietProcessing.jsx
+-- DietTypeTimeSelect.jsx
+-- DietWeekWiseChartDetail.jsx
+-- DietWiseProcessing.jsx
+-- MealTypeCheckbox.jsx
+-- NotProcessed.jsx
+-- PatientSelectionDrawer.jsx
+-- ProcessCompletedList.jsx
+-- ProcessList.jsx
```

### Component Details

#### 1. Diet Processing

**File:**

```text
DietProcessing.jsx
```

- Provides the primary Diet Processing screen.
- Coordinates pending and completed processing operations.
- Provides the operational workflow for preparing diet orders for kitchen execution.

#### 2. Diet Name Processing

**File:**

```text
DIetNameProcessing.jsx
```

- Provides diet-name-level processing.
- Groups or displays processing information based on configured diet names.

#### 3. Diet New Order List

**File:**

```text
DietNewOrderList.jsx
```

- Displays newly created diet orders waiting for processing.
- Provides the starting point for processing pending food requirements.

#### 4. Diet Patient Information Card

**File:**

```text
DietPatientInfoCard.jsx
```

- Displays patient information during processing.
- Keeps the patient context visible while processing food requirements.

#### 5. Diet Type Time Select

**File:**

```text
DietTypeTimeSelect.jsx
```

- Provides diet type and time/meal selection.
- Helps users process the correct meal at the appropriate time.

#### 6. Diet Week-wise Chart Detail

**File:**

```text
DietWeekWiseChartDetail.jsx
```

- Displays week-wise diet processing information.
- Provides a broader view of planned food requirements across the diet schedule.

#### 7. Diet-wise Processing

**File:**

```text
DietWiseProcessing.jsx
```

- Groups processing according to diet.
- Supports diet-level operational preparation.

#### 8. Meal Type Checkbox

**File:**

```text
MealTypeCheckbox.jsx
```

- Provides meal selection during processing.
- Allows processing to be controlled by meal type.

#### 9. Not Processed

**File:**

```text
NotProcessed.jsx
```

- Displays diet orders that have not yet been processed.
- Provides visibility into pending operational work.

#### 10. Patient Selection Drawer

**File:**

```text
PatientSelectionDrawer.jsx
```

- Provides patient selection without leaving the processing workflow.
- Helps users switch between patient diet requirements.

#### 11. Process Completed List

**File:**

```text
ProcessCompletedList.jsx
```

- Displays completed diet processing records.
- Provides operational confirmation that processing has been completed.

#### 12. Process List

**File:**

```text
ProcessList.jsx
```

- Displays the active processing queue.
- Provides a structured view of diet processing records.

---

## 4.8 KOT Item Management

### Overview

The KOT Item module provides the kitchen-facing view of food items generated from processed diet orders.

### Module Structure

```text
KotItemList/

+-- KitchenStatusTab.jsx
+-- KotBatchCard.jsx
+-- KotFooterConfirm.jsx
+-- KotItemContainer.jsx
+-- KotItemHeader.jsx
+-- KotItemList.jsx
```

### Component Details

#### 1. KOT Item List

**File:**

```text
KotItemList.jsx
```

- Displays food items included in KOTs.
- Provides kitchen staff with the food preparation list.

#### 2. Kitchen Status Tab

**File:**

```text
KitchenStatusTab.jsx
```

- Provides status-based navigation for kitchen preparation.
- Allows users to distinguish different preparation states.

#### 3. KOT Batch Card

**File:**

```text
KotBatchCard.jsx
```

- Displays KOT batch information.
- Groups related food items for operational preparation.

#### 4. KOT Item Container

**File:**

```text
KotItemContainer.jsx
```

- Provides the container for KOT item information.
- Organizes food items and batch-level content.

#### 5. KOT Item Header

**File:**

```text
KotItemHeader.jsx
```

- Displays the header information associated with a KOT.
- Provides contextual information for the kitchen operator.

#### 6. KOT Footer Confirm

**File:**

```text
KotFooterConfirm.jsx
```

- Provides the confirmation action for KOT processing.
- Allows the operator to complete the kitchen-side workflow.

---

## 4.9 KOT Delivery Preparation

### Overview

The KOT Delivery Preparation module manages the operational process between kitchen preparation and patient delivery.

### Module Structure

```text
KotDeliveryPreparation/

+-- BedChip.jsx
+-- BedsView.jsx
+-- CustomeTab.jsx
+-- DietBedsGrid.jsx
+-- DietBlock.jsx
+-- DietNursingStationByFloor.jsx
+-- FloorView.jsx
+-- KotPreparationDelivery.jsx
+-- KotPreparationFilter.jsx
+-- PatientCard.jsx
+-- PatientsView.jsx
+-- PatientsViewWrapper.jsx
+-- StationCard.jsx
+-- StationGrid.jsx
|
+-- DietDelivery/
|   +-- Delivery.jsx
|   +-- DeliveryTableList.jsx
|
+-- NewDesignKotDelivery/
    +-- AssignedOrderSummary.jsx
    +-- BillPayTypeSelector.jsx
    +-- BillPreview.jsx
    +-- CanteenBillDetailDrawer.jsx
    +-- CanteenItemCard.jsx
    +-- DeliveryItemList.jsx
    +-- DietContextDrawer.jsx
    +-- DietMainPreperation.jsx
    +-- ExistingPacketDetails.jsx
    +-- ExistingPacketSelector.jsx
    +-- PackingComponent.jsx
    +-- PackingControls.jsx
    +-- PackingOrderItems.jsx
    +-- PackingPacketList.jsx
    +-- PatientCardTable.jsx
    +-- PreparationStatusFilter.jsx
    +-- ProformaDetailsDrawer.jsx
    +-- RightSideDrawer.jsx
```

### Component Details

#### 1. KOT Preparation Delivery

**File:**

```text
KotPreparationDelivery.jsx
```

- Provides the primary KOT preparation and delivery screen.
- Coordinates preparation, packing and delivery activities.

#### 2. Nursing Station by Floor

**File:**

```text
DietNursingStationByFloor.jsx
```

- Organizes patient food requirements according to nursing station and floor.
- Helps operational staff identify delivery locations.

#### 3. Floor View

**File:**

```text
FloorView.jsx
```

- Displays food delivery information grouped by floor.

#### 4. Station Grid

**File:**

```text
StationGrid.jsx
```

- Displays nursing stations in a grid-based layout.

#### 5. Station Card

**File:**

```text
StationCard.jsx
```

- Displays individual nursing station information.

#### 6. Beds View

**File:**

```text
BedsView.jsx
```

- Displays beds associated with the selected location.

#### 7. Diet Beds Grid

**File:**

```text
DietBedsGrid.jsx
```

- Provides grid-based bed display for diet preparation and delivery operations.

#### 8. Bed Chip

**File:**

```text
BedChip.jsx
```

- Provides compact bed identification.

#### 9. Patient Card

**File:**

```text
PatientCard.jsx
```

- Displays patient and diet-related information.
- Provides patient-level selection for preparation/delivery.

#### 10. Patients View

**File:**

```text
PatientsView.jsx
```

- Displays patients requiring food preparation or delivery.

#### 11. Patients View Wrapper

**File:**

```text
PatientsViewWrapper.jsx
```

- Provides the container around patient-level views.
- Coordinates patient display and related controls.

#### 12. KOT Preparation Filter

**File:**

```text
KotPreparationFilter.jsx
```

- Provides filtering for KOT preparation records.
- Helps operators identify relevant preparation tasks.

#### 13. Custom Tab

**File:**

```text
CustomeTab.jsx
```

- Provides reusable tab navigation for preparation/delivery screens.

#### 14. Diet Block

**File:**

```text
DietBlock.jsx
```

- Provides grouped Diet information within the preparation interface.

---

## 4.10 Diet Delivery

### Files

```text
DietDelivery/Delivery.jsx
DietDelivery/DeliveryTableList.jsx
```

### Details

#### Delivery

- Provides the delivery workflow for prepared patient food.
- Allows delivery records to be reviewed and updated.

#### Delivery Table List

- Displays delivery records in tabular form.
- Provides operational visibility into pending and completed delivery information.

---

## 4.11 New KOT Delivery Design

### Overview

The `NewDesignKotDelivery` section provides the detailed preparation, packing and billing interface used during the enhanced KOT delivery workflow.

### Component Details

#### Assigned Order Summary

```text
AssignedOrderSummary.jsx
```

- Displays the orders assigned for the current preparation/delivery operation.

#### Bill Pay Type Selector

```text
BillPayTypeSelector.jsx
```

- Allows selection of the applicable payment/billing type during the billing workflow.

#### Bill Preview

```text
BillPreview.jsx
```

- Provides a preview of the bill before completion/printing.

#### Canteen Bill Detail Drawer

```text
CanteenBillDetailDrawer.jsx
```

- Displays detailed Canteen bill information in a drawer interface.

#### Canteen Item Card

```text
CanteenItemCard.jsx
```

- Displays individual Canteen food items.

#### Delivery Item List

```text
DeliveryItemList.jsx
```

- Displays items associated with the delivery operation.

#### Diet Context Drawer

```text
DietContextDrawer.jsx
```

- Provides contextual Diet information without leaving the main preparation screen.

#### Diet Main Preparation

```text
DietMainPreperation.jsx
```

- Provides the primary preparation workflow.
- Coordinates food preparation and packing activities.

#### Existing Packet Details

```text
ExistingPacketDetails.jsx
```

- Displays details of an existing prepared packet.

#### Existing Packet Selector

```text
ExistingPacketSelector.jsx
```

- Allows operators to select an existing packet where applicable.

#### Packing Component

```text
PackingComponent.jsx
```

- Provides the main packet packing interface.

#### Packing Controls

```text
PackingControls.jsx
```

- Provides actions required during packet preparation and packing.

#### Packing Order Items

```text
PackingOrderItems.jsx
```

- Displays food items being packed into the packet.

#### Packing Packet List

```text
PackingPacketList.jsx
```

- Displays prepared/available packets associated with the operation.

#### Patient Card Table

```text
PatientCardTable.jsx
```

- Displays patient-level preparation and delivery information in table format.

#### Preparation Status Filter

```text
PreparationStatusFilter.jsx
```

- Filters patients/orders according to preparation status.

#### Proforma Details Drawer

```text
ProformaDetailsDrawer.jsx
```

- Displays proforma/billing information during the operational workflow.

#### Right Side Drawer

```text
RightSideDrawer.jsx
```

- Provides supporting details and actions without leaving the primary preparation screen.

---

## 4.12 Canteen Order Confirmation

### Overview

The Canteen Order Confirmation module manages food orders that enter the Canteen workflow.

### Module Structure

```text
CanteenOrderConfirmation/

+-- CanteenContextDrawer.jsx
+-- CanteenMain.jsx
+-- CanteenOrderPage.jsx
|
+-- CanteenModal/
|   +-- CancelModal.jsx
|   +-- ConfirmationModal.jsx
|
+-- Components/
    +-- BatchPreviewModal.jsx
    +-- CanteenCancelItemList.jsx
    +-- CanteenFilterComponent.jsx
    +-- CanteenFoodSection.jsx
    +-- CanteenOrderItemList.jsx
    +-- CanteenOrderTab.jsx
    +-- CanteenTable.jsx
    +-- CanteenView.jsx
    +-- CanteenViewWrapper.jsx
    +-- PizzaLoader.jsx
```

### Component Details

#### Canteen Main

```text
CanteenMain.jsx
```

- Provides the primary Canteen order management screen.

#### Canteen Order Page

```text
CanteenOrderPage.jsx
```

- Displays and manages Canteen orders.

#### Canteen Context Drawer

```text
CanteenContextDrawer.jsx
```

- Displays additional contextual information for the selected order.

#### Confirmation Modal

```text
ConfirmationModal.jsx
```

- Confirms Canteen order actions.

#### Cancel Modal

```text
CancelModal.jsx
```

- Handles order cancellation confirmation.

#### Batch Preview Modal

```text
BatchPreviewModal.jsx
```

- Provides a preview of grouped/batched food orders.

#### Canteen Cancel Item List

```text
CanteenCancelItemList.jsx
```

- Displays items selected or associated with cancellation.

#### Canteen Filter Component

```text
CanteenFilterComponent.jsx
```

- Provides Canteen-specific filtering.

#### Canteen Food Section

```text
CanteenFoodSection.jsx
```

- Displays food items grouped within the Canteen order.

#### Canteen Order Item List

```text
CanteenOrderItemList.jsx
```

- Displays individual Canteen order items.

#### Canteen Order Tab

```text
CanteenOrderTab.jsx
```

- Separates Canteen orders by applicable operational state/category.

#### Canteen Table

```text
CanteenTable.jsx
```

- Displays Canteen order information in tabular form.

#### Canteen View

```text
CanteenView.jsx
```

- Provides the main Canteen order display.

#### Canteen View Wrapper

```text
CanteenViewWrapper.jsx
```

- Provides the surrounding layout and state context for the Canteen view.

---

## 4.13 Direct Canteen Orders

### Overview

The Direct Canteen Order module provides a dedicated workflow for creating food orders directly from the Canteen interface.

### Module Structure

```text
DirectCanteenOrder/

+-- DirectCanteenOrders.jsx
|
+-- BillingComponent/
|   +-- ThermalBill.jsx
|   +-- usePrintBill.js
|
+-- CommonResuableFun/
|   +-- Reusable.js
|
+-- Components/
    +-- BedSelect.jsx
    +-- BedSuggestion.jsx
    +-- FoodDetailShowCard.jsx
    +-- FoodOrderBuilder.jsx
    +-- NsPatientListPanel.jsx
    +-- PartyTypeSelector.jsx
    +-- PatientInfoCard.jsx
    +-- RecentOrdersCard.jsx
```

### Component Details

#### Direct Canteen Orders

```text
DirectCanteenOrders.jsx
```

- Provides the main direct ordering screen.
- Allows food orders to be created without following the standard Diet Planning workflow.

#### Bed Select

```text
BedSelect.jsx
```

- Provides bed selection for applicable orders.

#### Bed Suggestion

```text
BedSuggestion.jsx
```

- Provides bed suggestions during order creation.

#### Food Detail Show Card

```text
FoodDetailShowCard.jsx
```

- Displays detailed food item information.

#### Food Order Builder

```text
FoodOrderBuilder.jsx
```

- Provides the interface for building a food order.
- Allows food items and quantities to be selected.

#### Nursing Station Patient List Panel

```text
NsPatientListPanel.jsx
```

- Displays patient information grouped by nursing station.

#### Party Type Selector

```text
PartyTypeSelector.jsx
```

- Allows selection of the applicable order party.

#### Patient Information Card

```text
PatientInfoCard.jsx
```

- Displays selected patient information.

#### Recent Orders Card

```text
RecentOrdersCard.jsx
```

- Displays recent orders associated with the selected context.

#### Thermal Bill

```text
ThermalBill.jsx
```

- Generates the thermal bill for direct Canteen orders.

#### Print Bill

```text
usePrintBill.js
```

- Provides reusable bill-print handling.

#### Reusable Functions

```text
Reusable.js
```

- Contains shared functions used by the Direct Canteen Order workflow.

---

## 4.14 Diet POS and Billing

### Overview

The Diet POS module handles bill generation, bill review, patient billing information, delivery-related billing and thermal printing.

### Module Structure

```text
DietPos/

+-- DietDischargeBill.jsx
+-- DietPosDetail.jsx
|
+-- DischargeBillComponent/
|   +-- BystanderThermalBill.jsx
|   +-- DietBillBody.jsx
|   +-- DietBillDateWiseSummary.jsx
|   +-- DietBillDetail.jsx
|   +-- DietBillFooter.jsx
|   +-- DietBillHeader.jsx
|   +-- DietBillItemsTable.jsx
|   +-- DietBillPatientInfo.jsx
|   +-- DietBillSummary.jsx
|   +-- useThermalPrint.js
|
+-- PosComponent/
    +-- ActionCard.jsx
    +-- BillCard.jsx
    +-- BillingDeliveryTable.jsx
    +-- BillingDietPlanDetail.jsx
    +-- BillingItemTable.jsx
    +-- BillingPatientDetail.jsx
    +-- BillingSummary.jsx
    +-- BillPrintDialog.jsx
    +-- DietBillingDetail.jsx
    +-- DietThermalBill.jsx
    +-- PosFilterComponent.jsx
    +-- PosMain.jsx
    +-- PosOrderTab.jsx
    +-- PosTable.jsx
    +-- PosView.jsx
    +-- PosViewWrapper.jsx
```

### Component Details

#### Diet POS Detail

```text
DietPosDetail.jsx
```

- Provides the main Diet POS detail workflow.
- Displays billable patient/order information.
- Coordinates billing actions.

#### Diet Discharge Bill

```text
DietDischargeBill.jsx
```

- Provides discharge-related Diet billing.
- Displays applicable food billing information for discharge processing.

#### POS Main

```text
PosMain.jsx
```

- Provides the main POS workflow.

#### POS View

```text
PosView.jsx
```

- Displays the operational POS interface.

#### POS View Wrapper

```text
PosViewWrapper.jsx
```

- Provides layout and surrounding context for POS screens.

#### POS Table

```text
PosTable.jsx
```

- Displays billable records in a table.

#### POS Order Tab

```text
PosOrderTab.jsx
```

- Organizes POS orders by operational state/type.

#### POS Filter

```text
PosFilterComponent.jsx
```

- Provides filtering for billable Diet records.

#### Billing Patient Detail

```text
BillingPatientDetail.jsx
```

- Displays patient/admission information associated with billing.

#### Billing Diet Plan Detail

```text
BillingDietPlanDetail.jsx
```

- Displays the patient's diet plan information relevant to billing.

#### Billing Delivery Table

```text
BillingDeliveryTable.jsx
```

- Displays delivery-related information used during billing.

#### Billing Item Table

```text
BillingItemTable.jsx
```

- Displays billable food items and their financial information.

#### Billing Summary

```text
BillingSummary.jsx
```

- Displays the total billing information.

#### Diet Billing Detail

```text
DietBillingDetail.jsx
```

- Provides detailed Diet billing information.

#### Bill Card

```text
BillCard.jsx
```

- Displays bill-level information in a compact format.

#### Action Card

```text
ActionCard.jsx
```

- Provides billing-related actions.

#### Bill Print Dialog

```text
BillPrintDialog.jsx
```

- Provides bill printing actions and print preview handling.

#### Diet Thermal Bill

```text
DietThermalBill.jsx
```

- Generates the Diet thermal bill format.
- Displays patient, item, amount and billing information in a print-ready format.

---

## 4.15 Discharge Bill Components

### Overview

The Discharge Bill components provide the detailed bill structure used when generating Diet discharge bills.

### Component Details

#### Diet Bill Header

```text
DietBillHeader.jsx
```

- Displays bill header information.

#### Diet Bill Patient Info

```text
DietBillPatientInfo.jsx
```

- Displays patient and admission information.

#### Diet Bill Body

```text
DietBillBody.jsx
```

- Provides the main bill content structure.

#### Diet Bill Items Table

```text
DietBillItemsTable.jsx
```

- Displays individual food items and charges.

#### Diet Bill Summary

```text
DietBillSummary.jsx
```

- Displays calculated billing totals.

#### Diet Bill Date-wise Summary

```text
DietBillDateWiseSummary.jsx
```

- Groups Diet billing information by date.

#### Diet Bill Detail

```text
DietBillDetail.jsx
```

- Provides the complete bill detail view.

#### Diet Bill Footer

```text
DietBillFooter.jsx
```

- Displays footer-level billing information.

#### Bystander Thermal Bill

```text
BystanderThermalBill.jsx
```

- Provides the thermal billing format for bystander food orders.

#### Thermal Print Hook

```text
useThermalPrint.js
```

- Provides reusable thermal-print functionality.

---

## 4.16 Barcode Management

### Overview

The Barcode module provides printing functionality for food packets and Diet-related operational labels.

### Module Structure

```text
Barcode/

+-- A4Print.css
+-- A4Print.jsx
+-- BarcodePrint.css
+-- BarcodePrint.jsx
```

### Component Details

#### Barcode Print

```text
BarcodePrint.jsx
```

- Provides barcode generation/printing interface.
- Displays barcode information in a print-ready layout.

#### Barcode Print CSS

```text
BarcodePrint.css
```

- Provides print-specific styling for barcode output.

#### A4 Print

```text
A4Print.jsx
```

- Provides A4-based print output.

#### A4 Print CSS

```text
A4Print.css
```

- Provides print layout styling for A4 output.

---

## 4.17 Diet Collection Closing

### Overview

The Collection Closing module manages the collection and cash-closing workflow for Diet/Canteen billing.

### Module Structure

```text
CollectionClosing/

+-- CollectionClosing.jsx
+-- CollectionTables.jsx
|
+-- CollecitonComponent/
    +-- BillDetailTable.jsx
    +-- CashClosingDetails.jsx
    +-- ClosingTab.jsx
    +-- CollectionSummaryCard.jsx
    +-- CollectionTab.jsx
    +-- DenominationDetails.jsx
    +-- DenominationForm.jsx
    +-- DenominationTable.jsx
    +-- SummaryTable.jsx
```

### Component Details

#### Collection Closing

```text
CollectionClosing.jsx
```

- Provides the main collection-closing workflow.

#### Collection Tables

```text
CollectionTables.jsx
```

- Provides collection-related tabular information.

#### Bill Detail Table

```text
BillDetailTable.jsx
```

- Displays bill-level collection details.

#### Cash Closing Details

```text
CashClosingDetails.jsx
```

- Displays cash closing information.

#### Closing Tab

```text
ClosingTab.jsx
```

- Provides navigation for closing-related information.

#### Collection Tab

```text
CollectionTab.jsx
```

- Provides navigation for collection information.

#### Collection Summary Card

```text
CollectionSummaryCard.jsx
```

- Displays collection totals in a compact summary.

#### Denomination Details

```text
DenominationDetails.jsx
```

- Displays denomination-level cash information.

#### Denomination Form

```text
DenominationForm.jsx
```

- Allows denomination values to be entered during cash closing.

#### Denomination Table

```text
DenominationTable.jsx
```

- Displays entered denomination information.

#### Summary Table

```text
SummaryTable.jsx
```

- Displays the overall collection/closing summary.

---

## 4.18 Daily Canteen Closing

### Overview

The Daily Canteen Closing module provides the daily consolidated financial view of Diet and Canteen operations.

### Module Structure

```text
DailyCanteenClosing/

+-- CanteenCloseViewWrapper.jsx
+-- CanteenClosingSummary.jsx
+-- CanteenClosinngMain.jsx
+-- ClosingTab.jsx
+-- ClosingTable.jsx
+-- ClosingView.jsx
+-- DailyCanteenClosing.jsx
|
+-- CanteenClosingSummaryComponent/
    +-- ClosingSummaryTable.jsx
    +-- ClosingSummaryView.jsx
```

### Component Details

#### Daily Canteen Closing

```text
DailyCanteenClosing.jsx
```

- Provides the main daily closing screen.
- Coordinates daily Diet/Canteen financial information.

#### Canteen Closing Main

```text
CanteenClosinngMain.jsx
```

- Provides the primary closing content and workflow.

#### Canteen Closing Summary

```text
CanteenClosingSummary.jsx
```

- Displays the daily financial summary.

#### Canteen Close View Wrapper

```text
CanteenCloseViewWrapper.jsx
```

- Provides layout and context for the closing views.

#### Closing Tab

```text
ClosingTab.jsx
```

- Provides navigation between closing-related views.

#### Closing Table

```text
ClosingTable.jsx
```

- Displays daily closing information in tabular format.

#### Closing View

```text
ClosingView.jsx
```

- Provides detailed daily closing information.

#### Closing Summary Table

```text
ClosingSummaryTable.jsx
```

- Displays the consolidated summary of daily billing and collection information.

#### Closing Summary View

```text
ClosingSummaryView.jsx
```

- Provides the summary-level closing interface.

---

## 4.19 Petty Cash Management

### Overview

The Petty Cash module manages employee-level petty cash allocation associated with Diet/Canteen operations.

### Module Structure

```text
Pettycash/

+-- PettycashDetail.jsx
|
+-- PettycashComponents/
    +-- EmployeeCard.jsx
    +-- EmployeeSearch.jsx
    +-- EmployeeSuggestion.jsx
    +-- PettyCashAllocationTable.jsx
    +-- PettyCashAssignmentModal.jsx
    +-- PettyCashTab.jsx
    +-- PettyCashTables.jsx
```

### Component Details

#### Petty Cash Detail

```text
PettycashDetail.jsx
```

- Provides the main petty cash detail workflow.

#### Employee Card

```text
EmployeeCard.jsx
```

- Displays selected employee information.

#### Employee Search

```text
EmployeeSearch.jsx
```

- Provides employee search functionality.

#### Employee Suggestion

```text
EmployeeSuggestion.jsx
```

- Displays employee suggestions during search/selection.

#### Petty Cash Allocation Table

```text
PettyCashAllocationTable.jsx
```

- Displays employee-wise petty cash allocation information.

#### Petty Cash Assignment Modal

```text
PettyCashAssignmentModal.jsx
```

- Provides the interface for assigning petty cash to an employee.

#### Petty Cash Tab

```text
PettyCashTab.jsx
```

- Organizes petty cash operations into the applicable tab view.

#### Petty Cash Tables

```text
PettyCashTables.jsx
```

- Provides tabular petty cash information.

---

## 4.20 Diet Common Components

### Overview

The `DeitCommonComponents` directory contains reusable components shared across different Diet operational screens.

### Module Structure

```text
DeitCommonComponents/

+-- CurrenttimeFeedTile.jsx
+-- DietdummyPatients.js
+-- DietFeedtimeComponent.jsx
+-- DietFindPatientFloat.jsx
+-- DietGroup.jsx
+-- DietMastComponent.jsx
+-- DietOrderStatus.jsx
+-- DietTile.jsx
+-- DietTileNotPlanned.jsx
+-- DietTileWithLabel.jsx
+-- DietView.jsx
+-- PatientDietView.jsx
```

### Component Details

#### Current Time Feed Tile

```text
CurrenttimeFeedTile.jsx
```

- Displays the current food/feed timing context.
- Helps users identify the current operational meal period.

#### Diet Feed Time Component

```text
DietFeedtimeComponent.jsx
```

- Displays Diet feed-time information.

#### Diet Find Patient Float

```text
DietFindPatientFloat.jsx
```

- Provides quick patient search functionality.

#### Diet Group

```text
DietGroup.jsx
```

- Groups related Diet information for display.

#### Diet Master Component

```text
DietMastComponent.jsx
```

- Provides common Diet master-level display functionality.

#### Diet Order Status

```text
DietOrderStatus.jsx
```

- Displays the current order status.

#### Diet Tile

```text
DietTile.jsx
```

- Provides reusable Diet information in tile format.

#### Diet Tile Not Planned

```text
DietTileNotPlanned.jsx
```

- Displays patients/items where a Diet plan has not yet been configured.

#### Diet Tile With Label

```text
DietTileWithLabel.jsx
```

- Provides a labelled Diet tile for enhanced identification.

#### Diet View

```text
DietView.jsx
```

- Provides a reusable Diet-level view.

#### Patient Diet View

```text
PatientDietView.jsx
```

- Provides reusable patient-specific Diet information.

---

## 4.21 Diet Common Components

### Module Structure

```text
DietComponent/

+-- AddFoodSection.jsx
+-- DatePickerComponent.jsx
+-- DietButton.jsx
+-- DietEmptyState.jsx
+-- DietFilterComponent.jsx
+-- DietSearchComponent.jsx
+-- DietTextComponent.jsx
+-- DigitRoll.jsx
+-- NumberCounter.jsx
+-- PatientCancelledItemList.jsx
+-- PatientOrderItemList.jsx
+-- SmartRealtimeCounter.jsx
+-- StatusComponent.jsx
```

### Component Details

- `AddFoodSection.jsx` provides reusable food addition functionality.
- `DatePickerComponent.jsx` provides Diet-related date selection.
- `DietButton.jsx` provides reusable Diet action buttons.
- `DietEmptyState.jsx` provides standardized empty-state messaging.
- `DietFilterComponent.jsx` provides common Diet filtering.
- `DietSearchComponent.jsx` provides common Diet search functionality.
- `DietTextComponent.jsx` provides standardized Diet text display.
- `DigitRoll.jsx` provides animated numeric display.
- `NumberCounter.jsx` provides reusable number/count display.
- `PatientCancelledItemList.jsx` displays cancelled patient food items.
- `PatientOrderItemList.jsx` displays patient food order items.
- `SmartRealtimeCounter.jsx` provides real-time count display.
- `StatusComponent.jsx` provides reusable status presentation.

---

## 4.22 Diet Modals

### Module Structure

```text
DietModal/

+-- AssignPatientConfirmModal.jsx
+-- PatientOrderCancelModal.jsx
+-- PatientOrderModal.jsx
+-- PatientScheduleCancelModal.jsx
```

### Component Details

#### Assign Patient Confirmation

```text
AssignPatientConfirmModal.jsx
```

- Confirms patient assignment actions.

#### Patient Order Cancel Modal

```text
PatientOrderCancelModal.jsx
```

- Confirms cancellation of patient food orders.

#### Patient Order Modal

```text
PatientOrderModal.jsx
```

- Provides the patient order interaction dialog.

#### Patient Schedule Cancel Modal

```text
PatientScheduleCancelModal.jsx
```

- Confirms cancellation of scheduled patient food.

---

## 4.23 Diet Dashboard

### File

```text
DietDashboard/DietDashboard.jsx
```

### Overview

The Diet Dashboard provides the primary entry point and operational overview for Diet-related activities.

### Responsibilities

- Provides access to major Diet workflows.
- Displays operational Diet information.
- Acts as the central navigation point for Diet operations.

---

## 4.24 Diet Error and Skeleton Components

### Structure

```text
DietErrorComponent/
+-- RoomPriceListError.jsx

DietSkeleton/
+-- RoomPriceListSkeleton.jsx
```

### Responsibilities

- Provides dedicated error handling for room price information.
- Provides loading skeletons while room price information is being retrieved.
- Prevents incomplete data from creating confusing UI states.

---

## 4.25 Diet Type Grouping

### File

```text
DietTypeGrouping/DietTypeGrouping.jsx
```

### Overview

Provides grouping functionality for configured Diet types.

### Responsibilities

- Organizes Diet types.
- Provides grouped Diet information to operational screens.

---

## 4.26 Diet Reducer and Shared Filters

### Module Structure

```text
DietReducer/

+-- Notes/
|
+-- action/
|   +-- canteenFilter.actions.js
|   +-- kotPreparationFilter.actions.js
|
+-- contextprovider/
|   +-- CanteenFilterContext.jsx
|   +-- KotFilterContext.js
|   +-- PosFilterContext.jsx
|
+-- reducer/
    +-- canteenFilterReducer.js
    +-- KotFilterReducer.js
    +-- posFilterReducer.js
```

### Overview

The Diet module uses dedicated reducer/context structures for maintaining filter state across operational screens.

### Responsibilities

- Maintains Canteen filter state.
- Maintains KOT preparation filter state.
- Maintains POS filter state.
- Separates filtering logic from presentation components.
- Allows operational screens to share consistent filter behavior.

---

## 4.27 Diet Common Data and Helpers

### Module Structure

```text
CommonData/

+-- Common.js
+-- CommonFun.js
+-- Helper.js
+-- UseQuery.js

Helpers/

+-- HelperFunction.js

Utils/

+-- SpeakOrder.js
```

### Responsibilities

- Provides shared Diet constants and formatting functions.
- Provides common utility functions.
- Provides query-related reusable functionality.
- Provides helper functions shared across screens.
- Provides order/speech-related utility functionality.

---

## 4.28 Complete Diet Operational Workflow

### Overview

The Diet Management Module connects all operational screens into one complete workflow.

### Complete Workflow

```text
1. Diet Master Configuration
        ?
2. Food / Item Master
        ?
3. Menu / Rate / Schedule Configuration
        ?
4. Patient Admission
        ?
5. Inpatient Diet Selection
        ?
6. Dietician Consultation
        ?
7. Diet Plan Creation
        ?
8. Meal / Food Selection
        ?
9. Diet Order Creation
        ?
10. Extra Order if Required
        ?
11. Diet Processing
        ?
12. KOT Generation
        ?
13. Kitchen Preparation
        ?
14. Packet Preparation
        ?
15. Patient / Bed Identification
        ?
16. Food Delivery
        ?
17. Bill Generation
        ?
18. Payment Collection
        ?
19. Collection Closing
        ?
20. Daily Canteen Closing
```

---

## 4.29 Diet Status Flow

### Diet Plan Status

```text
ACTIVE
STOPPED
CHANGED
```

- `ACTIVE` identifies the currently active patient Diet plan.
- `STOPPED` identifies a Diet plan that has been stopped.
- `CHANGED` identifies a Diet plan that has been replaced or changed.

### Diet Schedule Status

```text
PENDING
SERVED
CANCELLED
```

- `PENDING` indicates that the scheduled food has not yet been served.
- `SERVED` indicates that the scheduled food has been served.
- `CANCELLED` indicates that the scheduled food has been cancelled.

### Delivery Status

```text
PENDING
PREPARED
DELIVERED
SKIPPED
CANCELLED
PICKEDUP
RETURNED
UNDELIVERED
```

- `PENDING` indicates that the delivery is awaiting processing.
- `PREPARED` indicates that the food has been prepared.
- `DELIVERED` indicates that the food has been delivered.
- `SKIPPED` indicates that the scheduled delivery was skipped.
- `CANCELLED` indicates that the delivery was cancelled.
- `PICKEDUP` indicates that the applicable food/order has been picked up.
- `RETURNED` indicates that the food/order was returned.
- `UNDELIVERED` indicates that the food could not be delivered.

---

## 4.30 Billing and Collection Workflow

### Overview

Diet billing is connected to the operational food delivery process.

The billing workflow ensures that applicable food items are identified after the operational order/delivery process and presented for billing and collection.

### Workflow

```text
Patient / Bystander / Canteen Order
        ?
Food Items
        ?
Preparation
        ?
Delivery / Pickup
        ?
Billable Items
        ?
Billing
        ?
Payment
        ?
Collection
        ?
Daily Closing
```

### Billing Information

The billing workflow supports information such as:

- Patient information.
- Admission information.
- Billing party.
- Food item.
- Quantity.
- Delivered quantity.
- Unit rate.
- GST amount.
- Discount.
- Net amount.
- Payment information.
- Billing status.
- Delivery information.

---

## 4.31 Daily Collection and Closing Workflow

### Overview

The closing workflow provides financial visibility after the day's Diet and Canteen operations.

### Closing Information

The daily closing area supports:

- Inpatient billing.
- Bystander billing.
- Restaurant/Canteen billing.
- Staff/Doctor billing categories where applicable.
- Petty cash information.
- Collected amount.
- Pending amount.
- Cash collection.
- UPI collection.
- Bank transfer collection.
- Settled billing.
- Bill count.
- Billing amount.

### Workflow

```text
Daily Bills
      ?
Payments
      ?
Collected Amount
      ?
Pending Amount
      ?
Payment Mode Summary
      ?
Petty Cash
      ?
Settled Bills
      ?
Daily Closing
```

---

## 4.32 Benefits & Impact

| Metric / Aspect | Diet Management Implementation |
|---|---|
| **Master Configuration** | Centralized Diet, Food, Menu, Pricing, Room, Delivery and Billing masters |
| **Patient Diet Planning** | Dedicated inpatient diet planning and patient-specific Diet management |
| **Dietician Workflow** | Dietician assignment and consultation workflow |
| **Food Ordering** | Patient, extra and direct Canteen food ordering |
| **Diet Processing** | Diet-wise, meal-wise and week-wise processing |
| **Kitchen Operations** | KOT generation, batching and preparation tracking |
| **Food Delivery** | Bed, room, floor and nursing-station based preparation and delivery |
| **Canteen Operations** | Dedicated Canteen confirmation and direct order workflows |
| **Billing** | Patient, bystander, discharge and Canteen billing support |
| **Thermal Printing** | Reusable thermal bill and barcode printing components |
| **Collection** | Collection summary, cash closing and denomination management |
| **Daily Closing** | Consolidated Diet/Canteen billing, collection and settlement summary |
| **Petty Cash** | Employee-wise petty cash allocation and management |
| **State Management** | Dedicated Canteen, KOT and POS filter contexts/reducers |
| **Reusable Components** | Common patient, order, billing, filter, modal and status components |
| **Operational Visibility** | End-to-end visibility from Diet planning through delivery and collection |
| **Maintainability** | Functional areas separated into dedicated screens and reusable components |
