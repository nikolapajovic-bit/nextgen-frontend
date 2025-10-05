"use client";

import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const {
        cart,
        loading,
        updateCartItem,
        removeCartItem,
        clearCart,
    } = useContext(CartContext);
    const router = useRouter();

    const [quantities, setQuantities] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        if (cart?.items) {
            const initialQuantities = {};
            cart.items.forEach((item) => {
                initialQuantities[item.idGadgeta] = item.kolicina;
            });
            setQuantities(initialQuantities);
        }
    }, [cart]);

    const handleQuantityChange = (id, value) => {
        const parsed = parseInt(value);
        if (!isNaN(parsed)) {
            setQuantities((prev) => ({ ...prev, [id]: Math.max(1, parsed) }));
        }
    };

    const handleUpdate = async (id) => {
        const kolicina = quantities[id];
        try {
            await updateCartItem(id, kolicina);
            setError("");
        } catch (err) {
            console.error(err);
            setError(
                "Error: Quantity not valid (less than 1 or more than available)."
            );
        }
    };

    const handleRemove = async (id) => {
        try {
            await removeCartItem(id);
            setError("");
        } catch (err) {
            console.error(err);
            setError("Error clearing cart.");
        }
    };

    if (loading)
        return (
            <p className="text-center mt-10 text-gray-500 font-medium">
                Loading cart...
            </p>
        );
    if (!cart || cart.items.length === 0) {
        return (
            <div className="max-w-4xl mx-auto p-8">
                <h1 className="text-3xl font-extrabold text-indigo-700 mb-6">
                    Your cart is empty.
                </h1>
            </div>
        );
    }

    const totalPrice = cart.items.reduce(
        (sum, item) => sum + item.kolicina * item.cena,
        0
    );

    return (
        <div className="max-w-5xl mx-auto p-8">
            <h1 className="text-4xl font-extrabold mb-10 text-indigo-700">Your Cart</h1>

            {error && (
                <div className="mb-6 p-4 bg-red-100 text-red-700 border border-red-300 rounded-md">
                    {error}
                </div>
            )}

            <div className="space-y-8">
                {cart.items.map((item) => (
                    <div
                        key={item.idGadgeta}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-6 border-b pb-6"
                    >
                        <img
                            src={item.imageUrl}
                            alt={item.modelGadgeta}
                            className="w-full sm:w-32 h-32 object-cover rounded-lg shadow-sm"
                        />
                        <div className="flex-1">
                            <h2 className="text-2xl font-semibold text-gray-800">
                                {item.modelGadgeta}
                            </h2>
                            <p className="text-gray-600">{item.proizvodjac}</p>
                            <p className="text-indigo-600 font-bold text-lg mt-1">
                                Price: {item.cena.toFixed(2)} EUR
                            </p>

                            <div className="mt-4 flex flex-wrap items-center gap-3">
                                <label className="font-medium" htmlFor={`qty-${item.idGadgeta}`}>
                                    Quantity:
                                </label>
                                <input
                                    id={`qty-${item.idGadgeta}`}
                                    type="number"
                                    min="1"
                                    value={quantities[item.idGadgeta] || 1}
                                    onChange={(e) =>
                                        handleQuantityChange(item.idGadgeta, e.target.value)
                                    }
                                    className="w-20 border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                />
                                <button
                                    onClick={() => handleUpdate(item.idGadgeta)}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleRemove(item.idGadgeta)}
                                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row justify-between items-center border-t pt-6">
                <p className="text-2xl font-bold text-gray-900">
                    Total: {totalPrice.toFixed(2)} EUR
                </p>
                <div className="mt-4 sm:mt-0 flex gap-4">
                    <button
                        onClick={clearCart}
                        className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition"
                    >
                        Clear cart
                    </button>
                    <button
                        onClick={() => router.push("/checkout")}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}
