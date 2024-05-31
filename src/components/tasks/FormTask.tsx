import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Alerta } from "../UI/Alerta";
import { TaskFormData } from "@/types/index";
import { FC } from "react";

type FormTaskProps ={
  register: UseFormRegister<TaskFormData>,
  errors: FieldErrors<TaskFormData>
}

export const FormTask : FC<FormTaskProps> = ({register  , errors}) => {
  return (
    <>
      <div className="flex flex-col gap-5">
        <label className="font-semibold text-slate-600 text-lg" htmlFor="name">
          Nombre de la tarea
        </label>
        <input
          id="name"
          type="text"
          placeholder="Nombre de la tarea"
          className="w-full p-3  border-gray-300 border"
          {...register("name", {
            required: "El nombre de la tarea es obligatorio",
          })}
        />
        {errors.name && <Alerta>{errors.name.message}</Alerta>}
      </div>

      <div className="flex flex-col gap-5">
        <label className="font-semibold text-slate-600 text-lg" htmlFor="description">
          Descripción de la tarea
        </label>
        <textarea
          id="description"
          placeholder="Descripción de la tarea"
          className="w-full p-3  border-gray-300 border resize-none"
          rows={4}
          {...register("description", {
            required: "La descripción de la tarea es obligatoria",
          })}
        />
        {errors.description && (
          <Alerta>{errors.description.message}</Alerta>
        )}
      </div>
    </>
  );
};
