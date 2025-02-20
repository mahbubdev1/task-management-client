import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout()
            .then(() => {
                alert('Logout success')
            })
    }

    return (
        <nav className="bg-blue-600 text-white py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
                <Link to={'/'} className="text-2xl font-bold hover:text-gray-200 transition duration-300">
                    Task Manage
                </Link>
                <div className="flex items-center gap-6">
                    {
                        user ? (
                            <>
                                <ul className="flex items-center gap-4">
                                    <li>
                                        <Link to={'/tasks'} className="hover:text-gray-300 transition duration-300">
                                            Tasks
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/addTask'} className="hover:text-gray-300 transition duration-300">
                                            Add a Task
                                        </Link>
                                    </li>
                                </ul>
                                <button onClick={handleLogout} className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg transition duration-300">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to={'/login'}>
                                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300">
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