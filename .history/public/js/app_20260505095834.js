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

// Data types (match TS interfaces)
const Student = {
    fromApi(data) {
        return {
            id: data.id.toString(),
            studentId: data.student_id,
            lrn: data.lrn,
            fullName: data.full_name,
            grade: data.grade,
            section: data.section,
            sex: data.sex,
            dateOfBirth: data.date_of_birth,
            guardian: data.guardian,
            contactNumber: data.contact_number,
            beneficiary: Boolean(data.beneficiary),
            hasAllergy: Boolean(data.has_allergy),
            allergyNotes: data.allergy_notes || '',
            remarks: data.remarks || '',
            createdAt: data.created_at,
        };
    }
};

const Measurement = {
    fromApi(data) {
        return {
            id: data.id.toString(),
            studentId: data.student_id.toString(),
            studentName: data.student_name,
            measurementType: data.measurement_type,
            date: data.date,
            weight: parseFloat(data.weight),
            height: parseFloat(data.height),
            bmi: parseFloat(data.bmi),
            nutritionalStatus: data.nutritional_status,
            measuredBy: data.measured_by,
            remarks: data.remarks || '',
        };
    }
};

// Students API
