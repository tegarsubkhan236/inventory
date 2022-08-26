import { Routes, Route } from "react-router-dom";
import './assets/less/App.less';
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Role from "./pages/user_management/role/Role";
import User from "./pages/user_management/user/user";

const App = () => (
    <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/role" element={<Role />} />
        <Route path="/user" element={<User />} />
        <Route path="login" element={<Login />} />
    </Routes>
);

export default App;