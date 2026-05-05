<?php /** Feeding Monitoring - Attendance calendar like React */ ?>
<div class="space-y-6">
    <h1 class="text-2xl font-bold">Feeding Monitoring</h1>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white rounded-xl shadow-sm p-6">
            <h3 class="text-lg font-semibold mb-4">Select Date</h3>
            <input type="date" id="attendance-date" class="form-input" onchange="loadAttendance()">
        </div>
        <div class="bg-white rounded-xl shadow-sm p-6">
            <h3 class="text-lg font-semibold mb-4">Today Summary</h3>
            <div id="attendance-summary" class="text-center py-8 text-gray-500">Select date to see attendance</div>
        </div>
    </div>
    
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table id="attendance-table" class="w-full">
            <thead>
                <tr class="data-table">
                    <th>Student</th>
                    <th>Present</th>
                    <th>Meal Received</th>
                    <th>Remarks</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="5" class="text-center py-12">Select date above</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<script>
document.getElementById('page-title').textContent = 'Feeding Monitoring';
document.getElementById('attendance-date').value = new Date().toISOString().split('T')[0];

// Load today's attendance
async function loadAttendance() {
    const date = document.getElementById('attendance-date').value;
    // AJAX /api/attendance?date=...
    // Toggle present/meal_received
    // Save on change
}

loadAttendance();
</script>
