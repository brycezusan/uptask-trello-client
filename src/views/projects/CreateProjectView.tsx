import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query"
import { Formulario } from "@/components/Formulario";
import { createProject } from "@/api/projectService";
import { ProjectFormData } from "@/types/index";
import { toast } from "react-toastify"

export const CreateProjectView = () => {
  const navigate = useNavigate()
  const initialValues: ProjectFormData = {
    projectName: "",
    clientName: "",
    description: "",
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: initialValues });

  const mutation = useMutation({
    mutationFn: createProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data.msg)
      setTimeout(() => {
        navigate("/")
      }, 1500);
    }
  })
  
  const handleSubmitForm = (data: ProjectFormData) => mutation.mutate(data)

  return (
    <>
      <header>
        <h1 className="text-5xl xl:text-6xl font-bold">Crear Proyecto</h1>
        <p className="text-xl xl:text-2xl font-light text-gray-500 mt-5">
          Llena el sgte formulario para crear un proyecto
        </p>
        <nav className="mt-8">
          <Link
            className="bg-purple-500 hover:bg-purple-500/80 px-10 py-2 rounded shadow shadow-purple-600 text-white font-semibold cursor-pointer transition-colors"
            to="/"
          >
            Ir a Proyectos
          </Link>
        </nav>
      </header>

      <section className="bg-white shadow-lg max-w-xl mx-auto">
        <form
          className="mt-10 p-10 rounded-md"
          onSubmit={handleSubmit(handleSubmitForm)}
          noValidate
        >
          <Formulario
            register={register}
            errors={errors}
          />
          <div className="w-2/3 mx-auto">
            <input
              className="cta-form"
              type="submit" value="crear proyecto" />
          </div>
        </form>

      </section>

    </>
  );
};
