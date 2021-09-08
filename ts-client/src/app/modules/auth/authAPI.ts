import axios from 'axios';

type LoginDetails = {
    email: string;
    password: string;
};

export function loginService(loginDetails: LoginDetails) {
    const body = {
        email: loginDetails.email,
        password: loginDetails.password,
    };

    return axios.post('/api/auth', body);
}
