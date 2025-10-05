"use client";

import { useEffect, useState } from "react";
import axios from "@/api/axios";

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get("/admin/korisnici");
            const filteredUsers = res.data.filter(u => u.uloga !== "Admin");
            setUsers(filteredUsers);
        } catch (err) {
            console.error(err);
            setError("Unable to fetch users");
        }
    };

    const handlePromote = async (userId) => {
        try {
            await axios.put(`/admin/promote/${userId}`);
            fetchUsers();
        } catch (err) {
            console.error(err);
            setError("Unable to promote user");
        }
    };

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-8 text-indigo-600 border-b pb-3">User Management</h1>

            {error && (
                <p className="bg-red-100 text-red-700 p-3 rounded mb-6 border border-red-400">
                    {error}
                </p>
            )}

            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead className="bg-indigo-100 text-indigo-700 font-semibold">
                    <tr>
                        <th className="border border-gray-300 p-3 text-left">Username</th>
                        <th className="border border-gray-300 p-3 text-left">Email</th>
                        <th className="border border-gray-300 p-3 text-left">Name</th>
                        <th className="border border-gray-300 p-3 text-left">Role</th>
                        <th className="border border-gray-300 p-3 text-left">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="text-center p-6 text-gray-500 italic">
                                No users available to manage.
                            </td>
                        </tr>
                    ) : (
                        users.map((u) => (
                            <tr
                                key={u.id}
                                className="hover:bg-indigo-50 transition-colors duration-200 border border-gray-300"
                            >
                                <td className="p-3">{u.username}</td>
                                <td className="p-3">{u.email}</td>
                                <td className="p-3">{u.ime} {u.prezime}</td>
                                <td className="p-3 capitalize">{u.uloga}</td>
                                <td className="p-3 space-x-4">
                                    {u.uloga !== "Admin" && (
                                        <button
                                            onClick={() => handlePromote(u.id)}
                                            className="text-green-600 hover:text-green-800 font-semibold focus:outline-none"
                                        >
                                            Promote
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
