"use client"

import { useEffect, useState, useContext } from "react";
import axios from "@/api/axios";
import { CartContext } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import {GadgetDescription} from "@/components/GadgetDescription";

export default function GadgetsPage() {
    const [gadgets, setGadgets] = useState([]);
    const [error, setError] = useState("");
    const { addToCart } = useContext(CartContext);
    const [quantities, setQuantities] = useState({});
    const [addedMessage, setAddedMessage] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchGadgets = async () => {
            try {
                const res = await axios.get("/gadgets/all");
                setGadgets(res.data);
            } catch (err) {
                console.error(err);
                setError("Error fetching gadgets.");
            }
        };

        fetchGadgets();
    }, []);

    const handleQuantityChange = (id, value) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max(1, parseInt(value) || 1),
        }));
    };

    const handleAddToCart = (gadget) => {
        setError("");

        const token = localStorage.getItem("token");
        if(!token) {
            setError("You must login first!")
            setAddedMessage(false);
            return;
        }

        const kolicina = quantities[gadget.id] || 1;
        addToCart(gadget.id, kolicina);
        setAddedMessage(true);
        setTimeout(() => setAddedMessage(false), 1500);
    };

    const handleDetails = (id) => {
        router.push(`/gadgets/${id}`);
    };

    return (
        <div className="max-w-6xl mx-auto p-8 relative">
            <h1 className="text-4xl font-extrabold mb-10 text-indigo-700">All Gadgets</h1>

            {error && (
                <p className="text-red-600 text-center mb-6 font-semibold">{error}</p>
            )}

            {addedMessage && (
                <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
                    Added to cart!
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {gadgets.map((gadget) => (
                    <div
                        key={gadget.id}
                        className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between hover:shadow-indigo-300 transition-shadow duration-300"
                    >
                        <img
                            src={gadget.imageUrl}
                            alt={gadget.model}
                            className="w-full h-40 object-contain mb-6 rounded"
                        />

                        <div className="mb-4">
                            <h2 className="text-2xl font-semibold text-gray-800">{gadget.p_ime}</h2>
                            <h3 className="text-lg text-gray-600 mb-2">{gadget.model}</h3>
                            <GadgetDescription text={gadget.opis} />
                        </div>

                        <p className="text-indigo-600 font-bold text-xl mb-4">{gadget.cena} EUR</p>

                        <div className="flex items-center space-x-4 mb-4">
                            <input
                                type="number"
                                min="1"
                                value={quantities[gadget.id] || 1}
                                onChange={(e) => handleQuantityChange(gadget.id, e.target.value)}
                                className="w-20 border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                aria-label="Quantity"
                            />
                            <button
                                onClick={() => handleAddToCart(gadget)}
                                className="flex-1 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
                            >
                                Add to cart
                            </button>
                        </div>

                        <button
                            onClick={() => handleDetails(gadget.id)}
                            className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition"
                        >
                            Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
