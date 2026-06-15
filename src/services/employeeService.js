// src/services/employeeService.js
import api from './api'

export default {
    getAll() {
        return api.get('/employees')
    },

    getOne(id) {
        return api.get(`/employees/${id}`)
    },

    create(data) {
        return api.post('/employees', data)
    },

    update(id, data) {
        return api.put(`/employees/${id}`, data)
    },

    remove(id) {
        return api.delete(`/employees/${id}`)
    }
}