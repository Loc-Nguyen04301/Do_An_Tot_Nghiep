import { string } from "yup";

export interface LoginInterface {
    email: string;
    password: string;
}

export interface RegisterInterface {
    name: string;
    email: string;
    password: string;
}

export interface IUser {
    id?: number;
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

