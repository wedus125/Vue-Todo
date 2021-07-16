import {AXIOS} from './server';

export default {
    getList() {
        let config;
        return AXIOS.get("/tasks", config)
    },
    create(data) {
        let config;
        return AXIOS.post('/tasks',data,config);
    },
    delete(id) {
        let config;
        return AXIOS.delete("/tasks/" + id, config)
    },
    getDetail(id) {
        let config;
        return AXIOS.get("/tasks/" + id, config)
    },
    update(id, data) {
        let config;
        return AXIOS.put('/tasks/'+id,data,config);
    },
};
