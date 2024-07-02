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

const activeCampaign = (id: number) => {
    return http.post(`/salecampaign/active/${id}`)
}

const deleteCampaign = (id: number) => {
    return http.delete(`/salecampaign/delete/${id}`)
}

const SaleCampaignService = { createCampaign, getCampaign, getOnlyCampaignActive, activeCampaign, deleteCampaign }

export default SaleCampaignService