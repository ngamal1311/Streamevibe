import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
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

        console.log(formData)
        try {
        const response = await fetch(
            "http://localhost/api/register/",
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            setError(JSON.stringify(data));
            return;
        }
        

        navigate("/login");
        } catch (error) {
        setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
        <div className="w-full max-w-md">

            <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">
                Create Account
            </h1>

            <p className="text-gray-400 mt-2">
                Join us and start watching your favorite movies
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
                Email
                </label>

                <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-3 text-white outline-none focus:border-red-500"
                placeholder="Enter your email"
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
                Create Account
                </button>
            <p className="text-center text-gray-400 text-sm">
                Already have an account?{" "}
                <Link
                to="/login"
                className="text-red-500 hover:text-red-400"
                >
                Login
                </Link>
            </p>

            </form>
        </div>
        </div>
    );
}

export default Register;