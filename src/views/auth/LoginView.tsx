import { useForm } from "react-hook-form";
import { UserLoginForm } from "@/types/index";
import { Alerta } from "@/components/UI/Alerta";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { authLogin } from "@/api/authService";

export const LoginView = () => {
  const initialValues: UserLoginForm = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: authLogin,
    onError: (error) => {
      toast.error(error.message);
      },
    onSuccess: (data) => { toast.success(data)},
  });

  const handleLogin = (formData: UserLoginForm) => mutation.mutate(formData);
  return (
    <>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-4 p-10 bg-white"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <Alerta>{errors.email.message}</Alerta>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && <Alerta>{errors.password.message}</Alerta>}
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>

      <nav className="mt-4 text-center flex flex-col gap-2">
        <Link
          to="/auth/create-account"
          className="text-white hover:text-blue-400 text-sm font-semibold"
        >
          No tienes una cuenta? crear cuenta nueva
        </Link>
        <Link
          to="/auth/forgat-password"
          className="text-white hover:text-blue-400 text-sm font-semibold"
        >
          Olvide mi contraseña?
        </Link>
      </nav>
    </>
  );
};
