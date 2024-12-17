// FeedbackList.js
import React from 'react';

const FeedbackList = ({ feedback }) => {
  const groupFeedbackByType = () => {
    const groupFeedBack = {};
    feedback.forEach((feedback) => {
      const type = feedback.feedbackType;
      if (!groupFeedBack[type]) {
        groupFeedBack[type] = { totalRating: 0, count: 0 };
      }
      groupFeedBack[type].totalRating += parseInt(feedback.rating);
      groupFeedBack[type].count++;
    });
    return groupFeedBack;
  };

  const groupFeedBack = groupFeedbackByType();

  return (
    <div className="w-full lg:w-[50%] p-4 mt-5 bg-indigo-600 rounded-md text-white">
      <h2 className="mt-4 text-center text-2xl font-bold mb-4">Total Feedback: {feedback.length}</h2>

      <div className="bg-white rounded-lg p-4 text-black text-center items-center mb-4 grid grid-cols-1 lg:grid-cols-3">
        {Object.keys(groupFeedBack).length > 0 ? (
          Object.keys(groupFeedBack).map((type) => {
            const averageRating = (groupFeedBack[type].totalRating / groupFeedBack[type].count).toFixed(2);

            return (
              <div key={type} className="flex justify-center flex-col mb-4 p-4 rounded-lg mt-2 bg-indigo-500 h-auto mx-auto">
                <h3 className="text-sm font-bold">{type}</h3>
                <p className="text-sm">{groupFeedBack[type].count} Feedbacks</p>
                <p>Average rating: {averageRating}</p>
              </div>
            );
          })
        ) : (
          "No feedback yet. Please fill the form above to submit your feedback."
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mx-auto max-w-7xl">
        {feedback.length > 0 ? (
          feedback.map((fb, index) => (
            <div key={index} className="bg-white p-4 text-black rounded-md w-full max-w-xs mx-auto shadow-md">
              <p><strong>Name:</strong> {fb.name}</p>
              <p><strong>Email:</strong> {fb.email}</p>
              <p><strong>Comment:</strong> {fb.comment}</p>
              <p><strong>Feedback Type:</strong> {fb.feedbackType}</p>
              <p><strong>Rating:</strong> {fb.rating}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-lg font-semibold">
            No feedback yet. Please fill the form above to submit your feedback.
          </p>
        )}
      </div>
    </div>
  );
};

export default FeedbackList;
