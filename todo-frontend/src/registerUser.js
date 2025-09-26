import React, { useState } from "react";

function RegisterUser({ onRegister }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            if (!username || !password) {
                setError("All fields are required.");
                return;
            }
            // Real registration API call
            const response = await fetch('http://localhost:8080/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password})
            });
            if (!response.ok) {
                throw new Error('Registration failed.');
            }
            alert("Registration successful!");
            if (onRegister) onRegister();
        } catch (err) {
            setError("Registration failed.");
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2>Register</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="form-input"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}
                    <button type="submit" className="btn-primary">Register</button>
                </form>
            </div>
        </div>
    );
}

export default RegisterUser;