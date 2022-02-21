import http from 'http-common'

class employeeService {

    getAll() {
        return http.get('/employees')
    }

    getById(id) {
        return http.get(`/employees/${id}`)
    }

    create(data) {
        return http.post('/employees', data)
    }

    update(id, data) {
        console.log(id)
        return http.put(`/employees/${id}`, data)
    }

    _delete(id) {
        return http.delete(`/employees/${id}`)
    }
}

export default new employeeService()