import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import AddNew from "../pages/Home/AddNew/StudentEntryForm";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Teachers from "../pages/Teachers";
import Students from "../pages/Students";
import Exam from "../pages/Exam";
import Billing from "../pages/Billing";
import Setting from "../pages/Setting";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home},
      {path: '/add-student', Component: AddNew },
      
    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children:[
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/register',
        Component: Register,
      },
    ]
  },
  {
    path: "dashboard",
    Component: DashboardLayout,
    children:[
      {index: true, Component: Dashboard},
      {path: "teachers", Component: Teachers},
      {path: "students", Component: Students},
      {path: "exams", Component: Exam},
      {path: "billing", Component: Billing},
      {path: "settings", Component: Setting},
    ],
  },

]);