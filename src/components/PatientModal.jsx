import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../api/axiosConfig";
import toast from "react-hot-toast";

const patientSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  age: z.string().transform(Number).refine((n) => n > 0),
  disease: z.string().min(3, "Disease is required"),
});

const PatientModal = ({ isOpen, onClose, onSave }) => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(patientSchema),
  });

  const onSubmit = async (data) => {

    try {

      await api.post("/patients", data);

      toast.success("Patient registered successfully!");

      onSave();

      reset();

      onClose();

    } catch (err) {

      console.log(err);

      toast.error("Registration failed");
    }
  };

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl"
      >

        <h2 className="text-2xl font-bold mb-6 text-slate-800">
          Admit New Patient
        </h2>

        {/* NAME */}

        <input
          {...register("name")}
          className="w-full p-3 border rounded-xl mb-2"
          placeholder="Patient Name"
        />

        {errors.name && (
          <p className="text-red-500 text-sm mb-3">
            {errors.name.message}
          </p>
        )}

        {/* AGE */}

        <input
          type="number"
          {...register("age")}
          className="w-full p-3 border rounded-xl mb-2"
          placeholder="Age"
        />

        {errors.age && (
          <p className="text-red-500 text-sm mb-3">
            Invalid age
          </p>
        )}

        {/* DISEASE */}

        <input
          {...register("disease")}
          className="w-full p-3 border rounded-xl mb-2"
          placeholder="Disease"
        />

        {errors.disease && (
          <p className="text-red-500 text-sm mb-3">
            {errors.disease.message}
          </p>
        )}

        {/* BUTTONS */}

        <div className="flex gap-4 mt-6">

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl"
          >
            Save
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full bg-slate-300 hover:bg-slate-400 text-black p-3 rounded-xl"
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  );
};

export default PatientModal;