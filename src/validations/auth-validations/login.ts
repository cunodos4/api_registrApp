import * as yup from 'yup';


export const loginSchema = yup.object({
    email: yup.string()
    .email('Email no es válido')
    .matches(/@(profesor.duoc.cl|duocuc.cl)$/, 'Email no es valido.')
    .required('Email no es valido.'),
    contrasena: yup.string()
    .min(8, 'La contraseña no es correcta')
    .required('La contraseña no es correcta')
    .matches(/[A-Z]/, 'La contraseña no es correcta.')
    .matches(/[°!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/, 'La contraseña no es correcta.')
});