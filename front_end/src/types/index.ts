export interface LoginInterface {
    email: string
    password: string
}

export interface RegisterInterface extends LoginInterface {
    username: string
    confirmPassword: string
}

export interface IUser {
    id?: number
    username: string
    email: string
    avatar: string
    address: string
    phone_number: string
    role?: Role
    is_social_login: boolean
}

export interface IProduct {
    id: number
    name: string
    brand: string
    description: string
    old_price: number
    new_price: number
    image: string
    available: number
    averageRating: number
    created_at: string
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

export enum OrderStatus {
    PROCESSING = 'PROCESSING',
    SUCCESS = 'SUCCESS',
    CANCELLED = 'CANCELLED'
}
export interface ReviewInterface {
    description: string
    star: number
    user_id: number
    product_id: number
    images?: string[]
}

export interface ICategory {
    id: number
    name: string
    created_at: string
    update_at: string
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

export interface IBill {
    id: number
    customer_name: string
    address: string
    phone_number: string
    email: string
    note: string
    user_id: number | null
    order_status: string
    payment_status: boolean
    return_status: string
    payment_method: string
    total_amount: number
    created_at: string
    update_at: string
    items: IItem[]
    user: {
        username: string
        phone_number: string
        email: string
    } | null
    ReasonCancelledBill: {
        reason_cancelled: string
    }
}

export interface IItem {
    product: { name: string, new_price: number, old_price: number, image: string }
    quantity: number
    total_price: number
}

export interface ICustomer {
    id: number
    username: string
    email: string
    avatar: string
    role: Role
    active: boolean
    phone_number?: string
    address?: string
    created_at?: string
    update_at?: string
}
export interface City {
    Id: string
    Name: string
    Districts: District[]
}
export interface District {
    Id: string
    Name: string
    Wards: Ward[]
}
export interface Ward {
    Id: string
    Name: string
}