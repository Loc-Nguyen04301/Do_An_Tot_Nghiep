import http from "./axios";

const countDashboard = () => {
    return http.get(`/dashboard/count`)
}

const listSoldOut = () => {
    return http.get(`/dashboard/soldout`)
}

const DashboardService = { countDashboard, listSoldOut }

export default DashboardService