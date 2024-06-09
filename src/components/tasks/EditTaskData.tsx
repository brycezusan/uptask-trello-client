import { useLocation, useParams } from "react-router-dom";
import { getTaskById } from "@/api/taskService";
import { useQuery } from "@tanstack/react-query";
import { EditTaskModal } from "./EditTaskModal";

export const EditTaskData = () => {
  const { projectId } = useParams();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const editTaskId = queryParams.get("taskEdit");

  const { data } = useQuery({
    queryKey: ["edit-task", editTaskId],
    queryFn: () => getTaskById({projectId:projectId!,taskId:editTaskId!}),
    enabled: !!editTaskId
  });

  if(data) return <EditTaskModal task={data} taskId={editTaskId!}/>;
};
