import bcrypt from 'bcrypt'

const saltRound = 10;

export function hash(password: string){
    const salt = bcrypt.genSaltSync(saltRound)
    return bcrypt.hashSync(password, salt)
}

export function compare(plain: string, hashed:any){
    return bcrypt.compareSync(plain, hashed)
}
