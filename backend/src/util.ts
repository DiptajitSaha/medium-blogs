import z from 'zod';

const isValidEmail = (email: string) => {
    const emailSchema = z.string().email();
    const res = emailSchema.safeParse(email);
    if(!res.success) console.log('zod: invalid email');
    return res;
}

const isValidPassword = (password: string) => {
    const passwordSchema = z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@&*%?!])([a-zA-Z\d$@&*%?!]){8,20}$/);
    const res = passwordSchema.safeParse(password);
    if(!res.success) console.log('zod: invalid password');
    return res;
}

export {
    isValidEmail,
    isValidPassword
}