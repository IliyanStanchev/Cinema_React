import axios from 'axios'

const INSTRUCTOR = 'bg.tu-varna'
const COURSE_API_URL = 'http://localhost:9090'
const INSTRUCTOR_API_URL = `${COURSE_API_URL}/${INSTRUCTOR}`

class LoginAuthenticationService {

   authenticateUser(user) {
        //console.log('executed service')
        return axios.post(`${INSTRUCTOR_API_URL}/mainPage`,user);
    }
}

export default new LoginAuthenticationService()