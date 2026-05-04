// API Configuration and utilities for connecting to the backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiCall = async (endpoint, options = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `HTTP Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error: ${endpoint}`, error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  login: (username, password) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),
};

// Users API
export const usersAPI = {
  getAll: () => apiCall('/users'),
  getById: (id) => apiCall(`/users/${id}`),
  create: (userData) =>
    apiCall('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  update: (id, userData) =>
    apiCall(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    }),
  delete: (id) =>
    apiCall(`/users/${id}`, {
      method: 'DELETE',
    }),
};

// Students API
export const studentsAPI = {
  getAll: () => apiCall('/students'),
  getById: (id) => apiCall(`/students/${id}`),
  create: (studentData) =>
    apiCall('/students', {
      method: 'POST',
      body: JSON.stringify(studentData),
    }),
  update: (id, studentData) =>
    apiCall(`/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(studentData),
    }),
  delete: (id) =>
    apiCall(`/students/${id}`, {
      method: 'DELETE',
    }),
};

// Measurements API
export const measurementsAPI = {
  getAll: () => apiCall('/measurements'),
  getById: (id) => apiCall(`/measurements/${id}`),
  getByStudentId: (studentId) => apiCall(`/measurements/student/${studentId}`),
  create: (measurementData) =>
    apiCall('/measurements', {
      method: 'POST',
      body: JSON.stringify(measurementData),
    }),
  update: (id, measurementData) =>
    apiCall(`/measurements/${id}`, {
      method: 'PUT',
      body: JSON.stringify(measurementData),
    }),
  delete: (id) =>
    apiCall(`/measurements/${id}`, {
      method: 'DELETE',
    }),
};

// Attendance API
export const attendanceAPI = {
  getAll: () => apiCall('/attendance'),
  getById: (id) => apiCall(`/attendance/${id}`),
  getByStudentId: (studentId) => apiCall(`/attendance/student/${studentId}`),
  create: (attendanceData) =>
    apiCall('/attendance', {
      method: 'POST',
      body: JSON.stringify(attendanceData),
    }),
  update: (id, attendanceData) =>
    apiCall(`/attendance/${id}`, {
      method: 'PUT',
      body: JSON.stringify(attendanceData),
    }),
  delete: (id) =>
    apiCall(`/attendance/${id}`, {
      method: 'DELETE',
    }),
};

export default {
  authAPI,
  usersAPI,
  studentsAPI,
  measurementsAPI,
  attendanceAPI,
};
