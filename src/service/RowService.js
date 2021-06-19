import axios from 'axios'

const INSTRUCTOR = 'bg.tu-varna'
const COURSE_API_URL = 'http://localhost:9090'
const INSTRUCTOR_API_URL = `${COURSE_API_URL}/${INSTRUCTOR}`

class RowService {

    getAll(id) {
        return axios.get(`${INSTRUCTOR_API_URL}/rows/${id}`);
    }

    delete(id) {
        return axios.delete(`${INSTRUCTOR_API_URL}/rows/${id}`);
    }

    create(id) {
        return axios.put(`${INSTRUCTOR_API_URL}/rows/${id}`);
    }

}

export default new RowService()