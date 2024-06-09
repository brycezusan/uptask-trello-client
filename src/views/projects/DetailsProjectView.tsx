import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { getProjectById } from "@/api/projectService";
import { useQuery } from "@tanstack/react-query";
import { AddTask } from "@/components/tasks/AddTask";
import { TaskList } from "@/components/tasks/TaskList";
import { EditTaskData } from "@/components/tasks/EditTaskData";
import { TaskModalDetails } from "@/components/tasks/TaskModalDetails";

export const DetailsProjectView = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["editProject", projectId],
    queryFn: () => getProjectById(projectId!),
    retry: false,
  });

  if (isLoading) return <p>Cargando....</p>;
  if (isError) return <Navigate to="404" />;

  if (data)
    return (
      <>
        <header>
          <h1 className="text-3xl xl:text-5xl font-bold">{data.projectName}</h1>
          <p className="text-xl xl:text-2xl font-light text-gray-500 mt-5">
            {data.description}
          </p>
          <nav className="mt-8 flex gap-5">
            <Link
              className="bg-purple-500 hover:bg-purple-500/80 px-10 py-2 rounded shadow shadow-purple-600 text-white font-semibold cursor-pointer transition-colors"
              to="/"
            >
              Ir a Proyectos
            </Link>

            <button
              type="button"
              className="bg-purple-500 hover:bg-purple-500/80 px-10 py-2 rounded shadow shadow-purple-600 text-white font-semibold cursor-pointer transition-colors"
              onClick={() => navigate("?newTask=true")}
            >
              Agregar tarea
            </button>
          </nav>
        </header>

        <TaskList tasks={data.tasks} />
        <AddTask />
        <EditTaskData />
        <TaskModalDetails />
      </>
    );
};
