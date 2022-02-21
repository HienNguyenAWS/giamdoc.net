import axios from 'axios'

export default axios.create({
    baseURL: 'https://6200fee4fdf5090017249763.mockapi.io/api/v1',
    headers: {
        'Content-type': 'application/json'
    }
})