import axios from "axios";

export default class UserService {
    constructor() {
        this.url = "http://localhost:8080/users";
    }

    create(obj) {
        return axios.post(this.url, obj);
    }
    update(obj) {
        return axios.put(`${this.url}/${obj.id}`, obj);
    }
    findAll() {
        return axios.get(this.url).then((res) => res.data);
    }
    findById(id) {
        return axios.get(`${this.url}/${id}`).then((res) => res.data);
    }
    delete(id) {
        return axios.delete(`${this.url}/${id}`);
    }
}
