import { useForm } from "react-hook-form";
import { Project, ProjectFormData } from "../types";
import { Formulario } from "./Formulario";
import { FC } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProjectById } from "@/api/projectService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type EditFormularioProps = {
  data: ProjectFormData;
  projectId? : Project['_id']
};

export const EditFormulario: FC<EditFormularioProps> = ({ data  , projectId}) => {
  const navigate = useNavigate()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      projectName: data.projectName,
      clientName: data.clientName,
      description: data.description,
    },
  });

  const client = useQueryClient()

  const mutation = useMutation({
    mutationFn:updateProjectById,
    onError:(error)=>{
      toast.error(error.message)
    },
    onSuccess:(data)=>{
      toast.success(data)
      client.invalidateQueries({queryKey: ["editProject", projectId]})
      setTimeout(() => {
        navigate("/")
      }, 1500);
    }
  })

  const handleSubmitForm = (formData: ProjectFormData) =>{
    const data : Project = {
      ...formData,
      _id: projectId!,
      tasks: []
    }
    mutation.mutate(data)
  };

  return (
    <section className="bg-white shadow-lg max-w-xl mx-auto">
      <form
        className="mt-10 p-10 rounded-md"
        onSubmit={handleSubmit(handleSubmitForm)}
        noValidate
      >
        <Formulario register={register} errors={errors} />
        <div className="w-2/3 mx-auto">
          <input className="cta-form" type="submit" value="Editar proyecto" />
        </div>
      </form>
    </section>
  );
};
