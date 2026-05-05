<?php /** Nutritional Status - Summary view of all students' latest status + charts */ ?>
<div class="space-y-6">
    <h1 class="text-2xl font-bold">Nutritional Status</h1>

    <!-- Filters -->
    <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div class="flex gap-3 flex-1 max-w-md">
                <input id="status-search" placeholder="Search student..." class="flex-1 form-input">
                <select id="status-grade-filter" class="form-input">
                    <option value="">All Grades</option>
                    <option value="Grade 1">Grade 1</option>
                    <option value="Grade 2">Grade 2</option>
                    <option value="Grade 3">Grade 3</option>
                </select>
                <select id="status-type-filter" class="form-input">
                    <option value="">All Status</option>
                    <option value="Normal">Normal</option>
                    <option value="Underweight">Underweight</option>
                    <option value="Overweight">Overweight</option>
                    <option value="Obese">Obese</option>
                </select>
            </div>
        </div>
    </div>

    <!-- Status Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="status-card bg-gradient-to-br from-green-400 to-green-500 text-white p-6 rounded-2xl shadow-lg">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-green-100">Normal</p>
                    <p id="normal-count" class="text-3xl font-bold">0</p>
                </div>
                <i data-lucide="check-circle" class="w-12 h-12 opacity-75"></i>
            </div>
        </div>
        <div class="status-card bg-gradient-to-br from-red-400 to-red-500 text-white p-6 rounded-2xl shadow-lg">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-red-100">Underweight</p>
                    <p id="underweight-count" class="text-3xl font-bold">0</p>
                </div>
                <i data-lucide="alert-triangle" class="w-12 h-12 opacity-75"></i>
            </div>
        </div>
        <div class="status-card bg-gradient-to-br from-orange-400 to-orange-500 text-white p-6 rounded-2xl shadow-lg">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-orange-100">Overweight</p>
                    <p id="overweight-count" class="text-3xl font-bold">0</p>
                </div>
                <i data-lucide="activity" class="w-12 h-12 opacity-75"></i>
            </div>
        </div>
        <div class="status-card bg-gradient-to-br from-amber-400 to-amber-500 text-white p-6 rounded-2xl shadow-lg">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-amber-100">Obese</p>
                    <p id="obese-count" class="text-3xl font-bold">0</p>
                </div>
                <i data-lucide="alert-octagon" class="w-12 h-12 opacity-75"></i>
            </div>
        </div>
    </div>

    <!-- Pie Chart -->
    <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 class="text-lg font-semibold mb-4">Status Distribution</h3>
        <canvas id="status-pie" height="300"></canvas>
    </div>

    <!-- Students Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="flex gap-3 p-4 border-b border-gray-200">
            <button onclick="exportStatusCSV()" class="btn-gradient px-4 py-2 rounded-xl text-white font-medium shadow-lg">
                <i data-lucide="download" class="w-4 h-4 inline mr-2"></i>Export CSV
            </button>
            <button onclick="exportStatusPDF()" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-white font-medium shadow-lg">
                <i data-lucide="file-text" class="w-4 h-4 inline mr-2"></i>Export PDF
            </button>
        </div>
        <div class="overflow-x-auto">
            <table id="status-table" class="w-full data-table">
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Grade</th>
                        <th>Latest Status</th>
                        <th>Last Measurement</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="5" class="text-center py-8 text-gray-500">Loading nutritional status...</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<script>
document.getElementById('page-title').textContent = 'Nutritional Status';
let students = [];
let measurements = [];
let statusMap = new Map();

async function loadStatusData() {
    try {
        [students, measurements] = await Promise.all([
            window.app.studentsAPI.getAll(),
            window.app.measurementsAPI.getAll()
        ]);
        computeStatusMap();
        renderStats();
        renderTable();
        renderChart();
    } catch (error) {
        toast('Failed to load status data: ' + error.message, 'error');
        document.querySelector('#status-table tbody').innerHTML = '<tr><td colspan="5" class="text-center py-8 text-red-500">Failed to load data</td></tr>';
    }
}

function computeStatusMap() {
    statusMap.clear();
    measurements.forEach(m => {
        const existing = statusMap.get(m.studentId);
        if (!existing || new Date(m.date) > new Date(existing.date)) {
            statusMap.set(m.studentId, { status: m.nutritionalStatus, date: m.date });
        }
    });
}

function renderStats() {
    const counts = { normal: 0, underweight: 0, overweight: 0, obese: 0 };
    students.forEach(s => {
        const status = statusMap.get(s.id)?.status || 'No Data';
        if (status === 'Normal') counts.normal++;
        else if (status.includes('Underweight')) counts.underweight++;
        else if (status === 'Overweight') counts.overweight++;
        else if (status === 'Obese') counts.obese++;
    });
    document.getElementById('normal-count').textContent = counts.normal;
    document.getElementById('underweight-count').textContent = counts.underweight;
    document.getElementById('overweight-count').textContent = counts.overweight;
    document.getElementById('obese-count').textContent = counts.obese;
}

function renderTable() {
    const tbody = document.querySelector('#status-table tbody');
    const search = document.getElementById('status-search').value.toLowerCase();
    const gradeFilter = document.getElementById('status-grade-filter').value;
    const typeFilter = document.getElementById('status-type-filter').value;
    
    const filtered = students.filter(s => 
        s.fullName.toLowerCase().includes(search) &&
        (!gradeFilter || s.grade === gradeFilter) &&
        (!typeFilter || (statusMap.get(s.id)?.status || '').includes(typeFilter))
    );
    
    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center py-12 text-gray-500">No students matching filter</td></tr>';
        return;
    }
    
    tbody.innerHTML = filtered.map(s => {
        const latest = statusMap.get(s.id);
        const status = latest ? latest.status : 'No Data';
        const statusClass = status.includes('Underweight') ? 'status-underweight' : 
                           status === 'Normal' ? 'status-normal' : 
                           status === 'Overweight' ? 'status-overweight' : 'status-obese';
        const date = latest ? new Date(latest.date).toLocaleDateString() : 'N/A';
        return `
            <tr class="hover:bg-gray-50">
                <td class="font-medium">${s.fullName}</td>
                <td>${s.grade} ${s.section}</td>
                <td><span class="px-3 py-1 text-sm rounded-full ${statusClass}">${status}</span></td>
                <td>${date}</td>
                <td><a href="measurements.php?student=${s.id}" class="text-blue-600 hover:underline">View Measurements</a></td>
            </tr>
        `;
    }).join('');
    lucide.createIcons();
}

function renderChart() {
    const counts = { normal: 0, underweight: 0, overweight: 0, obese: 0 };
    students.forEach(s => {
        const status = statusMap.get(s.id)?.status || 'No Data';
        if (status === 'Normal') counts.normal++;
        else if (status.includes('Underweight')) counts.underweight++;
        else if (status === 'Overweight') counts.overweight++;
        else if (status === 'Obese') counts.obese++;
    });
    const ctx = document.getElementById('status-pie').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Normal', 'Underweight', 'Overweight', 'Obese'],
            datasets: [{ data: [counts.normal, counts.underweight, counts.overweight, counts.obese], backgroundColor: ['#10b981', '#ef4444', '#f59e0b', '#b91c1c'] }]
        },
        options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
    });
}

function exportStatusCSV() {
    const data = students.map(s => {
        const latest = statusMap.get(s.id);
        return {
            name: s.fullName,
            grade: s.grade,
            status: latest?.status || 'No Data',
            date: latest?.date || ''
        };
    });
    window.app.exportCSV(data, 'nutritional-status.csv', ['name', 'grade', 'status', 'date']);
}

function exportStatusPDF() {
    window.app.exportPDF(students, 'nutritional-status.pdf', 'Nutritional Status Report');
}

// Event listeners
document.getElementById('status-search').oninput = renderTable;
document.getElementById('status-grade-filter').onchange = renderTable;
document.getElementById('status-type-filter').onchange = renderTable;

// Init
loadStatusData();
lucide.createIcons();
</script>

