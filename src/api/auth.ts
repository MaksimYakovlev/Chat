import {request} from 'core/apiRequest';
import {APIError, UserDTO} from './types';

type LoginRequestData = {
    login: string;
    password: string;
};

type RegistrationRequestData = {
    first_name: "string",
    second_name: "string",
    login: "string",
    email: "string",
    password: "string",
    phone: "string"
};

type LoginResponseData = {} | APIError;

export const authAPI = {
    login: (data: LoginRequestData) =>
        request.post<LoginResponseData>('auth/signin', data),

    registration: (data: RegistrationRequestData) =>
        request.post<LoginResponseData>('auth/signup', data),

    me: () => request.get<UserDTO | APIError>('auth/user'),

    logout: () => request.post('auth/logout'),
};
