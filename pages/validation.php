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

function validateData(data) {
    const issues = [];
    // Future dates
    data.measurements.forEach(m => {
        if (new Date(m.date) > new Date()) {
            issues.push({ type: 'future-date', record: m, details: 'Date in future', date: m.date });
        }
    });
    // Invalid BMI
    data.measurements.forEach(m => {
        const bmi = parseFloat(m.bmi);
        if (bmi < 10 || bmi > 50 || isNaN(bmi)) {
            issues.push({ type: 'invalid-bmi', record: m, details: `BMI ${m.bmi} invalid`, date: m.date });
        }
    });
    // Missing students
    data.measurements.forEach(m => {
        if (!data.students.get(m.studentId)) {
            issues.push({ type: 'missing-student', record: m, details: `Student ID ${m.studentId} not found`, date: m.date });
        }
    });
    return issues;
}

function renderTable() {
    const tbody = document.querySelector('#validation-table tbody');
    const search = document.getElementById('validation-search').value.toLowerCase();
    const typeFilter = document.getElementById('issue-type').value;
    
    const filtered = issues.filter(i => 
        (i.details.toLowerCase().includes(search) || i.type.includes(search)) &&
        (!typeFilter || i.type === typeFilter)
    );
    
    tbody.innerHTML = filtered.map((issue, index) => {
        const statusClass = issue.approved ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800';
        return `
            <tr class="hover:bg-gray-50">
                <td><input type="checkbox" value="${index}" class="issue-checkbox"></td>
                <td><span class="px-2 py-1 text-xs rounded-full bg-orange-200 text-orange-800">${issue.type.replace('-', ' ').toUpperCase()}</span></td>
                <td>${issue.record.studentName || 'Unknown'}</td>
                <td class="font-mono text-sm">${issue.details}</td>
                <td>${new Date(issue.date).toLocaleDateString()}</td>
                <td><span class="px-2 py-1 rounded-full text-xs ${statusClass}">Pending</span></td>
                <td class="space-x-1">
                    <button onclick="approveIssue(${index})" class="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded">✓</button>
                    <button onclick="rejectIssue(${index})" class="p-1.5 text-red-600 hover:bg-red-50 rounded">✗</button>
                </td>
            </tr>
        `;
    }).join('') || '<tr><td colspan="7" class="text-center py-12 text-gray-500">No issues found</td></tr>';
    
    document.getElementById('select-all').onchange = function() {
        document.querySelectorAll('.issue-checkbox').forEach(cb => cb.checked = this.checked);
    };
    
    lucide.createIcons();
}

function updateStats() {
    const pending = issues.filter(i => !i.approved).length;
    const approved = issues.length - pending;
    document.getElementById('total-issues').textContent = issues.length;
    document.getElementById('pending-count').textContent = pending;
    document.getElementById('approved-count').textContent = approved;
}

// Actions (stubs - implement backend endpoints for real)
function approveIssue(index) { issues[index].approved = true; renderTable(); updateStats(); toast('Approved', 'success'); }
function rejectIssue(index) { issues.splice(index, 1); renderTable(); updateStats(); toast('Rejected', 'success'); }
function approveAll() { issues.forEach(i => i.approved = true); renderTable(); updateStats(); }
function rejectAll() { issues = []; renderTable(); updateStats(); }

// Listeners
document.getElementById('validation-search').oninput = renderTable;
document.getElementById('issue-type').onchange = renderTable;

// Init
runValidation();
lucide.createIcons();
</script>

