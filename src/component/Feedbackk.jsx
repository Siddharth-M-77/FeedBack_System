// Feedback.js
import React, { useEffect, useState } from 'react';
import FeedbackForm from './FeedbackForm';
import FeedbackList from './FeedbackList';

const Feedback = () => {
    const [feedback, setFeedback] = useState([]);

    useEffect(() => {
        const feedbackFromLS = JSON.parse(localStorage.getItem("feedback")) || [];
        setFeedback(feedbackFromLS);
    }, []);

    const handleFeedbackSubmit = (newFeedback) => {
        const updatedFeedback = [...feedback, newFeedback];
        localStorage.setItem("feedback", JSON.stringify(updatedFeedback));
        setFeedback(updatedFeedback);
    };

    return (
        <div className="w-full overflow-x-hidden flex flex-col lg:flex-row items-start justify-center gap-8 bg-gray-100">
            {/* Feedback Form */}
            <FeedbackForm onSubmit={handleFeedbackSubmit} />

            {/* Feedback Display */}
            <FeedbackList feedback={feedback} />
        </div>
    );
};

export default Feedback;
