import { Navigate, Route, Routes } from "react-router-dom"
import AdminDashboardPage from "../../admin/pages/AdminDashboardPage";

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path={'/'} element={<AdminDashboardPage/>} />
            <Route path={'/admin'} element={<AdminDashboardPage/>} /> 
            <Route path={'/*'} element={<Navigate to='/' />} />
        </Routes>
    )
}

export default AdminRoutes;
