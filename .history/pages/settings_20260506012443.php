<?php /** Settings - User profile, system preferences */ ?>
<div class="space-y-6">
    <h1 class="text-2xl font-bold">Settings</h1>

    <!-- Profile Section -->
    <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 max-w-2xl">
        <h2 class="text-xl font-semibold mb-6 flex items-center gap-2">
            <i data-lucide="user" class="w-5 h-5"></i>Profile Settings
        </h2>
        <form id="profile-form" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-sm font-medium mb-2">Full Name</label>
                    <input id="user-name" class="form-input" required>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Username</label>
                    <input id="user-username" class="form-input" required>
                </div>
