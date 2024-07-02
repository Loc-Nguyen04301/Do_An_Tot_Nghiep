import http from "./axios";

export interface ICreateSaleCampaign {
    name: string
    from_date: string
    to_date: string
}


const createCampaign = (data: ICreateSaleCampaign) => {
    return http.post(`/salecampaign`, data)
}

const getCampaign = () => {
    return http.get(`/salecampaign`)
}

const getOnlyCampaignActive = () => {
    return http.get(`/salecampaign/only`)
}

const SaleCampaignService = { createCampaign, getCampaign, getOnlyCampaignActive }

export default SaleCampaignService