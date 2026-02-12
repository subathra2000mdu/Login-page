import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1>Welcome to your Dashboard</h1>
        <p>Manage jobs and applications easily.</p>

        <div style={styles.grid}>
          <Card
            title="Browse Jobs"
            desc="Explore latest job openings."
            link="/jobs"
            btn="View Jobs"
          />

          <Card
            title="Create Job"
            desc="Post a job opportunity."
            link="/create-job"
            btn="Post Job"
          />

          <Card
            title="Profile"
            desc="Update your profile details."
            link="/profile"
            btn="Edit Profile"
          />

          <Card
            title="Applied Jobs"
            desc="Check jobs you've applied."
            link="/applied"
            btn="View Applied"
          />
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, desc, link, btn }) => (
  <div style={styles.card}>
    <h3>{title}</h3>
    <p>{desc}</p>
    <Link to={link} style={styles.btn}>
      {btn}
    </Link>
  </div>
);

const styles = {
  page: {
    padding: "40px",
    background: "#f4f6f8",
    minHeight: "100vh",
  },
  container: {
    maxWidth: "1000px",
    margin: "auto",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "30px",
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  btn: {
    marginTop: "15px",
    padding: "10px",
    background: "#111",
    color: "white",
    textAlign: "center",
    borderRadius: "6px",
    textDecoration: "none",
  },
};

export default Dashboard;
