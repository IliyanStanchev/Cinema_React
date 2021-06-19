import axios from 'axios'

const INSTRUCTOR = 'bg.tu-varna'
const COURSE_API_URL = 'http://localhost:9090'
const INSTRUCTOR_API_URL = `${COURSE_API_URL}/${INSTRUCTOR}`

class ShowtimeService {

    getAll(date) {
        if(date == null)
            return axios.get(`${INSTRUCTOR_API_URL}/showtimes`);

        return axios.post(`${INSTRUCTOR_API_URL}/showtimes/date`, date);
    }

    getShowtime(id) {
        return axios.get(`${INSTRUCTOR_API_URL}/showtimes/${id}`);
    }

    delete(id) {
        return axios.delete(`${INSTRUCTOR_API_URL}/showtimes/${id}`);
    }

    update(id, showtime) {
        return axios.put(`${INSTRUCTOR_API_URL}/showtimes/${id}`, showtime);
    }

}

export default new ShowtimeService()