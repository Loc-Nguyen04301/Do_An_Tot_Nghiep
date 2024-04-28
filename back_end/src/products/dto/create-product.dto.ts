export class CreateProductDto {
    name: string
    description: string
    old_price: number
    new_price: number
    image: string
    available?: number
    category_ids?: number[]
}
