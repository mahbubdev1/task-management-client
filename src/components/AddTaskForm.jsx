import axios from "axios";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";

const AddTaskForm = () => {
  const {user} = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("To-Do");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    const newTask = {
      email: user?.email,
      title,
      description,
      timestamp: new Date().toISOString(),
      category,
    };

    axios.post("http://localhost:5000/tasks", newTask).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });
        setTitle("");
        setDescription("");
        setCategory("To-Do");
      }
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 my-10">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">📝 Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Title Field */}
        <div>
          <label className="block font-medium text-gray-700">Title</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={50}
            required
          />
          <p className="text-xs text-gray-500 mt-1">Max 50 characters</p>
        </div>

        {/* Description Field */}
        <div>
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Write a brief description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={200}
          ></textarea>
          <p className="text-xs text-gray-500 mt-1">Max 200 characters</p>
        </div>

        {/* Category Selection */}
        <div>
          <label className="block font-medium text-gray-700">Category</label>
          <select
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="To-Do">📌 To-Do</option>
            <option value="In Progress">🚧 In Progress</option>
            <option value="Done">✅ Done</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all">
          ➕ Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;
