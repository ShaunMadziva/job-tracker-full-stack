import { useState, useEffect } from "react";

const API = location.href.includes("localhost") ? "http://localhost:8080" : "https://my-job-applications.onrender.com";

export default function JobApplicationsTable() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch(`${API}/job-applications`);
      if (!response.ok) {
        throw new Error(`Response was not ok ${response}`);
      }
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error("Error fetching job applications:", error);
    }
  };

  // Delete job application
  const handleDelete = async (id) => {
    console.log("Deleting post with id:", id);
    const response = await fetch(`${API}/job-applications/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log("Delete response:", data);
    alert(`🚀Success! Deleted application #${id}`);
    setApplications(applications.filter((app) => app.id !== id));
  };

  return (
    <div>
      <h2>Job Applications</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Job Title</th>
            <th>Company Name</th>
            <th>Date Applied</th>
            <th>Interesting Fact</th>
            <th>Brand Value 1</th>
            <th>Brand Value 2</th>
            <th>Brand Value 3</th>
            <th>Cover Letter</th>
            <th>Outcome</th>
            <th>Follow-up Date</th>
            <th>Followed Up</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(
            ({
              id,
              job_title,
              company_name,
              date_applied,
              interesting_fact,
              brand_value_1,
              brand_value_2,
              brand_value_3,
              cover_letter_included,
              outcome,
              follow_up_date,
              followed_up,
            }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{job_title}</td>
                <td>{company_name}</td>
                <td>{date_applied}</td>
                <td>{interesting_fact}</td>
                <td>{brand_value_1}</td>
                <td>{brand_value_2}</td>
                <td>{brand_value_3}</td>
                <td>{cover_letter_included}</td>
                <td>{outcome}</td>
                <td>{follow_up_date}</td>
                <td>{followed_up}</td>
                <td>
                  <button onClick={() => handleDelete(id)}>Delete</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
