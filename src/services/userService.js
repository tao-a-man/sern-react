import axios from '../axios';
const userService = (function userService() {
    return {
        async userServiceLogin(username, password) {
            const respon = await axios.post('/api/login', { username, password });
            return respon;
        },
        async userServiceGetUser(id) {
            const respon = await axios.get(`/api/get-user?id=${id}`);
            return respon;
        },
        async userServiceCreateUser(data) {
            const respon = await axios.post('/api/create-user', { ...data });
            return respon;
        },
        async userServiceDeleteUser(id) {
            const respon = await axios.delete('/api/delete-user', { data: { id } });
            return respon;
        },
        async userServiceEditUser(data) {
            const respon = await axios.put('/api/update-user', { ...data });
            return respon;
        },
    };
})();

export default userService;
