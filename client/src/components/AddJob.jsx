import { useState } from "react";

const API = location.href.includes("localhost") ? "http://localhost:8080" : "https://my-job-applications.onrender.com";

export default function AddJob() {
  const initialFormState = {
    job_title: "",
    company_name: "",
    date_applied: "",
    interesting_fact: "",
    brand_value_1: "",
    brand_value_2: "",
    brand_value_3: "",
    cover_letter_included: "",
    outcome: "",
    follow_up_date: "",
    followed_up: "",
  };
  const [formData, setFormData] = useState(initialFormState);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/job-applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Response:", data);

      // Clear the form
      setFormData(initialFormState);

      //...should probably check the actual status here
      setSubmitStatus("success");

      // Clear status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);

      setSubmitStatus("error");

      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Job Title:</label>
      <input
        type="text"
        name="job_title"
        value={formData.job_title}
        onChange={handleChange}
        required
      />

      <label>Company Name:</label>
      <input
        type="text"
        name="company_name"
        value={formData.company_name}
        onChange={handleChange}
        required
      />

      <label>Date Applied:</label>
      <input
        type="date"
        name="date_applied"
        value={formData.date_applied}
        onChange={handleChange}
        required
      />

      <label>Interesting Fact:</label>
      <textarea
        name="interesting_fact"
        value={formData.interesting_fact}
        onChange={handleChange}
      />

      <label>Brand Value 1:</label>
      <input
        type="text"
        name="brand_value_1"
        value={formData.brand_value_1}
        onChange={handleChange}
      />

      <label>Brand Value 2:</label>
      <input
        type="text"
        name="brand_value_2"
        value={formData.brand_value_2}
        onChange={handleChange}
      />

      <label>Brand Value 3:</label>
      <input
        type="text"
        name="brand_value_3"
        value={formData.brand_value_3}
        onChange={handleChange}
      />

      <label>Cover Letter Included</label>
      <input
        type="text"
        name="cover_letter_included"
        value={formData.cover_letter_included}
        onChange={handleChange}
      />

      <label>Outcome:</label>
      <select name="outcome" value={formData.outcome} onChange={handleChange}>
        <option value="">Select an outcome</option>
        <option value="Pending">Pending</option>
        <option value="Rejected">Rejected</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
      </select>

      <label>Follow-up Date:</label>
      <input
        type="date"
        name="follow_up_date"
        value={formData.follow_up_date}
        onChange={handleChange}
      />

      <label>Followed Up</label>
      <div>
        <label>
          <input
            type="radio"
            name="followed_up"
            value="Yes"
            checked={formData.followed_up === "Yes"}
            onChange={handleChange}
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            name="followed_up"
            value="No"
            checked={formData.followed_up === "No"}
            onChange={handleChange}
          />
          No
        </label>
      </div>

      <input type="submit" value="Submit" />

      {/* The logical AND operator (&&) in JavaScript returns the second operand if the first is truthy, and the first operand (in this case nothing) if it's falsy. */}
      {submitStatus === "success" && <p>🎉🚀Form submitted successfully!</p>}
      {submitStatus === "error" && (
        <p>❌Error submitting form. Please try again.</p>
      )}
    </form>
  );
}
