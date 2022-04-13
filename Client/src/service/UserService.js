import axios from 'axios'

const REST_API_URL = 'http://localhost:9090/eshop/user'

class UserService{

    createUser(formData)
    {
        return axios.post(REST_API_URL + '/register', formData); 
    }
}

export default new UserService();