import { IProduct } from "./product";
export interface ICartItem{
    _id:string;
    quantity:number;
    product:IProduct
}