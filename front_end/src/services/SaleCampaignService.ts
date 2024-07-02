import http from "./axios";

export interface ICreateSaleCampaign {
    name: string
    from_date: string
    to_date: string
}


const createCampaign = (data: ICreateSaleCampaign) => {
    return http.post(`/salecampaign`, data)
}

const SaleCampaignService = { createCampaign }

export default SaleCampaignService