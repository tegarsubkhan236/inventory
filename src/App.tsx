import { Routes, Route } from "react-router-dom";
import './assets/less/App.less';
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";

const App = () => (
    <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="login" element={<Login />} />
    </Routes>
);

export default App;