import { AxiosRequestConfig } from "axios";
import http from "./axios";

const countDashboard = () => {
    return http.get(`/dashboard/count`)
}

const listSoldOut = () => {
    return http.get(`/dashboard/soldout`)
}
const getRevenue = ({ params }: { params?: { year: number } }) => {
    return http.get(`/dashboard/revenue`, { params } as AxiosRequestConfig)
}

const DashboardService = { countDashboard, listSoldOut, getRevenue }

export default DashboardService