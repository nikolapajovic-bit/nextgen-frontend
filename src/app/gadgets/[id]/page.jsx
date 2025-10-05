"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "@/api/axios";

export default function GadgetDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const [gadget, setGadget] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchGadget = async () => {
            try {
                const res = await axios.get(`/gadgets/${params.id}`);
                setGadget(res.data);
            } catch (err) {
                console.error(err);
                setError("Error fetching gadget.");
            }
        };

        fetchGadget();
    }, [params.id]);

    if (error) {
        return (
            <p className="max-w-4xl mx-auto p-6 text-red-600 font-semibold text-center">
                {error}
            </p>
        );
    }

    if (!gadget) {
        return (
            <p className="max-w-4xl mx-auto p-6 text-gray-500 font-medium text-center">
                Loading...
            </p>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
            <button
                onClick={() => router.push("/gadgets")}
                className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
                ← Back to gadgets
            </button>

            <h1 className="text-4xl font-extrabold mb-4 text-indigo-700">{gadget.model}</h1>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">{gadget.p_ime}</h2>
            <img
                src={gadget.imageUrl}
                alt={gadget.model}
                className="w-full h-96 object-contain rounded-md mb-8 shadow-sm"
            />
            <p className="mb-6 text-gray-700 italic leading-relaxed">{gadget.opis}</p>
            <p className="text-2xl font-bold text-indigo-600">
                Price: <span className="font-extrabold">{gadget.cena} EUR</span>
            </p>
        </div>
    );
}
