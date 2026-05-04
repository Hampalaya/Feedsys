FEED System UI/UX Design

Design a **clean, simple, and secure web-based information system** called **FEED – Feeding Encoding, Evaluation, and Data Management System**.

This system is intended for **public elementary school teachers, feeding coordinators, and school administrators**, so the interface must be **easy to learn, easy to navigate, and not overwhelming**. Forms must be straightforward, with a logical step-by-step flow, because users may not be highly technical.

## Technical context to consider

* Frontend and backend will be developed using **CodeIgniter 4 (CI4)** and **PHP**
* Database will use **MySQL via phpMyAdmin**
* The system will be **hosted on Hostinger**
* Design the interface as a **responsive web application**
* Keep the design realistic for a **school project that can actually be implemented**

## General design style

Use a **modern, minimal, professional dashboard design**.

Suggested visual style:

* Primary color: **green** for health, nutrition, and school program identity
* Secondary colors: **white, light gray, soft green**
* Accent colors:

  * **orange/yellow** for warnings
  * **red** for errors or incomplete inputs
  * **blue/green** for success messages
* Use **clean readable typography**
* Use **clear icons**
* Use **consistent spacing and card layouts**
* Avoid clutter and avoid overly complex visual effects

The interface should feel:

* organized
* friendly
* efficient
* safe
* easy for teachers to use daily

---

# Main layout structure

Create a **web admin dashboard layout** with:

## Top Navigation Bar

Include:

* FEED logo/system name
* Current page title
* Notification icon
* Logged-in user name and role
* Profile/settings dropdown
* Logout button

## Left Sidebar Navigation

Make it collapsible.

Include these menu items in this order:

1. Dashboard
2. Student Profiles
3. Measurements
4. Feeding Monitoring
5. Nutritional Status
6. Reports
7. Data Validation
8. User Management
9. Settings

The navigation flow should follow the actual user process:
**Dashboard → Student registration → Measurement encoding → Feeding monitoring → Nutritional evaluation → Reports**

This must feel natural and logical.

---

# Security and usability requirements to reflect in the design

The design should clearly support these behaviors:

## Input validation and alerts

* Show **modal pop-ups**, **inline error messages**, or **toast notifications** when a user:

  * leaves required fields blank
  * inputs invalid values
  * enters impossible measurements
  * submits incomplete forms
* Errors should be clear and specific, such as:

  * “Please fill in all required fields.”
  * “Height must be greater than 0.”
  * “Weight value is invalid.”
  * “Please select a student first.”

## Confirmation dialogs

Use confirmation pop-ups before:

* deleting records
* editing critical student data
* logging out
* submitting finalized reports

## Session and page access behavior

Reflect secure navigation patterns in the UI:

* prevent unauthorized users from viewing restricted pages
* if session expires, redirect to login page
* prevent returning to protected pages after logout using browser back button
* show an “Access Denied” or “Session Expired” screen when necessary

## Role-based access

Design separate access levels for:

* Teacher
* Feeding Coordinator
* Administrator

For example:

* Teachers can encode and view their assigned data
* Coordinators can validate and generate reports
* Admin can manage users and system settings

## Form safety and guidance

* Mark required fields clearly
* Use dropdowns, radio buttons, and date pickers whenever possible
* Minimize free typing
* Include helper text below fields where needed
* Prevent accidental submission with disabled submit button until required fields are complete

---

# Screen 1 – Login Page

Create a simple and secure login screen.

Include:

* FEED logo
* Title: **FEED System**
* Subtitle: **Feeding Encoding, Evaluation, and Data Management System**
* Username field
* Password field
* Show/hide password toggle
* Login button
* “Forgot password” link if needed
* Clean school-system branding

Also show examples of:

* invalid login popup
* empty field validation
* session expired message

Design should be centered, simple, and professional.

---

# Screen 2 – Dashboard

Create a dashboard that gives users a quick overview of the feeding program.

Include summary cards for:

* Total Beneficiaries
* Total Students Encoded
* Underweight Students
* Normal Students
* Overweight Students
* Feeding Attendance Rate

Include charts:

* Pie chart for nutritional status distribution
* Line or bar chart for baseline vs endline comparison
* Small activity panel for recently encoded records

Include quick action buttons:

* Add Student
* Encode Measurement
* Record Attendance
* Generate Report

The dashboard should not feel crowded. Prioritize readability.

---

# Screen 3 – Student Profiles Module

This module should be very easy to use.

## Student List View

Use a searchable and filterable table.

Columns:

* Student ID
* Full Name
* Grade Level
* Section
* Sex
* Beneficiary Status
* Allergy Indicator
* Actions

Top controls:

* Search bar
* Filter by grade
* Filter by section
* Add Student button

## Add/Edit Student Form

Make this form simple, vertical, and grouped into sections.

Fields:

* Student ID
* Learner Reference Number if needed
* Full Name
* Grade Level
* Section
* Sex
* Date of Birth
* Parent/Guardian Name
* Beneficiary Status
* Allergy Indicator
* Allergy Notes
* Remarks

Design notes:

* Required fields should be clearly marked
* Use dropdowns for grade, section, sex, and status
* Show pop-up if save is attempted with missing required fields
* Show success popup after saving
* Show confirmation popup before discarding unsaved changes

---

# Screen 4 – Measurements Module

This module handles **baseline and endline encoding**.

## Measurement Encoding Form

Fields:

* Student Name searchable dropdown
* Grade and Section auto-filled
* Measurement Type: Baseline or Endline
* Height in cm
* Weight in kg
* Date Recorded
* Recorder name auto-filled from logged-in account

Below the fields, show auto-generated results:

* BMI
* Nutritional Status
* Remarks/interpretation

Buttons:

* Save Record
* Clear Form
* Cancel

Design the flow so that:

* the user selects the student first
* enters height and weight
* system auto-computes BMI instantly
* user reviews result before saving

Also include:

* invalid measurement alert
* duplicate entry warning
* incomplete form popup

## Measurement History Table

Below the form, show previous records for that student:

* Date
* Type
* Height
* Weight
* BMI
* Nutritional Status

---

# Screen 5 – Feeding Monitoring Module

This page is for daily feeding attendance and monitoring.

## Daily Monitoring Interface

Top controls:

* Date picker
* Grade level dropdown
* Section dropdown
* Load Students button

Display a table with:

* Student Name
* Present checkbox
* Absent checkbox
* Food Received status
* Notes

Add buttons:

* Save Monitoring
* Reset
* Submit Daily Record

This interface must be very quick to use.

Design notes:

* large checkboxes
* minimal scrolling if possible
* fixed action bar for save/submit
* warning popup if user tries to leave without saving

---

# Screen 6 – Nutritional Status Module

This page displays processed health and nutrition results.

Include a filterable table with:

* Student Name
* Grade/Section
* Baseline BMI
* Endline BMI
* Baseline Status
* Endline Status
* Improvement Indicator

Use color-coded status tags:

* Green for Normal
* Yellow for At Risk
* Red for Underweight
* Orange for Overweight if needed

Include filter controls for:

* Grade
* Section
* Nutritional Status
* Measurement Type

Include a student detail panel or modal that shows full nutritional progress.

---

# Screen 7 – Reports Module

This page generates official and consolidated reports based on encoded records.

Include report cards or selectable report options:

* Student Masterlist
* Baseline Nutritional Status Report
* Endline Nutritional Status Report
* Feeding Attendance Summary
* Nutritional Improvement Report
* Consolidated School Feeding Report

Include filters:

* Date range
* Grade
* Section
* Measurement type

Buttons:

* Preview Report
* Export to PDF
* Export to Excel
* Print Report

Design note:
Show a preview table first before final export.

Add confirmation popup before generating official finalized reports.

---

# Screen 8 – Data Validation Module

This page helps identify incomplete or incorrect records.

Display a table with:

* Student Name
* Record Type
* Missing or Invalid Field
* Date Detected
* Status
* Action button

Examples of flags:

* Missing baseline measurement
* Missing endline measurement
* Invalid height value
* Duplicate attendance record
* Incomplete student profile

Include:

* filter by issue type
* resolve button
* mark as reviewed button

This screen should feel like a simple validation center, not too technical.

---

# Screen 9 – User Management Module

This is mainly for administrator use.

Display user table with:

* Name
* Username
* Role
* Status
* Last Login
* Actions

Add user form fields:

* Full Name
* Username
* Password
* Confirm Password
* Role
* Account Status

Roles:

* Teacher
* Feeding Coordinator
* Administrator

Include:

* reset password popup
* deactivate account popup
* role assignment dropdown
* access restriction visual indicators

---

# Screen 10 – Settings Module

Include simple settings sections:

* School Information
* User Preferences
* Backup/Restore
* Security Settings

Possible fields:

* School Name
* School ID
* Default school year
* Session timeout setting
* Password policy preferences

This should look organized and administrative.

---

# Forms and interaction design principles

Make all forms:

* simple
* vertical
* logically grouped
* easy to scan
* not overloaded with too many fields on one row

Use:

* step-by-step form flow where appropriate
* section headers
* sticky save/cancel buttons for long forms
* clear required field indicators
* helper text for confusing fields

Avoid:

* overly dense dashboards
* tiny inputs
* complicated nested menus
* too many popups at once
* visually busy components

---

# Important UX behavior to visualize in the mockups

Please include some screens or states that show:

* blank required field validation
* invalid login state
* successful save popup
* delete confirmation modal
* unauthorized access page
* session expired redirect message
* disabled submit button until form is complete
* warning modal when leaving unsaved changes

---

# Output expectation

Generate a **full web app UI concept** for FEED with:

* login page
* dashboard
* all major modules
* secure and user-friendly forms
* responsive admin layout
* realistic school system workflow
* clean modern style that is practical for CI4 + MySQL + Hostinger implementation

The design must prioritize:
**simplicity, clarity, security, and ease of use for teachers and school staff**.

---

If you want, I can also turn this into a **shorter Figma Make version** and a **more detailed developer handoff version** so you can use one for mockup generation and one for your documentation.
