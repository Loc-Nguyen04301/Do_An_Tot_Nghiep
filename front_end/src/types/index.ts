import { string } from "yup";

export interface LoginInterface {
    email: string;
    password: string;
}

export interface RegisterInterface extends LoginInterface {
    username: string;
    confirmPassword: string;
}

export interface IUser {
    id: number | null;
    username: string;
    email: string;
    avatar: string;
}

export interface IProduct {
    id: number;
    name: string;
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