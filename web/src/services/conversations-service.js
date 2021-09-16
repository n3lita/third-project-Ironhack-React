import http from "./base-api-services"

const list = () => http.get('/conversations');
const remove = (id) => http.delete(`conversations/${id}`);
const getConversation = (id) => http.get(`conversations/${id}`); //conversationId
const createMessage = (id, text) => http.post(`conversations/message/${id}`, { text }); // conversationId
const createConversation = (id) => http.post(`conversations/${id}`) //receiverId

const conversationsService = {
    list,
    remove,
    getConversation,
    createMessage, 
    createConversation
};

export default conversationsService;