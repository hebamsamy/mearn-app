export interface IRegisterUser{
    email : string,
    name : string,
    password : string,
    phoneNumber: string,
    role:string
}
export interface IStoredUser{
    _id : string,
    email : string,
    name : string,
    token : string,
    phoneNumber: string,
    role:string,
    birthDate:string,
    gender:string,
    imgURL:string,
}
export interface ILoginUser{
    email : string,
    password : string,
}