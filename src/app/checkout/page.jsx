"use client";

import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import CardForm from "@/components/CardForm";
import { AuthContext } from "@/context/AuthContext";
import axios from "@/api/axios";

export default function CheckoutPage() {
    const { cart, fetchCart, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const router = useRouter();

    const [shippingAddress, setShippingAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");
    const [cardData, setCardData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCart();
    }, []);

    const handleOrder = async () => {
        setError("");

        if (!shippingAddress.trim()) {
            setError("Enter shipping address.");
            return;
        }

        if (paymentMethod === "credit_card" && !cardData) {
            setError("Enter valid credit card information.");
            return;
        }

        setLoading(true);
        try {
            await axios.post(`/orders/checkout/${user.id}`, {
                shippingAddress,
                paymentMethod,
                cardData: paymentMethod === "credit_card" ? cardData : null,
            });
            await clearCart();
            router.push("/order-success");
        } catch (e) {
            setError(e.response?.data?.message || e.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
        return (
            <div className="p-6 max-w-3xl mx-auto">
                <h1 className="text-2xl font-semibold mb-4 text-indigo-700">Your cart is empty.</h1>
            </div>
        );
    }

    const totalPrice = cart.items.reduce(
        (sum, item) => sum + item.kolicina * item.cena,
        0
    );

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-4xl font-extrabold mb-8 text-indigo-700">Checkout</h1>

            {error && (
                <div className="mb-6 p-4 bg-red-100 text-red-700 border border-red-300 rounded-md font-semibold">
                    {error}
                </div>
            )}

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-5 text-indigo-600">Cart view</h2>
                <table className="w-full border-collapse border border-indigo-300 rounded-md overflow-hidden">
                    <thead className="bg-indigo-50">
                    <tr>
                        <th className="border border-indigo-300 p-3 text-left text-indigo-700">Model</th>
                        <th className="border border-indigo-300 p-3 text-right text-indigo-700">Quantity</th>
                        <th className="border border-indigo-300 p-3 text-right text-indigo-700">Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cart.items.map((item) => (
                        <tr key={item.idGadgeta} className="hover:bg-indigo-100 transition-colors">
                            <td className="border border-indigo-300 p-3">{item.modelGadgeta}</td>
                            <td className="border border-indigo-300 p-3 text-right">{item.kolicina}</td>
                            <td className="border border-indigo-300 p-3 text-right">
                                {(item.kolicina * item.cena).toFixed(2)} EUR
                            </td>
                        </tr>
                    ))}
                    <tr className="bg-indigo-100 font-bold text-indigo-800">
                        <td colSpan={2} className="border border-indigo-300 p-3 text-right">Total:</td>
                        <td className="border border-indigo-300 p-3 text-right">{totalPrice.toFixed(2)} EUR</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div className="mb-8">
                <label
                    htmlFor="shippingAddress"
                    className="block mb-3 font-semibold text-indigo-700"
                >
                    Shipping address:
                </label>
                <textarea
                    id="shippingAddress"
                    rows={3}
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="Enter your shipping address"
                    className="w-full border border-indigo-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
            </div>

            <div className="mb-8">
                <label
                    htmlFor="paymentMethod"
                    className="block mb-3 font-semibold text-indigo-700"
                >
                    Payment Method:
                </label>
                <select
                    id="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full border border-indigo-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                >
                    <option value="cash_on_delivery">Cash on delivery</option>
                    <option value="credit_card">Credit Card</option>
                </select>
            </div>

            {paymentMethod === "credit_card" && (
                <div className="mb-8">
                    <CardForm onChange={(data) => setCardData(data)} />
                </div>
            )}

            <button
                disabled={loading}
                onClick={handleOrder}
                className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
            >
                {loading ? "Processing..." : "Order now"}
            </button>
        </div>
    );
}
