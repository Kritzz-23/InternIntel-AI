import { useState } from "react";
import API from "../api/axios";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            const loginForm = new FormData(e.currentTarget);
            const email = loginForm.get("email");
            const password = loginForm.get("password");

            const response = await API.post(
                "/auth/login",
                // OAuth2PasswordRequestForm requires these exact field names.
                // The backend uses the `username` field as the user's email.
                new URLSearchParams({
                    username: email,
                    password,
                }),
                {
                    headers:{
                        "Content-Type":"application/x-www-form-urlencoded"
                    }
                }
            );

            if (!response.data.access_token) {
                throw new Error("The server did not return an access token.");
            }

            localStorage.setItem("token", response.data.access_token);
            localStorage.setItem("token_type", response.data.token_type || "bearer");

            window.location.replace("/dashboard");

        } catch(error) {

            const message =
                error.response?.data?.detail ||
                error.message || "Unable to log in. Please try again.";

            console.error("Login failed:", error.response?.data || error);
            setError(message);

        } finally {
            setIsSubmitting(false);
        }
    };


    return (

        <div>

            <h2>Login</h2>

            <form onSubmit={handleSubmit}>

                {error && <p role="alert">{error}</p>}

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                    autoComplete="email"
                />


                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                />


                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Logging in..." : "Login"}
                </button>

            </form>

        </div>

    );
}


export default Login;
