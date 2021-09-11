import http from "./base-api-services"

const login = (email, password) => http.post('/login', { email, password })
const logout = () => http.post('/logout')

const list = (interests) => {
    interests = interests.reduce((param, interest, i) => {
        param = param ? `${param}&` : '?';
        return `${param}interests=${interest}`;
    }, '');
    console.log(interests);
    return  http.get(`/members${interests}`);
};

const details = (id) => http.get(`/members/${id}`);

const register = (member) => {
    const data = new FormData()
    data.append("name", member.name)
    data.append('email', member.email)
    data.append('password', member.password)
    data.append('profilePicture', member.profilePicture)

    return http.post("/members", data)
}

const service = {
    list, 
    details, 
    login, 
    logout, 
    register
};

export default service;