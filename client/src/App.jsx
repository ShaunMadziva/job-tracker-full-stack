import {Route, Routes, Link } from "react-router-dom";
import AddJob from "./components/AddJob";
import JobApplicationsTable from "./components/JobApplicationsTable";

export default function App() {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/add">Add Job Application</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<JobApplicationsTable />} />
        <Route path="/add" element={<AddJob />} />
      </Routes>
    </div>
  );
}