import  * as yup  from 'yup';

export const userSchema = yup.object({
    rut: yup.string()
    .matches(/^\d{7,8}-[0-9kK]$/, 'El RUT debe tener un formato válido (Ej: 12345678-9).')
    .required('El RUT es obligatorio.'),
    primerNombre: yup.string()
    .matches(/^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]+$/, 'El primer nombre solo puede contener letras.')
    .max(50, 'El primer nombre no puede exceder los 50 caracteres.')
    .required('El primer nombre es obligatorio.'),
    segundoNombre: yup.string()
    .matches(/^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]*$/, 'El segundo nombre solo puede contener letras.')
    .max(50, 'El segundo nombre no puede exceder los 50 caracteres.'),
    apellidoPaterno:  yup.string()
    .matches(/^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]+$/, 'El apellido paterno solo puede contener letras.')
    .max(30, 'El apellido paterno no puede exceder los 50 caracteres.')
    .required('El apellido paterno es obligatorio.'),
    apellidoMaterno: yup.string()
    .matches(/^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]+$/, 'El apellido materno solo puede contener letras.')
    .max(30, 'El apellido materno no puede exceder los 30 caracteres.')
    .required('El apellido materno es obligatorio.'),
    email: yup.string()
    .email('Email no es válido')
    .matches(/@(profesor.duoc.cl|duocuc.cl)$/, 'Email no es valido.')
    .required('Email no es valido.'),
    contrasena: yup.string()
    .min(8, 'La contraseña no es correcta')
    .required('La contraseña no es correcta')
    .matches(/[A-Z]/, 'La contraseña no es correcta.')
    .matches(/[°!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/, 'La contraseña no es correcta.'),
    rol: yup.string()
    .oneOf(['ALUMNO',  'PROFESOR'], 'El rol no es válido.')
});

