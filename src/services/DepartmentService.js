import api from './api'

export default {
    getAll() {
        return api.get('/departments')
    },

    getOne(id) {
        return api.get(`/departments/${id}`)
    },

    create($data){
        return api.post('/departments', $data)
    },

    update(id, $data){
        return api.put(`/departments/${id}`, $data)
    },
    
    remove(id) {
        return api.delete(`/departments/${id}`)
    }

}