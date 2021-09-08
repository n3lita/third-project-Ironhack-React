import http from "./base-api-services"

const list = () => http.get("/members");
const details = (id) => http.get(`/members/${id}`);

const service = {
    list, 
    details
};

export default service;