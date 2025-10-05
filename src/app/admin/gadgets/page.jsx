"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "@/api/axios";

export default function AdminGadgetsPage() {
    const [gadgets, setGadgets] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchGadgets();
    }, []);

    const fetchGadgets = async () => {
        try {
            const res = await axios.get("/gadgets/all");
            setGadgets(res.data);
            setError("");
        } catch (err) {
            console.error(err);
            setError("Unable to fetch gadgets");
        }
    };

    const handleDelete = async (idGadget) => {
        if (!confirm("Are you sure you want to delete this gadget?")) return;

        try {
            await axios.delete(`/gadgets/${idGadget}`);
            fetchGadgets();
        } catch (err) {
            console.error(err);
            setError("Unable to delete gadget");
        }
    };

    return (
        <div className='max-w-7xl mx-auto p-6 space-y-6'>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-semibold text-gray-900'>Gadget Management</h1>
                <Link
                    href="/admin/gadgets/create"
                    className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition"
                >
                    Add New Gadget
                </Link>
            </div>

            {error && (
                <p className='text-red-600 bg-red-100 p-3 rounded-md'>{error}</p>
            )}

            <div className='overflow-x-auto bg-white rounded-lg shadow'>
                <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-50'>
                    <tr>
                        <th className='p-3 text-left text-sm font-medium text-gray-700'>Image</th>
                        <th className='p-3 text-left text-sm font-medium text-gray-700'>Model</th>
                        <th className='p-3 text-left text-sm font-medium text-gray-700'>Price (EUR)</th>
                        <th className='p-3 text-left text-sm font-medium text-gray-700'>Quantity</th>
                        <th className='p-3 text-left text-sm font-medium text-gray-700'>Actions</th>
                    </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-100'>
                    {gadgets.map(g => (
                        <tr key={g.id} className='hover:bg-gray-50'>
                            <td className='p-3'>
                                <img
                                    src={g.imageUrl}
                                    alt={g.model}
                                    className='h-20 w-auto rounded-md object-cover'
                                />
                            </td>
                            <td className='p-3 text-gray-800'>{g.model}</td>
                            <td className='p-3 text-gray-800'>{g.cena.toFixed(2)}</td>
                            <td className='p-3 text-gray-800'>{g.kolicina}</td>
                            <td className='p-3 space-x-4'>
                                <Link
                                    href={`/admin/gadgets/${g.id}`}
                                    className='text-indigo-600 hover:underline'
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(g.id)}
                                    className='text-red-600 hover:underline'
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
