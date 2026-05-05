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
