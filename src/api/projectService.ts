import api from "@/lib/index";
import { Project, ProjectFormData, ProjectSchema, ProjectsSchema } from "../types";
import { isAxiosError } from "axios";

export const createProject = async (datos: ProjectFormData) => {
  try {
    const { data } = await api.post(`/projects`, datos);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error);
    }
  }
};

export const getProjects = async () => {
  try {
    const { data } = await api("/projects");
    const response = ProjectsSchema.safeParse(data);

    if (response.success) return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error);
    }
  }
};

export const getProjectById = async (id: Project["_id"]) => {
  try {
    const { data } = await api(`/projects/${id}`);
    const response = ProjectSchema.safeParse(data);
    if (response.success) return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.msg);
    }
  }
};

export const updateProjectById = async (datos:Project)=>{
  const { _id , ...values} = datos
  try {
    const {data} = await api.put<string>(`/projects/${_id}`,values)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log(error)
      throw new Error(error.response?.data.errors[0].msg);
    }
  }
}

export const deleteProjectById = async (id:Project['_id'])=>{
  try {
    const {data} = await api.delete<string>(`/projects/${id}`)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log(error)
      throw new Error(error.response?.data.errors[0].msg);
    }
  }
}
