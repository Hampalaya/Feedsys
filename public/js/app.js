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
const studentsAPI = {
    async getAll() { 
        const data = await apiCall('/students');
        return data.map(Student.fromApi);
    },
    async create(studentData) {
        const apiData = {
            student_id: studentData.studentId,
            lrn: studentData.lrn,
            full_name: studentData.fullName,
            grade: studentData.grade,
            section: studentData.section,
            sex: studentData.sex,
            date_of_birth: studentData.dateOfBirth,
            guardian: studentData.guardian,
            contact_number: studentData.contactNumber,
            beneficiary: studentData.beneficiary,
            has_allergy: studentData.hasAllergy,
            allergy_notes: studentData.allergyNotes,
            remarks: studentData.remarks,
        };
        return await apiCall('/students', { method: 'POST', body: JSON.stringify(apiData) });
    },
    // update, delete similar...
};

// Export for pages
window.app = { apiCall, studentsAPI, Student, Measurement /* add more */ };

// Toast notifications (simple)
function toast(message, type = 'info') {
    // Sonner replacement - simple div toast
    const toastDiv = document.createElement('div');
    toastDiv.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    } text-white`;
    toastDiv.textContent = message;
    document.body.appendChild(toastDiv);
    
    setTimeout(() => toastDiv.remove(), 3000);
}

