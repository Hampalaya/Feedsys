<?php /** Students - CRUD table + modals, exact React student-profiles.tsx */ ?>
<div class="space-y-6">
    <h1 class="text-2xl font-bold">Student Profiles</h1>
    
    <!-- Search/Filter -->
    <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div class="flex gap-3 flex-1 max-w-md">
                <input id="search-input" placeholder="Search students..." class="flex-1 form-input">
                <select id="grade-filter" class="form-input">
                    <option value="">All Grades</option>
                    <option value="Grade 1">Grade 1</option>
                    <option value="Grade 2">Grade 2</option>
                    <option value="Grade 3">Grade 3</option>
                </select>
            </div>
            <button id="add-student-btn" class="btn-gradient text-white px-6 py-2.5 rounded-xl font-medium shadow-lg">
                <i data-lucide="user-plus" class="w-4 h-4 inline mr-2"></i>
                Add Student
            </button>
        </div>
    </div>
    
    <!-- Students Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
            <table id="students-table" class="w-full data-table">
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>LRN</th>
                        <th>Name</th>
                        <th>Grade/Section</th>
                        <th>Sex</th>
                        <th>Beneficiary</th>
                        <th>Allergy</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="8" class="text-center py-8 text-gray-500">Loading students...</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- Add/Edit Student Modal -->
<div id="student-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm hidden z-50" onclick="closeStudentModal()">
    <div class="w-full max-w-2xl mx-auto mt-20 p-1" onclick="event.stopPropagation()">
        <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div class="p-6 border-b border-gray-200">
                <div class="flex items-center justify-between">
                    <h2 id="modal-title" class="text-xl font-bold">Add Student</h2>
                    <button onclick="closeStudentModal()" class="p-2 hover:bg-gray-100 rounded-lg">
                        <i data-lucide="x" class="w-5 h-5"></i>
                    </button>
                </div>
            </div>
            <div class="p-6">
                <form id="student-form" class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium mb-1.5">Student ID *</label>
                            <input id="student-id" required class="form-input">
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1.5">LRN</label>
                            <input id="lrn" class="form-input">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1.5">Full Name *</label>
                        <input id="full-name" required class="form-input">
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium mb-1.5">Grade *</label>
                            <select id="grade" required class="form-input">
                                <option>Grade 1</option>
                                <option>Grade 2</option>
                                <option>Grade 3</option>
                                <option>Grade 4</option>
                                <option>Grade 5</option>
                                <option>Grade 6</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1.5">Section *</label>
                            <input id="section" required class="form-input">
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-sm font-medium mb-1.5">Sex</label>
                            <select id="sex" class="form-input">
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1.5">Date of Birth</label>
                            <input type="date" id="dob" class="form-input">
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1.5">Contact Number</label>
                            <input id="contact" class="form-input">
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="flex items-center gap-2">
                            <input id="beneficiary" type="checkbox" class="w-4 h-4 rounded">
                            <label class="text-sm">Beneficiary</label>
                        </div>
                        <div class="flex items-center gap-2">
                            <input id="allergy" type="checkbox" class="w-4 h-4 rounded">
                            <label class="text-sm">Has Allergy</label>
                        </div>
                    </div>
                    <div id="allergy-notes-group" class="hidden">
                        <label class="block text-sm font-medium mb-1.5">Allergy Notes</label>
                        <textarea id="allergy-notes" rows="2" class="form-input"></textarea>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1.5">Remarks</label>
                        <textarea id="remarks" rows="2" class="form-input"></textarea>
                    </div>
                    <div class="pt-4 border-t">
                        <button type="submit" id="save-student" class="btn-gradient text-white px-8 py-2.5 rounded-xl font-medium shadow-lg w-full md:w-auto">
                            Save Student
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

