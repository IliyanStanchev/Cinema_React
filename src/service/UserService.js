import axios from 'axios'

const INSTRUCTOR = 'bg.tu-varna'
const COURSE_API_URL = 'http://localhost:9090'
const INSTRUCTOR_API_URL = `${COURSE_API_URL}/${INSTRUCTOR}`

class UserService {

    retrieveAllUsers() {
        //console.log('executed service')
        return axios.get(`${INSTRUCTOR_API_URL}/users`);
    }

    retrieveAdmin(){
        return axios.post(`${INSTRUCTOR_API_URL}/admin/profile`)
    }

    retrieveUser(id) {
        //console.log('executed service')
        return axios.get(`${INSTRUCTOR_API_URL}/users/${id}`);
    }

    deleteUser(id) {
        //console.log('executed service')
        return axios.delete(`${INSTRUCTOR_API_URL}/users/${id}`);
    }

    updateUser(id, user) {
        //console.log('executed service')
        return axios.put(`${INSTRUCTOR_API_URL}/users/${id}`, user);
    }

    createUser(user) {
        //console.log('executed service')
        return axios.post(`${INSTRUCTOR_API_URL}/login`, user);
    }
}

export default new UserService()