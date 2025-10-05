"use client";

import { useEffect, useState } from "react";
import axios from "@/api/axios";
import { format } from "date-fns";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get("/orders/all"); // prilagodi endpoint ako treba
            setOrders(res.data);
            setError("");
        } catch (err) {
            console.error("Error fetching orders:", err.response || err);
            setError("Unable to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    const formatDateTime = (dateString) => {
        try {
            const d = new Date(dateString);
            if (isNaN(d.getTime())) return "Invalid date";
            return format(d, "dd.MM.yyyy HH:mm");
        } catch {
            return "Invalid date";
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-20 text-gray-500 font-medium">Loading orders...</div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-indigo-700 mb-6">All Orders</h1>

            {error && (
                <div className="mb-6 p-4 bg-red-100 text-red-700 border border-red-300 rounded">
                    {error}
                </div>
            )}

            {orders.length === 0 ? (
                <p className="text-gray-600 text-lg">No orders found.</p>
            ) : (
                <div className="space-y-8">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <p className="text-lg font-semibold">Order ID: {order.id}</p>
                                    <p className="text-gray-500 text-sm">
                                        Created At: {formatDateTime(order.orderDate || order.createdAt)}
                                    </p>
                                    <p className='text-sm text-gray-500 mt-1'>
                                        <span className='font-medium'>User:</span>{" "}
                                        {order.korisnikIme} {order.korisnikPrezime} ({order.korisnikUsername})
                                    </p>
                                    <p className='text-gray-500 text-sm'>
                                        Address: {order.shippingAddress}
                                    </p>
                                </div>
                                <p className="text-xl font-bold text-indigo-600">
                                    Total items: {order.items?.length || 0}
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <table className="w-full">
                                    <thead className="text-left text-gray-600">
                                    <tr>
                                        <th className="pb-2">Gadget</th>
                                        <th className="pb-2">Qty</th>
                                        <th className="pb-2">Price (EUR)</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {order.items?.map((item, idx) => (
                                        <tr key={idx} className="border-t border-gray-200">
                                            <td className="py-2">{item.modelGadget}</td>
                                            <td className="py-2">{item.kolicina}</td>
                                            <td className="py-2">{item.cena.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
