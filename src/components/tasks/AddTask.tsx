import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FormTask } from "./FormTask";
import { useForm } from "react-hook-form";
import { TaskFormData } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "@/api/taskService";
import { toast } from "react-toastify";

export const AddTask = () => {

  const {projectId} = useParams()
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const modal = queryParams.get("newTask");
  const show = modal ? true : false;

  const initialValues : TaskFormData = {
    name: "",
    description: "",
  };

  const {register , formState:{errors} , reset , handleSubmit} = useForm({defaultValues:initialValues})

  const client = useQueryClient()
  const mutation = useMutation({
    mutationFn:createTask,
    onError:(error)=>{
      toast.error(error.message)
    },
    onSuccess:(data)=>{
      client.invalidateQueries({queryKey:["editProject", projectId]})
      navigate("", { replace: true })
      toast.success(data)
      reset()
    }
  })

  const handleCreateTask = (formData:TaskFormData)=>{
    mutation.mutate({project:projectId! , formData})
  }

  return (
    <>
      <Transition appear show={show} as={Fragment}>
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
                    Nueva Tarea
                  </DialogTitle>

                  <p className="text-xl font-bold">
                    Llena el formulario y crea {""}
                    <span className="text-fuchsia-600">una tarea</span>
                  </p>

                  <form 
                    className="pt-10 space-y-2"
                    noValidate
                    onSubmit={handleSubmit(handleCreateTask)}
                  >
                    <FormTask register={register} errors={errors}/>
                    <div className="w-2/3 mx-auto pt-6">
                      <input type="submit" className="cta-form" value="Guardar Tarea" />
                    </div>
                  </form>
                </DialogPanel>

              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
