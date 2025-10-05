"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OrderSuccessPage() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/gadgets");
        }, 5000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="max-w-2xl mx-auto p-6 text-center">
            <h1 className="text-3xl font-bold text-green-600 mb-4">
                🎉 Success!
            </h1>
            <p className="text-lg text-gray-700 mb-2">
                Your order has been noted.
            </p>
            <p className="text-sm text-gray-500">
                You will be redirected to gadgets page in few seconds...
            </p>

            <button
                onClick={() => router.push("/")}
                className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
                Back to home page
            </button>
        </div>
    );
}
