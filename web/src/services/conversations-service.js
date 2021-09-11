import http from "./base-api-services"

const list = () => http.get('/conversations');
const remove = (id) => http.delete(`conversations/${id}`);
const detail = (id) => http.get(`conversations/${id}`);
const createMessage = (id) => http.post(`conversations/${id}`);

const conversationsService = {
    list,
    remove,
    detail,
    createMessage
};

export default conversationsService;