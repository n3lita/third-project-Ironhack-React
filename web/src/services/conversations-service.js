import http from "./base-api-services"

const list = () => http.get('/conversations');
const remove = (id) => http.delete(`conversations/${id}`);
const detail = (id) => http.get(`conversations/${id}`); //conversationId
const createMessage = (id) => http.post(`conversations/message/${id}`); // conversationId
const createConversation = (id) => http.post(`conversations/${id}`) //receiverId

const conversationsService = {
    list,
    remove,
    detail,
    createMessage, 
    createConversation
};

export default conversationsService;