import axios from 'axios'

const INSTRUCTOR = 'bg.tu-varna'
const COURSE_API_URL = 'http://localhost:9090'
const INSTRUCTOR_API_URL = `${COURSE_API_URL}/${INSTRUCTOR}`

class TypeService {

    getAll() {
        return axios.get(`${INSTRUCTOR_API_URL}/types`);
    }

    getType(id) {
        return axios.get(`${INSTRUCTOR_API_URL}/types/${id}`);
    }

    delete(id) {
        return axios.delete(`${INSTRUCTOR_API_URL}/types/${id}`);
    }

    update(id, type) {
        return axios.put(`${INSTRUCTOR_API_URL}/types/${id}`, type);
    }

}

export default new TypeService()