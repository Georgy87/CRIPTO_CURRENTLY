export const validateLogin = (email: string, password: string): null | string => {
    let result: string | null = null;
    if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email)) {
        result = 'Некорректный e-mail';
    } 

    if (!/^[a-zA-Z0-9_]{7,}$/.test(password)) {
        result = `Пароль должен быть не короче 7 символов и содержать только латинские буквы, цифры и "_".`;
    } 
    
    return result;
};
