import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPatient = () => {
    const [patientId, setPatientId] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [disease, setDisease] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create the patient object to match your Java Entity
        const newPatient = { patientId, name, age: parseInt(age), disease };

        try {
            // Send a POST request to your Spring Boot backend
            const response = await fetch('http://localhost:8080/api/patients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPatient)
            });

            if (response.ok) {
                // If successful, navigate back to the dashboard to see the new list
                navigate('/dashboard');
            } else {
                console.error("Failed to save patient");
            }
        } catch (error) {
            console.error("Error connecting to server:", error);
        }
    };

    return (
        <div className="dashboard-container" style={{ maxWidth: '500px', margin: '2rem auto' }}>
            <h2>Admit New Patient</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label>Patient ID</label>
                    <input type="text" value={patientId} onChange={(e) => setPatientId(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Age</label>
                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required min="0" max="150" />
                </div>
                <div className="form-group">
                    <label>Diagnosis/Disease</label>
                    <input type="text" value={disease} onChange={(e) => setDisease(e.target.value)} required />
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <button type="submit" className="btn-primary">Save Patient</button>
                    <button type="button" className="btn-secondary" onClick={() => navigate('/dashboard')}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddPatient;