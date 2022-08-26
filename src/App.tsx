import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './assets/less/App.less';
import Dashboard from "./pages/layout/Dashboard";
import Login from "./pages/auth/Login";

const App = () => (
    <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="login" element={<Login />} />
    </Routes>
);

export default App;