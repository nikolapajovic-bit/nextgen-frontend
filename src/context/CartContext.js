"use client";

import { createContext, useState, useContext, useEffect } from "react";
import axios from "@/api/axios";
import { AuthContext } from "@/context/AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { token } = useContext(AuthContext);

    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            fetchCart();
        } else {
            setCart(null);
            setLoading(false);
        }
    }, [token]);

    const fetchCart = async () => {
        try {
            const res = await axios.get("/cart/all");
            setCart(res.data);
        } catch (err) {
            console.error("Error fetching cart: ", err);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (id, kolicina) => {
        try {
            const res = await axios.post("/cart/add", null, {
                params: { idGadget: id, kolicina },
            });
            setCart(res.data);
        } catch (err) {
            console.error("Error adding cart: ", err);
        }
    };

    const updateCartItem = async (idGadget, kolicina) => {
        try {
            const res = await axios.put("/cart/update", null, {
                params: { idGadget, kolicina },
            });
            setCart(res.data);
        } catch (err) {
            const message = err.response?.data?.message || err.message || "Doslo je do greske.";
            throw new Error(message);
        }
    };

    const removeCartItem = async (idGadget) => {
        try {
            const res = await axios.delete("/cart/remove", {
                params: { idGadget },
            });
            setCart(res.data);
        } catch (err) {
            console.error("Error deleting cart item: ", err);
        }
    };

    const clearCart = async () => {
        try {
            await axios.delete("/cart/clear");
            setCart({ items: [] });
        } catch (err) {
            console.error("Error clearing cart: ", err);
        }
    };

    const cartItemCount = cart?.items?.reduce((acc, item) => acc + item.kolicina, 0) || 0;

    return (
        <CartContext.Provider
            value={{
                cart,
                cartItemCount,
                loading,
                fetchCart,
                addToCart,
                updateCartItem,
                removeCartItem,
                clearCart
            }}
        >
            { children }
        </CartContext.Provider>
    )
}