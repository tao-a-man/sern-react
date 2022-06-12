import instance from '../axios';

async function userService(username, password) {
    const respon = await instance.post('/api/login', { username, password });
    return respon;
}

export default userService;
