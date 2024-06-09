import { NewPasswordForm } from "@/components/auth/NewPasswordForm";
import { ValidTokenForm } from "@/components/auth/ValidTokenForm";
import { useState } from "react";

export const NewPasswordView = () => {
  const [token , setToken] = useState('')
  const [isValidToken, setIsValidToken] = useState(false);
  return (
    <>
      {isValidToken ? (
        <>
          <h1 className="text-5xl font-black text-white">Nueva Contraseña</h1>
          <p className="text-2xl font-light text-white my-5">
            Ingresa su nueva contraseña en el
            <span className=" text-fuchsia-500 font-bold">
              {" "}
              sgte formulario
            </span>
          </p>
          <NewPasswordForm token={token}/>
        </>
      ) : (
        <>
          <h1 className="text-5xl font-black text-white">Validar Token</h1>
          <p className="text-2xl font-light text-white my-5">
            Ingresa el token enviado al{" "}
            <span className=" text-fuchsia-500 font-bold">email</span>
          </p>
          <ValidTokenForm setIsValidToken={setIsValidToken} token={token} setToken={setToken}/>
        </>
      )}
    </>
  );
};
