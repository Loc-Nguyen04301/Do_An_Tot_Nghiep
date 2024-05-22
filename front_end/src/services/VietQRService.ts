import axios from "axios";

const createPaymentQR = ({ addInfo, amount }: { addInfo: string, amount: number }) => {
    return axios.post("https://api.vietqr.io/v2/generate", {
        "accountNo": 103870480417,
        "accountName": "NGUYEN GIA LOC",
        "acqId": 970415,
        "amount": amount,
        "addInfo": addInfo,
        "format": "text",
        "template": "print"
    },
        {
            headers: {
                "x-client-id": import.meta.env.VITE_VIETQR_CLIENT_ID,
                "x-api-key": import.meta.env.VITE_VIETQR_API_KEY
            }
        }
    )
}

const VietQRService = { createPaymentQR }

export default VietQRService