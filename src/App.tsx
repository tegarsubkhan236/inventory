import {Navigate, useRoutes} from "react-router-dom";
import {getCurrentUser} from "./service/AuthService";
import Dashboard from "./pages/dashboard/Dashboard";
import MainLayout from "./components/layout/MainLayout";
import Role from "./pages/user_management/Role";
import User from "./pages/user_management/User";
import Login from "./pages/auth/Login";
import NotFound from "./pages/error/NotFound";
import './assets/less/App.less';

function App() {
    const CurrUser = getCurrentUser();

    return useRoutes([
        {
            element: <MainLayout/>,
            children: [
                {path: "/", element: CurrUser != null ? <Navigate to="dashboard"/> : <Navigate to="login"/>},
                {path: "dashboard", element: <Dashboard/>},
                {path: "role", element: <Role/>},
                {path: "user", element: <User/>},
                {path: "*", element: <Navigate to="page-not-found"/>},
                {path: "page-not-found", element: <NotFound/>},
            ],
        },
        {path: "login", element: <Login/>},
    ]);
}

export default App;
