import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Dashboard() {
    const navigate = useNavigate();
    const [internships, setInternships] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadInternships = async () => {
            try {
                const response = await API.get("/internships");
                setInternships(response.data);
            } catch (requestError) {
                if (requestError.response?.status === 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("token_type");
                    navigate("/login", { replace: true });
                    return;
                }

                setError(requestError.response?.data?.detail || "Could not load internships.");
            } finally {
                setLoading(false);
            }
        };

        loadInternships();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("token_type");
        navigate("/login", { replace: true });
    };

    return (
        <main>
            <h2>Dashboard</h2>
            <button type="button" onClick={handleLogout}>Logout</button>
            {loading && <p>Loading internships...</p>}
            {error && <p role="alert">{error}</p>}
            {!loading && !error && (
                <ul>
                    {internships.map((internship) => (
                        <li key={internship.id}>
                            {internship.company} - {internship.role}
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}

export default Dashboard;
