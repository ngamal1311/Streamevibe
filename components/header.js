import { useState } from "react";

import {
    FaBell,
    FaBars,
    FaPlay,
    FaTimes,
    FaHeart,
    FaBookmark,
    FaUser,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // ================= Navigation Links =================
    const navLinks = [
        {
            name: "Home",
            path: "/home",
        },
        {
            name: "Movies & Shows",
            path: "/MoviesandShows",
        },
        {
            name: "Support",
            path: "/support",
        },
    ];

    // ================= Icon Links =================
    const iconLinks = [
        {
            name: "Favorites",
            path: "/favorites",
            icon: <FaHeart />,
        },
        {
            name: "Saved",
            path: "/saved",
            icon: <FaBookmark />,
        },
        {
            name: "Profile",
            path: "/profile",
            icon: <FaUser />,
        },
    ];

    return (
        <header className="absolute left-0 top-0 z-50 w-full">

            <nav className="mx-auto flex w-full max-w-[1920px] items-center justify-between px-4 py-4 sm:px-6 md:px-8 lg:px-10 xl:px-16 2xl:px-20">

                {/* ================================================= */}
                {/* Logo */}
                {/* ================================================= */}

                <NavLink
                    to="/home"
                    className="flex shrink-0 items-center gap-2"
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 shadow-lg shadow-red-600/20 transition duration-300 hover:bg-red-500 sm:h-9 sm:w-9">
                        <FaPlay className="ml-[1px] text-xs sm:text-sm" />
                    </div>

                    <span className="text-base font-bold tracking-tight text-white sm:text-lg lg:text-xl">
                        StreamVibe
                    </span>
                </NavLink>


                {/* ================================================= */}
                {/* Desktop Navigation */}
                {/* ================================================= */}

                <div className="absolute left-1/2 hidden -translate-x-1/2 md:block">

                    <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-black/60 p-1.5 shadow-xl backdrop-blur-xl lg:gap-1.5">

                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) =>
                                    `
                                    whitespace-nowrap
                                    rounded-lg
                                    px-3
                                    py-2
                                    text-xs
                                    font-medium
                                    transition-all
                                    duration-300

                                    lg:px-4
                                    lg:py-2.5
                                    lg:text-sm

                                    ${
                                        isActive
                                            ? "bg-[#1f1f1f] text-white shadow-sm"
                                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                                    }
                                    `
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}

                    </div>

                </div>


                {/* ================================================= */}
                {/* Right Side */}
                {/* ================================================= */}

                <div className="flex items-center gap-1.5 text-white sm:gap-2">

                    {/* ================= Search ================= */}


                    {/* ================= Favorites ================= */}

                    <NavLink
                        to="/favorites"
                        aria-label="Favorites"
                        title="Favorites"
                        className={({ isActive }) =>
                            `
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            transition-all
                            duration-300

                            sm:h-10
                            sm:w-10

                            ${
                                isActive
                                    ? "bg-red-600/15 text-red-500"
                                    : "text-gray-300 hover:bg-white/10 hover:text-red-500"
                            }
                            `
                        }
                    >
                        <FaHeart className="text-sm sm:text-base" />
                    </NavLink>


                    {/* ================= Saved ================= */}

                    <NavLink
                        to="/saved"
                        aria-label="Saved"
                        title="Saved"
                        className={({ isActive }) =>
                            `
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            transition-all
                            duration-300

                            sm:h-10
                            sm:w-10

                            ${
                                isActive
                                    ? "bg-yellow-500/15 text-yellow-400"
                                    : "text-gray-300 hover:bg-white/10 hover:text-yellow-400"
                            }
                            `
                        }
                    >
                        <FaBookmark className="text-sm sm:text-base" />
                    </NavLink>


                    {/* ================= Notification ================= */}


                    {/* ================= Profile ================= */}

                    <NavLink
                        to="/profile"
                        aria-label="Profile"
                        title="Profile"
                        className={({ isActive }) =>
                            `
                            hidden
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            transition-all
                            duration-300

                            sm:flex
                            sm:h-10
                            sm:w-10

                            ${
                                isActive
                                    ? "bg-white/10 text-white"
                                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                            }
                            `
                        }
                    >
                        <FaUser className="text-sm sm:text-base" />
                    </NavLink>


                    {/* ================================================= */}
                    {/* Mobile Menu Button */}
                    {/* ================================================= */}

                    <button
                        type="button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/10
                            bg-white/5
                            text-gray-200
                            transition-all
                            duration-300
                            hover:bg-white/10
                            hover:text-white

                            md:hidden
                            sm:h-10
                            sm:w-10
                        "
                    >
                        {isMenuOpen ? (
                            <FaTimes className="text-base" />
                        ) : (
                            <FaBars className="text-base" />
                        )}
                    </button>

                </div>


                {/* ================================================= */}
                {/* Mobile Menu */}
                {/* ================================================= */}

                {isMenuOpen && (

                    <div
                        className="
                            absolute
                            left-4
                            right-4
                            top-[72px]
                            rounded-2xl
                            border
                            border-white/10
                            bg-[#111111]/95
                            p-2
                            shadow-2xl
                            backdrop-blur-xl

                            sm:left-auto
                            sm:right-6
                            sm:w-[280px]

                            md:hidden
                        "
                    >

                        <div className="flex flex-col gap-1">

                            {/* Main Links */}

                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    onClick={closeMenu}
                                    className={({ isActive }) =>
                                        `
                                        rounded-xl
                                        px-4
                                        py-3
                                        text-sm
                                        font-medium
                                        transition-all
                                        duration-300

                                        ${
                                            isActive
                                                ? "bg-white/10 text-white"
                                                : "text-gray-400 hover:bg-white/5 hover:text-white"
                                        }
                                        `
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}


                            {/* Divider */}

                            <div className="my-1 h-px bg-white/10" />


                            {/* Favorites */}

                            <NavLink
                                to="/favorites"
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    `
                                    flex
                                    items-center
                                    gap-3
                                    rounded-xl
                                    px-4
                                    py-3
                                    text-sm
                                    transition-all

                                    ${
                                        isActive
                                            ? "bg-red-500/10 text-red-500"
                                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                                    }
                                    `
                                }
                            >
                                <FaHeart />
                                <span>Favorites</span>
                            </NavLink>


                            {/* Saved */}

                            <NavLink
                                to="/saved"
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    `
                                    flex
                                    items-center
                                    gap-3
                                    rounded-xl
                                    px-4
                                    py-3
                                    text-sm
                                    transition-all

                                    ${
                                        isActive
                                            ? "bg-yellow-500/10 text-yellow-400"
                                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                                    }
                                    `
                                }
                            >
                                <FaBookmark />
                                <span>Saved</span>
                            </NavLink>


                            {/* Notifications */}


                            {/* Profile */}

                            <NavLink
                                to="/profile"
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    `
                                    flex
                                    items-center
                                    gap-3
                                    rounded-xl
                                    px-4
                                    py-3
                                    text-sm
                                    transition-all

                                    ${
                                        isActive
                                            ? "bg-white/10 text-white"
                                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                                    }
                                    `
                                }
                            >
                                <FaUser />
                                <span>Profile</span>
                            </NavLink>

                        </div>

                    </div>

                )}

            </nav>

        </header>
    );
}

export default Header;
