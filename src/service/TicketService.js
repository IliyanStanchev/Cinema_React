import axios from 'axios'

const INSTRUCTOR = 'bg.tu-varna'
const COURSE_API_URL = 'http://localhost:9090'
const INSTRUCTOR_API_URL = `${COURSE_API_URL}/${INSTRUCTOR}`

class TicketService {

    getAll() {
        return axios.get(`${INSTRUCTOR_API_URL}/tickets`);
    }

    getTicket(id) {
        return axios.get(`${INSTRUCTOR_API_URL}/tickets/${id}`);
    }

    delete(id) {
        return axios.delete(`${INSTRUCTOR_API_URL}/tickets/${id}`);
    }

    update(id, ticket) {
        return axios.put(`${INSTRUCTOR_API_URL}/customer/hall/ticket`, ticket);
    }

}

export default new TicketService()