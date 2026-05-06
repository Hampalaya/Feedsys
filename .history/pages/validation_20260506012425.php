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
