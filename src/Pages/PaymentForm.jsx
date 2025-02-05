import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartProvider';

const PaymentForm = () => {
    let navigate = useNavigate();
    const { resetCart } = useCart();

    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [cvv, setCvv] = useState('');
    const [error, setError] = useState('');

    // Generate year options (next 10 years)
    const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);
    const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));

    const validateCardNumber = (number) => /^\d{16}$/.test(number);
    const validateCvv = (cvv) => /^\d{3}$/.test(cvv);
    const validateCardHolder = (holder) => /^[A-Za-z\s]+$/.test(holder);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateCardNumber(cardNumber)) {
            setError('Please enter a valid 16-digit card number.');
            return;
        }
        if (!expiryMonth || !expiryYear) {
            setError('Please select expiration date.');
            return;
        }
        if (!validateCvv(cvv)) {
            setError('Please enter a valid 3-digit CVV.');
            return;
        }
        if (!validateCardHolder(cardHolder)) {
            setError('Please enter a valid cardholder name.');
            return;
        }

        localStorage.setItem('cart', JSON.stringify([]));
        resetCart();
        setError('');
        toast.success("Payment Successful!");
        toast.info("Your order has been placed successfully!");

        navigate("/");
    };


    return (
        <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Payment Information</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                        Card Number
                        <div className="relative mt-1">
                            <input
                                type="text"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                placeholder="4242 4242 4242 4242"
                                maxLength={16}
                            />
                            <div className="absolute right-3 top-3 flex space-x-2">
                                {['visa', 'mastercard', 'amex'].map((type) => (
                                    <img
                                        key={type}
                                        src={`/${type}.svg`}
                                        className="h-6 w-6"
                                        alt={type}
                                    />
                                ))}
                            </div>
                        </div>
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                        Cardholder Name
                        <input
                            type="text"
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="John Doe"
                        />
                    </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Expiration Date
                            <div className="grid grid-cols-2 gap-3 mt-1">
                                <select
                                    value={expiryMonth}
                                    onChange={(e) => setExpiryMonth(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="">Month</option>
                                    {months.map((month) => (
                                        <option key={month} value={month}>{month}</option>
                                    ))}
                                </select>
                                <select
                                    value={expiryYear}
                                    onChange={(e) => setExpiryYear(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="">Year</option>
                                    {years.map((year) => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            CVV
                            <div className="relative mt-1">
                                <input
                                    type="text"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="123"
                                    maxLength={3}
                                />
                                <span className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 cursor-help" title="3-digit code on back of card">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
                                    </svg>
                                </span>
                            </div>
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Pay Now
                </button>

                <div className="flex items-center justify-center space-x-2 text-gray-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Secure 256-bit SSL encryption</span>
                </div>
            </form>
        </div>
    );
};

export default PaymentForm;