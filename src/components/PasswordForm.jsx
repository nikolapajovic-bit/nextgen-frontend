"use client";

import { useState } from "react";
import axios from "@/api/axios";

export default function PasswordForm({ onSuccess }) {
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const { oldPassword, newPassword, confirmNewPassword } = formData;

        if (newPassword !== confirmNewPassword) {
            setError("New and reentered password do not match!");
            return;
        }

        try {
            await axios.put("/korisnik/change-password", {
                oldPassword,
                newPassword
            });

            setSuccess("Password changed successfully.");
            setFormData({ oldPassword: "", newPassword: "", confirmNewPassword: "" });

            if (onSuccess) onSuccess();
        } catch (err) {
            setError("Error changing password. Check old password.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-4 rounded mb-6">
            <h2 className="text-lg font-semibold mb-3">Password Change</h2>

            <div>
                <label className="block text-sm font-medium">Old password</label>
                <input
                    type="password"
                    value={formData.oldPassword}
                    onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                    className="w-full border px-3 py-2 rounded mt-1"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium">New password</label>
                <input
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    className="w-full border px-3 py-2 rounded mt-1"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Reenter new password</label>
                <input
                    type="password"
                    value={formData.confirmNewPassword}
                    onChange={(e) => setFormData({ ...formData, confirmNewPassword: e.target.value })}
                    className="w-full border px-3 py-2 rounded mt-1"
                    required
                />
            </div>

            {error && <p className="text-red-600">{error}</p>}
            {success && <p className="text-green-600">{success}</p>}

            <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
                Save
            </button>
        </form>
    );
}
