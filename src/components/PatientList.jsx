import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import moved to the very top

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate(); // 2. Hook placed inside the component function

    useEffect(() => {
        fetch('http://localhost:8080/api/patients')
            .then(response => response.json())
            .then(data => setPatients(data))
            .catch(error => console.error('Error fetching patients:', error));
    }, []);

    return (
        <div className="dashboard-container">
            {/* 3. The new header with the Add button integrated inside the return statement */}
            <div className="dashboard-header">
                <h2>Patient Directory</h2>
                <button onClick={() => navigate('/add-patient')} className="btn-primary" style={{ width: 'auto' }}>
                    + Add New Patient
                </button>
            </div>
            
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Patient ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Diagnosis</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.length > 0 ? (
                        patients.map(patient => (
                            <tr key={patient.id || patient.patientId}>
                                <td>{patient.patientId}</td>
                                <td>{patient.name}</td>
                                <td>{patient.age}</td>
                                <td>{patient.disease}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{textAlign: 'center'}}>No patients found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PatientList;