export const Alerta = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-center bg-red-50 text-red-500 font-semibold p-2 uppercase text-sm">
      {children}
    </div>
  );
};
