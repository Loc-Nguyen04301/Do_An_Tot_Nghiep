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

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

