import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '../api/axiosConfig';
import toast from 'react-hot-toast';

const patientSchema = z.object({
  firstName: z.string().min(2, "Name is too short"),
  age: z.string().transform(Number).refine(n => n > 0),
  disease: z.string().min(3)
});

const PatientModal = ({ isOpen, onClose, onSave }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(patientSchema)
  });

  const onSubmit = async (data) => {
    try {
      await api.post('/patients', data);
      toast.success("Patient registered successfully!");
      onSave();
      onClose();
    } catch (err) {
      toast.error("Registration failed");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl">
        <h2 className="text-xl font-bold mb-4">Admit New Patient</h2>
        <input {...register("firstName")} className="w-full p-2 border rounded mb-2" placeholder="First Name" />
        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
        
        <input {...register("age")} className="w-full p-2 border rounded mb-2" placeholder="Age" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded mt-4">Save</button>
      </form>
    </div>
  );
};

export default PatientModal;