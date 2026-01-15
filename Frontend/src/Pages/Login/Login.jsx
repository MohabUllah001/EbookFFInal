import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config/api";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isLogin
        ? `${API_BASE_URL}/auth/login`
        : `${API_BASE_URL}/auth/register`;

      const payload = isLogin
        ? { email: form.email, password: form.password }
        : form;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        alert(data.message || "Something went wrong");
        return;
      }

      // 🔐 LOGIN SUCCESS
      if (isLogin) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(data.data.user)
        );

        const role = data.data.user.role;

        // 🚀 ROLE-BASED REDIRECT
        if (role === "admin") {
          navigate("/dashboard/admin", { replace: true });
        } else if (role === "author") {
          navigate("/dashboard/author", { replace: true });
        } else {
          navigate("/dashboard/user", { replace: true });
        }
      } 
      // 📝 SIGNUP SUCCESS
      else {
        alert("Registration successful! Please login.");
        setIsLogin(true);
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden grid md:grid-cols-2 w-full max-w-4xl">

        {/* Left Image (Login) */}
        {isLogin && (
          <div className="hidden md:block">
            <img
              src="/covers/react.jpg"
              alt="Login"
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* Form */}
        <div className="p-10">
          <h2 className="text-2xl font-bold mb-4">
            {isLogin ? "Login" : "Sign Up"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="border p-3 w-full rounded"
                onChange={handleChange}
                required
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border p-3 w-full rounded"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border p-3 w-full rounded"
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="w-full bg-[#3059b8] text-white py-2 rounded"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-600">
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}
            <button
              className="ml-2 text-[#3059b8]"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>

        {/* Right Image (Signup) */}
        {!isLogin && (
          <div className="hidden md:block">
            <img
              src="/covers/js.jpg"
              alt="Signup"
              className="h-full w-full object-cover"
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default Login;
