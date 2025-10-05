"use client"

import Link from 'next/link';
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if(!loading && user && user.uloga !== "Admin") {
            router.push("/")
        }
    }, [user, loading, router]);

    if(loading) {
        return <div className='text-center mt-20'>Loading...</div>
    }

    return (
        <div className='space-y-8'>
            <h1 className='text-3xl font-semibold'>Admin Dashboard</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                <Link href="/admin/gadgets" className="card-admin">
                    <h2 className="text-xl font-bold">Gadgets</h2>
                    <p>Manage gadgets</p>
                </Link>
                <Link href="/admin/korisnici" className="card-admin">
                    <h2 className="text-xl font-bold">Users</h2>
                    <p>Manage users</p>
                </Link>
                <Link href="/admin/orders" className="card-admin">
                    <h2 className="text-xl font-bold">Orders</h2>
                    <p>View all orders</p>
                </Link>
                <div className="card-admin">
                    <h2 className="text-xl font-bold">Stats</h2>
                    <p>View trends and reports.</p>
                    <p>Coming soon...</p>
                </div>
            </div>
        </div>
    );
}