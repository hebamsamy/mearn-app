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
    role:string
}
export interface ILoginUser{
    email : string,
    password : string,
}
export interface Address{
    country :string,
    address1 :string,
    address2 :string,
    markland :string,
    zip :string,
}