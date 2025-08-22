import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
});

// Serviços de Aluno
export const studentService = {
    getAll: () => api.get('/students'),
    getById: (id) => api.get(`/students/${id}`),
    create: (data) => api.post('/students', data),
    update: (id, data) => api.put(`/students/${id}`, data),
    delete: (id) => api.delete(`/students/${id}`),
};

// Serviços de Curso
export const courseService = {
    getAll: () => api.get('/courses'),
    getById: (id) => api.get(`/courses/${id}`),
    create: (data) => api.post('/courses', data),
    update: (id, data) => api.put(`/courses/${id}`, data),
    delete: (id) => api.delete(`/courses/${id}`),
};

// Serviços de Matrícula
export const enrollmentService = {
    getAll: () => api.get('/enrollments'),
    getById: (id) => api.get(`/enrollments/${id}`),
    create: (data) => api.post('/enrollments', data),
    update: (id, data) => api.put(`/enrollments/${id}`, data),
    delete: (id) => api.delete(`/enrollments/${id}`),
};

// Serviços de Relatórios
export const reportService = {
    getTotalInvestedByStudent: () => api.get('/reports/total-invested'),
    getTopCourses: () => api.get('/reports/top-courses'),
    getRevenueByCourse: () => api.get('/reports/revenue'),
};

export default api;
