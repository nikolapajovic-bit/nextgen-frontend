"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "@/api/axios";

export default function GadgetEditPage() {
    const { id } = useParams();
    const router = useRouter();

    const [gadget, setGadget] = useState(null);
    const [error, setError] = useState("");
    const [model, setModel] = useState("");
    const [cena, setCena] = useState(0);
    const [kolicina, setKolicina] = useState(0);
    const [opis, setOpis] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        fetchGadget();
    }, []);

    const fetchGadget = async () => {
        try {
            const res = await axios.get(`/gadgets/${id}`);
            setGadget(res.data);
            setModel(res.data.model);
            setCena(res.data.cena);
            setKolicina(res.data.kolicina);
            setOpis(res.data.opis);
            setImageUrl(res.data.imageUrl);
        } catch (err) {
            console.error(err);
            setError("Neuspešno dohvaćanje gadgeta");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/gadgets/${id}`, {
                model,
                cena,
                kolicina,
                opis,
                imageUrl,
                idProizvodjac: gadget.idProizvodjac,
                idTip: gadget.idTip,
            });
            router.push("/admin/gadgets");
        } catch (err) {
            console.error(err);
            setError("Greška pri izmeni gadgeta");
        }
    };

    if (!gadget) return <p>Loading...</p>;

    return (
        <div className="max-w-lg mx-auto space-y-4">
            <h1 className="text-2xl font-semibold">Izmena gadgeta #{id}</h1>
            {error && <p className="text-red-600">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
                <div>
                    <label className="block">Model</label>
                    <input
                        type="text"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <label className="block">Opis</label>
                    <textarea
                        value={opis}
                        onChange={(e) => setOpis(e.target.value)}
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <label className="block">Cena</label>
                    <input
                        type="number"
                        value={cena}
                        onChange={(e) => setCena(e.target.value)}
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <label className="block">Količina</label>
                    <input
                        type="number"
                        value={kolicina}
                        onChange={(e) => setKolicina(e.target.value)}
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <label className="block">Image URL</label>
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full border rounded p-2"
                    />
                </div>

                <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
                    Sačuvaj promene
                </button>
            </form>
        </div>
    );
}
