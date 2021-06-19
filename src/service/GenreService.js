import axios from 'axios'

const INSTRUCTOR = 'bg.tu-varna'
const COURSE_API_URL = 'http://localhost:9090'
const INSTRUCTOR_API_URL = `${COURSE_API_URL}/${INSTRUCTOR}`

class GenreService {

    getAll() {
        return axios.get(`${INSTRUCTOR_API_URL}/genres`);
    }

    getGenre(id) {
        return axios.get(`${INSTRUCTOR_API_URL}/genres/${id}`);
    }

    delete(id) {
        return axios.delete(`${INSTRUCTOR_API_URL}/genres/${id}`);
    }

    update(id, genre) {
        return axios.put(`${INSTRUCTOR_API_URL}/genres/${id}`, genre);
    }

}

export default new GenreService()