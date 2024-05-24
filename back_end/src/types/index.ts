import { OrderStatus, ReturnStatus } from "@prisma/client"

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

export enum SortBy {
    ASC = 'asc',
    DESC = 'desc'
}

export type BillParams = {
    customer_name?: string,
    address?: string,
    phone_number?: string,
    user_id?: number,
    order_status?: OrderStatus,
    payment_status?: boolean,
    return_status?: ReturnStatus,
    page_index?: number,
    page_size?: number,
    from_date?: Date,
    to_date?: Date,
}