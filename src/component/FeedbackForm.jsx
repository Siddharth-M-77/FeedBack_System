// FeedbackForm.js
import React, { useState } from 'react';

const FeedbackForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        feedbackType: "",
        name: "",
        email: "",
        comment: "",
        rating: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.rating || formData.rating === "choose your Rating") {
            alert("Please select a rating.");
            return;
        }
        setIsSubmitting(true);

        // Submit the form data to the parent component (Feedback)
        onSubmit(formData);

        setFormData({
            feedbackType: "",
            name: "",
            email: "",
            comment: "",
            rating: "",
        });
        setIsSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full h-full lg:mt-10 lg:w-[40%] shadow-lg flex flex-col gap-5 justify-start p-10 bg-white rounded-md">
            <h1 className="mt-4 font-bold text-center text-xl text-indigo-700">Feedback Form ☺</h1>

            <select name="feedbackType" className="text-black w-full bg-gray-300 px-6 py-2 rounded-md" onChange={handleChange} value={formData.feedbackType}>
                <option value="">Select Feedback Type</option>
                <option value="Product Analysis">Product Analysis</option>
                <option value="Delivery">Delivery</option>
                <option value="Customer Support">Customer Support</option>
            </select>

            <input className="w-full bg-gray-300 px-4 py-2 rounded-md font-medium text-sm" placeholder="Enter your name..." onChange={handleChange} value={formData.name} type="text" name="name" />
            <input className="w-full bg-gray-300 px-4 py-2 rounded-md font-medium text-sm" placeholder="Enter your email..." onChange={handleChange} value={formData.email} type="email" name="email" />
            <textarea className="bg-gray-300 rounded-md w-full text-black p-4" placeholder="Drop your comment ♥♥♥" rows={4} onChange={handleChange} value={formData.comment} name="comment" />

            <select className="w-full bg-gray-300 p-3 rounded-md text-black" name="rating" value={formData.rating} onChange={handleChange}>
                <option value="choose your Rating">Choose your Rating 🌟</option>
                <option value="1">1. Poor</option>
                <option value="2">2. Good</option>
                <option value="3">3. Very Good</option>
                <option value="4">4. Amazing</option>
                <option value="5">5. Excellent</option>
            </select>

            <button type="submit" className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
            </button>
        </form>
    );
};

export default FeedbackForm;
