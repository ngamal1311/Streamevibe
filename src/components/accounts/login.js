import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
        const response = await fetch(
            "http://localhost:8000/api/login/",
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formData),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            setError(data.detail || "Invalid username or password");
            return;
        }

        console.log("Login successful:", data);
        login(data.access);

        // مؤقتًا فقط عشان نشوف الـ token
        console.log("Access Token:", data.access);
        console.log("Refresh Token:", data.refresh);

        navigate("/Home");
        } catch (error) {
        setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
        <div className="w-full max-w-md">

            <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">
                Welcome Back
            </h1>

            <p className="text-gray-400 mt-2">
                Login to continue watching
            </p>
            </div>

            <form
            onSubmit={handleSubmit}
            className="bg-[#1a1a1a] border border-[#262626] rounded-xl p-8 space-y-5"
            >

            {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm">
                {error}
                </div>
            )}

            <div>
                <label className="block text-gray-300 mb-2">
                Username
                </label>

                <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-3 text-white outline-none focus:border-red-500"
                placeholder="Enter your username"
                />
            </div>

            <div>
                <label className="block text-gray-300 mb-2">
                Password
                </label>

                <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-3 text-white outline-none focus:border-red-500"
                placeholder="Enter your password"
                />
            </div>
                <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition"
                >
                Login
                </button>
            <p className="text-center text-gray-400 text-sm">
                Don't have an account?{" "}
                <Link
                to="/"
                className="text-red-500 hover:text-red-400"
                >
                Create Account
                </Link>
            </p>

            </form>
        </div>
        </div>
    );
}

export default Login;