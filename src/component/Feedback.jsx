import React, { useEffect, useState } from 'react';

const Feedback = () => {
  const [formData, setFormData] = useState({
    feedbackType: "",
    name: "",
    email: "",
    comment: "",
    rating: "",
  });
  const [feedback, setFeedback] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const feedBackFromLS = JSON.parse(localStorage.getItem("feedback")) || [];
    setFeedback(feedBackFromLS);
  }, []);


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

    const updatedFeedback = [...feedback, formData];
    localStorage.setItem("feedback", JSON.stringify(updatedFeedback));
    setFeedback(updatedFeedback);

    setFormData({
      feedbackType: "",
      name: "",
      email: "",
      comment: "",
      rating: "",
    });
    setIsSubmitting(false);
  };


  const groupFeedBackByType = () => {
    const groupFeedBack = {};
    feedback.forEach((feedback) => {
      const type = feedback.feedbackType
      if (!groupFeedBack[type]) {
        groupFeedBack[type] = { totalRating: 0, count: 0 }
      }
      groupFeedBack[type].totalRating += parseInt(feedback.rating)
      groupFeedBack[type].count++
    })
    return groupFeedBack;
  }
  const groupFeedBack = groupFeedBackByType()



  return (
    <div className='w-full flex flex-col  lg:flex-row items-start justify-center gap-8 bg-gray-100'>

      {/* Feedback Form */}
      <form onSubmit={handleSubmit} className='w-full lg:mt-10 lg:w-[40%] shadow-lg flex flex-col gap-5 justify-start p-10 bg-white rounded-md'>
        <h1 className='mt-4 font-bold text-center text-xl text-indigo-700'>Feedback Form ☺</h1>

        <select
          name="feedbackType"
          className='text-black w-full bg-gray-300 px-6 py-2 rounded-md'
          onChange={handleChange}
          value={formData.feedbackType}
          id="feedbackType"
        >
          <option value="">Select Feedback Type</option>
          <option value="Product Analysis">Product Analysis</option>
          <option value="Delivery">Delivery</option>
          <option value="Customer Support">Customer Support</option>
        </select>

        <input
          className='w-full bg-gray-300 px-4 py-2 rounded-md font-medium text-sm'
          placeholder='Enter your name...'
          onChange={handleChange}
          value={formData.name}
          type="text"
          name='name'
        />
        <input
          className='w-full bg-gray-300 px-4 py-2 rounded-md font-medium text-sm'
          placeholder='Enter your email...'
          onChange={handleChange}
          value={formData.email}
          type="email"
          name='email'
        />
        <textarea
          onChange={handleChange}
          placeholder='Drop your comment ♥♥♥'
          className='bg-gray-300 rounded-md w-full text-black p-4'
          rows={4}
          value={formData.comment}
          name="comment"
          id="comment"
        />
        <select
          onChange={handleChange}
          name="rating"
          className='w-full bg-gray-300 p-3 rounded-md text-black'
          value={formData.rating}
          id="rating"
        >
          <option value="choose your Rating">Choose your Rating 🌟</option>
          <option value="1">1. Poor</option>
          <option value="2">2. Good</option>
          <option value="3">3. Very Good</option>
          <option value="4">4. Amazing</option>
          <option value="5">5. Excellent</option>
        </select>

        <button
          type="submit"
          className='px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600'
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* Feedback Display */}
      <div className='w-full lg:w-[50%] p-4 mt-5 bg-indigo-600 rounded-md text-white'>
        <h2 className='mt-4 text-center text-2xl font-bold mb-4'>
          Total Feedback: {feedback.length}
        </h2>


        <div className='bg-white rounded-lg p-4 text-black text-center items-center mb-4 grid grid-cols-1 lg:grid-cols-3'>
          {
            Object.keys(groupFeedBack).length > 0 ? (
              Object.keys(groupFeedBack).map((type, index) => {
                const avarageRating = (groupFeedBack[type].totalRating / groupFeedBack[type].count).toFixed(2)

                return (
                  <div key={type} className="flex justify-center flex-col mb-4 p-4  rounded-lg mt-2 bg-indigo-500 h-auto mx-auto">
                    <h3 className="text-sm font-bold">{type}</h3>
                    <p className="text-sm">{groupFeedBack[type].count} Feedbacks</p>
                    <p>Avarage rating : {avarageRating}</p>
                  </div>
                )
              })
            ) : "No feedback yet. Please fill the form above to submit your feedback."
          }
        </div>


        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mx-auto max-w-7xl'>
          {feedback.length > 0 ? (
            feedback.map((fb, index) => (
              <div
                key={index}
                className="bg-white p-4 text-black rounded-md w-full max-w-xs mx-auto shadow-md"
              >
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

    </div>
  );
};

export default Feedback;
