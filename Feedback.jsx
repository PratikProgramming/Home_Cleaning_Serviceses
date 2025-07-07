import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Feedback.css';

function Feedback() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      comments: '',
      rating: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().min(2, 'Too short').required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      comments: Yup.string().min(5, 'Minimum 5 characters').required('Required'),
      rating: Yup.number()
        .required('Required')
        .min(1, 'Min rating 1')
        .max(5, 'Max rating 5')
    }),
    onSubmit: (values, { resetForm }) => {
      axios.post('http://localhost:8080/api/feedback', values)
        .then(() => {
          alert('✅ Thanks for your feedback!');
          resetForm();
        })
        .catch(() => alert('❌ Submission failed'));
    }
  });

  return (
    <form className="feedback-form" onSubmit={formik.handleSubmit}>
      <h2>Send us your feedback!</h2>

      <input
        name="name"
        placeholder="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.name && formik.errors.name && (
        <div className="error">{formik.errors.name}</div>
      )}

      <input
        name="email"
        placeholder="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.email && formik.errors.email && (
        <div className="error">{formik.errors.email}</div>
      )}

      <textarea
        name="comments"
        placeholder="Your comments..."
        value={formik.values.comments}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.comments && formik.errors.comments && (
        <div className="error">{formik.errors.comments}</div>
      )}

      <input
        type="number"
        name="rating"
        placeholder="Rating (1–5)"
        value={formik.values.rating}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.rating && formik.errors.rating && (
        <div className="error">{formik.errors.rating}</div>
      )}

      <button type="submit">Submit</button>
    </form>
  );
}

export default Feedback;
