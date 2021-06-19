import axios from 'axios'


const INSTRUCTOR = 'bg.tu-varna'
const COURSE_API_URL = 'http://localhost:9090'
const INSTRUCTOR_API_URL = `${COURSE_API_URL}/${INSTRUCTOR}`

class HallService {

    getAll() {
        return axios.get(`${INSTRUCTOR_API_URL}/halls`);
    }

    retrieveHall(id) {
        return axios.get(`${INSTRUCTOR_API_URL}/halls/${id}`);
    }

    delete(id) {
        return axios.delete(`${INSTRUCTOR_API_URL}/halls/${id}`);
    }

    update(id, hall) {
        return axios.put(`${INSTRUCTOR_API_URL}/halls/${id}`, hall);
    }

}

export default new HallService()