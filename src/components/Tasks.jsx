import axios from "axios";
import { useEffect, useState } from "react";
import { FaClipboardList, FaSpinner, FaCheckCircle } from "react-icons/fa";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/tasks")
            .then(data => setTasks(data?.data));
    }, []);

    return (
        <div className="container mx-auto my-10 p-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">📝 Task Board</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* To-Do Column */}
                <div className="bg-gray-50 p-6 rounded-xl shadow-lg border border-gray-300">
                    <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                        <FaClipboardList className="text-gray-600" /> To-Do
                    </h2>
                    {tasks.filter(task => task.category === "To-Do").map(task => (
                        <div key={task._id} className="bg-white p-4 rounded-lg shadow-md mb-3 border border-gray-200 hover:shadow-xl transition">
                            <h3 className="font-semibold text-gray-800 text-lg">{task.title}</h3>
                            <p className="text-gray-600 text-sm">{task.description}</p>
                            <button>Update</button>
                            <button>Delete</button>
                        </div>
                    ))}
                </div>

                {/* In Progress Column */}
                <div className="bg-blue-100 p-6 rounded-xl shadow-lg border border-blue-300">
                    <h2 className="text-lg font-bold text-blue-700 mb-4 flex items-center gap-2">
                        <FaSpinner className="animate-spin text-blue-600" /> In Progress
                    </h2>
                    {tasks.filter(task => task.category === "In Progress").map(task => (
                        <div key={task._id} className="bg-white p-4 rounded-lg shadow-md mb-3 border border-blue-200 hover:shadow-xl transition">
                            <h3 className="font-semibold text-blue-800 text-lg">{task.title}</h3>
                            <p className="text-gray-600 text-sm">{task.description}</p>
                        </div>
                    ))}
                </div>

                {/* Done Column */}
                <div className="bg-green-100 p-6 rounded-xl shadow-lg border border-green-300">
                    <h2 className="text-lg font-bold text-green-700 mb-4 flex items-center gap-2">
                        <FaCheckCircle className="text-green-600" /> Done
                    </h2>
                    {tasks.filter(task => task.category === "Done").map(task => (
                        <div key={task._id} className="bg-white p-4 rounded-lg shadow-md mb-3 border border-green-200 hover:shadow-xl transition">
                            <h3 className="font-semibold text-green-800 text-lg">{task.title}</h3>
                            <p className="text-gray-600 text-sm">{task.description}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Tasks;