import axios from 'axios'

const INSTRUCTOR = 'bg.tu-varna'
const COURSE_API_URL = 'http://localhost:9090'
const INSTRUCTOR_API_URL = `${COURSE_API_URL}/${INSTRUCTOR}`

class MovieService {

    getAll() {
        return axios.get(`${INSTRUCTOR_API_URL}/movies`);
    }

    getMovie(id) {
        return axios.get(`${INSTRUCTOR_API_URL}/movies/${id}`);
    }

    delete(id) {
        return axios.delete(`${INSTRUCTOR_API_URL}/movies/${id}`);
    }

    update(id, movie) {
        return axios.put(`${INSTRUCTOR_API_URL}/movies/${id}`, movie);
    }

}

export default new MovieService()