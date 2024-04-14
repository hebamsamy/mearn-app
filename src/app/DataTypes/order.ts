import { IAddress } from "./address"
import { IProduct } from "./product"
import { IStoredUser } from "./user"

export interface IUserOrder {
    _id: string,
    totalPrice: number,
    totalQuantity: number,
    status: string,
    paymentMethod: string,
    deliveryInstructions: string,
    address: IAddress,
    createdBy: IStoredUser,
    productlist: IProductListItem[]
    orderDate: string
    deliverDate: string
}
export interface IVendorOrder {
    status: string,
    orderId: string,
    productItem:IProductListItem,
    orderDate: string,
    paymentMethod: string,
    deliveryInstructions: string,
    address: IAddress,
    createdBy: IStoredUser
}
export interface IVendorOrderDetails {
    _id:string,
    status: string,
    productlist:IProductListItem[],
    orderDate: string,
    paymentMethod: string,
    deliveryInstructions: string,
    address: IAddress,
    createdBy: IStoredUser,
    totalQuantity:number,
    deliverDate: string

}
export interface IProductListItem {
    quantity: number,
    product: IProduct,
    supPrice: number,
    status: string,
    _id: string
}
