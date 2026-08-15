# Development Plan & Feature Implementation Log

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
