import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Logout Success",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }

    return (
        <nav className="bg-green-700 text-white py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
                <Link to={'/'} className="text-base sm:text-2xl font-bold hover:text-gray-200 transition duration-300">
                    Task Manage
                </Link>
                <div className="flex items-center gap-6">
                    {
                        user ? (
                            <>
                                <ul className="flex items-center gap-4">
                                    <li>
                                        <NavLink to={'/tasks'} className={({ isActive }) => `hover:text-gray-300 transition duration-300 ${isActive ? 'text-gray-200' : 'text-white'}`}>
                                            Tasks
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/addTask'} className={({ isActive }) => `hover:text-gray-300 transition duration-300 ${isActive ? 'text-gray-200' : 'text-white'}`}>
                                            Add a Task
                                        </NavLink>
                                    </li>
                                </ul>
                                <button onClick={handleLogout} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition duration-300">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to={'/login'}>
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300">
                                    Login
                                </button>
                            </Link>
                        )
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;