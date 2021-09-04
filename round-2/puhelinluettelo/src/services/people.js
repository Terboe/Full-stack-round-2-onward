

import axios from 'axios'

const url = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(url, newObject)
    return request.then(response => response.data)
}

const del = (id) => {
    const request = axios.delete(`${url}/${id}`)
    return request
}

const change = (id, newData) => {
    const request = axios.put(`${url}/${id}`, newData)
    return request.then(response => response.data)
}

const xportObj = {getAll,create, del,change}
export default xportObj


