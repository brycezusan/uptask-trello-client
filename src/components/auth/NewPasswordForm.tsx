import { useForm } from "react-hook-form";
import { Alerta } from "../UI/Alerta";
import { NewPasswordFields} from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updatePasswordToken } from "@/api/authService";
import { useNavigate } from "react-router-dom";

export const NewPasswordForm = ({token}:{token:string}) => {

  const navigate = useNavigate()
  const initialValues: NewPasswordFields = {
    password: "",
    password_confirm: "",
  };
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm({defaultValues:initialValues});

  const mutation = useMutation({
    mutationKey:['update-password',token],
    mutationFn:updatePasswordToken,
    onError:(error)=>{
      toast.error(error.message)
    },
    onSuccess:(data)=>{
      toast.success(data)
      reset()
      setTimeout(() => {
        navigate("/auth/login")
      }, 1500);
    }
  })

  const password = watch('password')

  const handleNewPassword = (formData:NewPasswordFields) => mutation.mutate({token:token!,formData});
  return (
    <>
      <>
        <form
          onSubmit={handleSubmit(handleNewPassword)}
          className="space-y-8 p-10  bg-white mt-10"
          noValidate
        >
          <div className="flex flex-col gap-5">
            <label className="font-normal text-2xl">Password</label>

            <input
              type="password"
              placeholder="Password de Registro"
              className="w-full p-3  border-gray-300 border"
              {...register("password", {
                required: "El Password es obligatorio",
                minLength: {
                  value: 8,
                  message: "El Password debe ser mínimo de 8 caracteres",
                },
              })}
            />
            {errors.password && <Alerta>{errors.password.message}</Alerta>}
          </div>

          <div className="flex flex-col gap-5">
            <label className="font-normal text-2xl">Repetir Password</label>

            <input
              id="password_confirm"
              type="password"
              placeholder="Repite Password de Registro"
              className="w-full p-3  border-gray-300 border"
              {...register("password_confirm", {
                required: "Repetir Password es obligatorio",
                validate: (value) =>
                  value === password || "Los Passwords no son iguales",
              })}
            />

            {errors.password_confirm && (
              <Alerta>{errors.password_confirm.message}</Alerta>
            )}
          </div>

          <input
            type="submit"
            value="Establecer Password"
            className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
          />
        </form>
      </>
    </>
  );
};
