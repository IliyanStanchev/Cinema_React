import axios from 'axios'

const INSTRUCTOR = 'bg.tu-varna'
const COURSE_API_URL = 'http://localhost:9090'
const INSTRUCTOR_API_URL = `${COURSE_API_URL}/${INSTRUCTOR}`

class ShowtimeSeatService {

    getAll(id) {
        return axios.get(`${INSTRUCTOR_API_URL}/showtime/seats/${id}`);
    }

    update(id, showtimeSeat) {
        return axios.put(`${INSTRUCTOR_API_URL}/showtime/seats`, showtimeSeat);
    }

}

export default new ShowtimeSeatService()