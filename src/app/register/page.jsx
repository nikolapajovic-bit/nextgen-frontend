"use client";

import { useState } from "react";
import axios from "@/api/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
    const [formData, setFormData] = useState({
        ime: "",
        prezime: "",
        username: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await axios.post("/auth/register", formData);
            router.push("/login");
        } catch (err) {
            setError("Registration failed. Check data");
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-50 px-4'>
            <form onSubmit={handleSubmit} className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
                <h2 className='text-3xl mb-6 font-semibold text-center text-indigo-600'>Register</h2>

                {error && (
                    <p className='text-red-600 bg-red-100 p-2 rounded mb-4 text-center'>
                        {error}
                    </p>
                )}

                <label className='block mb-2 font-medium text-gray-700'>Name</label>
                <input
                    name="ime"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.ime}
                    onChange={handleChange}
                    className='w-full p-3 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 transition'
                    required
                />

                <label className='block mb-2 font-medium text-gray-700'>Last Name</label>
                <input
                    name="prezime"
                    type="text"
                    placeholder="Enter your last name"
                    value={formData.prezime}
                    onChange={handleChange}
                    className='w-full p-3 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 transition'
                    required
                />

                <label className='block mb-2 font-medium text-gray-700'>Username</label>
                <input
                    name="username"
                    type="text"
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={handleChange}
                    className='w-full p-3 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 transition'
                    required
                />

                <label className='block mb-2 font-medium text-gray-700'>Email</label>
                <input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className='w-full p-3 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 transition'
                    required
                />

                <label className='block mb-2 font-medium text-gray-700'>Password</label>
                <input
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    className='w-full p-3 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 transition'
                    required
                />

                <button
                    type='submit'
                    className='w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition'
                >
                    Register
                </button>

                <p className='mt-6 text-center text-sm text-gray-600'>
                    Already have an account?{" "}
                    <Link href='/login' className='text-indigo-600 hover:underline'>
                        Login here.
                    </Link>
                </p>
            </form>
        </div>
    )
}
