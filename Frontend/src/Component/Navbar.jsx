import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { getCartList } from "../Data/addToCartList";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(getCartList().length);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const navigate = useNavigate();

  useEffect(() => {
    const updateCart = () => {
      setCartCount(getCartList().length);
    };

    const updateAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("cartUpdated", updateCart);
    window.addEventListener("authChanged", updateAuth);

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
      window.removeEventListener("authChanged", updateAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("authChanged"));
    navigate("/login");
  };

  return (
    <div className="flex flex-col">
      <div className="">
        <div className="bg-[#3059b8] text-white text-center py-2 text-sm font-medium">
        🎉 Flat 30% OFF on All eBooks — Limited Time Only!
      </div>
      </div>
       <div className="">
        
    <header className="flex justify-between items-center py-4 shadow container mx-auto px-12">
     
      <NavLink to="/">
        <img src={logo} alt="Logo" className="h-8" />
      </NavLink>

      <nav className="flex gap-6">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/all-books">All Books</NavLink>
        <NavLink to="/blogs">Blogs</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>

      <div className="flex gap-4 items-center">
        <NavLink to="/cart">Cart ({cartCount})</NavLink>

        {isLoggedIn ? (
          <>
            <NavLink to="/dashboard">Profile</NavLink>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </header>
       </div>
    </div>
   
  );
};

export default Navbar;
