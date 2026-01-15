import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";

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
import UserDashboard from "../Pages/Dashboard/UserDashboard";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard";
import AuthorDashboard from "../Pages/Dashboard/AuthorDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/all-books", element: <AllBook /> },
      { path: "/all-books/:id", element: <SingleBook /> },
      { path: "/blogs", element: <Blog /> },
      { path: "/blogs/:id", element: <SingleBlog /> },
      { path: "/cart", element: <Cart /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/library", element: <Checkout /> },
      {
        path: "/dashboard/user",
        element: <UserDashboard />,
      },
      {
        path: "/dashboard/admin",
        element: <AdminDashboard />,
      },
      {
        path: "/dashboard/author",
        element: <AuthorDashboard />,
      },

    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
