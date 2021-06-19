import axios from 'axios'

const INSTRUCTOR = 'bg.tu-varna'
const COURSE_API_URL = 'http://localhost:9090'
const INSTRUCTOR_API_URL = `${COURSE_API_URL}/${INSTRUCTOR}`

class SeatService {

    create(id) {
        return axios.put(`${INSTRUCTOR_API_URL}/seats/${id}`);
    }

    delete(id) {
        return axios.delete(`${INSTRUCTOR_API_URL}/seats/${id}`);
    }

}

export default new SeatService()