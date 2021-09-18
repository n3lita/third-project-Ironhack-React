import http from "./base-api-services"

const login = (email, password) => http.post('/login', { email, password })
const logout = () => http.post('/logout')

const list = (interests) => {
    interests = interests.reduce((param, interest, i) => {
        param = param ? `${param}&` : '?';
        return `${param}interests=${interest}`;
    }, '');
    return  http.get(`/members${interests}`);
};

const getUser = (id) => http.get(`/members/${id}`);

const register = (member) => {
    console.log(member)
    const data = new FormData()
    data.append("name", member.name)
    data.append('email', member.email)
    data.append('age', member.age)
    data.append('password', member.password)
    data.append('profilePicture', member.profilePicture[0])

    return http.post("/register", data)
}

const edit = (id) => http.patch(`/members/${id}`)

const service = {
    list, 
    getUser, 
    login, 
    logout, 
    register,
    edit
};

export default service;