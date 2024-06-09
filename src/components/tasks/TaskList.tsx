import { FC } from "react";
import { Task } from "@/types/index";
import { TaskCard } from "./TaskCard";
import { statusTranslations } from "@/utils/es";

type TaskListProps = {
  tasks: Task[];
};

type GroupedTasks = {
  [key: string]: Task[];
};

const initialStatusGroups: GroupedTasks = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: [],
};


const statusColors: { [key: string]: string } = {
  pending: "border-t-red-200",
  onHold: "border-t-sky-200",
  inProgress: "border-t-indigo-500",
  underReview: "border-t-cyan-500",
  completed: "border-t-emerald-500",
};

export const TaskList: FC<TaskListProps> = ({ tasks }) => {
  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroups);

  return (
    <>
      <h2 className="text-5xl font-black my-10">Tareas</h2>

      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
            <h3
              className={`capitalize text-xl font-normal text-slate-800 border  bg-white p-2 border-t-4 ${statusColors[status]}`}
            >
              {statusTranslations[status]}
            </h3>
            <ul className="mt-5 space-y-2">
              {tasks.length === 0 ? (
                <li className="text-gray-500 text-center pt-3">
                  No Hay tareas
                </li>
              ) : (
                tasks.map((task) => <TaskCard key={task._id} task={task} />)
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};
