import { isAxiosError } from "axios";
import api from "../lib";
import { Project, TaskFormData } from "../types";

export const createTask = async ({
  project,
  formData,
}: {
  project: Project["_id"];
  formData: TaskFormData;
}) => {
  try {
    const { data } = await api.post<string>(`/projects/${project}/tasks`, formData);
    console.log(data)
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error);
    }
  }
};
