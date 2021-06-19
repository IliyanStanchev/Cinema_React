import axios from 'axios'

const INSTRUCTOR = 'bg.tu-varna'
const COURSE_API_URL = 'http://localhost:9090'
const INSTRUCTOR_API_URL = `${COURSE_API_URL}/${INSTRUCTOR}`

class ProducersService {

    retrieveAllProducers() {
        //console.log('executed service')
        return axios.get(`${INSTRUCTOR_API_URL}/producers`);
    }

    retrieveProducer(id) {
        //console.log('executed service')
        return axios.get(`${INSTRUCTOR_API_URL}/producers/${id}`);
    }

    deleteProducer(id) {
        //console.log('executed service')
        return axios.delete(`${INSTRUCTOR_API_URL}/producers/${id}`);
    }

    updateProducer(id, producer) {
        //console.log('executed service')
        return axios.put(`${INSTRUCTOR_API_URL}/producers/${id}`, producer);
    }

    createProducer(producer) {
        //console.log('executed service')
        return axios.post(`${INSTRUCTOR_API_URL}/producers/`, producer);
    }
}

export default new ProducersService()