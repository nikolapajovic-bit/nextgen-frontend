"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/api/axios";

export default function CreateGadget() {
    const router = useRouter();
    const [form, setForm] = useState({
        model: "",
        opis: "",
        cena: "",
        kolicina: "",
        idProizvodjac: "",
        idTip: "",
        imageUrl: ""
    });

    const [proizvodjaci, setProizvodjaci] = useState([]);
    const [tipovi, setTipovi] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProizvodjaci = async () => {
            try {
                const res = await axios.get("/s_proizvodjac/all");
                setProizvodjaci(res.data);
            } catch (err) {
                console.error("Error fetching manufacturers:", err);
            }
        };
        const fetchTipovi = async () => {
            try {
                const res = await axios.get("/s_tip/all");
                setTipovi(res.data);
            } catch (err) {
                console.error("Error fetching types:", err);
            }
        };

        fetchProizvodjaci();
        fetchTipovi();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (form.cena <= 0) {
            setError("Price needs to be more than 0.");
            setLoading(false);
            return;
        }
        if (form.kolicina < 0) {
            setError("Quantity can't be negative.");
            setLoading(false);
            return;
        }

        try {
            await axios.post("/gadgets/create", form);
            router.push("/admin/gadgets");
        } catch (err) {
            console.error("Error creating gadget:", err.response || err);
            setError("Error creating gadget.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
            <h2 className="text-2xl font-semibold mb-6">Create Gadget</h2>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="model"
                    placeholder="Model"
                    value={form.model}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <textarea
                    name="opis"
                    placeholder="Description"
                    value={form.opis}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    name="cena"
                    type="number"
                    min="0.01"
                    step="0.01"
                    placeholder="Price"
                    value={form.cena}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    name="kolicina"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="Quantity"
                    value={form.kolicina}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <select
                    name="idProizvodjac"
                    value={form.idProizvodjac}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="">Choose manufacturer</option>
                    {proizvodjaci.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                </select>
                <select
                    name="idTip"
                    value={form.idTip}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="">Choose type</option>
                    {tipovi.map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                </select>
                <input
                    name="imageUrl"
                    placeholder="Image URL"
                    value={form.imageUrl}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />

                <button
                    type="submit"
                    className={`w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Create"}
                </button>
            </form>
        </div>
    );
}
