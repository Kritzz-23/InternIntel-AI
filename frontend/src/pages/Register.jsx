import { useState } from "react";
import API from "../api/axios";

function Register() {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "student"
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post(
                "/auth/register",
                formData
            );

            console.log(response.data);
            alert("Registration successful!");

        } catch (error) {
            console.log(error);
            alert("Registration failed!");
        }
    };


    return (
        <div>
            <h2>Create Account</h2>

            <form onSubmit={handleSubmit}>

                <input
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                />

                <input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <select
                    name="role"
                    onChange={handleChange}
                >
                    <option value="student">
                        Student
                    </option>

                    <option value="recruiter">
                        Recruiter
                    </option>

                </select>


                <button type="submit">
                    Register
                </button>

            </form>

        </div>
    );
}

export default Register;