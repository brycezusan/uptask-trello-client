import Logo from "./Logo";
import { Navegacion } from "./Navegacion";

const Header = () => {
  return (
    <header className="bg-blue-950">
      <div className="container flex flex-col gap-4 md:flex-row md:justify-between items-center">
        <Logo />
        <Navegacion />
      </div>
    </header>
  );
};

export default Header;
