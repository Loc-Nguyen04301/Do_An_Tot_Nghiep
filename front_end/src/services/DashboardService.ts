import http from "./axios";

const countDashboard = () => {
    return http.get(`/dashboard/count`)
}

const DashboardService = { countDashboard }

export default DashboardService