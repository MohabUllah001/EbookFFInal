import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import ProtectedRoute from "../auth/ProtectedRoute";

// Pages
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import AllBook from "../Pages/AllBook/AllBook";
import SingleBook from "../Pages/AllBook/Component/SingleBook";
import Blog from "../Pages/Blog/Blog";
import SingleBlog from "../Pages/Blog/Component/SingleBlog";
import Cart from "../Pages/Cart/Cart";
import Checkout from "../Pages/Checkout/Checkout";
import Login from "../Pages/Login/Login";
import PaymentSuccess from "../Pages/PaymentSuccess/PaymentSuccess";
import PaymentFailed from "../Pages/PaymentFailed/PaymentFailed";
import PaymentCancel from "../Pages/PaymentCancel/PaymentCancel";

// Dashboard
import DashboardLayout from "../Pages/Dashboard/DashboardLayout";
import UserDashboard from "../Pages/Dashboard/UserDashboard";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard";
import AuthorDashboard from "../Pages/Dashboard/AuthorDashboard";
import MyBook from "../Pages/Dashboard/Book/MyBooks";
import UsersPage from "../Pages/Dashboard/Admin/UserPage";
import AuthorRequests from "../Pages/Dashboard/Admin/AuthorRequest";
import BookManagement from "../Pages/Dashboard/Admin/BookManagement";
import BlogManagement from "../Pages/Dashboard/Admin/BlogManagement";
import MyLibrary from "../Pages/Dashboard/Author/MyLibrary";
import MyBooks from "../Pages/Dashboard/Author/MyBook";
import NewBook from "../Pages/Dashboard/Author/NewBook";
import MyBlogs from "../Pages/Dashboard/Author/MyBlog";
import SingleAuthor from "../Pages/AllBook/Component/SingleAuthor";
import UserMyLibrary from "../Pages/Dashboard/User/UserMyLibrary";
import UserProfileUpdate from "../Pages/Dashboard/User/UserProfileUpdate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "all-books", element: <AllBook /> },
      { path: "all-books/:id", element: <SingleBook /> },
      { path: "blogs", element: <Blog /> },
      { path: "/blogs/:id", element: <SingleBlog /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "login", element: <Login /> },
      { path: "payment-success", element: <PaymentSuccess /> },
      { path: "payment-failed", element: <PaymentFailed /> },
      { path: "payment-cancel", element: <PaymentCancel /> },
      {
        path: "/authors/:authorId",
        element: <SingleAuthor />,
      },

      // 🔐 MAIN DASHBOARD
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
      },

      // 🔐 OPTIONAL DIRECT ROUTES
      {
        path: "dashboard/user",
        element: (
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/user/library",
        element: (
          <ProtectedRoute>
            <UserMyLibrary />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/user/profile",
        element: (
          <ProtectedRoute>
            <UserProfileUpdate />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/admin",
        element: (
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/author",
        element: (
          <ProtectedRoute>
            <AuthorDashboard />
          </ProtectedRoute>
        ),
      },

      {
        path: "dashboard/admin/users",
        element: (
          <ProtectedRoute>
            <UsersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/admin/authors",
        element: (
          <ProtectedRoute>
            <AuthorRequests />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/admin/blogs",
        element: (
          <ProtectedRoute>
            <BlogManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/admin/books",
        element: (
          <ProtectedRoute>
            <BookManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/admin/profile",
        element: (
          <ProtectedRoute>
            <UserProfileUpdate />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/author/library",
        element: (
          <ProtectedRoute>
            <MyLibrary />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/author/profile",
        element: (
          <ProtectedRoute>
            <UserProfileUpdate />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/author/books",
        element: (
          <ProtectedRoute>
            <MyBooks />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/author/books/new",
        element: (
          <ProtectedRoute>
            <NewBook />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/author/blogs",
        element: (
          <ProtectedRoute>
            <MyBlogs />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
