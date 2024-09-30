import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const db = new pg.Pool({
  connectionString: process.env.DB_CONN_STRING,
});

//Add conditions for query strings later
app.get("/job-applications", async (req, res) => {
  const applications = await db.query("SELECT * FROM jobapplicationtracker");
  res.json(applications.rows);
});

app.post("/job-applications", async (req, res) => {
  const {
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
  } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO jobapplicationtracker (
          job_title, company_name, date_applied, interesting_fact,
          brand_value_1, brand_value_2, brand_value_3, cover_letter_included,
          outcome, follow_up_date, followed_up
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [
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
      ]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to add job application" });
  }
});

app.delete("/job-applications/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("DELETE FROM jobapplicationtracker WHERE id = $1 RETURNING *", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Job application not found" });
    }
    res.json({ message: "Job application deleted", application: result.rows[0] });
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).json({ error: "Failed to delete application" });
  }
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
