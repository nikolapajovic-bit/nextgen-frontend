"use client"

import { useState } from "react";

export default function CardForm({ onChange }) {
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if(!/^\d{16}$/.test(cardNumber.replace(/\s/g, ""))) {
            newErrors.cardNumber = "Card number must be 16 digits.";
        }
        if(!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expiry)) {
            newErrors.expiry = "Expiry date not valid (MM/YY).";
        }
        if(!/^\d{3,4}$/.test(cvv)) {
            newErrors.cvv = "Cvv must be 3 or 4 digits.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = () => {
        if(validate()) {
            onChange({ cardNumber, expiry, cvv });
        } else {
            onChange(null);
        }
    };

    return (
        <div className='mt-4 p-4 border rounded'>
            <h3 className='text-lg font-semibold mb-2'>Credit Card Details</h3>

            <label className='block mb-2'>
                Card Number:
                <input
                    type="text"
                    maxLength={19}
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={e => {
                        setCardNumber(e.target.value);
                        handleChange();
                    }}
                    className='w-full border rounded px-2 py-1 mt-1'
                />
                {errors.cardNumber && (
                    <p className='text-red-600 text-sm mt-1'>{errors.cardNumber}</p>
                )}
            </label>

            <label className='block mb-2'>
                Expiry date:
                <input
                    type="text"
                    maxLength={5}
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={e => {
                        setExpiry(e.target.value);
                        handleChange();
                    }}
                    className='w-full border rounded px-2 py-1 mt-1'
                />
                {errors.expiry && (
                    <p className='text-red-600 text-sm mt-1'>{errors.expiry}</p>
                )}
            </label>

            <label className='block mb-2'>
                CVV:
                <input
                    type="password"
                    maxLength={4}
                    placeholder="123"
                    value={cvv}
                    onChange={e => {
                        setCvv(e.target.value);
                        handleChange();
                    }}
                    className='w-full border rounded px-2 py-1 mt-1'
                />
                {errors.cvv && (
                    <p className='text-red-600 text-sm mt-1'>{errors.cvv}</p>
                )}
            </label>
        </div>
    )
}