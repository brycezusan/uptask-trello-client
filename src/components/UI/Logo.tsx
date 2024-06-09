import { Link, useLocation } from "react-router-dom";

const Logo = () => {
  const { pathname } = useLocation();
  return (
    <Link to={"/"}>
      <img
        src="/logo.svg"
        className={`${pathname.includes("auth") ? "mx-auto w-64" : "w-60"}`}
      />
    </Link>
  );
};

export default Logo;
