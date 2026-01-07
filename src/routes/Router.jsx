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
import ExamRoutine from "../pages/ExamRoutine";
import Billing from "../pages/Billing";
import Setting from "../pages/Setting";
import AddTeacher from "../pages/AddTeacher";
import TeacherList from "../pages/TeacherList";
import BillingCreate from "../pages/BillingCreate";
import StudentBills from "../pages/StudentBills";
import approveTeacher from "../pages/approveTeacher";



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
      {path: "approve-teacher", Component: approveTeacher},
      {path: "exams", Component: ExamRoutine},
      {path: "billing", Component: Billing},
      {path: "settings", Component: Setting},
    ],
  },
  {path: "add-teacher", Component: AddTeacher },
  {
    path: "teacher-list", Component: TeacherList,
  },

  {
    path: "/billing/create/:id", Component: BillingCreate,
  },
  {
    path: "/billing/student/:id", Component: StudentBills,
  },

]);