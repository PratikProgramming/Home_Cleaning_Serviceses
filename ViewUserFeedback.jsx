import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewUserFeedback.css'; // 💡 New external CSS

function ViewUserFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = () => {
    axios.get('http://localhost:8080/api/feedback')
      .then(res => setFeedbacks(res.data))
      .catch(err => console.error("❌ Error fetching feedbacks", err));
  };

  return (
    <div className="feedback-container">
      <h2 className="feedback-title">📋 User Feedbacks</h2>
      {feedbacks.length === 0 ? (
        <p className="no-feedback">No feedback available yet.</p>
      ) : (
        <table className="feedback-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Comments</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map(feedback => (
              <tr key={feedback.id} className="fade-in">
                <td>{feedback.id}</td>
                <td>{feedback.name}</td>
                <td>{feedback.email}</td>
                <td>{feedback.comments}</td>
                <td>{feedback.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewUserFeedback;
