import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './layout/MainLayout';
import Home from './components/Home';
import Login from './components/Login';
import AuthProvider from './provider/AuthProvider';
import Tasks from './components/Tasks';
import AddTaskForm from './components/AddTaskForm';
import TasksUpdate from './components/TasksUpdate';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/tasks',
        element: <Tasks></Tasks>
      },
      {
        path: '/tasks/update/:id',
        element: <TasksUpdate></TasksUpdate>
      },
      {
        path: '/addTask',
        element: <AddTaskForm></AddTaskForm>
      },
    ]
  },
]);

const queryClient = new QueryClient();


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
