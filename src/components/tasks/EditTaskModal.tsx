import { FC, Fragment } from "react";
import {
  Dialog,
  DialogTitle,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Task, TaskFormData } from "@/types/index";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FormTask } from "./FormTask";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateTaskById } from "@/api/taskService";

type EditTaskModalProps = {
  task: Task;
  taskId:Task['_id']
};

export const EditTaskModal: FC<EditTaskModalProps> = ({ task , taskId }) => {
  const navigate = useNavigate();
  const {projectId} = useParams()
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<TaskFormData>({ defaultValues: {
    name:task.name,
    description:task.description
  } });

  const client = useQueryClient()
  
  const mutation = useMutation({
    mutationKey:['edit-task',task._id],
    mutationFn:updateTaskById,
    onError:(error)=>{
      toast.error(error.message)
    },
    onSuccess:(data)=>{
      client.invalidateQueries({queryKey:["editProject", projectId]})
      toast.success(data)
      navigate("",{replace:true})
      reset()
    }
  })


  const handleEditTask = (formData:TaskFormData)=>{
    mutation.mutate({projectId:projectId! , taskId , formData})
  }

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => navigate("", { replace: true })}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                <DialogTitle as="h3" className="font-black text-4xl  my-5">
                  Editar Tarea
                </DialogTitle>

                <p className="text-xl font-bold">
                  Realiza cambios a una tarea en {""}
                  <span className="text-fuchsia-600">este formulario</span>
                </p>

                <form 
                  onSubmit={handleSubmit(handleEditTask)}
                  className="mt-10 space-y-3" noValidate>
                  
                  <FormTask register={register} errors={errors}/>
                  <input
                    type="submit"
                    className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                    value="Guardar Tarea"
                  />
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
