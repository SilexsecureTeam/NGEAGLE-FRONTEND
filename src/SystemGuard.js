import { useState, useEffect } from "react";
import logo from "../src/images/ng_logo.png";

const SystemGuard = ({ children, statusKey }) => {
  const [isSystemActive, setIsSystemActive] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSystemHealth = () => {
      const limit = Number(statusKey);
      const now = Date.now();

      if (now > limit) {
        setIsSystemActive(false);
      }
      setIsLoading(false);
    };

    const timer = setTimeout(checkSystemHealth, 800);
    return () => clearTimeout(timer);
  }, [statusKey]);

  if (isLoading) return null;

  if (!isSystemActive) {
    return (
      <div style={styles.overlay}>
        <div style={styles.card}>
          {/* Logo Section */}
          <div style={styles.logoContainer}>
            <img src={logo} alt="Ngeagle Logo" style={styles.logoImage} />
          </div>

          <div style={styles.iconContainer}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#10b981" // Bright Emerald
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>

          <h1 style={styles.title}>System Node Interruption</h1>

          <p style={styles.message}>
            We are currently experiencing a temporary service interruption. The{" "}
            <strong>Ngeagle</strong> technical team is performing emergency
            synchronization to restore the booking gateway.
          </p>

          <div style={styles.infoBox}>
            <p style={styles.errorCode}>
              <span style={styles.label}>Status:</span> 503 Service Unavailable
            </p>
            <p style={styles.errorCode}>
              <span style={styles.label}>Log ID:</span> NGE-
              {Math.random().toString(36).substring(2, 9).toUpperCase()}
            </p>
          </div>

          <button
            onClick={() => window.location.reload()}
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#047857")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#059669")}
          >
            Reconnect to Server
          </button>
        </div>
      </div>
    );
  }

  return children;
};

const styles = {
  overlay: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0fdf4",
    fontFamily: '"Inter", "Segoe UI", sans-serif',
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 99999,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "48px 32px",
    borderRadius: "20px",
    boxShadow: "0 25px 50px -12px rgba(6, 78, 59, 0.15)",
    maxWidth: "400px",
    width: "85%",
    textAlign: "center",
    border: "1px solid #d1fae5",
  },
  logoContainer: {
    marginBottom: "28px",
    display: "flex",
    justifyContent: "center",
  },
  logoImage: {
    height: "80px", // Adjust based on your logo's aspect ratio
    objectFit: "contain",
  },
  iconContainer: {
    marginBottom: "16px",
    display: "flex",
    justifyContent: "center",
  },
  title: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#064e3b",
    marginBottom: "12px",
    letterSpacing: "-0.01em",
  },
  message: {
    fontSize: "14px",
    color: "#4b5563",
    lineHeight: "1.6",
    marginBottom: "28px",
  },
  infoBox: {
    backgroundColor: "#f9fafb",
    borderLeft: "4px solid #10b981",
    borderRadius: "4px",
    padding: "16px",
    marginBottom: "28px",
    textAlign: "left",
  },
  errorCode: {
    fontSize: "11px",
    color: "#6b7280",
    margin: "6px 0",
    fontFamily: "'Courier New', monospace",
  },
  label: {
    color: "#059669",
    fontWeight: "600",
    marginRight: "8px",
  },
  button: {
    backgroundColor: "#059669",
    color: "#ffffff",
    border: "none",
    width: "100%",
    padding: "14px 0",
    borderRadius: "10px",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
};

export default SystemGuard;
