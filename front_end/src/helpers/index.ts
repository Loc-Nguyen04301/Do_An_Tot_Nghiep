const convertNumbertoMoney = (number: number) => {
    return Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
}

export { convertNumbertoMoney }