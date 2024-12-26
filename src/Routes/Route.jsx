import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/Layouts/MainLayout";
import Home from "../Pages/HomePage/Home";
import Details from "../Pages/DetailsPage/Details";
import SingleBlogDetails from "../Pages/SingleBlogDetails/SingleBlogDetails";
import DashboardLayout from "../components/Layouts/DashboardLayout";
import Dashboard from "../Pages/DashboardPages/DashboardHome/Dashboard";
import PostPage from "../Pages/DashboardPages/PostPage/PostPage";
import AddPost from "../Pages/DashboardPages/AddPost/AddPost";
import Category from "../Pages/DashboardPages/Category/Category";
import Tags from "../Pages/DashboardPages/Tags/Tags";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/LoginPage/Login";
import PrivateRoute from "./PrivateRoute";
import Profile from "../Pages/DashboardPages/ProfilePage/Profile";
import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../Pages/ForgotPassword/ResetPassword";
import SignUp from "../Pages/SignupPage/SignUp";
import SignUpUserSelect from "../Pages/SignupPage/SignUpUserSelect";
import EditPost from "../Pages/DashboardPages/EditPost/EditPost";
import AuthorList from "../Pages/DashboardPages/AuthorList/AuthorList";
import BlogPage from "../Pages/BlogPage/BlogPage";
import CategoryWiseBlogPage from "../Pages/BlogPage/CategoryWiseBlogPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/blog",
        element: <BlogPage />,
      },
      {
        path: "/blog/:categoryId",
        element: <CategoryWiseBlogPage />,
      },
      {
        path: "/details",
        element: <Details />,
      },
      {
        path: "/details/:id",
        element: <SingleBlogDetails />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/post",
        element: (
          <PrivateRoute>
            <PostPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/editPost/:id",
        element: (
          <PrivateRoute>
            <EditPost />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/author-list",
        element: (
          <PrivateRoute>
            <AuthorList />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/addPost",
        element: (
          <PrivateRoute>
            <AddPost />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/category",
        element: (
          <PrivateRoute>
            <Category />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/tags",
        element: (
          <PrivateRoute>
            <Tags />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/profile",
        element: (
          // <PrivateRoute>
          <Profile />
          // </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup/:id",
    element: <SignUp />,
  },
  {
    path: "/user-select",
    element: <SignUpUserSelect />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset_password/:id/:token",
    element: <ResetPassword />,
  },
]);
