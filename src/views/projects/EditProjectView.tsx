import { getProjectById } from "@/api/projectService";
import { EditFormulario } from "@/components/EditFormulario";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useParams } from "react-router-dom";

export const EditProjectView = () => {
  const params = useParams();
  const { projectId } = params;

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["editProject", projectId],
    queryFn: () => getProjectById(projectId!),
    retry: false,
  });

  if (isLoading) return <p>Cargando....</p>;
  console.log(error)
  if (isError) return <Navigate to="404" />;

  if (data)
    return (
      <>
        <header>
          <h1 className="text-5xl xl:text-6xl font-bold">Editar Proyecto</h1>
          <p className="text-xl xl:text-2xl font-light text-gray-500 mt-5">
            Llena el sgte formulario para actualizar la informacion de un
            proyecto
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

        <EditFormulario data={data} projectId = {projectId}/>
      </>
    );
};
