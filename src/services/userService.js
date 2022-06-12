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
    };
})();

export default userService;
