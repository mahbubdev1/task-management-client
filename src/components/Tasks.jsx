import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTasks, FaTrash } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";

const Tasks = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const [theme, setTheme] = useState();
    console.log(theme);

    const { data: tasks = [], refetch } = useQuery({
        queryKey: ["tasks", user?.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/tasks/${user?.email}`);
            return res.data;
        },
    });

    const [localTasks, setLocalTasks] = useState([]);

    useEffect(() => {
        setTheme(localStorage.getItem('theme'));
        setLocalTasks(tasks);
    }, [tasks]);

    const handleUpdate = (taskId) => {
        navigate(`/tasks/update/${taskId}`);
    };

    const handleDelete = (taskId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/tasks/${taskId}`)
                    .then((res) => {
                        refetch();
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your task has been deleted.",
                                icon: "success",
                            });
                        }
                    })
                    .catch((error) => console.error(error));
            }
        });
    };

    const onDragEnd = async (result) => {
        const { source, destination, draggableId } = result;
        if (!destination) return;

        if (source.droppableId === destination.droppableId) {
            const tasksInColumn = localTasks.filter(task => task.category === source.droppableId);
            const otherTasks = localTasks.filter(task => task.category !== source.droppableId);
            const newTasksInColumn = Array.from(tasksInColumn);
            const [movedTask] = newTasksInColumn.splice(source.index, 1);
            newTasksInColumn.splice(destination.index, 0, movedTask);
            setLocalTasks([...otherTasks, ...newTasksInColumn]);
        } else {
            const sourceTasks = localTasks.filter(task => task.category === source.droppableId);
            const destinationTasks = localTasks.filter(task => task.category === destination.droppableId);
            const otherTasks = localTasks.filter(task => task.category !== source.droppableId && task.category !== destination.droppableId);

            const [movedTask] = sourceTasks.splice(source.index, 1);
            movedTask.category = destination.droppableId;
            destinationTasks.splice(destination.index, 0, movedTask);

            setLocalTasks([...otherTasks, ...sourceTasks, ...destinationTasks]);

            try {
                await axios.put(`http://localhost:5000/tasks/${draggableId}`, {
                    category: destination.droppableId,
                });
                refetch();
            } catch (error) {
                console.error("Error updating task category:", error);
            }
        }
    };

    const categories = [
        { name: "To-Do", bgClass: "bg-gray-100 border border-gray-300 shadow-md" },
        { name: "In Progress", bgClass: "bg-blue-100 border border-blue-300 shadow-md" },
        { name: "Done", bgClass: "bg-green-100 border border-green-300 shadow-md" },
    ];

    return (
        <div className={`container mx-auto`}>
            <h2 className="text-3xl font-bold mt-4 mb-6 text-center flex items-center justify-center gap-2">
                <FaTasks /> All Tasks
            </h2>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((column) => (
                        <Droppable key={column.name} droppableId={column.name}>
                            {(provided) => (
                                <div
                                    className={`${column.bgClass} p-5 rounded-lg min-h-[300px]`}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <h2 className="text-xl font-bold text-center mb-3 text-gray-700">{column.name}</h2>
                                    {localTasks
                                        .filter((task) => task.category === column.name)
                                        .map((task, index) => (
                                            <Draggable
                                                key={task._id}
                                                draggableId={task._id}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="bg-white p-4 my-3 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-300"
                                                    >
                                                        <h3 className="font-semibold text-lg text-gray-800">{task.title}</h3>
                                                        <p className="text-gray-600 mb-3">{task.description}</p>
                                                        <div className="flex justify-between">
                                                            <button
                                                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                                                                onClick={() => handleUpdate(task._id)}
                                                            >
                                                                <FaEdit className="inline mr-2" /> Update
                                                            </button>
                                                            <button
                                                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                                                                onClick={() => handleDelete(task._id)}
                                                            >
                                                                <FaTrash className="inline mr-2" /> Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default Tasks;