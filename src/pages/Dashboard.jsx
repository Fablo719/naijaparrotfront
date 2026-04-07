import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p className="dashboard-subtitle">Welcome back! Manage your application here.</p>
      </div>

      <div className="dashboard-nav">
        <Link to="/admin/posts" className="nav-card">
          <h2>📝 Manage Posts</h2>
          <p>Create, edit, and publish blog posts and articles.</p>
          <span className="btn">
            Go to Posts →
          </span>
        </Link>

        <Link to="/admin/users" className="nav-card">
          <h2>👥 Manage Users</h2>
          <p>View, edit, and manage all registered users.</p>
          <span className="btn">
            Go to Users →
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;