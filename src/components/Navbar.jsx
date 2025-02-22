import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import CustomToggle from "./Theme/CustomToggle";

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    // Dark Mode State
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") == "light"
    );
    console.log(darkMode);

    // useEffect(() => {
    //     if (darkMode) {
    //         document.documentElement.classList.add("dark");
    //         localStorage.setItem("theme", "dark");
    //     } else {
    //         document.documentElement.classList.remove("dark");
    //         localStorage.setItem("theme", "light");
    //     }
    // }, [darkMode]);

    // Logout Function
    const handleLogout = () => {
        logout()
            .then(() => {
                navigate("/login");
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Logout Success",
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    };

    return (
        <nav
            className={`py-4 shadow-md transition duration-300`}
        >
            <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
                <div>
                    <CustomToggle></CustomToggle>
                </div>
                <Link
                    to={"/"}
                    className="text-base sm:text-2xl font-bold hover:text-gray-200 transition duration-300"
                >
                    Task Manage
                </Link>
                <div className="flex items-center gap-6">
                    {user ? (
                        <>
                            <ul className="flex items-center gap-4">
                                <li>
                                    <NavLink
                                        to={"/tasks"}>
                                        Tasks
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to={"/addTask"
                                        }
                                    >
                                        Add a Task
                                    </NavLink>
                                </li>
                            </ul>
                            <div className="flex items-center gap-2">

                                <button
                                    onClick={handleLogout}
                                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition duration-300"
                                >
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link to={"/login"}>
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300">
                                    Login
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;