import { isAxiosError } from "axios";
import api from "../lib";
import { Project, Task, TaskFormData, TaskSchema } from "../types";

type TaskAPI = {
  formData: TaskFormData;
  projectId: Project["_id"];
  taskId: Task["_id"];
  status:Task['status']
};

export const createTask = async ({
  projectId,
  formData,
}: Pick<TaskAPI, "projectId" | "formData">) => {
  try {
    const { data } = await api.post<string>(
      `/projects/${projectId}/tasks`,
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error);
    }
  }
};

export const getTaskById = async ({
  projectId,
  taskId,
}: Pick<TaskAPI, "projectId" | "taskId">) => {
  try {
    const { data } = await api(`/projects/${projectId}/task/${taskId}`);
    console.log(data)
    const result = TaskSchema.safeParse(data);
    if(result.success) return result.data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error);
    }
  }
};

export const updateTaskById = async ({
  projectId,
  taskId,
  formData,
}: Pick<TaskAPI, "projectId" | "taskId" | "formData">) => {
  try {
    const { data } = await api.put(
      `/projects/${projectId}/task/${taskId}`,
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error);
    }
  }
};

export const deleteTask = async ({
  projectId,
  taskId,
}: Pick<TaskAPI, "projectId" | "taskId">) => {
  try {
    const { data } = await api.delete(`/projects/${projectId}/task/${taskId}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error);
    }
  }
};

export const updateStatusTask = async ({
  projectId,
  taskId,
  status
}: Pick<TaskAPI, "projectId" | "taskId" | "status" >) => {
  try {
    const { data } = await api.post(`/projects/${projectId}/task/${taskId}/status`,{status});
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error);
    }
  }
};

