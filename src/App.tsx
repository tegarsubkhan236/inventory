import { Routes, Route } from "react-router-dom";
import './assets/less/App.less';
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Role from "./pages/user_management/role/Role";
import User from "./pages/user_management/user/user";
import MainLayout from "./components/layout/MainLayout";
import NotFound from "./pages/error/NotFound";

const App = () => (
    <Routes>
        <Route path="/" element={<MainLayout />}>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/role" element={<Role />} />
            <Route path="/user" element={<User />} />
        </Route>
        <Route path="login" element={<Login />} />
    </Routes>
);

export default App;
