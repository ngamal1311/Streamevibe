import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Profile() {
    const navigate = useNavigate();

    const {
        accessToken,
        loading: authLoading,
        logout
    } = useAuth();

    const [user, setUser] = useState(null);
    const [profileLoading, setProfileLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (authLoading) {
            return;
        }

        const getProfile = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/api/profile/",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    setError(data.detail || "Failed to load profile");
                    return;
                }

                setUser(data);
            } catch (error) {
                setError("Something went wrong");
            } finally {
                setProfileLoading(false);
            }
        };

        if (accessToken) {
            getProfile();
        } else {
            setProfileLoading(false);
            setError("You are not logged in");
        }
    }, [accessToken, authLoading]);

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
                Loading...
            </div>
        );
    }

    if (profileLoading) {
        return (
            <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
                Loading profile...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white px-4 py-12">
            <div className="max-w-4xl mx-auto">

                <h1 className="text-3xl font-bold mb-8 mt-10">
                    My Profile
                </h1>

                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8">

                    {/* User Info */}
                    <div className="flex items-center gap-5 mb-8">
                        <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center text-3xl font-bold">
                            {user.username.charAt(0).toUpperCase()}
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold">
                                {user.username}
                            </h2>

                            <p className="text-gray-400">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    {/* Account Information */}
                    <div className="border-t border-[#2a2a2a] pt-6 space-y-5">

                        <div>
                            <p className="text-gray-500 text-sm">
                                Username
                            </p>

                            <p className="text-lg">
                                {user.username}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-sm">
                                Email
                            </p>

                            <p className="text-lg">
                                {user.email}
                            </p>
                        </div>

                    </div>

                    {/* Logout */}
                    <div className="border-t border-[#2a2a2a] mt-8 pt-6">
                        <button
                            onClick={handleLogout}
                            className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
                        >
                            Logout
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Profile;