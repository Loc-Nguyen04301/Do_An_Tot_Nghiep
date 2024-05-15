import { string } from "yup";

export interface LoginInterface {
    email: string;
    password: string;
}

export interface RegisterInterface extends LoginInterface {
    username: string;
    confirmPassword: string;
}

export interface IUpdateUser {

}

export interface IUser {
    id?: number;
    username: string;
    email: string;
    avatar: string;
    address: string,
    phone_number: string
}

export interface IProduct {
    id: number;
    name: string;
    brand: string;
    description: string;
    old_price: number;
    new_price: number;
    image: string;
    available: number;
    created_at: string;
}

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

export enum PaymentMethod {
    SHIPCOD = "SHIPCOD",
    BANK_TRANSFER = "BANK_TRANSFER",
    VNPAY = "VNPAY"
}

export interface ReviewInterface {
    description: string;
    star: number;
    user_id: number;
    product_id: number;
    images?: string[];
}

export interface CreatePaymentDto {
    amount: number;
}

export interface ICategory {
    id: number;
    name: string;
    created_at: string;
    update_at: string;
}

export interface CreateProductDto {
    brand?: string
    name?: string
    description?: string
    old_price?: number
    new_price?: number
    image?: string
    available?: number
    category_ids?: number[]
}

export interface UpdateProductDto extends CreateProductDto { }