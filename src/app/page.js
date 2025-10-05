"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "@/api/axios";
import { GadgetDescription } from "@/components/GadgetDescription";

export default function Home() {
    const [gadgets, setGadgets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        axios
            .get("/gadgets/all")
            .then((res) => {
                setGadgets(res.data);
            })
            .catch((err) => {
                console.error("Error fetching gadgets:", err.response || err.message);
                setError("Error loading gadgets.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <p className="text-center mt-20 text-gray-500 font-medium">Loading...</p>
        );
    }

    if (error) {
        return (
            <p className="text-center mt-20 text-red-600 font-semibold">{error}</p>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-8">
            <section className="text-center mb-20">
                <h1 className="text-5xl font-extrabold mb-4 text-indigo-700">
                    Welcome to NextGen
                </h1>
                <p className="text-lg max-w-xl mx-auto mb-8 text-gray-700">
                    Discover the latest gadgets in our store.
                </p>
                <Link
                    href="/gadgets"
                    className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-md hover:bg-indigo-700 transition"
                >
                    Shop Now
                </Link>
            </section>

            <section>
                <h2 className="text-3xl font-semibold mb-10 text-center text-gray-800">
                    Featured Gadgets
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {gadgets.slice(0, 3).map((gadget) => (
                        <div
                            key={gadget.id}
                            className="bg-white rounded-lg shadow-md p-6 hover:shadow-indigo-300 transition-shadow duration-300"
                        >
                            {gadget.imageUrl ? (
                                <img
                                    src={gadget.imageUrl}
                                    alt={gadget.model}
                                    className="w-full h-48 object-contain rounded-md mb-4"
                                />
                            ) : (
                                <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-md mb-4 text-gray-500">
                                    No picture available.
                                </div>
                            )}

                            <h3 className="text-xl font-semibold mb-2 text-gray-900">
                                {gadget.model}
                            </h3>

                            <GadgetDescription text={gadget.opis} />

                            <div className="flex justify-between items-center mt-4">
                                <span className="font-bold text-indigo-600 text-lg">
                                    {gadget.cena} EUR
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
