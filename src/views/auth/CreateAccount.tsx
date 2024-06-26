import { useForm } from "react-hook-form";
import { UserRegistrationForm } from "@/types/index";
import { Alerta } from "@/components/UI/Alerta";
import { Link, useNavigate } from "react-router-dom";
import { createAccount } from "@/api/authService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const CreateAccount = () => {

  const navigate = useNavigate()

  const initialValues: UserRegistrationForm = {
    name: "",
    email: "",
    password: "",
    password_confirm: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const password = watch("password");

  const mutation = useMutation({
    mutationKey:['register'],
    mutationFn:createAccount,
    onSuccess:(data)=>{
      toast.success(data)
      reset()
      setTimeout(() => {
        navigate("/auth/login")
      }, 1500);
    },
    onError:(error)=>{
      toast.error(error.message)
    }
  })

  const handleRegister = (formData: UserRegistrationForm) => mutation.mutate({formData})
  

  return (
    <>
      <h1 className="text-5xl font-black text-white">Crear Cuenta</h1>
      <p className="text-2xl font-light text-white mt-5">
        Llena el formulario para {""}
        <span className=" text-fuchsia-500 font-bold"> crear tu cuenta</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-8 p-10  bg-white mt-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "El Email de registro es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <Alerta>{errors.email.message}</Alerta>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Nombre</label>
          <input
            type="name"
            placeholder="Nombre de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("name", {
              required: "El Nombre de usuario es obligatorio",
            })}
          />
          {errors.name && <Alerta>{errors.name.message}</Alerta>}
        </div>

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
          value="Registrarme"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>

      <nav className="mt-4 text-center">
        <Link
          to="/auth/login"
          className="text-white hover:text-blue-400 text-sm font-semibold"
        >
          Ya tienes una cuenta? Iniciar Sesion
        </Link>
      </nav>
    </>
  );
};
