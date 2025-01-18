import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartProvider';

const PaymentForm = () => {
    let navigate = useNavigate();
    const { resetCart } = useCart(); // Access resetCart function

    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [error, setError] = useState('');

    const validateCardNumber = (number) => {
        const regex = /^\d{16}$/;
        return regex.test(number);
    };

    const validateCvv = (cvv) => {
        const regex = /^\d{3}$/;
        return regex.test(cvv);
    };

    const validateCardHolder = (holder) => {
        const regex = /^[A-Za-z\s]+$/;
        return regex.test(holder);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateCardNumber(cardNumber)) {
            setError('Please enter a valid 16-digit card number.');
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

        // Clear the cart in localStorage
        localStorage.setItem('cart', JSON.stringify([])); // Clears the cart
        resetCart(); // Reset the cart
        setError('');
        toast.success("Payment Successful!");
        toast.info("Your order has been placed successfully!");

        setCardNumber("");
        setCardHolder("");
        setExpiryDate("");
        setCvv("");

        // Navigate to home or other page
        navigate("/");

        // Optionally, also trigger a state update in the cart component (if using React state)
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-20 bg-white rounded-lg shadow-lg ">
            <h2 className="text-2xl font-bold text-center mb-6">Payment Details</h2>
            <form onSubmit={handleSubmit}>
                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

                <div className="mb-4">
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                    <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="1234 5678 9101 1121"
                        minLength={12}
                        maxLength={16}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700">Cardholder Name</label>
                    <input
                        type="text"
                        id="cardHolder"
                        name="cardHolder"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="John Doe"
                        required
                    />
                </div>

                <div className="mb-4 flex space-x-4">
                    <div className="flex-1">
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                        <input
                            type="month"
                            id="expiryDate"
                            name="expiryDate"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="flex-1">
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                        <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="123"
                            minLength={3}
                            maxLength={3}
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full px-4 py-2 mt-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Submit Payment
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;
