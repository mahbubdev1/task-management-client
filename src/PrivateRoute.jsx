import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./provider/AuthProvider";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return <span className="loading loading-ball loading-lg"></span>
    }
    if (!user) {
        return <Navigate to='/login' state={{ from: location }} />;
    }
    return children
};

export default PrivateRoute;