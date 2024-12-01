import * as bcrypt from 'bcrypt';


export  function encriptPassword(passwordI:string ){
    const newPassword = bcrypt.hashSync(passwordI, 10);

    return newPassword;

}



export  function comparePassword(passwordCompare: string, passwordDatabase: string){
    const compare = bcrypt.compareSync(passwordCompare, passwordDatabase);
    return compare;
}