import React, { useState, useEffect } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import PatientModal from "../components/PatientModal";

const PatientManagement = () => {

  const [patients, setPatients] = useState([]);

  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [page, setPage] = useState(0);

  const patientsPerPage = 5;

  useEffect(() => {

    fetchPatients();

  }, []);

  const fetchPatients = async () => {

    try {

      const response = await axios.get(
        "https://hospital-backend-to52.onrender.com/patients"
      );

      setPatients(response.data);

    } catch (error) {

      console.log(error);

      toast.error("Failed to fetch patients");

    } finally {

      setLoading(false);
    }
  };

  const deletePatient = async (id) => {

    try {

      await axios.delete(
      `https://hospital-backend-to52.onrender.com/patients/${id}`
    );

      toast.success("Patient deleted successfully");

      fetchPatients();

    } catch (error) {

      console.log(error);

      toast.error("Delete failed");
    }
  };

  const startIndex = page * patientsPerPage;

  const endIndex = startIndex + patientsPerPage;

  const paginatedPatients = patients.slice(
    startIndex,
    endIndex
  );

  const totalPages = Math.ceil(
    patients.length / patientsPerPage
  );

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 p-8">

      <div className="max-w-7xl mx-auto">

        {/* HERO SECTION */}

        <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-3xl p-10 text-white mb-10 flex flex-col md:flex-row items-center justify-between shadow-2xl">

          <div>

            <h1 className="text-5xl font-bold leading-tight">
              Hospital Management
              <br />
              System
            </h1>

            <p className="mt-5 text-slate-300 text-lg">
              Manage patient records professionally.
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-8 bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-2xl text-lg font-semibold transition duration-300 shadow-lg"
            >
              + Add New Patient
            </button>

          </div>

          <img
            src="https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=1200&auto=format&fit=crop"
            alt="Hospital"
            className="w-96 rounded-3xl mt-10 md:mt-0 shadow-2xl"
          />

        </div>

        {/* PATIENT STATS */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">

          <h2 className="text-2xl font-bold text-slate-800">
            Total Patients
          </h2>

          <p className="text-6xl font-bold text-blue-600 mt-4">
            {patients.length}
          </p>

          <p className="text-slate-500 mt-3">
            Registered patient records
          </p>

        </div>

        {/* TABLE */}

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          <div className="p-8 border-b flex justify-between items-center">

            <div>

              <h2 className="text-3xl font-bold text-slate-800">
                Patient Directory
              </h2>

              <p className="text-slate-500 mt-2">
                Manage all patient records
              </p>

            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg transition duration-300"
            >
              Add Patient
            </button>

          </div>

          {loading ? (

            <div className="p-20 text-center text-2xl font-semibold">
              Loading Patients...
            </div>

          ) : (

            <table className="w-full">

              <thead className="bg-slate-900 text-white">

                <tr>

                  <th className="p-6 text-left">
                    Patient ID
                  </th>

                  <th className="p-6 text-left">
                    Name
                  </th>

                  <th className="p-6 text-left">
                    Age
                  </th>

                  <th className="p-6 text-left">
                    Disease
                  </th>

                  <th className="p-6 text-left">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {paginatedPatients.map((patient) => (

                  <tr
                    key={patient.patientId}
                    className="border-b hover:bg-slate-50 transition duration-300"
                  >

                    <td className="p-6 font-medium">
                      {patient.patientId}
                    </td>

                    <td className="p-6 font-semibold text-slate-800">
                      {patient.name}
                    </td>

                    <td className="p-6">
                      {patient.age}
                    </td>

                    <td className="p-6">
                      {patient.disease}
                    </td>

                    <td className="p-6">

                      <button
                        onClick={() =>
                          deletePatient(patient.patientId)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition duration-300 shadow-md"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>
          )}

        </div>

        {/* PAGINATION */}

        <div className="flex justify-between items-center mt-8">

          <button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            className="bg-slate-900 text-white px-6 py-3 rounded-xl disabled:opacity-40"
          >
            Previous
          </button>

          <p className="font-semibold text-slate-700 text-lg">

            Page {page + 1} of {totalPages || 1}

          </p>

          <button
            disabled={page + 1 >= totalPages}
            onClick={() => setPage(page + 1)}
            className="bg-slate-900 text-white px-6 py-3 rounded-xl disabled:opacity-40"
          >
            Next
          </button>

        </div>

      </div>

      {/* MODAL */}

      <PatientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={fetchPatients}
      />

    </div>
  );
};

export default PatientManagement;