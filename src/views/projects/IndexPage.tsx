import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ProjectItem } from "@/components/ProjectItem";
import { getProjects } from "@/api/projectService";

export const IndexPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  if (isLoading) return <p>Cargando..</p>;
  console.log(data);

  if (data)
    return (
      <>
        <header>
          <h1 className="text-5xl xl:text-6xl font-bold">Mis Proyectos</h1>
          <p className="text-xl xl:text-2xl font-light text-gray-500 mt-5">
            Maneja y administra tus proyectos
          </p>
          <nav className="mt-8">
            <Link
              className="bg-purple-500 hover:bg-purple-500/80 px-10 py-2 rounded shadow shadow-purple-600 text-white font-semibold cursor-pointer transition-colors"
              to="/projects/create"
            >
              Nuevo Proyecto
            </Link>
          </nav>
        </header>
        <section className="mt-10">
          {data.length ? (
            <ul
              role="list"
              className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg"
            >
              {data.map((prj) => (
                <ProjectItem key={prj._id} project={prj} />
              ))}
            </ul>
          ) : (
            <p className="text-center text-lg font-semibold text-red-500">
              No tenemos Proyectos agregados{" "}
              <Link to="/projects/create" className="cta">
                crear proyecto
              </Link>
            </p>
          )}
        </section>
      </>
    );

  if (data === undefined) return <p>Sin conexion...</p>;
};
