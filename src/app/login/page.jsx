"use client";

import {useContext, useState} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {AuthContext} from "@/context/AuthContext";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const result = await login(username, password);

        if(result.success) {
            router.push("/");
        } else {
            setError(result.message || "Unable to login. Check data");
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-50 px-4'>
            <form
                onSubmit={handleSubmit}
                className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'
            >
                <h2 className='text-3xl font-semibold text-center text-indigo-600 mb-6'>Login</h2>

                {error && (
                    <p className='text-red-600 bg-red-100 p-2 rounded mb-4 text-center'>
                        {error}
                    </p>
                )}

                <label className='block mb-2 font-medium text-gray-700'>Username</label>
                <input
                    type='text'
                    placeholder="Enter your username"
                    className='w-full p-3 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 transition'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label className='block mb-2 font-medium text-gray-700'>Password</label>
                <input
                    type='password'
                    placeholder="Enter your password"
                    className='w-full p-3 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 transition'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type='submit'
                    className='w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition'
                >
                    Login
                </button>

                <p className='mt-6 text-center text-sm text-gray-600'>
                    Don't have an account?{" "}
                    <Link href='/register' className='text-indigo-600 hover:underline'>
                        Register now!
                    </Link>
                </p>
            </form>
        </div>
    );
}
