enum Rol {
    PROFESOR,
    ALUMNO
}
export interface usuario {
    rut: string;
    primerNombre:   string;
    segundoNombre?:  string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    email: string;
    contrasena: string;
    rol?: Rol | null | undefined;
}