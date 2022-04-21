export const LOGIN_MIN_LEN = 3;
export const LOGIN_MAX_LEN = 20;


export const isValidLogin = (login: string): boolean => {
    return !/^[a-z]+([-_]?[a-z0-9]+){0,2}$/i.test(login)
}

export const isValidEmail = (email: string): boolean => {
    return !/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(email)
}

export const isValidPhone = (phone: string): boolean => {
    return !/^\d[\d-]{4,14}\d$/.test(phone);
}

export const isValidPassword = (password: string): boolean => {
    return !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,40}$/.test(password);
}