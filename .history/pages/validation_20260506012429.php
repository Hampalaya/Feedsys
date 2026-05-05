<?php /** Data Validation - Check data quality, inconsistencies, bulk actions */ ?>
<div class="space-y-6">
    <h1 class="text-2xl font-bold">Data Validation</h1>
    
    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <p class="text-sm text-gray-500">Total Issues</p>
            <p id="total-issues" class="text-3xl font-bold text-gray-900">0</p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <p class="text-sm text-gray-500">Pending Review</p>
            <p id="pending-count" class="text-3xl font-bold text-orange-600">0</p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <p class="text-sm text-gray-500">Approved</p>
            <p id="approved-count" class="text-3xl font-bold text-emerald-600">0</p>
        </div>
    </div>

    <!-- Filter -->
    <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div class="flex gap-3">
            <input id="validation-search" placeholder="Search issues..." class="flex-1 form-input">
            <select id="issue-type" class="form-input">
                <option value="">All Types</option>
                <option value="future-date">Future Date</option>
                <option value="invalid-bmi">Invalid BMI</option>
                <option value="missing-student">Missing Student</option>
                <option value="duplicate">Duplicate</option>
            </select>
            <button onclick="runValidation()" class="btn-gradient px-6 py-2.5 rounded-xl text-white font-medium shadow-lg">
                <i data-lucide="refresh-cw" class="w-4 h-4 inline mr-2"></i>Run Validation
            </button>
        </div>
    </div>

    <!-- Issues Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="flex gap-2 p-4 border-b">
            <button onclick="approveAll()" class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium">Approve All</button>
            <button onclick="rejectAll()" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium">Reject All</button>
        </div>
        <div class="overflow-x-auto">
            <table id="validation-table" class="w-full data-table">
                <thead>
                    <tr>
                        <th><input type="checkbox" id="select-all"></th>
                        <th>Issue Type</th>
                        <th>Record</th>
                        <th>Details</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td colspan="7" class="text-center py-8 text-gray-500">Click "Run Validation" to scan data</td></tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<script>
document.getElementById('page-title').textContent = 'Data Validation';
let issues = [];
let allData = {};

async function runValidation() {
    toast('Running validation scan...', 'info');
    try {
        const [students, measurements, attendance] = await Promise.all([
            window.app.studentsAPI.getAll(),
            window.app.measurementsAPI.getAll(),
            window.app.attendanceAPI.getAll()
        ]);
        
        allData = { students: new Map(students.map(s => [s.id, s])), measurements, attendance };
        issues = validateData(allData);
        renderTable();
        updateStats();
    } catch (error) {
        toast('Validation failed: ' + error.message, 'error');
    }
}

