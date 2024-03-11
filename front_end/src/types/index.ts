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
    username: string;
    email: string;
    avatart: string;
}