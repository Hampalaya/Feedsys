// FeedSys PHP JS Utils (match src/lib/api.ts + React logic)
// API_BASE_URL from config.php window var

const API_BASE_URL = 'http://localhost:5000/api';

async function apiCall(endpoint, options = {}) {
    const defaults = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    
    const config = { ...defaults, ...options };
    
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || `HTTP ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`API Error: ${endpoint}`, error);
        throw error;
    }
}
