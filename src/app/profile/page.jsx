"use client";

import { useEffect, useState } from "react";
import axios from "@/api/axios";
import PasswordForm from "@/components/PasswordForm";
import { format } from "date-fns";

const formatDate = (dateString) => {
    try {
        if (!dateString) return "Invalid date";

        const parsedDate = new Date(dateString);
        if (isNaN(parsedDate.getTime())) return "Invalid date";

        return format(parsedDate, "dd.MM.yyyy HH:mm");
    } catch {
        return "Invalid date";
    }
};

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");
    const [showPasswordForm, setShowPasswordForm] = useState(false);

    useEffect(() => {
        const fetchProfileAndOrders = async () => {
            try {
                const userRes = await axios.get("/korisnik/me");
                setUser(userRes.data);

                const ordersRes = await axios.get(`/orders/korisnik/${userRes.data.id}`);
                setOrders(ordersRes.data);
            } catch {
                setError("Error loading profile data.");
            }
        };

        fetchProfileAndOrders();
    }, []);

    if (error)
        return (
            <p className="text-red-600 text-center mt-10 font-semibold">{error}</p>
        );

    if (!user)
        return (
            <p className="text-center mt-10 text-gray-500 font-medium">Loading profile...</p>
        );

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-4xl font-extrabold mb-8 text-indigo-700">My Profile</h1>

            <section className="mb-12 bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-6 border-b pb-2 text-gray-800">
                    Basic Information
                </h2>
                <div className="space-y-2 text-gray-700 text-lg">
                    <p><span className="font-semibold">Name:</span> {user.ime}</p>
                    <p><span className="font-semibold">Last Name:</span> {user.prezime}</p>
                    <p><span className="font-semibold">Email:</span> {user.email}</p>
                </div>

                <button
                    onClick={() => setShowPasswordForm(!showPasswordForm)}
                    className="mt-6 px-5 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-300"
                >
                    {showPasswordForm ? "Cancel" : "Change Password"}
                </button>

                {showPasswordForm && (
                    <div className="mt-6 border-t pt-6">
                        <PasswordForm onSuccess={() => setShowPasswordForm(false)} />
                    </div>
                )}
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">My Orders</h2>

                {orders.length === 0 ? (
                    <p className="text-gray-600 text-lg">No orders yet.</p>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-indigo-300 transition-shadow duration-300"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <p className="font-semibold text-indigo-700 text-lg">
                                        Order ID: {order.id}
                                    </p>
                                    <p className="text-gray-500 text-sm italic">
                                        {formatDate(order.createdAt)}
                                    </p>
                                </div>

                                <p className="mb-3 text-gray-700 font-medium">
                                    Total items: {order.items?.length || 0}
                                </p>

                                <ol className="list-disc list-inside space-y-1 text-gray-600">
                                    {order.items?.map((item, idx) => (
                                        <li key={idx} className="flex justify-between">
                                            <span>{item.modelGadget}</span>
                                            <span>{item.kolicina} qty</span>
                                            <span className="font-semibold">{item.cena.toFixed(2)} €</span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
