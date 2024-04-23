import { jwtDecode } from "jwt-decode"

export const getAccessToken = () => {
    return localStorage.getItem('accessToken')
}

export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken')
}

export const getBillId = () => {
    return localStorage.getItem('billId')
}

export const setAccessToken = (accessToken: string) => {
    localStorage.setItem('accessToken', accessToken)
}

export const setRefreshToken = (refreshToken: string) => {
    localStorage.setItem('refreshToken', refreshToken)
}

export const setBillId = (billId: string) => {
    localStorage.setItem('billId', billId)
}

export const removeAccessToken = () => {
    localStorage.removeItem('accessToken')
}

export const removeRefreshToken = () => {
    localStorage.removeItem('refreshToken')
}

export const convertNumbertoMoney = (number: number) => {
    return Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
}

export const isTokenExpiration = (token: string) => {
    const decoded = jwtDecode(token);
    if (token && decoded && decoded.exp) {
        if (decoded.exp >= Date.now() / 1000) return false;
    }
    return true;
}

export const formatDate = (inputDate: string): string => {
    const date = new Date(inputDate);

    // Define month names in Vietnamese
    const monthNames: string[] = [
        "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
        "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
    ];

    // Extract day, month, and year from the date object
    const day: number = date.getUTCDate();
    const monthIndex: number = date.getUTCMonth();
    const year: number = date.getUTCFullYear();

    // Create the formatted date string
    const formattedDate: string = `${day} ${monthNames[monthIndex]}, ${year}`;
    return formattedDate;
};

export const checkImage = (file: File) => {
    const types = ["image/png", "image/jpeg"];
    let error = "";
    if (!file) return (error = "File does not exist.");

    if (file.size > 1024 * 1024)
        // 1mb
        error = "The largest image size is 1mb";
    if (!types.includes(file.type)) error = "The image type is png / jpeg";

    return error;
};

export const imageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "u5nfpr4b");
    formData.append("cloud_name", "dr98sm712");
    // calling the upload API.
    const res = await fetch("https://api.cloudinary.com/v1_1/dr98sm712/upload", {
        method: "POST",
        body: formData,
    });

    const data = await res.json();
    return { data: data, public_id: data.public_id, url: data.secure_url };
};
