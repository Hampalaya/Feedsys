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
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Email</label>
                <input type="email" id="user-email" class="form-input">
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-sm font-medium mb-2">New Password</label>
                    <input type="password" id="user-password" class="form-input">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Confirm Password</label>
                    <input type="password" id="user-confirm-password" class="form-input">
                </div>
            </div>
            <div class="pt-4 border-t flex gap-3">
                <button type="submit" class="btn-gradient px-8 py-2.5 rounded-xl font-medium shadow-lg">
                    <i data-lucide="save" class="w-4 h-4 inline mr-2"></i>Save Changes
                </button>
                <button type="button" onclick="resetPassword()" class="bg-orange-600 hover:bg-orange-700 text-white px-8 py-2.5 rounded-xl font-medium shadow-lg">
                    Reset Password
                </button>
            </div>
        </form>
    </div>

    <!-- System Settings -->
    <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 class="text-xl font-semibold mb-6 flex items-center gap-2">
            <i data-lucide="settings" class="w-5 h-5"></i>System Settings
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label class="flex items-center gap-3 mb-2">
                    <input type="checkbox" id="auto-backup" class="w-4 h-4 rounded">
                    <span class="text-sm font-medium">Auto Backup Daily</span>
                </label>
                <label class="flex items-center gap-3 mb-2">
                    <input type="checkbox" id="email-notifications" class="w-4 h-4 rounded">
                    <span class="text-sm font-medium">Email Notifications</span>
                </label>
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Default Measurement Unit</label>
                <select id="measurement-unit" class="form-input">
                    <option>Metric (kg/cm)</option>
                    <option>Imperial (lbs/in)</option>
                </select>
            </div>
        </div>
        <div class="pt-4 border-t mt-6 flex gap-3">
            <button onclick="saveSystemSettings()" class="btn-gradient px-8 py-2.5 rounded-xl font-medium shadow-lg">
                Save System Settings
            </button>
        </div>
    </div>

    <!-- API Status -->
    <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h2 class="text-xl font-semibold mb-4">API Status</h2>
        <div id="api-status" class="space-y-3">
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span>Backend Server</span>
                <span id="backend-status" class="px-2 py-1 rounded-full text-xs font-medium bg-gray-200">Checking...</span>
            </div>
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span>Database</span>
                <span id="db-status" class="px-2 py-1 rounded-full text-xs font-medium bg-gray-200">Checking...</span>
            </div>
        </div>
    </div>
</div>

<script>
document.getElementById('page-title').textContent = 'Settings';
let currentUser = {};

// Load user profile
async function loadProfile() {
    try {
        currentUser = await window.app.authAPI.getCurrentUser();
        document.getElementById('user-name').value = currentUser.fullName || '';
        document.getElementById('user-username').value = currentUser.username || '';
        document.getElementById('user-email').value = currentUser.email || '';
    } catch (error) {
        toast('Failed to load profile', 'error');
    }
}

document.getElementById('profile-form').onsubmit = async function(e) {
    e.preventDefault();
    const password = document.getElementById('user-password').value;
    if (password && password !== document.getElementById('user-confirm-password').value) {
        toast('Passwords do not match', 'error');
        return;
    }
    
    try {
        await window.app.usersAPI.update(currentUser.id, {
            fullName: document.getElementById('user-name').value,
            username: document.getElementById('user-username').value,
            email: document.getElementById('user-email').value,
            ...(password && { password })
        });
        toast('Profile updated successfully', 'success');
    } catch (error) {
        toast(error.message, 'error');
    }
};

function resetPassword() {
    if (confirm('Reset password?')) {
        // Stub - implement backend
        toast('Password reset link sent (stub)', 'success');
    }
}

function saveSystemSettings() {
    const settings = {
        autoBackup: document.getElementById('auto-backup').checked,
        emailNotifications: document.getElementById('email-notifications').checked,
        measurementUnit: document.getElementById('measurement-unit').value
    };
    // Stub - save to localStorage or API
    localStorage.setItem('systemSettings', JSON.stringify(settings));
    toast('Settings saved', 'success');
}

// Check API status
async function checkAPIStatus() {
    try {
        await fetch(API_BASE_URL + '/health');
        document.getElementById('backend-status').textContent = 'Online';
        document.getElementById('backend-status').className = 'px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800';
    } catch {
        document.getElementById('backend-status').textContent = 'Offline';
        document.getElementById('backend-status').className = 'px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800';
    }
    // DB status stub
    document.getElementById('db-status').textContent = 'Connected';
    document.getElementById('db-status').className = 'px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800';
}

// Init
loadProfile();
checkAPIStatus();
lucide.createIcons();
</script>

