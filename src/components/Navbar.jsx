"use client";

import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

import {
    FaUser,
    FaSignOutAlt,
    FaShoppingCart,
    FaBoxOpen,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import {CartContext} from "@/context/CartContext";

const Navbar = () => {
    const { user, logout, loading } = useContext(AuthContext);
    const router = useRouter();
    const { cartItemCount } = useContext(CartContext);

    const handleLogout = async () => {
        await logout();
        router.push("/login");
    };

    if(loading) {
        return null;
    }

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-5xl">
                <Link href="/">
                    <p className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition">
                        NextGen
                    </p>
                </Link>

                <div className="space-x-6 flex items-center text-gray-700">

                    {user ? (
                        user.uloga === "Admin" ? (
                            <>
                                <Link
                                    href="/admin/dashboard"
                                    className="flex items-center gap-1 hover:text-indigo-600 transition"
                                >
                                    <MdDashboard className="text-lg" />
                                    Dashboard
                                </Link>
                                <span className="text-gray-800">
                                    Hello, <strong className="uppercase">{user.username}</strong>
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                >
                                    <FaSignOutAlt className="mr-1" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/gadgets"
                                    className="flex items-center gap-1 hover:text-indigo-600 transition"
                                >
                                    <FaBoxOpen />
                                    Gadgets
                                </Link>

                                <Link
                                    href="/profile"
                                    className="flex items-center gap-1 hover:text-indigo-600 transition"
                                >
                                    <FaUser />
                                    Profile
                                </Link>

                                <Link
                                    href="/cart"
                                    className="relative flex items-center gap-1 hover:text-indigo-600 transition"
                                >
                                    Cart
                                    <FaShoppingCart />
                                    {cartItemCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                                            {cartItemCount}
                                        </span>
                                    )}
                                </Link>

                                <span className="text-gray-800">
                                    Hello, <strong className="uppercase">{user.username}</strong>
                                </span>

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                >
                                    <FaSignOutAlt className="mr-1" />
                                    Logout
                                </button>
                            </>
                        )
                    ) : (
                        <>
                            <Link href="/login" className="hover:text-indigo-600 transition">
                                Login
                            </Link>
                            <Link href="/register" className="hover:text-indigo-600 transition">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
